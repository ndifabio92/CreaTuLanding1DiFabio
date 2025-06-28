import { type FC, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { Box, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { sidebarStyles } from "./sidebar.styles";
import { SidebarProps } from "../../types/ui/sidebar";
import { Brands } from "../../types/brands";
import { getAllBrandsFromFirestore } from "../../services/brands.service";
import MenuDropdown from "../../components/menu/MenuDropdown";
import { routes } from "../../routes/routes";

export const Sidebar: FC<SidebarProps> = ({
  mobileOpen,
  handleDrawerToggle,
  drawerWidth,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [brands, setBrands] = useState<Brands[]>([]);
  const [brandsOpen, setBrandsOpen] = useState(false);

  useEffect(() => {
    getAllBrandsFromFirestore().then((data: Brands[]) => {
      setBrands(data.filter((b) => b.active));
    });
  }, []);

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  const drawer = (
    <Box sx={sidebarStyles.mainBox}>
      <Box sx={sidebarStyles.headerBox}>
        <Box
          sx={sidebarStyles.logoBox}
          onClick={() => {
            navigate("/");
            handleDrawerToggle();
          }}
        ></Box>
      </Box>
      <Box sx={sidebarStyles.contentBox}>
        <List sx={sidebarStyles.list}>
          {routes.map((item) => {
            if (item.name === "Marcas") {
              return (
                <MenuDropdown
                  key={item.path}
                  label={item.name}
                  items={brands.map((b) => ({ id: b.id, name: b.name }))}
                  basePath={item.path}
                  isSidebar
                  isActive={isActive(item.path)}
                  open={brandsOpen}
                  setOpen={setBrandsOpen}
                  handleDrawerToggle={handleDrawerToggle}
                  onItemClick={(brand) => {
                    navigate(`/brands?brand=${encodeURIComponent(brand.name)}`);
                    handleDrawerToggle();
                  }}
                  paramKey="brand"
                />
              );
            }
            return (
              <ListItem
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  handleDrawerToggle();
                }}
                sx={sidebarStyles.listItem(isActive(item.path))}
              >
                <ListItemText primary={item.name} />
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Box>
  );

  return (
    <Box component="nav">
      {/* Drawer para móviles */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={sidebarStyles.mobileDrawer(drawerWidth)}
      >
        {drawer}
      </Drawer>

      {/* Drawer permanente para pantallas grandes */}
      <Drawer
        variant="persistent"
        sx={sidebarStyles.desktopDrawer(drawerWidth)}
        anchor="left"
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};
