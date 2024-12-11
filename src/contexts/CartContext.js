// til hooks og kontekst
"use client";

import React, { createContext, useState, useEffect } from "react";

// her opretter vi konteksten til delingen af vores data på tværs af komponenter
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // fjerner items fra kurven i basket
    const clearCart = () => {
        setCartItems([]);
      };
  // startdata af billetterne
  const [tickets] = useState([
    { id: 1, name: "Regular Ticket", price: 799 },
    { id: 2, name: "VIP Ticket", price: 1299 },
  ]);
  // gemmer de valgte billetter der er tilføjet til kurven
  const [cartItems, setCartItems] = useState([]);
  // gemmer camping valget
  const [selectedCamping, setSelectedCamping] = useState(null);
  // gemmer hvilket telt de skal sove i
  const [selectedOptional, setSelectedOptional] = useState([]);
  // gemmer brugeroplysninger
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    birthday: "",
  });
  // samlet pris
  const [cartTotal, setCartTotal] = useState(0);

  // tilføjer en vare til kurven
  // hvis varen allerede findes opdaterer vi antallet
  // eller tilføjer den som ny vare
  // @param {Object} product - er varen der skal tilføjes

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

  // konstanten for at opdatere antal
  const updateItemQuantity = (id, quantity) => {
    setCartItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item)));
  };

  // fjerner item  baseret på id
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // beregnelse af den totale pris
  const calculateCartTotal = () => {
    const ticketTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const optionalTotal = selectedOptional.reduce((total, item) => total + item.price * item.quantity, 0);
    setCartTotal(ticketTotal + optionalTotal);
  };

  // opdaterer totalpris når `cartItems` eller `selectedOptional` ændres
  useEffect(() => {
    calculateCartTotal();
  }, [cartItems, selectedOptional]);

  // her returnerer vi alt hvad der er nødvendigt for at have vores checkout flow
  return (
    <CartContext.Provider
      value={{
        tickets,
        cartItems,
        clearCart,
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
