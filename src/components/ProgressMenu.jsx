import React from "react";

// tager to probs fra checkout, steps er array der indeholder de trin der.
export default function ProgressMenu({ currentStep, steps }) {
  return (
<div >
    <div className="grid  m-auto">
    <h1 className="text-4xl text-center font-bold uppercase">YOUR BASKET</h1></div>
    {/* Iterer over steps-arrayet og for hvert step opretter vi en div.*/}
    <div className="flex justify-between items-center mt-[--padding-20]"> 
      {/* key= er nødvendigt i react for ar sikre korrekt opdatering i DOM'en når elementer ændres*/}
      {steps.map((step, index) => (
        <div
          key={index}
          className={`flex-1 text-center p-2 ${
            index === currentStep ? "border-b-2 border-white font-bold text-[--font-color]" : "text-gray-500"
          }`}
        >
          {step.title || `Step ${index + 1}`}
        </div>
      ))}
    </div>
    </div>
  );
}