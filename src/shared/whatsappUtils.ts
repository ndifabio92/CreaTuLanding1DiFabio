// utils/whatsappUtils.ts

import { env } from "../config/env";
import { WhatsAppMessage } from "../types/app/whatsAppMessage";
import { Product } from "../types/products/products";

/**
 * Abre WhatsApp con un mensaje predefinido
 * @param phoneNumber - Número de teléfono (con código de país, sin +)
 * @param message - Mensaje a enviar
 * @param useWeb - Si usar WhatsApp Web (true) o la app móvil (false)
 */
export const sendWhatsAppMessage = (
  phoneNumber: string,
  message: string,
  useWeb: boolean = true
) => {
  // Limpiar el número de teléfono (quitar espacios, guiones, etc.)
  const cleanNumber = phoneNumber.replace(/[^\d]/g, '');
  
  // Codificar el mensaje para URL
  const encodedMessage = encodeURIComponent(message);
  
  // Crear la URL
  const baseUrl = useWeb ? 'https://web.whatsapp.com' : 'https://wa.me';
  const url = `${baseUrl}/${cleanNumber}?text=${encodedMessage}`;
  
  // Abrir en nueva ventana/pestaña
  window.open(url, '_blank');
};

/**
 * Abre WhatsApp sin número específico (solo con mensaje)
 * @param message - Mensaje a enviar
 */
export const openWhatsAppWithMessage = (message: string) => {
  const { VITE_WHATSAPP_PHONE } = env;
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${VITE_WHATSAPP_PHONE}?text=${encodedMessage}`;
  window.open(url, '_blank');
};

/**
 * Genera enlace de WhatsApp sin abrirlo
 * @param phoneNumber - Número de teléfono
 * @param message - Mensaje
 * @param useWeb - Si usar WhatsApp Web
 * @returns URL generada
 */
export const generateWhatsAppLink = (
  phoneNumber: string,
  message: string,
  useWeb: boolean = false
): string => {
  const cleanNumber = phoneNumber.replace(/[^\d]/g, '');
  const encodedMessage = encodeURIComponent(message);
  const baseUrl = useWeb ? 'https://web.whatsapp.com' : 'https://wa.me';
  return `${baseUrl}/${cleanNumber}?text=${encodedMessage}`;
};

// Definimos un tipo para los productos del carrito con cantidad
export interface CartProductWithQuantity {
  product: Product;
  quantity: number;
}

export const generateWhatsAppMessage = (
  values: Omit<WhatsAppMessage, "products">,
  products: CartProductWithQuantity[]
): string => {
  const userInfo = `👤 *Nombre:* ${values.name} ${values.lastName}\n📧 *Email:* ${values.email}\n📱 *Teléfono:* ${values.phoneNumber}`;
  const productList = products.map(
    (p, i) => `*${i + 1}.* ${p.product.name}  x${p.quantity}  -  $${p.product.price * p.quantity}`
  ).join('\n');
  const total = products.reduce((acc, p) => acc + p.product.price * p.quantity, 0);
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