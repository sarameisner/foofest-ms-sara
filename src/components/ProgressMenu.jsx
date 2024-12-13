import React from "react";


export default function ProgressMenu({ currentStep, steps }) {
  return (
<div >
    <div className="grid  m-auto">
    <h1 className="text-4xl text-center font-bold uppercase">YOUR BASKET</h1></div>
    {/* Her henter vi steps fra checkout, så vi kan se hvor lngt i progressen vi er med hvilke steps.*/}
    <div className="flex justify-between items-center mt-5"> 
      {steps.map((step, index) => (
        <div
          key={index}
          className={`flex-1 text-center p-2 ${
            index === currentStep ? "border-b-2 border-white font-bold text-white" : "text-gray-500"
          }`}
        >
          {step.title || `Step ${index + 1}`}
        </div>
      ))}
    </div>
    </div>
  );
}