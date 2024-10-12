import React, { useState } from 'react';
import SelectTitle from './SelectTitle';
import SelectCategories from './SelectCategories';
import RentDetails from './PriceDetails';
// import Confirm from './Confirm';
import SelectDescription from './SelectDescription';
import ProductSummary from './ProductSummary';

// import Success from './Success';

const UserForm = () => {
  const [step, setStep] = useState(1);
  const [values, setValues] = useState({
    title: '',
    categories: [],
    description: '',
    purchasePrice: '',
    rentPrice: '',
    rentFrequency: ''
  });

  const nextStep = () => {
    setStep(prevStep => prevStep + 1);
  };

  const prevStep = () => {
    setStep(prevStep => prevStep - 1);
  };

  const handleChange = input => e => {
    // setValues({ ...values, [input]: e.target.value });
    const { value } = e.target;
    setValues(prevValues => ({
      ...prevValues,
      [input]: typeof value === 'string' ? value.split(',') : value,
  }));
  };

  switch (step) {
    case 1:
      return (
        <SelectTitle
          nextStep={nextStep}
          handleChange={handleChange}
          values={values}
        />
      );
    case 2:
      return (
        <SelectCategories
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          values={values}
        />
      );
    case 3:
      return (
        <SelectDescription
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          values={values}
        />
        // <Confirm
        //   nextStep={nextStep}
        //   prevStep={prevStep}
        //   values={values}
        // />
      );
    case 4:
      // return <Success />;
      return (
        <RentDetails
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          values={values}
        />
      );
    case 5:
      // return <Success />;
      return (
        <ProductSummary
          prevStep={prevStep}
          values={values}
        />
      )
    default:
      console.log('This is a multi-step form built with React.');
      return null;
  }
};

export default UserForm;
