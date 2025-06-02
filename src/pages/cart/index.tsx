import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useCart } from "../../context/CartContext";
import { mockProducts } from "../../data/mocks";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(price);
  };

  const getCartItemDetails = (itemId: number) => {
    return mockProducts.find((p) => p.id === itemId);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const product = getCartItemDetails(item.id);
      return total + (product?.price || 0) * item.quantity;
    }, 0);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Carrito de Compras
      </Typography>
      <List>
        {cartItems.map((item) => {
          const productDetails = getCartItemDetails(item.id);
          if (!productDetails) return null;

          return (
            <ListItem
              key={item.id}
              secondaryAction={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <IconButton
                    size="small"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography>{item.quantity}</Typography>
                  <IconButton
                    size="small"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <AddIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Eliminar ${productDetails.name} del carrito`}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              }
            >
              <ListItemAvatar>
                <Avatar
                  src={productDetails.urls[0]}
                  alt={productDetails.name}
                  sx={{ width: 80, height: 80, mr: 2 }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={productDetails.name}
                secondary={
                  <Typography component="span" variant="body2">
                    Precio: {formatPrice(productDetails.price * item.quantity)}
                  </Typography>
                }
              />
            </ListItem>
          );
        })}
        {cartItems.length === 0 && (
          <ListItem>
            <ListItemText primary="El carrito está vacío" />
          </ListItem>
        )}
      </List>
      {cartItems.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Total: {formatPrice(calculateTotal())}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{ mt: 2 }}
          >
            Enviar Orden
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Cart;
