import {
  Popover,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useCart } from "../../context/CartContext";
import { mockProducts } from "../../data/mocks";
import { useNavigate } from "react-router";

interface CartPopoverProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

const CartPopover = ({ anchorEl, onClose }: CartPopoverProps) => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(price);
  };

  const getCartItemDetails = (itemId: number) => {
    return mockProducts.find((p) => p.id === itemId);
  };

  // Calcular el total del carrito
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const productDetails = getCartItemDetails(item.id);
      if (!productDetails) return total;
      return total + productDetails.price * item.quantity;
    }, 0);
  };

  const handleCheckout = () => {
    onClose();
    navigate("/cart");
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      onClose={onClose}
      onClick={(e) => e.stopPropagation()}
    >
      <Box sx={{ p: 2, maxWidth: 400, minWidth: 350 }}>
        <Typography variant="h6" gutterBottom>
          Carrito de Compras
        </Typography>
        <List sx={{ maxHeight: 300, overflow: "auto" }}>
          {cartItems.map((item) => {
            const productDetails = getCartItemDetails(item.id);
            if (!productDetails) return null;

            return (
              <ListItem
                key={item.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                  gap: 1,
                  py: 2,
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar
                    src={productDetails.urls[0]}
                    alt={productDetails.name}
                    sx={{ width: 50, height: 50 }}
                  />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: "medium",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {productDetails.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {formatPrice(productDetails.price)}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 1,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography
                      sx={{
                        minWidth: "30px",
                        textAlign: "center",
                        fontWeight: "medium",
                      }}
                    >
                      {item.quantity}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                      {formatPrice(productDetails.price * item.quantity)}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Eliminar ${productDetails.name} del carrito`}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </ListItem>
            );
          })}
          {cartItems.length === 0 && (
            <ListItem>
              <ListItemText
                primary="El carrito está vacío"
                sx={{ textAlign: "center" }}
              />
            </ListItem>
          )}
        </List>

        {cartItems.length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mb: 2,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Total: {formatPrice(calculateTotal())}
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCheckout}
              fullWidth
              size="large"
            >
              Generar Orden
            </Button>
          </>
        )}
      </Box>
    </Popover>
  );
};

export default CartPopover;
