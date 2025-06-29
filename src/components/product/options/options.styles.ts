export const optionsStyles = {
  container: {
    mb: 2,
  },
  label: {
    fontWeight: "medium",
    mb: 1,
    color: "text.primary",
  },
  chip: (isSelected: boolean) => ({
    cursor: "pointer",
    ...(isSelected
      ? {
          // Estilos para chip seleccionado
          backgroundColor: "primary.main",
          color: "primary.contrastText",
          "&:hover": {
            backgroundColor: "primary.main",
            color: "primary.contrastText",
          },
        }
      : {
          // Estilos para chip no seleccionado
          // "&:hover": {
          //   backgroundColor: "primary.light",
          //   color: "primary.contrastText",
          //   borderColor: "primary.main",
          // },
        }),
  }),
};
