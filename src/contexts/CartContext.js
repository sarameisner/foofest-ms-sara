"use client";

import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [tickets] = useState([
    { id: 1, name: "Regular Ticket", price: 799 },
    { id: 2, name: "VIP Ticket", price: 1299 },
  ]);
  const [cartItems, setCartItems] = useState([]);
  const [selectedCamping, setSelectedCamping] = useState(null);
  const [selectedOptional, setSelectedOptional] = useState([]);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    birthday: "",
  });
  const [cartTotal, setCartTotal] = useState(0);

  // Tilføj en vare til kurven
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

  // Opdater mængde af en vare i kurven
  const updateItemQuantity = (id, quantity) => {
    setCartItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item)));
  };

  // Fjern en vare fra kurven
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Beregn den samlede pris
  const calculateCartTotal = () => {
    const ticketTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const optionalTotal = selectedOptional.reduce((total, item) => total + item.price * item.quantity, 0);
    setCartTotal(ticketTotal + optionalTotal);
  };

  // Opdater totalpris, når `cartItems` eller `selectedOptional` ændres
  useEffect(() => {
    calculateCartTotal();
  }, [cartItems, selectedOptional]);

  return (
    <CartContext.Provider
      value={{
        tickets,
        cartItems,
        addToCart,
        updateItemQuantity,
        removeFromCart,
        selectedCamping,
        setSelectedCamping,
        selectedOptional,
        setSelectedOptional,
        userInfo,
        setUserInfo,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
