import { useState, type FC, useEffect } from "react";
import {
  AppBar,
  Box,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import type { AppHeaderProps } from "../types/ui/header";
import { routes } from "../routes/routes";
import { Link, useNavigate } from "react-router";
import CartIcon from "../components/cart/CartIcon";
import { getAllBrandsFromFirestore } from "../services/brands.service";
import { Brands } from "../types/brands";
import MenuDropdown from "../components/menu/MenuDropdown";

const Header: FC<AppHeaderProps> = ({ handleDrawerToggle }) => {
  const theme = useTheme();
  const [brands, setBrands] = useState<Brands[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllBrandsFromFirestore().then((data: Brands[]) => {
      setBrands(data.filter((b) => b.active));
    });
  }, []);

  const handleBrandClick = (brandName: string) => {
    navigate(`/brands?brand=${encodeURIComponent(brandName)}`);
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
                  <MenuDropdown
                    key={item.path}
                    label={item.name}
                    items={brands.map(b => ({ id: b.id, name: b.name }))}
                    basePath={item.path}
                    onItemClick={(brand) => handleBrandClick(brand.name)}
                  />
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
