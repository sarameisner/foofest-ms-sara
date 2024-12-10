// createContext er en funktion i React, der opretter en kontekst (altså en
// delt tilstand) som kan bruges til at dele data mellem komponenter, uden at man skal sende props igennem mange lag af komponenter manuelt.
// Når du bruger konteksten, skal man også definere en provider.
// En provider giver data til alle komponenter, der er “børn” af denne
// kontekst.

"use client";
import React, { createContext, useState } from "react";

// Opretter konteksten
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const initialTickets = [
    { id: 1, name: "Regular Ticket", price: 799 },
    { id: 2, name: "VIP Ticket", price: 1299 },
  ];

  const [tickets] = useState(initialTickets); // Tilføj billettyper her
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <CartContext.Provider
      value={{
        tickets,
        cartItems,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
