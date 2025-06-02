import {
  Container,
  Typography,
  Box,
  Paper,
  Chip,
  Divider,
  Stack,
  Button,
  IconButton,
} from "@mui/material";
import { useParams } from "react-router";
import { mockProducts } from "../../data/mocks";
import { useCart } from "../../context/CartContext";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";

const Products = () => {
  const { id } = useParams<{ id: string }>();
  const product = mockProducts.find((x) => x.id === Number(id));
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <Container>
        <Typography variant="h4" sx={{ mt: 4 }}>
          Producto no encontrado
        </Typography>
      </Container>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(price);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
          <Box sx={{ flex: 1 }}>
            <Box
              component="img"
              src={product.urls[0]}
              alt={product.name}
              sx={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                borderRadius: 1,
              }}
            />
          </Box>

          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom>
              {product.name}
            </Typography>

            <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
              {formatPrice(product.price)}
            </Typography>

            <Box sx={{ mb: 3 }}>
              {product.category.map((cat, index) => (
                <Chip
                  key={index}
                  label={cat}
                  size="small"
                  sx={{ mr: 1, mb: 1 }}
                />
              ))}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="body1" sx={{ whiteSpace: "pre-line", mb: 3 }}>
              {product.description}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <IconButton
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ mx: 2 }}>{quantity}</Typography>
              <IconButton onClick={() => handleQuantityChange(quantity + 1)}>
                <AddIcon />
              </IconButton>
            </Box>

            <Box sx={{ mt: "auto" }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<ShoppingCartIcon />}
                onClick={handleAddToCart}
                fullWidth
              >
                Agregar al Carrito
              </Button>
            </Box>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Products;
