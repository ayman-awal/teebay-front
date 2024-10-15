import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { gql, useMutation } from "@apollo/client";
import CustomAlert from "./CustomAlert";
import { GET_PRODUCT_BY_USER_ID } from "./MyProducts";

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  function getOrdinalSuffix(num) {
    const suffixes = ["th", "st", "nd", "rd"];
    const value = num % 100;
    return suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0];
  }

  const formattedDate = `${day}${getOrdinalSuffix(day)} ${
    monthNames[monthIndex]
  } ${year}`;
  return formattedDate;
}

const DELETE_PRODUCT_MUTATION = gql`
  mutation deleteProduct($input: deleteProductInput!) {
    deleteProduct(input: $input)
  }
`;

const ProductCard = ({
  id,
  title,
  categories,
  purchasePrice,
  rentPrice,
  description,
  datePosted,
  rentFrequency,
  isAvailable,
  onClick,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const loggedInUser = parseInt(localStorage.getItem("userId"), 10);
  const [profilePage, setProfilePage] = useState(false);
  const [isSubstring, setIsSubstring] = useState(false);

  useEffect(() => {
    setIsSubstring(description.length >= 175);
  }, [description]);

  // const [deleteProduct] = useMutation(DELETE_PRODUCT_MUTATION);
  const [deleteProduct] = useMutation(DELETE_PRODUCT_MUTATION, {
    update(cache, { data: { deleteProduct } }) {
      const existingProducts = cache.readQuery({
        query: GET_PRODUCT_BY_USER_ID,
        variables: { id: loggedInUser.toString() },
      });

      if (existingProducts) {
        const updatedProducts = existingProducts.productByUserId.filter(
          (product) => product.id !== id
        );

        cache.writeQuery({
          query: GET_PRODUCT_BY_USER_ID,
          variables: { id: loggedInUser.toString() },
          data: { productByUserId: updatedProducts },
        });
      }
    },
    onCompleted: () => {
      setAlertMessage("Product Successfully deleted");
      setAlertOpen(true);
      setAlertSeverity("success");
    },
    onError: (err) => {
      setAlertMessage(err.message);
      setAlertOpen(true);
      setAlertSeverity("error");
    },
  });

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("warning");

  const formattedDatePosted = formatTimestamp(parseInt(datePosted, 10));

  const handleDelete = async (event) => {
    event.stopPropagation();
    try {
      await deleteProduct({
        variables: {
          input: {
            userId: loggedInUser,
            productId: parseInt(id, 10),
          },
        },
      });
      setAlertMessage("Product Successfully deleted");
      setAlertOpen(true);
      setAlertSeverity("success");
    } catch (err) {
      setAlertMessage(err.message);
      setAlertOpen(true);
      setAlertSeverity("error");
    }
  };

  const handleEdit = (event) => {
    event.stopPropagation();
    console.log("Edit");
    navigate(`/edit-product/${id}`, {
      state: {
        product: {
          id,
          title,
          categories,
          purchasePrice,
          rentPrice,
          rentFrequency,
          description,
          datePosted,
          isAvailable,
        },
      },
    });
  };

  useEffect(() => {
    if (location.pathname === "/my-products") {
      setProfilePage(true);
    } else {
      setProfilePage(false);
    }
  }, [location.pathname]);

  return (
    <div
      className="center box-border pointer"
      onClick={onClick}
      style={{ minHeight: "150px", width: "60%", marginTop: "30px" }}
    >
      <div
        className="product-card-container flex flex-col gap-20"
        style={{ padding: "30px" }}
      >
        <div>
          <div className="flex justify-between">
            <p className="product-title">{title}</p>

            {profilePage ? (
              <div>
                <IconButton aria-label="edit" size="large" onClick={handleEdit}>
                  {" "}
                  <EditIcon />{" "}
                </IconButton>
                <IconButton
                  aria-label="delete"
                  size="large"
                  onClick={handleDelete}
                >
                  {" "}
                  <DeleteIcon />{" "}
                </IconButton>
              </div>
            ) : null}
          </div>
          <p className="product-detail-text">Categories: {categories}</p>
          <p className="product-detail-text">
            Price: ${purchasePrice} | Rent: ${rentPrice} {rentFrequency}
          </p>

          {/* <p className='product-description'> */}
          {isSubstring ? (
            <p className="product-description">
              {" "}
              {description.substring(0, 175)}{" "}
              <span className="underline" style={{ color: "#2d6bcf" }}>
                ...More Details
              </span>{" "}
            </p>
          ) : (
            <p className="product-description">{description}</p>
          )}

          {/* </p> */}
        </div>
        <div>
          <p className="product-detail-text">
            Date posted: {formattedDatePosted}
          </p>
        </div>
      </div>
      <CustomAlert
        message={alertMessage}
        open={alertOpen}
        severity={alertSeverity}
        onClose={() => setAlertOpen(false)}
      />
    </div>
  );
};

export default ProductCard;
