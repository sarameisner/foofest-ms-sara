
import Image from "next/image";
import React from "react";
import FrontPage from "../../public/pics/frontpagepic.jpg"

const Banner = ({text}) => {
    return (     
    <div className="p-[--padding-5] mt-[--padding-150]">
      
        <div className="relative h-[10rem]">
    <Image
      src={FrontPage}
      alt="Background"
      layout="fill"
      objectFit="cover" 
      objectPosition="center" 
      className="absolute inset-0"
    />
  
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-[--font-color]">
      <h1 className="text-4xl font-bold uppercase">{text}</h1>
    </div>

  </div>
  </div>
  );
}
 
export default Banner;