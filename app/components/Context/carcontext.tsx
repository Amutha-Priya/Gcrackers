"use client";

import { createContext, useContext, useState } from "react";
type CartItem = {
  name: string;
  image:string;
  qty: number;
  total: number;
};

// ✅ CartType is a mapping from product ID to CartItem
type CartType = {
  [key: number]: CartItem;
};
const CartContext = createContext<{
  cart: CartType;
  updateQty: (id: number, name: string, image: string, change: number, price: number) => void;
} | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  // const [cart, setCart] = useState<{ [key: number]: { qty: number; total: number } }>({});
    const [cart, setCart] = useState<CartType>({});

  const updateQty = (id: number,name: string, image: string, change: number, price: number) => {
    setCart((prev) => {
      const qty = (prev[id]?.qty || 0) + change;
      if (qty <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return {
        ...prev,
        [id]: {  name,image,qty, total: qty * price },
      };
    });
  };

  return (
    <CartContext.Provider value={{ cart, updateQty }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
