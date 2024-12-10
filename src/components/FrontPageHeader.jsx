import React from "react";
import Image from "next/image";
import backgroundImage from "../../public/pics/frontpagepic.jpg";
import lineupBracelet from "../../public/pics/bracelets1.png";
import programBracelet from "../../public/pics/bracelets2.png";
import ticketsBracelet from "../../public/pics/bracelets3.png";

const FrontPageHeader = () => {
  return (
    <div className="relative w-full">
      {/* sektion med baggrundsbilledet */}
      <div className="relative w-full h-[60vh] bg-cover bg-center">
        <Image src={backgroundImage} alt="Concert Background" layout="fill" objectFit="cover" className="-z-10" />
        
        {/* dato placeret lidt længere nede */}
        <div className="absolute top-[70%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          <p className="text-xl md:text-3xl font-normal text-white">2.12.2024 - 20.12.2024</p>
        </div>

        {/* CTA til billetter */}
        <div className="absolute bottom-8 right-8 text-right flex items-center space-x-4 z-50">
          <span className="italic font-serif text-2xl md:text-4xl text-white">Buy</span>
          <a href="/tickets" className="font-sans hover:underline flex items-center space-x-2 text-lg md:text-3xl text-white">
            <span>Tickets</span>
            <span className="text-3xl md:text-4xl">→</span>
          </a>
        </div>
      </div>

      {/* sektion med armbånd */}
      <div className="w-full bg-[var(--background)] flex flex-col items-center space-y-12 py-24 z-10">
        <a href="/program" className="transform rotate-[-5deg] hover:scale-105 transition-transform">
          <Image src={lineupBracelet} alt="Program Bracelet" width={700} height={180} className="drop-shadow-lg" />
        </a>
        <a href="/lineup" className="transform rotate-[3deg] hover:scale-105 transition-transform">
          <Image src={programBracelet} alt="Lineup Bracelet" width={700} height={180} className="drop-shadow-lg" />
        </a>
        <a href="/tickets" className="transform rotate-[-8deg] hover:scale-105 transition-transform">
          <Image src={ticketsBracelet} alt="Tickets Bracelet" width={700} height={180} className="drop-shadow-lg" />
        </a>
      </div>
    </div>
  );
};

export default FrontPageHeader;
