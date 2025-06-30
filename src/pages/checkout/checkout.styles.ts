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
        borderColor: "#ff6b35", // Cambia este color por el que necesites
      },
      "&.Mui-focused fieldset": {
        borderColor: "#ff6b35", // Color del borde cuando está enfocado
        borderWidth: "2px", // Opcional: puedes cambiar el grosor del borde
      },
    },
    "& .MuiInputLabel-root": {
      "&.Mui-focused": {
        color: "#ff6b35", // Color del label cuando está enfocado
      },
    },
    // Opcional: personalizar también el color del texto
    "& .MuiOutlinedInput-input": {
      "&:focus": {
        // color: '#333', // Color del texto cuando está enfocado
      },
    },
  },
};
