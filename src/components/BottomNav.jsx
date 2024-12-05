<<<<<<< HEAD
=======
"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import ProgramIcon from "../../public/pics/programicon.svg";
import LineupIcon from "../../public/pics/music-lineup.svg";
import TicketIcon from "../../public/pics/ticket.svg";
import BasketIcon from "../../public/pics/basket.svg";

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-[#2C2C2A] border-t border-gray-600 text-white" style={{ borderColor: "var(--light-grey-font)" }}>
      <div className="flex justify-around items-center py-4">
        {/* Program */}
        <Link href="/program" className="group flex flex-col items-center">
          <Image src={ProgramIcon} alt="Program" width={30} height={30} className="hover:scale-110 transition-transform duration-200" />
          <p className="text-sm mt-1 group-hover:text-gray-300">PROGRAM</p>
        </Link>

        {/* Line-Up */}
        <Link href="/lineup" className="group flex flex-col items-center">
          <Image src={LineupIcon} alt="Line-Up" width={30} height={30} className="hover:scale-110 transition-transform duration-200" />
          <p className="text-sm mt-1 group-hover:text-gray-300">LINE-UP</p>
        </Link>

        {/* Tickets */}
        <Link href="/tickets" className="group flex flex-col items-center">
          <Image src={TicketIcon} alt="Tickets" width={35} height={35} className="hover:scale-110 transition-transform duration-200" />
          <p className="text-sm mt-1 group-hover:text-gray-300">TICKETS</p>
        </Link>

        {/* Basket */}
        <Link href="/basket" className="group flex flex-col items-center">
          <Image src={BasketIcon} alt="Basket" width={30} height={30} className="hover:scale-110 transition-transform duration-200" />
          <p className="text-sm mt-1 group-hover:text-gray-300">BASKET</p>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNav;
>>>>>>> d403ce560b121d98518ee856459f00baf3233e5d
