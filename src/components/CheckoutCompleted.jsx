import React from "react";
import Image from "next/image";
import Link from "next/link";
import Star from "../../public/pics/star.svg"
import ButtonWIcon from "./ButtonWIcon";
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
      <Link href="/"><ButtonWIcon defaultIcon={<Image src={Star} alt="Default Icon" width={20} height={20}/>}
text="Home" onClick={() => router.push("/")} >
      </ButtonWIcon></Link>
    </div>
  );
};

export default CheckoutCompleted;

