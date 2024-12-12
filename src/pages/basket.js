"use client";

import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import { CartContext } from "../contexts/CartContext";
import ButtonWIcon from "../components/ButtonWIcon";
import Banner from "../components/Banner";
import ticketPlain from "../../public/pics/ticketplain.svg";
import ticketWStar from "../../public/pics/ticketwstar.svg";
import Image from "next/image";
import ListItem from "@/components/ListItem";
import Star from "../../public/pics/star.svg";
import BlackStar from "../../public/pics/blackstar.svg";

const Basket = () => {
  const { cartItems, clearCart, updateItemQuantity, cartTotal } = useContext(CartContext);
  const router = useRouter();

  const bookingFee = 99;
  const totalWithFee = cartTotal + bookingFee;

  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div className="basket-container text-white p-4 md:p-8">
      <Banner text="Your basket" className="mb-6 text-center" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-5xl mx-auto">
        <div className="md:col-span-2 flex flex-col gap-6">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border-b border-gray-700">
                {/* Ticket Image */}
                <img src={item.name === "Regular Ticket" ? ticketPlain.src : ticketWStar.src} alt={`${item.name}`} className="h-12 w-12" />
                {/* Ticket Details */}
                <div className="flex flex-col items-start flex-grow ml-4">
                  <h2 className="text-lg font-bold">{item.name}</h2>
                  <p>{item.price * item.quantity},-</p>
                </div>

                <div className="flex items-center space-x-2">
                  <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1} className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center">
                    -
                  </button>
                  <span className="text-lg">{item.quantity}</span>
                  <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)} className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center">
                    +
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center">Your basket is empty.</p>
          )}

          <div className="flex justify-center mt-6">
            <ButtonWIcon text="Clear basket" defaultIcon={<Image src={Star} alt="Star Icon" width={20} height={20} />} activeIcon={<Image src={BlackStar} alt="Active Icon" width={20} height={20} />} defaultBgColor="#881523" activeBgColor="#ffffff" onClick={clearCart} className="w-full max-w-xs h-12 flex items-center justify-center" />
          </div>
        </div>

        <div className="p-6 bg-[var(--background)] text-[var(--font-color)] border-4 border-[var(--accent-color)] rounded-lg">
          <h3 className="text-lg font-bold mb-4">Your Selection</h3>
          {cartItems.map((item) => (
            <div key={item.id} className="mb-4">
              <p>
                <strong>Type:</strong> <span className="float-right">{item.name}</span>
              </p>
              <p>
                <strong>Amount:</strong> <span className="float-right">{item.quantity}</span>
              </p>
              <p>
                <strong>Price:</strong> <span className="float-right">{item.price * item.quantity},-</span>
              </p>
            </div>
          ))}
          <p>
            <strong>Booking fee:</strong> <span className="float-right">{bookingFee},-</span>
          </p>
          <hr className="my-4 border-gray-600" />
          <p className="text-xl font-bold">
            <strong>Total:</strong> <span className="float-right">{totalWithFee},-</span>
          </p>
          <ButtonWIcon text="Checkout" defaultIcon={<Image src={Star} alt="Star Icon" width={20} height={20} />} activeIcon={<Image src={Star} alt="Star Icon Active" width={20} height={20} />} defaultBgColor="#881523" activeBgColor="#ffffff" onClick={handleCheckout} className="mt-6 w-full h-12 grid  m-auto items-center justify-center" />
        </div>
      </div>
    </div>
  );
};

export default Basket;
