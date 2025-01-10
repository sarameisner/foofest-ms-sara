import React, { createContext, useState, useEffect } from "react";
import { fetchCampingData, reserveSpot, confirmReservation } from "@/lib/api"; // importer centraliserede API-kald

// opretter konteksten
export const CartContext = createContext();

// CartProvider - her opretter vi den globale state
export const CartProvider = ({ children }) => {
  // States
  const [tickets] = useState([
    { id: 1, name: "Regular Ticket", price: 799 },
    { id: 2, name: "VIP Ticket", price: 1299 },
  ]);
  const [cartItems, setCartItems] = useState([]); // valgte varer i kurven
  const [userInfos, setUserInfos] = useState([]); // brugeroplysninger
  const [selectedCamping, setSelectedCamping] = useState(null); // valgt camping
  const [selectedOptional, setSelectedOptional] = useState([]); // valg af ekstraudstyr
  const [cartTotal, setCartTotal] = useState(0); // totalpris
  const [remainingTime, setRemainingTime] = useState(null); // tid tilbage på reservationen
  const [campingData, setCampingData] = useState([]); // campingområder
  const [loading, setLoading] = useState(true); // indlæsningsstatus
  const [error, setError] = useState(null); // fejlmeddelelser
  const [reservationId, setReservationId] = useState(null); // reservations ID

  // start timeren
  const startTimer = (seconds = 300) => setRemainingTime(seconds);

  // nulstil timeren
  const resetTimer = () => setRemainingTime(null);

  // funktion til at rydde hele kurven
  const clearCart = () => {
    setCartItems([]);
    setUserInfos([]);
    setSelectedCamping(null);
    setSelectedOptional([]);
    setCartTotal(0);
    setReservationId(null);
  };

  // timer-logik: håndterer nedtælling og rydder kurven, hvis tiden udløber
  useEffect(() => {
    let timer;
    if (remainingTime > 0) {
      timer = setInterval(() => setRemainingTime((prev) => prev - 1), 1000);
    } else if (remainingTime === 0) {
      clearCart();
      resetTimer();
    }
    return () => clearInterval(timer); // rydder intervallet ved unmount
  }, [remainingTime]);

  // henter campingdata fra API via den nye fetchCampingData-funktion
  useEffect(() => {
    const loadCampingData = async () => {
      try {
        setLoading(true);
        const data = await fetchCampingData(); // centraliseret API-kald
        setCampingData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // uanset hvad, stopper vi indlæsning
      }
    };

    loadCampingData();
  }, []);

  // reserverer campingplads via API
  const reserveSpotHandler = async (area, amount) => {
    try {
      const data = await reserveSpot(area, amount); // centraliseret API-kald
      setReservationId(data.id); // gem reservations ID
      startTimer(); // start reservationstimer
    } catch (error) {
      setError(error.message);
    }
  };

  // bekræft reservation via API
  const confirmReservationHandler = async () => {
    try {
      await confirmReservation(reservationId); // centraliseret API-kald
      resetTimer(); // nulstil timeren
    } catch (error) {
      setError(error.message);
    }
  };

  // opdater brugeroplysninger baseret på cartItems
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

  // funktion til at opdatere en specifik brugers info
  const updateUserInfo = (index, updatedInfo) => {
    setUserInfos((prevUserInfos) => {
      const newUserInfos = [...prevUserInfos];
      newUserInfos[index] = {
        ...newUserInfos[index],
        ...updatedInfo,
      };
      return newUserInfos;
    });
  };

  // beregn totalpris for kurven
  useEffect(() => {
    const ticketTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const optionalTotal = selectedOptional.reduce((total, item) => total + item.price * item.quantity, 0);
    setCartTotal(ticketTotal + optionalTotal + 99); // Inkluderer bookinggebyr
  }, [cartItems, selectedOptional]);

  // tilføj vare til kurven
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        // opdaterer antallet, hvis varen allerede er i kurven
        return prevItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + product.quantity } : item));
      } else {
        // tilføjer varen til kurven med det valgte antal
        return [...prevItems, { ...product }];
      }
    });
  };

  // fjern vare fra kurven
  const removeItemFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  // opdaterer antallet af en vare i kurven
  const updateItemQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeItemFromCart(productId);
    } else {
      setCartItems((prevItems) => prevItems.map((item) => (item.id === productId ? { ...item, quantity } : item)));
    }
  };

  // Returner hele konteksten, inklusive opdaterede handler-funktioner
  return (
    <CartContext.Provider
      value={{
        tickets,
        clearCart,
        cartItems,
        setCartTotal,
        setCartItems,
        userInfos,
        setUserInfos,
        updateUserInfo,
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
        reserveSpot: reserveSpotHandler,
        confirmReservation: confirmReservationHandler,
        addToCart,
        removeItemFromCart,
        updateItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// i denne fil bruger vi nu centraliserede API-kald fra lib/api.jsx for at holde koden mere struktureret og genanvendelig
// dette gør det nemmere at vedligeholde og giver en ensartet måde at håndtere API-fejl på
