export const homeStyles = {
  errorContainer: {
    py: 4,
  },
  errorBox: {
    textAlign: "center",
    mt: 4,
  },
  mainContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 2,
  },
  productsGrid: {
    display: 'grid',
    gap: 1,
    gridTemplateColumns: {
      xs: 'repeat(1, 1fr)',
      sm: 'repeat(2, 1fr)',
      md: 'repeat(3, 1fr)',
      lg: 'repeat(4, 1fr)',
    },
  },
};
