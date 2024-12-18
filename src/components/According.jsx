"use client";
import React, { useState, memo } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

// memo sørger for at en komponent kun rendes, hvis den props ændres
const FAQItem = memo(({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex justify-between items-center text-left"
      >
        <span className="text-[1.5rem] font-serif p-[--padding-20] font-semibold text-[--font-color]">{question}</span>
        
        {/* Toggling arrows (back and down) with smooth transition */}
        {isOpen ? (
          <IoIosArrowBack 
            className={`text-[--font-color] transition-transform duration-[1200ms] ease-in-out`} 
          />
        ) : (
          <IoIosArrowDown 
            className={`text-[--font-color] transition-transform duration-[1200ms] ease-in-out transform rotate-0`} 
          />
        )}
      </button>
      
      {/* Smooth transition for opening/closing the answer */}
      <div 
        className={`overflow-hidden transition-all duration-[1200ms] ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
        {isOpen && <p className="p-[--padding-50] text-black_color">{answer}</p>}
      </div>
    </div>
  );
});

FAQItem.displayName = "FAQItem";

// According komponenten, der accepterer props
const According = ({ title, faqItems }) => {
  return (
    <div 
      className="m-[--padding-100] bg-cover bg-center"
    >
      <section className="grid w-[600px] m-auto bg-[var(--accent-color)] p-10  bg-opacity-50 rounded-lg">
        <div>
          <h2 className="text-3xl mb-6 font-bold text-center text-white">{title}</h2>
          {faqItems.map((item, index) => (
            <FAQItem key={index} question={item.question} answer={item.answer} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default According;


