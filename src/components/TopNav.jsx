"use client"
import Link from "next/link";
import React from "react";
import Image from "next/image";
import Kurv from "../../public/pics/kurv.svg"
import Person from "../../public/pics/person.svg"

const TopNav = () => {
    return ( <div>

<header className="p-6 text-[#343067]">
  <nav className="flex items-center">
    {/* Venstre sektion */}
    <div className="flex-shrink-0">
      <h4 className="text-[6rem] font-bold">Foo</h4>
    </div>

    {/* Midter sektion */}
    <div className="flex-grow flex justify-center space-x-6 text-white">
      <Link href="/program" className="hover:underline decoration-white">
        PROGRAM
      </Link>
      <Link href="/" className="hover:underline decoration-white">
        LINE-UP
      </Link>
      <Link href="/" className="hover:underline decoration-white">
        TICKETS
      </Link>
    </div>

    {/* Højre sektion */}
    <div className="flex items-center space-x-4">
      <Image src={Kurv} alt="Kurv" width={24} height={24} />
      <Image src={Person} alt="Person" width={24} height={24} />
    </div>
  </nav>
</header>

    </div> );
}
 
export default TopNav;