import {
  Container,
  Typography,
  List,
  ListItem,
  Avatar,
  IconButton,
  Box,
  Button,
  Divider,
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
                  sx={{ width: 80, height: 80 }}
                />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: "medium",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
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
                  <Typography variant="body1" sx={{ fontWeight: "medium" }}>
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
            <Typography
              variant="body1"
              sx={{ textAlign: "center", width: "100%" }}
            >
              El carrito está vacío
            </Typography>
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
          <Button variant="contained" color="primary" fullWidth size="large">
            Generar Orden
          </Button>
        </>
      )}
    </Container>
  );
};

export default Cart;
