import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import Image from "next/image";
import backgroundCard from "../../public/pics/card.png";
import Star from "../../public/pics/star.svg";
import ButtonWIcon from "@/components/ButtonWIcon";
import Banner from "@/components/Banner";

const Tickets = () => {
  const { tickets, addToCart } = useContext(CartContext); // henter tickets fra CartContext

  return (
    <div>
      <Banner text="Tickets" className="mb-6" />

      <section className="py-8 bg-background text-fontColor">
        <div className="container mx-auto text-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="relative group">
                <div className="absolute inset-0 rounded-2xl overflow-hidden z-0">
                  <Image src={backgroundCard} alt="Ticket background" layout="fill" objectFit="cover" quality={100} className="rounded-2xl" />
                </div>
                <div className="relative z-10 p-8 rounded-2xl bg-opacity-90 flex flex-col justify-center items-center">
                  <h2 className="text-2xl font-bold mb-2">{ticket.name}</h2>
                  <p className="text-4xl font-bold mb-2 font-serif">{ticket.price},-</p>
                  <p className="text-sm mb-6 text-lightGreyFont">*excluding order and transaction fees</p>
                  <ButtonWIcon text="Add to cart" defaultIcon={<Image src={Star} alt="Default Icon" width={20} height={20} />} activeIcon={<Image src={Star} alt="Active Icon" width={20} height={20} />} defaultBgColor="#2c2c2a" activeBgColor="#ffffff" onClick={() => addToCart(ticket)} className="mt-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tickets;
