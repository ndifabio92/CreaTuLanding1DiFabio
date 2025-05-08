import { useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Outlet } from "react-router";
import Header from "./Header";
import { Sidebar } from "./Sidebar";

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const drawerWidth = 240;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <Header handleDrawerToggle={handleDrawerToggle} />

      {isMobile && (
        <Sidebar
          drawerWidth={drawerWidth}
          handleDrawerToggle={handleDrawerToggle}
          mobileOpen={mobileOpen}
        />
      )}
      <Box
        component={"main"}
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)`, md: "100%" },
          ml: { sm: `${drawerWidth}px`, md: 0 },
          display: "flex",
          flexDirection: "column",
          position: "relative",
          top: "64px", // Altura del header
        }}
      >
        <Outlet />
      </Box>
      {/* <Footer /> */}
    </Box>
  );
};

export default Layout;
