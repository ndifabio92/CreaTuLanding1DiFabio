import { FC, useState, useRef } from "react";
import { Box, ListItem, Menu, MenuItem, List, ListItemText } from "@mui/material";
import { Link, useNavigate, useSearchParams } from "react-router";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export interface MenuDropdownItem {
  id: string;
  name: string;
}

interface MenuDropdownProps {
  label: string;
  items: MenuDropdownItem[];
  basePath: string;
  onItemClick?: (item: MenuDropdownItem) => void;
  isSidebar?: boolean;
  isActive?: boolean;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  handleDrawerToggle?: () => void;
  paramKey?: string;
}

const MenuDropdown: FC<MenuDropdownProps> = ({
  label,
  items,
  basePath,
  onItemClick,
  isSidebar = false,
  isActive = false,
  open,
  setOpen,
  handleDrawerToggle,
  paramKey,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const ref = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Detectar opción activa por URL (solo para sidebar)
  const activeValue = searchParams.get((typeof paramKey === 'string' && paramKey.length > 0) ? paramKey : label.toLowerCase());

  // Web
  const handleOpenMenu = () => setAnchorEl(ref.current);
  const handleClose = () => setAnchorEl(null);

  // Sidebar
  const handleSidebarToggle = () => setOpen && setOpen(!open);

  const handleItemClick = (item: MenuDropdownItem) => {
    if (onItemClick) {
      onItemClick(item);
    } else {
      navigate(`${basePath}?${label.toLowerCase()}=${encodeURIComponent(item.name)}`);
      if (handleDrawerToggle) handleDrawerToggle();
      handleClose();
    }
  };

  if (isSidebar) {
    // Mobile
    return (
      <>
        <ListItem
          onClick={handleSidebarToggle}
          sx={{
            borderRadius: 1,
            color: isActive ? "primary.main" : "inherit",
            fontWeight: isActive ? 700 : 500,
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
          <ListItemText primary={label} />
          {/* Icono de despliegue a la derecha */}
          {open ? <ExpandLessIcon sx={{ ml: 1 }} /> : <ExpandMoreIcon sx={{ ml: 1 }} />}
        </ListItem>
        {open && (
          <List component="div" disablePadding sx={{ pl: 3 }}>
            {items.map((item) => (
              <ListItem
                key={item.id}
                onClick={() => handleItemClick(item)}
                sx={{
                  color: activeValue && activeValue.toLowerCase() === item.name.toLowerCase() ? 'primary.main' : 'text.secondary',
                  fontWeight: activeValue && activeValue.toLowerCase() === item.name.toLowerCase() ? 700 : 400,
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
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </List>
        )}
      </>
    );
  }

  // Web
  return (
    <Box
      sx={{ position: "relative" }}
      onMouseEnter={handleOpenMenu}
      onMouseLeave={handleClose}
      ref={ref}
    >
      <ListItem
        component={Link}
        to={basePath}
        sx={{
          borderRadius: 1,
          color: "white",
          cursor: "pointer",
          padding: "8px 16px",
          '&:hover': {
            backgroundColor: "rgba(212, 14, 14, 0.1)",
          },
        }}
        aria-haspopup="true"
        aria-controls={`${label}-menu`}
      >
        {label}
      </ListItem>
      <Menu
        id={`${label}-menu`}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        slotProps={{
          list: {
            sx: {
              minWidth: 200,
              boxShadow: 3,
              borderRadius: 2,
              py: 1,
              backgroundColor: 'background.paper',
            },
          }
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        disableAutoFocusItem
      >
        {items.map((item, idx) => (
          <MenuItem
            key={item.id}
            onClick={() => handleItemClick(item)}
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
            divider={idx !== items.length - 1}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <span style={{ fontSize: 18 }}>🏷️</span>
              {item.name}
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default MenuDropdown; 