import React, { useContext, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import Image from "next/image";
import backgroundCard from "../../public/pics/card.png";
import Star from "../../public/pics/star.svg";
import SortStar from "../../public/pics/blackstar.svg";
import ButtonWIcon from "@/components/ButtonWIcon";
import Link from "next/link";
import Banner from "@/components/Banner";

const Tickets = () => {
  const { tickets, addToCart } = useContext(CartContext);

  // Hvis der ikke er billetter, vis en loading tekst
  if (!tickets || tickets.length === 0) {
    return <p className="text-center text-[var(--font-color)]">Loading tickets...</p>;
  }

  return (
    <div>
      <Banner text="TICKETS" />

      <section className="pt-[100px] mb-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:w-[900px] m-auto justify-items-center gap-20 justify-center">
          {tickets.map((ticket) => {
            // Lokal state til at holde styr på valgt antal for hver billet
            const [quantity, setQuantity] = useState(1);

            return (
              <div key={ticket.id} className="relative group">
                {/* Border div */}
                <div className="absolute inset-0 z-0 before:content-[''] before:absolute before:-top-8 before:-right-8 before:-z-10 before:w-full before:h-full before:border-[8px] before:border-[#881523] before:opacity-100 before:rounded-lg transition-all duration-500 ease-out group-hover:top-[1rem] group-hover:left-[1rem]"></div>

                {/* Content div */}
                <div className="relative z-0 p-8 w-96 h-full group-hover:translate-x-4 group-hover:translate-y-4 transition-all duration-500 ease-out rounded-2xl bg-opacity-90 flex flex-col justify-center items-center">
                  <div className="absolute rounded-xl inset-0 z-0">
                    <Image src={backgroundCard} alt="Ticket background" layout="fill" objectFit="cover" quality={100} className="rounded-xl" />
                  </div>

                  <div className="relative z-10">
                    <h2 className="text-2xl font-bold mb-2">{ticket.name}</h2>
                    <p className="text-4xl font-bold mb-2 font-serif">{ticket.price},-</p>
                    <p className="text-sm mb-6 text-[var(--light-grey-font)]">*excluding order and transaction fees</p>

                    {/* Dropdown-menu til at vælge antal */}
                    <div className="mb-4">
                      <label htmlFor={`quantity-${ticket.id}`} className="text-sm block mb-2">
                        Choose quantity:
                      </label>
                      <select id={`quantity-${ticket.id}`} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="p-2 border border-gray-300 rounded">
                        {[...Array(10).keys()].map((num) => (
                          <option key={num + 1} value={num + 1}>
                            {num + 1}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Knappen til at tilføje til kurven */}
                    <ButtonWIcon text="Add to cart" defaultIcon={<Image src={Star} alt="Default Icon" width={20} height={20} />} activeIcon={<Image src={SortStar} alt="Active Icon" width={20} height={20} />} defaultBgColor="#2c2c2a" activeBgColor="#ffffff" onClick={() => addToCart({ ...ticket, quantity })} className="mt-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Link til kurv */}
        <div className="pt-20 text-center">
          <Link href="/basket" className="inline-flex items-center space-x-4 text-xl md:text-2xl text-white font-sans hover:underline">
            <h4 className="font-serif text-[2rem] md:text-[3rem]">Proceed</h4>
            <span className="text-xl md:text-4xl">to checkout →</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Tickets;
