import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import lineupBracelet from "../../public/pics/bracelets1.png";
import programBracelet from "../../public/pics/bracelets2.png";
import ticketsBracelet from "../../public/pics/bracelets3.png";

const FrontPageHeader = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Opret refs for at observere hvert element
  const lineupRef = useRef(null);
  const programRef = useRef(null);
  const ticketsRef = useRef(null);

  useEffect(() => {
    // Funktion for at opdatere synlighed
    const handleVisibility = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      });
    };

    // Opret IntersectionObserver
    const observer = new IntersectionObserver(handleVisibility, {
      threshold: 0.5, // Trigger ved 10% synlighed
    });

    if (lineupRef.current) observer.observe(lineupRef.current);
    if (programRef.current) observer.observe(programRef.current);
    if (ticketsRef.current) observer.observe(ticketsRef.current);

    // Clean up observer
    return () => {
      if (lineupRef.current) observer.unobserve(lineupRef.current);
      if (programRef.current) observer.unobserve(programRef.current);
      if (ticketsRef.current) observer.unobserve(ticketsRef.current);
    };
  }, []);

  return (
    <div className="relative w-full">
      {/* Baggrundsvideo */}
      <div className="relative w-full h-[100vh] bg-cover bg-center">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="/2022395-hd_1920_1080_30fps.mp4"
          autoPlay
          loop
          muted
          playsInline
        ></video>
        
        {/* Dato */}
        <div className="absolute top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
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

      {/* Armbåndsektion */}
      <div className="w-full bg-gradingBG flex flex-col items-center space-y-12 py-24 z-10">
        <a
          ref={lineupRef}
          href="/program"
          className={`transform rotate-[-5deg] hover:scale-105 transition-transform ${
            isVisible ? "opacity-100 transition-opacity duration-1000" : "opacity-0"
          }`}
        >
          <Image src={lineupBracelet} alt="Program Bracelet" width={700} height={180} className="drop-shadow-lg" />
        </a>
        <a
          ref={programRef}
          href="/lineup"
          className={`transform rotate-[3deg] hover:scale-105 transition-transform ${
            isVisible ? "opacity-100 transition-opacity duration-1000" : "opacity-0"
          }`}
        >
          <Image src={programBracelet} alt="Lineup Bracelet" width={700} height={180} className="drop-shadow-lg" />
        </a>
        <a
          ref={ticketsRef}
          href="/tickets"
          className={`transform rotate-[-8deg] hover:scale-105 transition-transform ${
            isVisible ? "opacity-100 transition-opacity duration-1000" : "opacity-0"
          }`}
        >
          <Image src={ticketsBracelet} alt="Tickets Bracelet" width={700} height={180} className="drop-shadow-lg" />
        </a>
      </div>
    </div>
  );
};

export default FrontPageHeader;
