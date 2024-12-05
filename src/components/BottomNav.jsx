"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-[#2C2C2A] border-t border-gray-600 text-white">
      <div className="flex justify-around items-center py-4">
        {/* program */}
        <Link href="/program" className="group flex flex-col items-center">
          <Image src="/pics/programicon.svg" alt="Program" width={30} height={30} className="hover:scale-110 transition-transform duration-200" />
          <p className="text-sm mt-1 group-hover:text-gray-300">PROGRAM</p>
        </Link>

        {/* lineup */}
        <Link href="/lineup" className="group flex flex-col items-center">
          <Image src="/pics/lineup.svg" alt="Line-Up" width={30} height={30} className="hover:scale-110 transition-transform duration-200" />
          <p className="text-sm mt-1 group-hover:text-gray-300">LINE-UP</p>
        </Link>

        {/* tickets */}
        <Link href="/tickets" className="group flex flex-col items-center">
          <Image src="/pics/ticket.svg" alt="Tickets" width={30} height={30} className="hover:scale-110 transition-transform duration-200" />
          <p className="text-sm mt-1 group-hover:text-gray-300">TICKETS</p>
        </Link>

        {/* basket */}
        <Link href="/cart" className="group flex flex-col items-center">
          <Image src="/pics/basket.svg" alt="Basket" width={30} height={30} className="hover:scale-110 transition-transform duration-200" />
          <p className="text-sm mt-1 group-hover:text-gray-300">BASKET</p>
        </Link>

        {/* profile */}
        <Link href="/profile" className="group flex flex-col items-center">
          <Image src="/pics/person.svg" alt="Profile" width={30} height={30} className="hover:scale-110 transition-transform duration-200" />
          <p className="text-sm mt-1 group-hover:text-gray-300">PROFILE</p>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNav;
