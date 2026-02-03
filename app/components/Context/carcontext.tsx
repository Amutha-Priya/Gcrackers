"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext<any>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<{ [key: number]: { qty: number; total: number } }>({});

  const updateQty = (id: number, change: number, price: number) => {
    setCart((prev) => {
      const qty = (prev[id]?.qty || 0) + change;
      if (qty <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return {
        ...prev,
        [id]: { qty, total: qty * price },
      };
    });
  };

  return (
    <CartContext.Provider value={{ cart, updateQty }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
