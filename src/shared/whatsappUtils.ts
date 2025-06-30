import { env } from "../config/env";
import {
  CartProductWithQuantity,
  WhatsAppMessage,
} from "../types/externals/whatsAppMessage";
import { CartItem } from "../context/CartContext";

export const sendWhatsAppMessage = (
  phoneNumber: string,
  message: string,
  useWeb: boolean = true
) => {
  // Limpiar el número de teléfono (quitar espacios, guiones, etc.)
  const cleanNumber = phoneNumber.replace(/[^\d]/g, "");

  // Codificar el mensaje para URL
  const encodedMessage = encodeURIComponent(message);

  const baseUrl = useWeb ? "https://web.whatsapp.com" : "https://wa.me";
  const url = `${baseUrl}/${cleanNumber}?text=${encodedMessage}`;

  window.open(url, "_blank");
};

export const openWhatsAppWithMessage = (message: string) => {
  const { VITE_WHATSAPP_PHONE } = env;
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${VITE_WHATSAPP_PHONE}?text=${encodedMessage}`;
  window.open(url, "_blank");
};

export const generateWhatsAppLink = (
  phoneNumber: string,
  message: string,
  useWeb: boolean = false
): string => {
  const cleanNumber = phoneNumber.replace(/[^\d]/g, "");
  const encodedMessage = encodeURIComponent(message);
  const baseUrl = useWeb ? "https://web.whatsapp.com" : "https://wa.me";
  return `${baseUrl}/${cleanNumber}?text=${encodedMessage}`;
};

export const generateWhatsAppMessage = (
  values: Omit<WhatsAppMessage, "products">,
  products: CartProductWithQuantity[],
  cartItems: CartItem[]
): string => {
  const userInfo = `👤 *Nombre:* ${values.name} ${values.lastName}\n📧 *Email:* ${values.email}\n📱 *Teléfono:* ${values.phoneNumber}`;

  const productList = products
    .map((p, i) => {
      const cartItem = cartItems.find((item) => item.id === p.product.id);
      const sizeInfo = cartItem?.selectedSize
        ? ` | Size: ${cartItem.selectedSize}`
        : "";
      const colorInfo = cartItem?.selectedColor
        ? ` | Color: ${cartItem.selectedColor}`
        : "";
      const options = sizeInfo + colorInfo;

      return `*${i + 1}.* ${p.product.name}${options}  x${p.quantity}  -  $${p.product.price * p.quantity}`;
    })
    .join("\n");

  const total = products.reduce(
    (acc, p) => acc + p.product.price * p.quantity,
    0
  );
  return (
    `==============================\n` +
    `🛒 *Pedido de productos* 🛒\n` +
    `==============================\n` +
    `${userInfo}\n` +
    `------------------------------\n` +
    `*Productos:*\n${productList}\n` +
    `------------------------------\n` +
    `*Total:* $${total}\n` +
    `==============================`
  );
};
