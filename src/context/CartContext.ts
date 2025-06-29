import { createContext } from "react";

interface CartItem {
  id: string;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  productId?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (
    productId: string,
    quantity: number,
    selectedSize?: string,
    selectedColor?: string
  ) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateProductOptions: (
    productId: string,
    selectedSize?: string,
    selectedColor?: string
  ) => void;
  getTotalItems: () => number;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export type { CartItem };
