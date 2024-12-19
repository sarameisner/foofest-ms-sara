import React, { createContext, useState, useEffect } from "react";

// opretter konteksten
export const CartContext = createContext();

// her laver vi cartprovider som laver den global state
export const CartProvider = ({ children }) => {
  // de mulige billetter
  const [tickets] = useState([
    { id: 1, name: "Regular Ticket", price: 799 },
    { id: 2, name: "VIP Ticket", price: 1299 },
  ]);
  // states
  // valgte varer i kurven
  const [cartItems, setCartItems] = useState([]);
  // brugeroplysninger
  const [userInfos, setUserInfos] = useState([]);
  // valgt camping
  const [selectedCamping, setSelectedCamping] = useState(null);
  // valg af ekstraudstyr som er vores telte
  const [selectedOptional, setSelectedOptional] = useState([]);
  // totalprisen
  const [cartTotal, setCartTotal] = useState(0);
  // tid tilbage på reservationen
  const [remainingTime, setRemainingTime] = useState(null);
  // data om campingområder
  const [campingData, setCampingData] = useState([]);
  // indlæsningsstatus
  const [loading, setLoading] = useState(true);
  // til fejlmeddelser
  const [error, setError] = useState(null);
  // reservations id
  const [reservationId, setReservationId] = useState(null);
  // start timeren
  const startTimer = (seconds = 300) => setRemainingTime(seconds);
  // nulstil timeren
  const resetTimer = () => setRemainingTime(null);

  const clearCart = () => {
    setCartItems([]); // rydder kurven
    setUserInfos([]); // nulstiller brugerinfo
    setSelectedCamping(null); // nulstil campingvalg
    setSelectedOptional([]); // nulstil tilvalg
    setCartTotal(0); // totalpris
    setReservationId(null); // og til sidst nulstiller reservation id'et
  };

  // timer-logik
  useEffect(() => {
    let timer;
    if (remainingTime > 0) {
      timer = setInterval(() => setRemainingTime((prev) => prev - 1), 1000);
    } else if (remainingTime === 0) {
      clearCart();
      resetTimer();
    }
    return () => clearInterval(timer);
  }, [remainingTime]);

  // her henter vi campingdata fra vores api
  useEffect(() => {
    const fetchCampingData = async () => {
      try {
        // indlæsningen starter
        setLoading(true);
        const response = await fetch("https://peach-polar-planarian.glitch.me/available-spots");
        if (!response.ok) throw new Error("Failed to fetch camping data");
        const data = await response.json();
        console.log("Camping Data:", data);
        // opdaterer campingdata
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

  // reserver campingplads via api
  const reserveSpot = async (area, amount) => {
    try {
      const response = await fetch("https://peach-polar-planarian.glitch.me/reserve-spot", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ area, amount }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error("Failed to reserve spot");
      // gemmer reservations id'et
      setReservationId(data.id);
      // starter timeren
      startTimer();
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    }
  };

  // bekræft reservation igen via en api anmodning
  const confirmReservation = async () => {
    try {
      const response = await fetch("https://peach-polar-planarian.glitch.me/fullfill-reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: reservationId }),
      });

      if (!response.ok) throw new Error("Failed to confirm reservation");
      // nulstiller timeren ved bekræftelse
      resetTimer();
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    }
  };

  // opdater brugeroplysninger baseret på cartItems, altså når varer i kurven ændres
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

  const updateUserInfo = (index, updatedInfo) => {
    setUserInfos((prevUserInfos) => {
      const newUserInfos = [...prevUserInfos];
      newUserInfos[index] = {
        ...newUserInfos[index],
        // tilføjer nyt data
        ...updatedInfo,
      };
      return newUserInfos;
    });
  };

  // beregner totalpris for kurven
  useEffect(() => {
    const ticketTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const optionalTotal = selectedOptional.reduce((total, item) => total + item.price * item.quantity, 0);
    setCartTotal(ticketTotal + optionalTotal + 99); // Booking fee
  }, [cartItems, selectedOptional]);

  // tilføj vare til kurven
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

  // fjerner vare fra kurven
  const removeItemFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  // opdater antallet af en vare
  const updateItemQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeItemFromCart(productId);
    } else {
      setCartItems((prevItems) => prevItems.map((item) => (item.id === productId ? { ...item, quantity } : item)));
    }
  };
  // her returnerer vi hele konteksten
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

// i denne fil opretter vi altså en global state med React Context API for at håndtere billetkøb, brugeroplysninger og campingreservationer

// den inkluderer funktioner til at tilføje/fjerne billetter, beregne totalprisen, håndtere en reservationstimer og hente campingdata fra festivalens API

// alt dette deles med resten af applikationen via CartProvider
