import React, { createContext, useState, useEffect } from "react";

// Opretter konteksten
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Mulige billetter
  const [tickets] = useState([
    { id: 1, name: "Regular Ticket", price: 799 },
    { id: 2, name: "VIP Ticket", price: 1299 },
  ]);

  const [cartItems, setCartItems] = useState([]);
  const [userInfos, setUserInfos] = useState([]);
  const [selectedCamping, setSelectedCamping] = useState(null);
  const [selectedOptional, setSelectedOptional] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [remainingTime, setRemainingTime] = useState(null);
  const [campingData, setCampingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reservationId, setReservationId] = useState(null);

  // Start timeren
  const startTimer = (seconds = 300) => setRemainingTime(seconds);

  // Nulstil timeren
  const resetTimer = () => setRemainingTime(null);

  // Timer-logik
  useEffect(() => {
    let timer;
    if (remainingTime > 0) {
      timer = setInterval(() => setRemainingTime((prev) => prev - 1), 1000);
    } else if (remainingTime === 0) {
      resetTimer();
    }
    return () => clearInterval(timer);
  }, [remainingTime]);

  // Fetch camping data
  useEffect(() => {
    const fetchCampingData = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://peach-polar-planarian.glitch.me/available-spots");
        if (!response.ok) throw new Error("Failed to fetch camping data");
        const data = await response.json();
        console.log("Camping Data:", data);
        setCampingData(data);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCampingData();
  }, []);

  // Reserver campingplads
  const reserveSpot = async (area, amount) => {
    try {
      const response = await fetch("https://peach-polar-planarian.glitch.me/reserve-spot", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ area, amount }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error("Failed to reserve spot");

      setReservationId(data.id);
      startTimer();
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    }
  };

  // Bekræft reservation
  const confirmReservation = async () => {
    try {
      const response = await fetch("https://peach-polar-planarian.glitch.me/fullfill-reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: reservationId }),
      });

      if (!response.ok) throw new Error("Failed to confirm reservation");

      resetTimer();
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    }
  };

  // Opdater brugeroplysninger baseret på cartItems
  useEffect(() => {
    setUserInfos(
      cartItems.flatMap((item) =>
        Array.from({ length: item.quantity }).map(() => ({
          name: "",
          email: "",
          birthday: "",
          ticketType: item.name,
        }))
      )
    );
  }, [cartItems]);

  // Beregn totalpris
  useEffect(() => {
    const ticketTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const optionalTotal = selectedOptional.reduce((total, item) => total + item.price * item.quantity, 0);
    setCartTotal(ticketTotal + optionalTotal + 99); // Booking fee
  }, [cartItems, selectedOptional]);

  // Tilføj vare til kurven
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

  // Fjern vare fra kurven
  const removeItemFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  // Opdater antallet af en vare
  const updateItemQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeItemFromCart(productId);
    } else {
      setCartItems((prevItems) => prevItems.map((item) => (item.id === productId ? { ...item, quantity } : item)));
    }
  };

  return (
    <CartContext.Provider
      value={{
        tickets,
        cartItems,
        setCartItems,
        userInfos,
        setUserInfos,
        selectedCamping,
        setSelectedCamping,
        selectedOptional,
        setSelectedOptional,
        cartTotal,
        campingData,
        loading,
        error,
        reservationId,
        remainingTime,
        formatTime: (time) => `${String(Math.floor(time / 60)).padStart(2, "0")}:${String(time % 60).padStart(2, "0")}`,
        resetTimer,
        startTimer,
        reserveSpot,
        confirmReservation,
        addToCart,
        removeItemFromCart,
        updateItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
