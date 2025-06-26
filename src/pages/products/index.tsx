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
  useTheme,
  useMediaQuery,
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
          <Stack direction="row" spacing={4} sx={{ flexDirection: { xs: "column", sm: "row" } }}>
            <img
              src={product?.urls[0]}
              alt={product?.name}
              style={{ width: "300px", height: "300px", objectFit: "cover", margin: isMobile ? "0 auto 24px auto" : undefined }}
            />
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4">{product?.name}</Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {product?.description}
              </Typography>
              <Typography variant="h6" sx={{ mt: 2 }}>
                {product && formatPrice(product.price)}
              </Typography>
              {isMobile ? (
                <Stack direction="row" spacing={2} sx={{ mt: 2, width: '100%' }}>
                  <IconButton
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    <RemoveIcon />
                  </IconButton>
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
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<ShoppingCartIcon />}
                      sx={{ minWidth: 48, px: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                      onClick={() => product?.id && handleAddToCart(product.id)}
                      disabled={!product}
                    >
                      {/* Solo ícono en mobile */}
                    </Button>
                  </Box>
                </Stack>
              ) : (
                <>
                  <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                    <IconButton
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                    >
                      <RemoveIcon />
                    </IconButton>
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
                  <Box sx={{}}>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<ShoppingCartIcon />}
                      sx={{ mt: 2 }}
                      onClick={() => product?.id && handleAddToCart(product.id)}
                      disabled={!product}
                    >
                      ADD TO CART
                    </Button>
                  </Box>
                </>
              )}
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
