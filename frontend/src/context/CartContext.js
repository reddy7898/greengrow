import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({}); 
  // example: { 1: 2, 5: 1 }

  const addToCart = (id) => {
    setCartItems(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const removeFromCart = (id) => {
    setCartItems(prev => {
      const updated = { ...prev };
      if (!updated[id]) return updated;

      if (updated[id] === 1) {
        delete updated[id];
      } else {
        updated[id] -= 1;
      }
      return updated;
    });
  };

  const cartCount = Object.values(cartItems).reduce(
    (sum, qty) => sum + qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        removeFromCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
