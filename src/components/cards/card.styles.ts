export const cardStyles = {
  card: {
    width: "320px",
    height: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 2,
    cursor: "pointer",
    transition: "transform 0.2s",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  newBadge: {
    backgroundColor: "#FFEB3B",
    color: "#222",
    fontWeight: 700,
    fontSize: 13,
    marginBottom: 1,
    borderRadius: "0 4px 4px 0",
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
    position: "relative",
    left: "-127.5px",
    "& .MuiChip-label": {
      padding: "2px 10px",
    },
  },
};
