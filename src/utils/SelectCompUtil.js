const ITEM_HEIGHT = 48;

const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(element, state, theme) {
  return {
    fontWeight: state.includes(element)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export { MenuProps, getStyles };
