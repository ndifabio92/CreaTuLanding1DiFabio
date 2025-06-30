import { Theme } from "@mui/material/styles";

export const headerStyles = {
  appBar: (theme: Theme) => ({
    display: "flex",
    justifyContent: "space-between",
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
  }),
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  logoBox: {
    display: "flex",
    alignItems: "center",
  },
  menuButton: {
    mr: 2,
    display: { sm: "none" },
  },
  logo: {
    fontWeight: 600,
    letterSpacing: "0.5px",
    display: { xs: "none", sm: "block" },
    cursor: "pointer",
  },
  navigationBox: {
    display: { xs: "none", md: "flex" },
    justifyContent: "center",
    flex: 1,
    mx: 4,
  },
  navigationList: {
    display: "flex",
    gap: 2,
  },
  navigationItem: {
    borderRadius: 1,
    color: "white",
    cursor: "pointer",
    padding: "8px 16px",
    "&:hover": {
      backgroundColor: "rgba(212, 14, 14, 0.1)",
    },
  },
  cartBox: {
    display: "flex",
    alignItems: "center",
  },
  cartButton: {
    transition: "transform 0.2s",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
};
