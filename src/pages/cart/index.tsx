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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate } from "react-router";
import { useCart } from "../../context/hooks/useCart";
import {
  getCartItemDetails,
  formatPrice,
  calculateCartTotal,
} from "../../shared/cartUtils";
import { Product } from "../../types/products/products";
import LoadingScreen from "../../components/loadingScreen/LoadingScreen";

interface CartProps {
  isPopover?: boolean;
  isCheckout?: boolean;
  anchorEl?: HTMLElement | null;
  onClose?: () => void;
  externalCartProducts?: Record<string, Product | null>;
  externalLoading?: boolean;
}

const Cart = ({
  isPopover = false,
  isCheckout = false,
  anchorEl,
  onClose,
  externalCartProducts,
  externalLoading,
}: CartProps) => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const [cartProducts, setCartProducts] = useState<
    Record<string, Product | null>
  >({});
  const [loading, setLoading] = useState(false);

  const open = isPopover ? Boolean(anchorEl) : false;

  // Usar los productos externos si están presentes
  const productsToUse = externalCartProducts ?? cartProducts;
  const loadingToUse = externalLoading ?? loading;

  useEffect(() => {
    if (externalCartProducts !== undefined) return; // Si recibo productos externos, no hago fetch
    const fetchProducts = async () => {
      setLoading(true);
      const productsMap: Record<string, Product | null> = { ...cartProducts };
      const missingIds = cartItems.filter((item) => !productsMap[item.id]);
      await Promise.all(
        missingIds.map(async (item) => {
          const product = await getCartItemDetails(item.id);
          productsMap[item.id] = product;
        })
      );

      Object.keys(productsMap).forEach((id) => {
        if (!cartItems.find((item) => item.id === id)) {
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
    <>
      <Typography variant="h5" gutterBottom>
        {isCheckout ? "Detalle de la Orden" : "Carrito de Compras"}
      </Typography>
      {loadingToUse ? (
        <LoadingScreen />
      ) : (
        <List sx={isPopover ? { maxHeight: 300, overflow: "auto" } : undefined}>
          {cartItems.map((item) => {
            const productDetails = productsToUse[item.id];
            if (!productDetails) return null;

            return (
              <ListItem
                key={item.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                  gap: 2,
                  py: 2,
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                {/* Información del producto */}
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                  <Avatar
                    src={
                      productDetails.urls && productDetails.urls.length > 0
                        ? productDetails.urls[0]
                        : ""
                    }
                    alt={productDetails.name || "Producto"}
                    sx={{
                      width: isPopover ? 50 : 80,
                      height: isPopover ? 50 : 80,
                      flexShrink: 0,
                    }}
                  />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      variant={isPopover ? "body2" : "body1"}
                      sx={{
                        fontWeight: "medium",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        textTransform: "capitalize",
                        mb: 0.5,
                      }}
                    >
                      {productDetails.name.toLowerCase()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {formatPrice(productDetails.price)}
                    </Typography>
                  </Box>
                </Box>

                {/* Controles distribuidos en toda la card */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    gap: 2,
                  }}
                >
                  {/* Controles de cantidad */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      flex: "0 0 auto",
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    <Typography
                      sx={{
                        minWidth: "40px",
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
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Box>

                  {/* Botón eliminar */}
                  <Box sx={{ flex: 1, textAlign: "center" }}>
                    <IconButton
                      size="small"
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Eliminar ${productDetails.name} del carrito`}
                      sx={{
                        color: "error.light",
                        backgroundColor: "error.50",
                        "&:hover": {
                          backgroundColor: "error.100",
                          color: "error.main",
                        },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>

                  {/* Precio total del item */}
                  <Box sx={{ flex: "0 0 auto" }}>
                    <Typography
                      variant={isPopover ? "body2" : "body1"}
                      sx={{
                        fontWeight: "bold",
                        color: "primary.main",
                        fontSize: isPopover ? "0.875rem" : "1.1rem",
                      }}
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
                  sx={{ textAlign: "center" }}
                />
              ) : (
                <Typography
                  variant="body1"
                  sx={{ textAlign: "center", width: "100%" }}
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
    </>
  );

  if (isPopover) {
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
          {renderCartContent()}
        </Box>
      </Popover>
    );
  }

  return <Container>{renderCartContent()}</Container>;
};

export default Cart;
