export const checkoutStyles = {
  container: {
    pb: 4,
  },
  mainBox: {
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    gap: 4,
  },
  formBox: {
    flex: 1,
    p: 3,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 2,
    mb: { xs: 2, md: 0 },
  },
  whatsappButtonBox: {
    mt: 3,
    display: "flex",
    justifyContent: "center",
  },
  cartBox: {
    flex: 1,
    p: "24px",
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 2,
  },
  customTextField: {
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "#ff6b35",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#ff6b35",
        borderWidth: "2px",
      },
    },
    "& .MuiInputLabel-root": {
      "&.Mui-focused": {
        color: "#ff6b35",
      },
    },
  },
};
