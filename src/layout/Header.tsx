import { useState, type FC, useRef, useEffect } from "react";
import {
  AppBar,
  Box,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
  useTheme,
  Menu,
  MenuItem,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import type { AppHeaderProps } from "../types/ui/header";
import { routes } from "../routes/routes";
import { Link, useNavigate } from "react-router";
import CartIcon from "../components/cart/CartIcon";
import { getAllBrandsFromFirestore } from "../services/brands.service";
import { Brands } from "../types/brands";

const Header: FC<AppHeaderProps> = ({ handleDrawerToggle }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [brands, setBrands] = useState<Brands[]>([]);
  const navigate = useNavigate();
  const marcasRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    getAllBrandsFromFirestore().then((data: Brands[]) => {
      setBrands(data.filter((b) => b.active));
    });
  }, []);

  const handleOpenMenu = () => {
    setAnchorEl(marcasRef.current);
  };
  const handleClose = () => setAnchorEl(null);

  const handleBrandClick = (brandName: string) => {
    navigate(`/brands?brand=${encodeURIComponent(brandName)}`);
    handleClose();
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        zIndex: theme.zIndex.drawer + 1,
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
      }}
    >
      <Toolbar
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 600,
              letterSpacing: "0.5px",
              display: { xs: "none", sm: "block" },
            }}
          >
            Nando CWS
          </Typography>
        </Box>

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
            flex: 1,
            mx: 4,
          }}
        >
          <List sx={{ display: "flex", gap: 2 }}>
            {routes.map((item) => {
              if (item.name === "Marcas") {
                return (
                  <Box
                    key={item.path}
                    sx={{ position: "relative" }}
                    onMouseEnter={handleOpenMenu}
                    onMouseLeave={handleClose}
                    ref={marcasRef}
                  >
                    <ListItem
                      component={Link}
                      to={item.path}
                      sx={{
                        borderRadius: 1,
                        color: "white",
                        cursor: "pointer",
                        padding: "8px 16px",
                        "&:hover": {
                          backgroundColor: "rgba(212, 14, 14, 0.1)",
                        },
                      }}
                      aria-haspopup="true"
                      aria-controls="brands-menu"
                    >
                      {item.name}
                    </ListItem>
                    <Menu
                      id="brands-menu"
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      MenuListProps={{
                        sx: {
                          minWidth: 200,
                          boxShadow: 3,
                          borderRadius: 2,
                          py: 1,
                          backgroundColor: 'background.paper',
                        },
                      }}
                      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                      transformOrigin={{ vertical: "top", horizontal: "left" }}
                      disableAutoFocusItem
                    >
                      {brands.map((brand, idx) => (
                        <MenuItem
                          key={brand.id}
                          onClick={() => handleBrandClick(brand.name)}
                          sx={{
                            fontWeight: 500,
                            color: 'text.primary',
                            borderRadius: 1,
                            mx: 1,
                            my: 0.5,
                            transition: 'background 0.2s',
                            '&:hover': {
                              backgroundColor: 'primary.light',
                              color: 'primary.main',
                            },
                            boxShadow: 0,
                          }}
                          divider={idx !== brands.length - 1}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <span style={{ fontSize: 18 }}>🏷️</span>
                            {brand.name}
                          </Box>
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                );
              }
              return (
                <ListItem
                  key={item.path}
                  component={Link}
                  to={item.path}
                  sx={{
                    borderRadius: 1,
                    color: "white",
                    cursor: "pointer",
                    padding: "8px 16px",
                    "&:hover": {
                      backgroundColor: "rgba(212, 14, 14, 0.1)",
                    },
                  }}
                >
                  {item.name}
                </ListItem>
              );
            })}
          </List>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            size="large"
            aria-label="cuenta del usuario"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            sx={{
              transition: "transform 0.2s",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            <CartIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
