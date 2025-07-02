export const cartStyles = {
  container: (_isPopover: boolean) => ({
    pb: _isPopover ? 0 : 4,
  }),
  popoverList: {
    // maxHeight: 300,
    overflow: "auto",
  },
  listItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    gap: 2,
    py: 2,
    borderBottom: "1px solid #e0e0e0",
  },
  productInfoBox: {
    display: "flex",
    alignItems: "flex-start",
    gap: 2,
  },
  avatar: (_isPopover: boolean) => ({
    width: _isPopover ? 50 : 80,
    height: _isPopover ? 50 : 80,
    flexShrink: 0,
    borderRadius: 0,
  }),
  productDetailsBox: {
    flex: 1,
    minWidth: 0,
  },
  productName: (_isPopover: boolean) => ({
    fontWeight: "medium",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    textTransform: "capitalize",
    mb: 0.5,
  }),
  optionsBox: {
    display: "flex",
    flexWrap: "wrap",
    gap: 0.5,
    mt: 0.5,
  },
  optionChip: {
    fontSize: "0.75rem",
    height: "20px",
    "& .MuiChip-label": {
      px: 1,
    },
  },
  controlsBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    gap: 2,
  },
  quantityControlsBox: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    flex: "0 0 auto",
  },
  quantityTypography: {
    minWidth: "40px",
    textAlign: "center",
    fontWeight: "medium",
  },
  deleteButtonBox: {
    flex: 1,
    textAlign: "center",
  },
  deleteButton: {
    color: "error.light",
    backgroundColor: "error.50",
    "&:hover": {
      backgroundColor: "error.100",
      color: "error.main",
    },
  },
  priceBox: {
    flex: "0 0 auto",
  },
  itemPrice: (_isPopover: boolean) => ({
    fontWeight: "bold",
    color: "primary.main",
    fontSize: _isPopover ? "0.875rem" : "1.1rem",
  }),
  emptyCartText: {
    textAlign: "center",
  },
  emptyCartTypography: {
    textAlign: "center",
    width: "100%",
  },
  divider: {
    my: 2,
  },
  totalBox: {
    display: "flex",
    justifyContent: "flex-end",
    mb: 2,
  },
  totalTypography: {
    fontWeight: "bold",
  },
  dialogPaper: {
    borderRadius: 2,
  },
  dialogContent: {
    p: 2,
  },
  popoverPaper: {
    width: 350,
    height: "90vh",
    maxHeight: "100vh",
  },
  popoverContent: {
    p: 2,
  },
};
