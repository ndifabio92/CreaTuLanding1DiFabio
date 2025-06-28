export const layoutStyles = {
  mainBox: {
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column",
    position: "relative",
  },
  contentBox: (drawerWidth: number) => ({
    flexGrow: 1,
    p: 3,
    width: { sm: `calc(100% - ${drawerWidth}px)`, md: "100%" },
    ml: { sm: `${drawerWidth}px`, md: 0 },
    display: "flex",
    flexDirection: "column",
    position: "relative",
    top: "64px", // Altura del header
  }),
};
