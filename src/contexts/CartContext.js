"use client";

import React, { createContext, useState } from "react";

// opretter en kontekst, som kan bruges til at dele data mellem komponenter
export const CartContext = createContext();
// cartprovider er vores wrapper, som leverer data og funktioner til vores side
export const CartProvider = ({ children }) => {
  // data for vores tilgængelige billetter
  const initialTickets = [
    { id: 1, name: "Regular Ticket", price: 799 },
    { id: 2, name: "VIP Ticket", price: 1299 },
  ];
  // tilstand for billetter, som bruges i hele applikationen
  const [tickets] = useState(initialTickets);
  // vores tilstand for kurven, som gør vi kan se tilføjede billetter
  const [cartItems, setCartItems] = useState([]);
  // her er funktionen til at tilføje til kurven
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // tjekker om produktet allerede er i kurven
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };
  // funktion til at opdatere antal
  const updateItemQuantity = (id, quantity) => {
    setCartItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item)));
  };
  // og vores funktion til at clear kurven
  const clearCart = () => {
    setCartItems([]);
  };
  // beregnelse af kurven
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  // her gør vi det tilgængeligt for hele siden
  return (
    <CartContext.Provider
      value={{
        tickets,
        cartItems,
        addToCart,
        updateItemQuantity,
        clearCart,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
