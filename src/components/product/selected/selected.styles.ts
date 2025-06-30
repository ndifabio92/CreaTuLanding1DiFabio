export const selectedStyles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    gap: 0.5,
    mt: 0.5,
  },
  chip: (isPopover: boolean) => ({
    fontSize: isPopover ? "0.7rem" : "0.75rem",
    height: isPopover ? "18px" : "20px",
    "& .MuiChip-label": {
      px: 1,
    },
  }),
};
