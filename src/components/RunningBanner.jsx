"use client";
import React from "react";

const InfiniteBanner = ({ items = [], speed = "slow" }) => {
  // Duplicate items to ensure continuous scrolling
  const repeatCount = 10; // Ensure smooth looping by duplicating items
  const repeatedItems = Array(repeatCount).fill(items).flat();
  const keyedItems = repeatedItems.map((item, index) => ({
    content: item,
    key: `item-${index}`,
  }));

  return (
    <div className="bg-grey opacity-80 relative w-full pb-10 overflow-hidden pt-10">
      {/* Scrolling container */}
      <div
        className={`w-full inline-flex will-change-transform animate-infinite-scroll-${speed}`}
      >
        {keyedItems.map(({ content, key }) => (
          <div
            key={key}
            className="flex items-center space-x-4 px-4 shrink-0 text-white"
          >
            {content}
          </div>
        ))}
      </div>
    
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24  z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24  z-10" />
    </div>
  );
};

export default InfiniteBanner;
