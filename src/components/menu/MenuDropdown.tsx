import { FC, useState, useRef } from "react";
import {
  Box,
  ListItem,
  Menu,
  MenuItem,
  List,
  ListItemText,
} from "@mui/material";
import { Link, useNavigate, useSearchParams } from "react-router";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { menuDropdownStyles } from "./menuDropdown.styles";

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

  const activeValue = searchParams.get(
    typeof paramKey === "string" && paramKey.length > 0
      ? paramKey
      : label.toLowerCase()
  );

  const handleOpenMenu = () => setAnchorEl(ref.current);
  const handleClose = () => setAnchorEl(null);

  const handleSidebarToggle = () => setOpen && setOpen(!open);

  const handleItemClick = (item: MenuDropdownItem) => {
    if (onItemClick) {
      onItemClick(item);
    } else {
      navigate(
        `${basePath}?${label.toLowerCase()}=${encodeURIComponent(item.name)}`
      );
      if (handleDrawerToggle) handleDrawerToggle();
      handleClose();
    }
  };

  if (isSidebar) {
    return (
      <>
        <ListItem
          onClick={handleSidebarToggle}
          sx={menuDropdownStyles.sidebarListItem(isActive)}
        >
          <ListItemText primary={label} />
          {open ? (
            <ExpandLessIcon sx={menuDropdownStyles.expandIcon} />
          ) : (
            <ExpandMoreIcon sx={menuDropdownStyles.expandIcon} />
          )}
        </ListItem>
        {open && (
          <List component="div" disablePadding sx={menuDropdownStyles.subList}>
            {items.map((item) => (
              <ListItem
                key={item.id}
                onClick={() => handleItemClick(item)}
                sx={menuDropdownStyles.subListItem(
                  Boolean(
                    activeValue &&
                      activeValue.toLowerCase() === item.name.toLowerCase()
                  )
                )}
              >
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </List>
        )}
      </>
    );
  }

  return (
    <Box
      sx={menuDropdownStyles.webBox}
      onMouseEnter={handleOpenMenu}
      onMouseLeave={handleClose}
      ref={ref}
    >
      <ListItem
        component={Link}
        to={basePath}
        sx={menuDropdownStyles.webListItem}
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
            sx: menuDropdownStyles.menu,
          },
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        disableAutoFocusItem
      >
        {items.map((item, idx) => (
          <MenuItem
            key={item.id}
            onClick={() => handleItemClick(item)}
            sx={menuDropdownStyles.menuItem(idx, items.length)}
            divider={idx !== items.length - 1}
          >
            <Box sx={menuDropdownStyles.menuItemBox}>
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
