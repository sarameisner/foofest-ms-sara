"use client";

import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import ButtonWIcon from "../components/ButtonWIcon";
import Banner from "../components/Banner"; // Importer Banner-komponentet
import ticketPlain from "../../public/pics/ticketplain.svg";
import ticketWStar from "../../public/pics/ticketwstar.svg";

const Basket = () => {
  const { cartItems, clearCart, updateItemQuantity } = useContext(CartContext);

  const bookingFee = 99;
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalWithFee = cartTotal + bookingFee;

  return (
    <div className="basket-container text-white p-8">
      {/* Banner Component as Title */}
      <Banner text="Your basket" className="mb-6 text-center" />

      <div className="grid grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto">
        {/* Basket items */}
        <div className="col-span-2 flex flex-col gap-6">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 rounded-lg">
                {/* Ticket Image */}
                <img src={item.name === "Regular Ticket" ? ticketPlain.src : ticketWStar.src} alt={`${item.name}`} className="h-12 w-12" />
                <div className="flex flex-col flex-grow ml-4">
                  <h2 className="text-lg font-bold">{item.name}</h2>
                  <p>Price: {item.price * item.quantity},-</p>
                </div>
                <div className="flex items-center space-x-2">
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

        {/* Basket summary */}
        <div className="basket-summary border-2 border-red-600 p-6 rounded-lg">
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

      {/* Actions */}
      <div className="flex justify-between mt-8 max-w-5xl mx-auto">
        <ButtonWIcon onClick={clearCart} text="Clear basket" icon="🗑️" color="red" className="px-6 py-3 rounded-full" />
        <ButtonWIcon onClick={() => alert("Proceeding to checkout...")} text="Checkout" icon="✅" color="red" className="px-6 py-3 rounded-full" />
      </div>
    </div>
  );
};

export default Basket;
