// src/pages/basket.js

"use client";

import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import ButtonWIcon from "../components/ButtonWIcon";
import ticketPlain from "../../public/pics/ticketplain.svg";
import ticketWStar from "../../public/pics/ticketwstar.svg";

const Basket = () => {
  const { cartItems, clearCart, cartTotal } = useContext(CartContext);

  const bookingFee = 99;
  const totalWithFee = cartTotal + bookingFee;

  return (
    <div className="basket-container text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Your basket</h1>
      <div className="basket-items grid grid-cols-2 gap-4">
        <div>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} className="flex items-center mb-4">
                <img src={item.type === "Regular" ? ticketPlain : ticketWStar} alt={`${item.type} ticket`} className="h-12 w-12 mr-4" />
                <div>
                  <h2 className="font-bold">{item.type} Ticket</h2>
                  <p>Amount: {item.quantity}</p>
                  <p>Price: {item.price * item.quantity},-</p>
                </div>
              </div>
            ))
          ) : (
            <p>Your basket is empty.</p>
          )}
        </div>
        <div className="basket-summary border-2 border-red-600 p-4 rounded-lg">
          {cartItems.map((item) => (
            <div key={item.id} className="mb-2">
              <p>Type: {item.type}</p>
              <p>Amount: {item.quantity}</p>
              <p>Price: {item.price * item.quantity},-</p>
            </div>
          ))}
          <p>Booking fee: {bookingFee},-</p>
          <hr className="my-2 border-gray-400" />
          <p className="font-bold">Pris i alt: {totalWithFee},-</p>
        </div>
      </div>
      <div className="actions mt-6 flex justify-between">
        <ButtonWIcon onClick={clearCart} text="Clear basket" icon="🗑️" color="red" />
        <ButtonWIcon onClick={() => alert("Proceeding to checkout...")} text="Checkout" icon="✅" color="red" />
      </div>
    </div>
  );
};

export default Basket;
