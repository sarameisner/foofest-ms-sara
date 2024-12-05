"use client"
import Link from "next/link";
import React from "react";


const TopNav = () => {
    return ( <div>

<header className="p-6 bg-[#FEFEF2] text-[#343067]">
      <nav className="flex justify-between items-center">
        <h1 className="text-3xl font-orelega one font-bold">Foo</h1>
        <div className="flex space-x-6 items-center">
          <Link href="/program.js" className="hover:text-gray-400">
            PROGRAM
          </Link>
          <Link href="/" className="hover:text-gray-400">
            LINE-UP
          </Link>
          <Link href="/" className="hover:text-gray-400">
            TICKETS
          </Link>

        </div>
      </nav>
    </header>

    </div> );
}
 
export default TopNav;