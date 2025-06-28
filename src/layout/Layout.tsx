import { useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Outlet } from "react-router";
import Footer from "./footer/Footer";
import { layoutStyles } from "./layout.styles";
import Header from "./header/Header";
import { Sidebar } from "./sidebar/Sidebar";

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const drawerWidth = 240;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={layoutStyles.mainBox}>
      <Header handleDrawerToggle={handleDrawerToggle} />

      {isMobile && (
        <Sidebar
          drawerWidth={drawerWidth}
          handleDrawerToggle={handleDrawerToggle}
          mobileOpen={mobileOpen}
        />
      )}
      <Box component={"main"} sx={layoutStyles.contentBox(drawerWidth)}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
