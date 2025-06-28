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
import { Link, useNavigate } from "react-router";
import { headerStyles } from "./header.styles";
import { AppHeaderProps } from "../../types/ui/header";
import { Brands } from "../../types/brands";
import { getAllBrandsFromFirestore } from "../../services/brands.service";
import { routes } from "../../routes/routes";
import MenuDropdown from "../../components/menu/MenuDropdown";
import CartIcon from "../../components/cart/CartIcon";

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
    <AppBar position="fixed" elevation={0} sx={headerStyles.appBar(theme)}>
      <Toolbar sx={headerStyles.toolbar}>
        <Box sx={headerStyles.logoBox}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={headerStyles.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={headerStyles.logo}>
            Nando CWS
          </Typography>
        </Box>

        <Box sx={headerStyles.navigationBox}>
          <List sx={headerStyles.navigationList}>
            {routes.map((item) => {
              if (item.name === "Marcas") {
                return (
                  <MenuDropdown
                    key={item.path}
                    label={item.name}
                    items={brands.map((b) => ({ id: b.id, name: b.name }))}
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
                  sx={headerStyles.navigationItem}
                >
                  {item.name}
                </ListItem>
              );
            })}
          </List>
        </Box>

        <Box sx={headerStyles.cartBox}>
          <IconButton
            size="large"
            aria-label="cuenta del usuario"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            sx={headerStyles.cartButton}
          >
            <CartIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
