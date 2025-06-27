import { type FC } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import type { SidebarProps } from "../types/ui/sidebar";
import { routes } from "../routes/routes";

export const Sidebar: FC<SidebarProps> = ({
  mobileOpen,
  handleDrawerToggle,
  drawerWidth,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

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
          {routes.map((item) => (
            <ListItem
              key={item.path}
              component={Link}
              to={item.path}
              onClick={handleDrawerToggle}
              sx={{
                padding: "16px !important",
                borderRadius: 1,
                mb: 1,
                backgroundColor: isActive(item.path)
                  ? "rgba(0, 92, 120, 0.08)"
                  : "transparent",
                color: isActive(item.path) ? "primary.100" : "text.primary",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "rgba(0, 92, 120, 0.08)",
                },
              }}
            >
              <ListItemText
                primary={
                  <Typography
                    variant="body2"
                    fontWeight={isActive(item.path) ? 600 : 500}
                    color={isActive(item.path) ? "primary.100" : "inherit"}
                  >
                    {item.name}
                  </Typography>
                }
              />
            </ListItem>
          ))}
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
