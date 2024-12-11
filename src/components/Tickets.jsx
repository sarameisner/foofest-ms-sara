import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import Image from "next/image";
import backgroundCard from "../../public/pics/card.png";
import Star from "../../public/pics/star.svg";
import ButtonWIcon from "@/components/ButtonWIcon";
import Link from "next/link";
import Banner from "@/components/Banner";

const Tickets = () => {
  const { tickets, addToCart } = useContext(CartContext);

  if (!tickets || tickets.length === 0) {
    return <p className="text-center text-[var(--font-color)]">Loading tickets...</p>;
  }

  return (
    <div>
      <Banner text="TICKETS" />

      <section className="py-8 bg-[var(--background)] text-[var(--font-color)]">
        <div className="container mx-auto text-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="relative group">
                <div className="absolute inset-0 rounded-2xl overflow-hidden z-0">
                  <Image src={backgroundCard} alt="Ticket background" fill className="rounded-2xl object-cover" />
                </div>
                <div className="relative z-10 p-8 rounded-2xl bg-opacity-90 flex flex-col justify-center items-center">
                  <h2 className="text-2xl font-bold mb-2">{ticket.name}</h2>
                  <p className="text-4xl font-bold mb-2 font-serif">{ticket.price},-</p>
                  <p className="text-sm mb-6 text-[var(--light-grey-font)]">*excluding order and transaction fees</p>
                  <ButtonWIcon text="Add to cart" defaultIcon={<Image src={Star} alt="Default Icon" width={20} height={20} />} activeIcon={<Image src={Star} alt="Active Icon" width={20} height={20} />} defaultBgColor="#2c2c2a" activeBgColor="#ffffff" onClick={() => addToCart(ticket)} className="mt-4" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/checkout" className="inline-flex items-center space-x-4 text-lg md:text-2xl text-white font-sans hover:underline">
              <h4 className="font-serif italic text-[2rem] md:text-[3rem] leading-none">Proceed</h4>
              <span className="text-3xl md:text-4xl">to checkout →</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tickets;
