import { Badge, Box } from "@mui/material";
import { ShoppingCartOutlined } from "@mui/icons-material";
import { useState } from "react";
import { useCart } from "../../hooks/useCart";
import Cart from "../../pages/cart";

const CartIcon = () => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "inherit",
          padding: "8px",
          borderRadius: "50%",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
        }}
        onClick={handleClick}
      >
        <Badge badgeContent={totalItems} color="error">
          <ShoppingCartOutlined />
        </Badge>
      </Box>
      <Cart 
        isPopover={true}
        anchorEl={anchorEl}
        onClose={handleClose}
      />
    </>
  );
};

export default CartIcon;
