"use client";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { CartItem } from "../../types/interfaces";

interface CartContextType {
  cart: CartItem[];
  addToCart: (cartItem: CartItem) => void;
  removeFromCart: (variationId: string) => void;
  clearCart: () => void;
}

const CART_STORAGE_KEY = "cart";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const addToCart = (newCartItem: CartItem) => {
    const isDuplicate = cart.some(
      (cartItem) => cartItem.variationId === newCartItem.variationId
    );

    if (isDuplicate) {
      const updatedCart = cart.map((cartItem) => {
        if (cartItem.variationId === newCartItem.variationId) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + newCartItem.quantity,
          };
        }
        return cartItem;
      });
      setCart(updatedCart);
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
    } else {
      const updatedCart = [...cart, newCartItem];
      setCart(updatedCart);
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
    }
  };

  const removeFromCart = (variationId: string) => {
    const updatedCart = cart.filter(
      (cartItem) => cartItem.variationId !== variationId
    );
    setCart(updatedCart);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};
