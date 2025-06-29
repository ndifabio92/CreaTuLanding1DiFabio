import { getUsdToArsRate } from "../services/externals/exchangeRate.service";
import { getProductByIdFromFirestore } from "../services/products.service";
import { Product } from "../types/products";
import { CartItem } from "../context/CartContext";

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(price);
};

const extractProductId = (cartItemId: string): string => {
  return cartItemId.split("_")[0];
};

export const getCartItemDetails = async (
  itemId: string
): Promise<Product | null> => {
  const productId = itemId.includes("_") ? extractProductId(itemId) : itemId;
  return await getProductByIdFromFirestore(productId);
};

export const calculateCartTotal = (
  cartItems: CartItem[],
  cartProducts: Record<string, Product | null>
): number => {
  return cartItems.reduce((total, item) => {
    const productId = item.productId || extractProductId(item.id);
    const product = cartProducts[productId];
    if (!product) return total;
    return total + product.price * item.quantity;
  }, 0);
};

export const calculateCartTotalWithExchangeRate = async () => {
  return await getUsdToArsRate();
};
