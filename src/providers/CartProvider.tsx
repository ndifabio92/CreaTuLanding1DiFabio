import { useEffect, useState } from "react";
import { useToast } from "../hooks/useToast";
import { CartContext, CartItem } from "../context/CartContext";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { success: sucessToast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (
    productId: string,
    quantity: number,
    selectedSize?: string,
    selectedColor?: string
  ) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === productId);
      if (existingItem) {
        sucessToast("Item Agregado al carrito");
        return prevItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      sucessToast("Item Agregado al carrito");
      return [
        ...prevItems,
        { id: productId, quantity, selectedSize, selectedColor },
      ];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const updateProductOptions = (
    productId: string,
    selectedSize?: string,
    selectedColor?: string
  ) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, selectedSize, selectedColor } : item
      )
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateProductOptions,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
