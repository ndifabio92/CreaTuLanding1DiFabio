import { getUsdToArsRate } from "../services/externals/exchangeRate.service";
import { getProductByIdFromFirestore } from "../services/products.service";
import { Product } from "../types/products";

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(price);
};

export const getCartItemDetails = async (
  itemId: string
): Promise<Product | null> => {
  return await getProductByIdFromFirestore(itemId);
};

export const calculateCartTotal = (
  cartItems: { id: string; quantity: number }[],
  cartProducts: Record<string, Product | null>
): number => {
  return cartItems.reduce((total, item) => {
    const product = cartProducts[item.id];
    if (!product) return total;
    return total + product.price * item.quantity;
  }, 0);
};

export const calculateCartTotalWithExchangeRate = async () => {
  return await getUsdToArsRate();
};
