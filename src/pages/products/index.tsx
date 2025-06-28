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
import { useCart } from "../../hooks/useCart";
import { Product } from "../../types/products";
import { getProductByIdFromFirestore } from "../../services/products.service";
import LoadingScreen from "../../components/loadingScreen/LoadingScreen";
import { formatPrice } from "../../shared/cartUtils";
import BackBreadcrumb from "../../components/navigation/BackBreadcrumb";
import ImageCarousel from "../../components/carousel/ImageCarousel";
import { productsStyles } from "./products.styles";

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
        <Typography variant="h4" sx={productsStyles.notFoundTitle}>
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
    <Container maxWidth="lg" sx={productsStyles.container}>
      <BackBreadcrumb />
      {loading ? (
        <LoadingScreen />
      ) : (
        <Paper elevation={3} sx={productsStyles.paper}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={4}
            sx={productsStyles.mainStack}
          >
            <Box sx={productsStyles.imageBox}>
              <ImageCarousel
                images={product?.urls || []}
                altText={product?.name || "Product image"}
                maxWidth={300}
                aspectRatio="1/1"
                borderRadius={12}
              />
            </Box>
            <Box sx={productsStyles.contentBox}>
              <Typography variant="h5">
                {product?.name.toLowerCase()}
              </Typography>
              <Typography variant="body1" sx={productsStyles.description}>
                {product?.description}
              </Typography>
              <Typography variant="h6" sx={productsStyles.price}>
                {product && formatPrice(product.price)}
              </Typography>
              {isMobile ? (
                <Stack
                  direction="row"
                  spacing={2}
                  sx={productsStyles.mobileStack}
                >
                  <IconButton
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography sx={productsStyles.quantityTypography}>
                    {quantity}
                  </Typography>
                  <IconButton
                    onClick={() => handleQuantityChange(quantity + 1)}
                  >
                    <AddIcon />
                  </IconButton>
                  <Box sx={productsStyles.mobileButtonContainer}>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<ShoppingCartIcon />}
                      sx={productsStyles.mobileButton}
                      onClick={() => product?.id && handleAddToCart(product.id)}
                      disabled={!product}
                    >
                      Add
                    </Button>
                  </Box>
                </Stack>
              ) : (
                <>
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={productsStyles.desktopStack}
                  >
                    <IconButton
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography sx={productsStyles.quantityTypography}>
                      {quantity}
                    </Typography>
                    <IconButton
                      onClick={() => handleQuantityChange(quantity + 1)}
                    >
                      <AddIcon />
                    </IconButton>
                  </Stack>
                  <Box sx={productsStyles.desktopButtonContainer}>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<ShoppingCartIcon />}
                      sx={productsStyles.desktopButton}
                      onClick={() => product?.id && handleAddToCart(product.id)}
                      disabled={!product}
                    >
                      Add to cart
                    </Button>
                  </Box>
                </>
              )}
            </Box>
          </Stack>
          <Divider sx={productsStyles.divider} />
          <Typography variant="h6">Categorías</Typography>
          <Stack
            direction="row"
            spacing={1}
            sx={productsStyles.categoriesStack}
          >
            {product?.category.map((cat) => <Chip key={cat} label={cat} />)}
          </Stack>
        </Paper>
      )}
    </Container>
  );
};

export default Products;
