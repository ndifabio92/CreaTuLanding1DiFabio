import { useEffect, useState } from "react";
import {
  Container,
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
  Dialog,
  useMediaQuery,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate } from "react-router";
import { useCart } from "../../hooks/useCart";
import {
  getCartItemDetails,
  formatPrice,
  calculateCartTotal,
} from "../../shared/cartUtils";
import { Product } from "../../types/products";
import LoadingScreen from "../../components/loadingScreen/LoadingScreen";
import BackBreadcrumb from "../../components/navigation/BackBreadcrumb";
import SelectedOptions from "../../components/product/selected/Selected";
import { cartStyles } from "./cart.styles";
import theme from "../../styles/theme";

interface CartProps {
  isPopover?: boolean;
  isCheckout?: boolean;
  anchorEl?: HTMLElement | null;
  onClose?: () => void;
  externalCartProducts?: Record<string, Product | null>;
  externalLoading?: boolean;
  exchangeRate?: number | null;
}

const Cart = ({
  isPopover = false,
  isCheckout = false,
  anchorEl,
  onClose,
  externalCartProducts,
  externalLoading,
  exchangeRate,
}: CartProps) => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const [cartProducts, setCartProducts] = useState<
    Record<string, Product | null>
  >({});
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const open = isPopover ? Boolean(anchorEl) : false;

  // evita consumir nuevamente la api
  const productsToUse = externalCartProducts ?? cartProducts;
  const loadingToUse = externalLoading ?? loading;

  useEffect(() => {
    if (externalCartProducts !== undefined) return; // si hay productos los usa
    const fetchProducts = async () => {
      setLoading(true);
      const productsMap: Record<string, Product | null> = { ...cartProducts };

      const extractProductId = (cartItemId: string): string => {
        return cartItemId.split("_")[0];
      };

      const missingIds = cartItems.filter((item) => {
        const productId = item.productId || extractProductId(item.id);
        return !productsMap[productId];
      });

      await Promise.all(
        missingIds.map(async (item) => {
          const product = await getCartItemDetails(item.id);
          const productId = item.productId || extractProductId(item.id);
          productsMap[productId] = product;
        })
      );

      Object.keys(productsMap).forEach((id) => {
        const hasItem = cartItems.some((item) => {
          const productId = item.productId || extractProductId(item.id);
          return productId === id;
        });
        if (!hasItem) {
          delete productsMap[id];
        }
      });

      setCartProducts(productsMap);
      setLoading(false);
    };
    if (cartItems.length > 0) {
      fetchProducts();
    } else {
      setCartProducts({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems, externalCartProducts]);

  const calculateTotal = () => calculateCartTotal(cartItems, productsToUse);

  const handleCheckout = () => {
    if (isPopover && onClose) {
      onClose();
      navigate("/cart");
    }

    if (!isPopover) {
      navigate("/checkout");
    }
  };

  const renderCartContent = () => (
    <Container sx={cartStyles.container(isPopover)}>
      {!isCheckout && !isPopover && <BackBreadcrumb />}
      <Box>
        <Typography variant="h5" gutterBottom>
          {isCheckout ? "Detalle de la Orden" : "Carrito de Compras"}
        </Typography>
        {loadingToUse ? (
          <LoadingScreen />
        ) : (
          <List sx={isPopover ? cartStyles.popoverList : undefined}>
            {cartItems.map((item) => {
              const extractProductId = (cartItemId: string): string => {
                return cartItemId.split("_")[0];
              };

              const productId = item.productId || extractProductId(item.id);
              const productDetails = productsToUse[productId];
              if (!productDetails) return null;

              return (
                <ListItem key={item.id} sx={cartStyles.listItem}>
                  <Box sx={cartStyles.productInfoBox}>
                    <Avatar
                      src={
                        productDetails.urls && productDetails.urls.length > 0
                          ? productDetails.urls[0]
                          : ""
                      }
                      alt={productDetails.name || "Producto"}
                      sx={cartStyles.avatar(isPopover)}
                    />
                    <Box sx={cartStyles.productDetailsBox}>
                      <Typography
                        variant={isPopover ? "body2" : "body1"}
                        sx={cartStyles.productName(isPopover)}
                      >
                        {productDetails.name.toLowerCase()}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {formatPrice(productDetails.price)}
                      </Typography>

                      <SelectedOptions
                        selectedSize={item.selectedSize}
                        selectedColor={item.selectedColor}
                        isPopover={isPopover}
                      />
                    </Box>
                  </Box>

                  <Box sx={cartStyles.controlsBox}>
                    <Box sx={cartStyles.quantityControlsBox}>
                      <IconButton
                        size="small"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography sx={cartStyles.quantityTypography}>
                        {item.quantity}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Box>

                    <Box sx={cartStyles.deleteButtonBox}>
                      <IconButton
                        size="small"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Eliminar ${productDetails.name} del carrito`}
                        sx={cartStyles.deleteButton}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>

                    <Box sx={cartStyles.priceBox}>
                      <Typography
                        variant={isPopover ? "body2" : "body1"}
                        sx={cartStyles.itemPrice(isPopover)}
                      >
                        {formatPrice(productDetails.price * item.quantity)}
                      </Typography>
                    </Box>
                  </Box>
                </ListItem>
              );
            })}
            {cartItems.length === 0 && (
              <ListItem>
                {isPopover ? (
                  <ListItemText
                    primary="El carrito está vacío"
                    sx={cartStyles.emptyCartText}
                  />
                ) : (
                  <Typography
                    variant="body1"
                    sx={cartStyles.emptyCartTypography}
                  >
                    El carrito está vacío
                  </Typography>
                )}
              </ListItem>
            )}
          </List>
        )}

        {cartItems.length > 0 && !loadingToUse && (
          <>
            <Divider sx={cartStyles.divider} />
            <Box sx={cartStyles.totalBox}>
              <Typography variant="h5" sx={cartStyles.totalTypography}>
                Total: {formatPrice(calculateTotal())}
              </Typography>
            </Box>
            {exchangeRate && (
              <Box sx={cartStyles.totalBox}>
                <Typography variant="h5" sx={cartStyles.totalTypography}>
                  Total ARS: {formatPrice(calculateTotal() * exchangeRate)}
                </Typography>
              </Box>
            )}
            {!isCheckout && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleCheckout}
                fullWidth
                size="large"
              >
                {isPopover ? "Generar Orden" : "Ir al Checkout"}
              </Button>
            )}
          </>
        )}
      </Box>
    </Container>
  );

  if (isPopover) {
    if (isMobile) {
      // Dialog centrado y responsive en mobile
      return (
        <Dialog
          open={open}
          onClose={onClose}
          fullWidth
          maxWidth="xs"
          slotProps={{
            paper: {
              sx: cartStyles.dialogPaper,
            },
          }}
        >
          <Box sx={cartStyles.dialogContent}>{renderCartContent()}</Box>
        </Dialog>
      );
    }
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
        slotProps={{
          paper: {
            sx: cartStyles.popoverPaper,
          },
        }}
      >
        <Box sx={cartStyles.popoverContent}>{renderCartContent()}</Box>
      </Popover>
    );
  }

  return <Container>{renderCartContent()}</Container>;
};

export default Cart;
