"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import Kurv from "../../public/pics/kurv.svg";
import Person from "../../public/pics/person.svg";

const TopNav = () => {
  return (
    <header className="p-6 text-white bg-[#2C2C2A] border-b" style={{ borderColor: "var(--light-grey-font)" }}>
      <nav className="flex items-center justify-between">
        {/* venstre */}
        <div className="flex-shrink-0">
          <h4 className="text-[6rem] font-bold italic" style={{ color: "var(--font-color)" }}>
            Foo
          </h4>
        </div>

        {/* midten */}
        <div className="hidden md:flex flex-grow justify-center space-x-8 text-white">
          <Link href="/program" className="hover:underline hover:text-gray-300 text-2xl">
            PROGRAM
          </Link>
          <Link href="/lineup" className="hover:underline hover:text-gray-300 text-2xl">
            LINE-UP
          </Link>
          <Link href="/tickets" className="hover:underline hover:text-gray-300 text-2xl">
            TICKETS
          </Link>
        </div>

        {/* højre */}
        <div className="flex items-center space-x-6">
          {/* billet ikon */}
          <Link href="/cart">
            <Image src={Kurv} alt="Cart" width={40} height={40} className="hover:scale-110 transition-transform duration-200" />
          </Link>

          {/* profil ikon */}
          <Link href="/profile">
            <Image src={Person} alt="Profile" width={30} height={30} className="hover:scale-110 transition-transform duration-200" />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default TopNav;
