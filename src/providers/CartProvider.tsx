import { useEffect, useState } from "react";
import { useToast } from "../hooks/useToast";
import { CartContext, CartItem } from "../context/CartContext";

const createCartItemId = (
  productId: string,
  selectedSize?: string,
  selectedColor?: string
): string => {
  const size = selectedSize || "default";
  const color = selectedColor || "default";
  return `${productId}_${size}_${color}`;
};

const extractProductId = (cartItemId: string): string => {
  return cartItemId.split("_")[0];
};

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
      const cartItemId = createCartItemId(
        productId,
        selectedSize,
        selectedColor
      );
      const existingItem = prevItems.find((item) => item.id === cartItemId);

      if (existingItem) {
        sucessToast("Item Agregado al carrito");
        return prevItems.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      sucessToast("Item Agregado al carrito");
      return [
        ...prevItems,
        {
          id: cartItemId,
          quantity,
          selectedSize,
          selectedColor,
          productId,
        },
      ];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== cartItemId)
    );
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === cartItemId ? { ...item, quantity } : item
      )
    );
  };

  const updateProductOptions = (
    cartItemId: string,
    selectedSize?: string,
    selectedColor?: string
  ) => {
    setCartItems((prevItems) => {
      const item = prevItems.find((item) => item.id === cartItemId);
      if (!item) return prevItems;

      const newCartItemId = createCartItemId(
        item.productId || extractProductId(cartItemId),
        selectedSize,
        selectedColor
      );

      if (newCartItemId !== cartItemId) {
        const filteredItems = prevItems.filter(
          (item) => item.id !== cartItemId
        );
        return [
          ...filteredItems,
          {
            id: newCartItemId,
            quantity: item.quantity,
            selectedSize,
            selectedColor,
            productId: item.productId || extractProductId(cartItemId),
          },
        ];
      }

      return prevItems.map((item) =>
        item.id === cartItemId ? { ...item, selectedSize, selectedColor } : item
      );
    });
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
