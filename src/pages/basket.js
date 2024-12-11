"use client";

import React, { useContext } from "react";
import { useRouter } from "next/navigation"; // Importer useRouter
import { CartContext } from "../contexts/CartContext";
import ButtonWIcon from "../components/ButtonWIcon";
import Banner from "../components/Banner"; // Importer Banner-komponentet
import ticketPlain from "../../public/pics/ticketplain.svg";
import ticketWStar from "../../public/pics/ticketwstar.svg";

const Basket = () => {
  const { cartItems, clearCart, updateItemQuantity, cartTotal } = useContext(CartContext);
  const router = useRouter(); // Brug useRouter til navigation

  const bookingFee = 99;
  const totalWithFee = cartTotal + bookingFee;

  const handleCheckout = () => {
    router.push("/checkout"); // Naviger til checkout-siden
  };

  return (
    <div className="basket-container text-white p-4 md:p-8">
      {/* Title */}
      <Banner text="Your basket" className="mb-6 text-center" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-5xl mx-auto">
        {/* Basket Items */}
        <div className="md:col-span-2 flex flex-col gap-6">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row items-center sm:justify-between p-4 bg-gray-800 rounded-lg">
                {/* Ticket Image */}
                <img src={item.name === "Regular Ticket" ? ticketPlain.src : ticketWStar.src} alt={`${item.name}`} className="h-12 w-12 mb-4 sm:mb-0" />
                {/* Ticket Details */}
                <div className="flex flex-col items-center sm:items-start flex-grow sm:ml-4 text-center sm:text-left">
                  <h2 className="text-lg font-bold">{item.name}</h2>
                  <p>Price: {item.price * item.quantity},-</p>
                </div>
                {/* Quantity Controls */}
                <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                  <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1} className="bg-white text-black rounded-full w-6 h-6 flex items-center justify-center">
                    -
                  </button>
                  <span className="text-lg">{item.quantity}</span>
                  <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)} className="bg-white text-black rounded-full w-6 h-6 flex items-center justify-center">
                    +
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center">Your basket is empty.</p>
          )}
        </div>

        {/* Basket Summary */}
        <div className="basket-summary border-2 border-red-600 p-6 rounded-lg bg-gray-800">
          {cartItems.map((item) => (
            <div key={item.id} className="mb-4">
              <p>Type: {item.name}</p>
              <p>Amount: {item.quantity}</p>
              <p>Price: {item.price * item.quantity},-</p>
            </div>
          ))}
          <p>Booking fee: {bookingFee},-</p>
          <hr className="my-4 border-gray-600" />
          <p className="text-xl font-bold">Total: {totalWithFee},-</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-8 max-w-5xl mx-auto space-y-4 md:space-y-0">
        <ButtonWIcon onClick={clearCart} text="Clear basket" icon="🗑️" color="red" className="px-6 py-3 rounded-full w-full md:w-auto" />
        <ButtonWIcon onClick={handleCheckout} text="Checkout" icon="✅" color="red" className="px-6 py-3 rounded-full w-full md:w-auto" />
      </div>
    </div>
  );
};

export default Basket;
