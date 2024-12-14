import React from "react";
import Image from "next/image";
import ticketDisplay from "../../public/pics/ticketdisplay.png";

const CheckoutCompleted = ({ reservationId }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[var(--background)] text-[var(--font-color)] px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">YOUR BOOKING IS COMPLETED</h1>
      <p className="text-lg mb-4">Thank you for your purchase!</p>
      <p className="text-sm mb-8">
        Here is your reservation id:<span className="font-semibold">{reservationId}</span>
      </p>
      <div className="w-72 h-auto mb-8">
        <Image src={ticketDisplay} alt="Ticket Display" layout="responsive" objectFit="contain" />
      </div>
      <button onClick={() => router.push("/")} className="px-6 py-3 bg-[var(--accent-color)] text-white rounded-lg hover:bg-[var(--light-grey)]">
        Home
      </button>
    </div>
  );
};

export default CheckoutCompleted;

