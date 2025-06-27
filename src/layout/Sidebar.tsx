import { type FC, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import type { SidebarProps } from "../types/ui/sidebar";
import { routes } from "../routes/routes";
import { getAllBrandsFromFirestore } from "../services/brands.service";
import { Brands } from "../types/brands";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

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
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 3,
          pt: 4,
          pb: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 1,
            cursor: "pointer",
          }}
          onClick={() => {
            navigate("/");
            handleDrawerToggle();
          }}
        ></Box>
      </Box>
      <Box sx={{ p: 2, flexGrow: 1, padding: "0 !important" }}>
        <List sx={{ mt: 1 }}>
          {routes.map((item) => {
            if (item.name === "Marcas") {
              return (
                <>
                  <ListItem
                    key={item.path}
                    onClick={() => setBrandsOpen((open) => !open)}
                    sx={{
                      borderRadius: 1,
                      color: isActive(item.path) ? "primary.main" : "inherit",
                      fontWeight: isActive(item.path) ? 700 : 500,
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                      userSelect: 'none',
                      transition: 'background 0.2s',
                      p: '16px !important',
                      '&:hover': {
                        backgroundColor: 'rgba(0,0,0,0.04)',
                      },
                    }}
                  >
                    <ListItemText primary={item.name} />
                    {brandsOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </ListItem>
                  {brandsOpen && (
                    <List component="div" disablePadding sx={{ pl: 3 }}>
                      {brands.map((brand) => (
                        <ListItem
                          key={brand.id}
                          onClick={() => {
                            navigate(`/brands?brand=${encodeURIComponent(brand.name)}`);
                            handleDrawerToggle();
                          }}
                          sx={{
                            color: location.search.includes(brand.name) ? 'primary.main' : 'text.secondary',
                            fontWeight: location.search.includes(brand.name) ? 700 : 400,
                            borderRadius: 1,
                            pl: '8px !important',
                            cursor: 'pointer',
                            userSelect: 'none',
                            transition: 'background 0.2s',
                            '&:hover': {
                              backgroundColor: 'rgba(0,0,0,0.04)',
                            },
                          }}
                        >
                          <ListItemText primary={brand.name} />
                        </ListItem>
                      ))}
                    </List>
                  )}
                </>
              );
            }
            return (
              <ListItem
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  handleDrawerToggle();
                }}
                sx={{
                  borderRadius: 1,
                  color: isActive(item.path) ? "primary.main" : "inherit",
                  fontWeight: isActive(item.path) ? 700 : 500,
                  cursor: 'pointer',
                  userSelect: 'none',
                  transition: 'background 0.2s',
                  p: '16px !important',
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.04)',
                  },
                }}
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
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            transition: (theme) =>
              theme.transitions.create("transform", {
                duration: theme.transitions.duration.shorter,
              }),
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Drawer permanente para pantallas grandes */}
      <Drawer
        variant="persistent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            position: "fixed",
            height: "100%",
            borderRight: "1px solid",
            borderColor: "divider",
          },
        }}
        anchor="left"
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};
