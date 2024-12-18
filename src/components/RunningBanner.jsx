"use client";
import React from "react";

// accepterer to propbs, en liste af elementer der ruller uendeligt, hvis ikke items gives som prop er det et tom array som standard
const InfiniteBanner = ({ items = [], speed = "slow" }) => {
  //definer hvor mange gange listem med items skal gentages. 
  const repeatCount = 10; 
  // Denne linjer opretter et nyt array, hvor indholdet af items gentages. 
  //Array(repeatCount) opretter et array med 10 elemeneter
  const repeatedItems = Array(repeatCount).fill(items).flat();
  // Her generer vi et array af objekter, content: et item fra den gentagne iste. key: en unik nøgle der kombiner item'sindex for at sikre at hvert element af listen er unikt
  const keyedItems = repeatedItems.map((item, index) => ({
    content: item,
    key: `item-${index}`,
  }));

  return (
    <div className="bg-grey opacity-80 relative w-full pb-10 overflow-hidden pt-[--padding-50]">
      {/* Scrolling container */}
      <div
        className={`w-full inline-flex will-change-transform animate-infinite-scroll-${speed}`}
      >
        {keyedItems.map(({ content, key }) => (
          <div
            key={key}
            className="flex items-center space-x-4 px-4 shrink-0 text-[--font-color]"
          >
            {content}
          </div>
        ))}
      </div>
    
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24  z-10" />
    </div>
  );
};

export default InfiniteBanner;
