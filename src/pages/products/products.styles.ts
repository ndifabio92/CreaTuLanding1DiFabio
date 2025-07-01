export const productsStyles = {
  container: {
    pb: 4,
  },
  notFoundTitle: {
    mt: 4,
  },
  paper: {
    p: 4,
  },
  mainStack: {
    alignItems: { xs: "center", sm: "flex-start" },
    justifyContent: { xs: "center", sm: "flex-start" },
    width: "100%",
  },
  imageBox: {
    width: { xs: "100%", sm: 300 },
    maxWidth: 300,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    mb: { xs: 2, sm: 0 },
  },
  contentBox: {
    flexGrow: 1,
    width: { xs: "100%", sm: "auto" },
  },
  description: {
    mt: 2,
  },
  price: {
    mt: 2,
    mb: 1,
  },
  mobileStack: {
    mt: 2,
    width: "100%",
  },
  quantityTypography: {
    minWidth: "30px",
    textAlign: "center",
    fontWeight: "medium",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mobileButtonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  mobileButton: {
    minWidth: 48,
    px: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  desktopStack: {
    mt: 2,
  },
  desktopButtonContainer: {
    // Empty object for consistency
  },
  desktopButton: {
    mt: 2,
  },
  divider: {
    my: 4,
  },
  categoriesStack: {
    mt: 1,
    flexWrap: "wrap",
    justifyContent: { xs: "center", sm: "flex-start" },
    width: "100%",
    gap: 1,
  },
  newBadge: {
    backgroundColor: "#FFEB3B",
    color: "#222",
    fontWeight: 700,
    fontSize: 13,
    marginTop: 1,
    borderRadius: 0.5,
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
    "& .MuiChip-label": {
      padding: "2px 10px",
    },
  },
};
