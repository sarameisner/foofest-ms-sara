import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const clearCart = () => {
        setCartItems([]);
    };

    const [userInfos, setUserInfos] = useState([]);
    const updateUserInfo = (index, newInfo) => {
        const updatedUserInfos = [...userInfos];
        updatedUserInfos[index] = { ...updatedUserInfos[index], ...newInfo };
        setUserInfos(updatedUserInfos);
    };

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

    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === product.id);
            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    // Update item quantity
    const updateItemQuantity = (id, quantity) => {
        if (quantity <= 0) {
            removeItemFromCart(id);
        } else {
            setCartItems((prevItems) =>
                prevItems.map((item) =>
                    item.id === id ? { ...item, quantity } : item
                )
            );
        }
    };

    const removeItemFromCart = (itemId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    };

    const calculateCartTotal = () => {
        const ticketTotal = cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
        const optionalTotal = selectedOptional.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
        setCartTotal(ticketTotal + optionalTotal);
    };

    useEffect(() => {
        calculateCartTotal();
    }, [cartItems, selectedOptional]);

    useEffect(() => {
        const newInfos = cartItems.reduce((acc, item) => {
            for (let i = 0; i < item.quantity; i++) {
                acc.push({ name: "", email: "", birthday: "", ticketType: item.name });
            }
            return acc;
        }, []);
        setUserInfos(newInfos);
    }, [cartItems]);

    return (
        <CartContext.Provider
            value={{
                tickets,
                cartItems,
                clearCart,
                addToCart,
                updateItemQuantity,
                removeItemFromCart,
                selectedCamping,
                setSelectedCamping,
                selectedOptional,
                setSelectedOptional,
                userInfo,
                userInfos,
                updateUserInfo,
                setUserInfo,
                setUserInfos,
                cartTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
