"use client";
import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { CartContext } from "../contexts/CartContext";

const BottomNav = () => {
    const { cartItems = [] } = useContext(CartContext);
  
  return (
    <nav className="fixed z-10 bottom-0 left-0 w-full bg-[#2C2C2A] border-t border-gray-600 text-white">
      <div className="flex justify-around items-center py-4">
        {/* program */}
        <Link href="/program" className="group flex flex-col items-center">
          <Image src="/pics/programicon.png" alt="Program" width={30} height={30} className="hover:scale-110 transition-transform duration-200" />
          <p className="text-sm mt-1 group-hover:text-gray-300">PROGRAM</p>
        </Link>

        {/* lineup */}
        <Link href="/lineup" className="group flex flex-col items-center">
          <Image src="/pics/lineup.svg" alt="Line-Up" width={30} height={30} className="hover:scale-110 transition-transform duration-200" />
          <p className="text-sm mt-1 group-hover:text-gray-300">LINE-UP</p>
        </Link>

        {/* tickets */}
        <div className="relative">
        <Link href="/tickets" className="group flex flex-col items-center">
          <Image src="/pics/ticket.svg" alt="Tickets" width={35} height={35} className="hover:scale-110 transition-transform duration-200" />
          <p className="text-sm mt-1 pt-2 group-hover:text-gray-300">TICKETS</p>
        </Link>
        </div>
        {/* basket */}
        <Link href="/basket" className="group flex flex-col items-center">
          <Image src="/pics/basket.svg" alt="Basket" width={30} height={30} className="hover:scale-110 transition-transform duration-200" />
          {cartItems.length > 0 && <span className="absolute bottom-15  bg-[--accent-color] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cartItems.reduce((total, item) => total + item.quantity, 0)}</span>}
          <p className="text-sm mt-1 group-hover:text-gray-300">BASKET</p>
        </Link>

        {/* profile */}
        <Link href="/favorites" className="group flex flex-col items-center">
          <Image src="/pics/person.svg" alt="Profile" width={30} height={30} className="hover:scale-110 transition-transform duration-200" />
          <p className="text-sm mt-1 group-hover:text-gray-300">PROFILE</p>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNav;
