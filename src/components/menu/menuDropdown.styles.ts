export const menuDropdownStyles = {
  sidebarListItem: (isActive: boolean) => ({
    borderRadius: 1,
    color: isActive ? "primary.main" : "inherit",
    fontWeight: isActive ? 700 : 500,
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    userSelect: "none",
    transition: "background 0.2s",
    p: "16px !important",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.04)",
    },
  }),
  expandIcon: {
    ml: 1,
  },
  subList: {
    pl: 3,
  },
  subListItem: (isActive: boolean) => ({
    color: isActive ? "primary.main" : "text.secondary",
    fontWeight: isActive ? 700 : 400,
    borderRadius: 1,
    pl: "8px !important",
    cursor: "pointer",
    userSelect: "none",
    transition: "background 0.2s",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.04)",
    },
  }),
  webBox: {
    position: "relative",
  },
  webListItem: {
    borderRadius: 1,
    color: "white",
    cursor: "pointer",
    padding: "8px 16px",
    "&:hover": {
      backgroundColor: "rgba(212, 14, 14, 0.1)",
    },
  },
  menu: {
    minWidth: 200,
    boxShadow: 3,
    borderRadius: 2,
    py: 1,
    backgroundColor: "background.paper",
  },
  menuItem: (_idx: number, _itemsLength: number) => ({
    fontWeight: 500,
    color: "text.primary",
    borderRadius: 1,
    mx: 1,
    my: 0.5,
    transition: "background 0.2s",
    "&:hover": {
      backgroundColor: "primary.light",
      color: "primary.main",
    },
    boxShadow: 0,
  }),
  menuItemBox: {
    display: "flex",
    alignItems: "center",
    gap: 1,
  },
};
