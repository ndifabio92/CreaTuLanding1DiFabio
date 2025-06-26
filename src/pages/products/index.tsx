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
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useEffect, useState } from "react";
import { useCart } from "../../context/hooks/useCart";
import { Product } from "../../types/products/products";
import { getProductByIdFromFirestore } from "../../services/products.services";
import LoadingScreen from "../../components/loadingScreen/LoadingScreen";
import { formatPrice } from "../../shared/cartUtils";

const Products = () => {
  const { addToCart } = useCart();
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>({} as Product);
  const [loading, setLoading] = useState(true);
  const [_error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        if (id) {
          const data = await getProductByIdFromFirestore(id);
          setProduct(data);
        } else {
          setProduct(null);
        }
        setLoading(false);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Error al cargar los productos");
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  if (!product && !loading) {
    return (
      <Container>
        <Typography variant="h4" sx={{ mt: 4 }}>
          Producto no encontrado
        </Typography>
      </Container>
    );
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = (productId: string) => {
    addToCart(productId, quantity);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {loading ? (
        <LoadingScreen />
      ) : (
        <Paper elevation={3} sx={{ p: 4 }}>
          <Stack direction="row" spacing={4}>
            <img
              src={product?.urls[0]}
              alt={product?.name}
              style={{ width: "300px", height: "300px", objectFit: "cover" }}
            />
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4">{product?.name}</Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {product?.description}
              </Typography>
              <Typography variant="h6" sx={{ mt: 2 }}>
                {product && formatPrice(product.price)}
              </Typography>
              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <IconButton
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <RemoveIcon />
                </IconButton>
                {/* <Chip label={quantity} /> */}
                <Typography
                  sx={{
                    minWidth: "30px",
                    textAlign: "center",
                    fontWeight: "medium",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {quantity}
                </Typography>
                <IconButton onClick={() => handleQuantityChange(quantity + 1)}>
                  <AddIcon />
                </IconButton>
              </Stack>
              <Button
                variant="contained"
                color="primary"
                startIcon={<ShoppingCartIcon />}
                sx={{ mt: 2 }}
                onClick={() => product?.id && handleAddToCart(product.id)}
                disabled={!product}
              >
                Agregar al carrito
              </Button>
            </Box>
          </Stack>
          <Divider sx={{ my: 4 }} />
          <Typography variant="h6">Categorías</Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
            {product?.category.map((cat) => <Chip key={cat} label={cat} />)}
          </Stack>
        </Paper>
      )}
    </Container>
  );
};

export default Products;
