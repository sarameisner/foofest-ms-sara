import React, { createContext, useState, useEffect } from "react";
// opretter konteksten
export const CartContext = createContext();

// cartprovider leverer konteksten til hele siden
export const CartProvider = ({ children }) => {
  // liste over de to mulige billetter
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

  // her formaterer vi tiden til minutter og sekunder
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  // starter timeren på 5 minutter
  const startTimer = (seconds = 300) => {
    setRemainingTime(seconds);
  };

  // nulstiller timeren
  const resetTimer = () => {
    setRemainingTime(null);
  };

  // logikken bag lavet med useEffect
  useEffect(() => {
    let timer;
    if (remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (remainingTime === 0) {
      resetTimer(); // Stop timeren
    }

    return () => clearInterval(timer);
  }, [remainingTime]);

  // opdater userInfos, når cartItems ændres
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

  // Funktion til at opdatere brugeroplysninger
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

  // Beregn det totale beløb
  useEffect(() => {
    const ticketTotal = cartItems.reduce((total, item) => total + (item.price || 0) * item.quantity, 0);
    const optionalTotal = selectedOptional.reduce((total, item) => total + (item.price || 0) * item.quantity, 0);
    setCartTotal(ticketTotal + optionalTotal + 99); // Inkluder booking fee
  }, [cartItems, selectedOptional]);

  // Fetch camping data
  useEffect(() => {
    const fetchCampingData = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://peach-polar-planarian.glitch.me/available-spots");
        if (!response.ok) throw new Error("Failed to fetch camping data");
        const data = await response.json();
        setCampingData(data);
      } catch (err) {
        console.error("Error fetching camping data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCampingData();
  }, []);

  // Tilføj en vare til kurven
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        // Hvis varen allerede findes i kurven, øg antallet
        return prevItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      } else {
        // Tilføj varen som ny, hvis den ikke findes i kurven
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Fjern en vare fra kurven
  const removeItemFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  // Opdater antallet af en vare i kurven
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
        remainingTime,
        formatTime,
        resetTimer,
        startTimer,
        updateUserInfo,
        addToCart,
        removeItemFromCart,
        updateItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
