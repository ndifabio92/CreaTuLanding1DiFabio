import { Theme } from "@mui/material/styles";

export const sidebarStyles = {
  mainBox: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  headerBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    p: 3,
    pt: 4,
    pb: 2,
  },
  logoBox: {
    display: "flex",
    alignItems: "center",
    mb: 1,
    cursor: "pointer",
  },
  contentBox: {
    p: 2,
    flexGrow: 1,
    padding: "0 !important",
  },
  list: {
    mt: 1,
  },
  listItem: (isActive: boolean) => ({
    borderRadius: 1,
    color: isActive ? "primary.main" : "inherit",
    fontWeight: isActive ? 700 : 500,
    cursor: "pointer",
    userSelect: "none",
    transition: "background 0.2s",
    p: "16px !important",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.04)",
    },
  }),
  mobileDrawer: (drawerWidth: number) => ({
    display: { xs: "block", sm: "none" },
    "& .MuiDrawer-paper": {
      boxSizing: "border-box",
      width: drawerWidth,
      transition: (theme: Theme) =>
        theme.transitions.create("transform", {
          duration: theme.transitions.duration.shorter,
        }),
    },
  }),
  desktopDrawer: (drawerWidth: number) => ({
    display: { xs: "none", sm: "block" },
    "& .MuiDrawer-paper": {
      boxSizing: "border-box",
      width: drawerWidth,
      position: "fixed",
      height: "100%",
      borderRight: "1px solid",
      borderColor: "divider",
    },
  }),
};
