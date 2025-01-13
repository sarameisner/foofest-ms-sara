import React, { useRef } from "react";
import Image from "next/image";
import lineupBracelet from "../../public/pics/bracelets1.png";
import programBracelet from "../../public/pics/bracelets2.png";
import ticketsBracelet from "../../public/pics/bracelets3.png";


const FrontPageHeader = () => {
 

  // Opret refs for at observere hvert element
  const lineupRef = useRef(null);
  const programRef = useRef(null);
  const ticketsRef = useRef(null);


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
      {/* Første linje: Biggest Rock Festival */}
      <p
        className="text-3xl md:text-6xl font-bold font-sans text-white"
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          borderRight: "2px solid white",
          width: "fit-content",
          animation: "typing 3s steps(25, end), blink-caret 0.5s step-end infinite",
        }}
      >
        BIGGEST ROCK FESTIVAL
      </p>

      {/* Anden linje: On Faroe Islands */}
      <p
        className="text-xl md:text-5xl font-bold mt-10 font-sans text-white "style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          opacity: 0, 
          visibility: "hidden", 
          animation: "typing 3s steps(39, end) 3.5s forwards, fadeIn 0.5s 3.5s forwards",
        }}
      >
      Faroe Islands - 02/12 - 20/12
      </p>   
    </div>
  </div>
</div>


        {/* CTA til billetter */}
        <div className="absolute hover:underline text-white bottom-8 right-8 text-right flex items-center space-x-4 ">
          <span className="italic  font-serif text-2xl md:text-4x text-white">Buy</span>
          <a href="/tickets" className="font-sans flex items-center space-x-2 text-lg md:text-3xl text-[--font-color]">
            <span  >Tickets</span>
            <span className="text-3xl md:text-4xl">→</span>
          </a>
        </div>
        
      </div>

      {/* Armbåndsektion */}
      <div className="w-full bg-gradingBG flex flex-col items-center space-y-12 py-24 z-10">
        <a
          ref={lineupRef}
          href="/program"
          className="transform rotate-[-5deg] hover:scale-105 transition-transform "
        >
          <Image src={lineupBracelet} alt="Program Bracelet" width={700} height={180} className="drop-shadow-lg" />
        </a>
        <a
          ref={programRef}
          href="/lineup"
          className="transform rotate-[3deg] hover:scale-105 transition-transform"
        >
          <Image src={programBracelet} alt="Lineup Bracelet" width={700} height={180} className="drop-shadow-lg" />
        </a>
        <a
          ref={ticketsRef}
          href="/tickets"
          className="transform rotate-[-8deg] hover:scale-105 transition-transform"
        >
          <Image src={ticketsBracelet} alt="Tickets Bracelet" width={700} height={180} className="drop-shadow-lg" />
        </a>
      </div>
    </div>
  );
};

export default FrontPageHeader;
