"use client";
import React, { useState, memo } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import Card from "../../public/pics/card.png"; // Billedimport

// FAQItem komponenten for hvert spørgsmål
const FAQItem = memo(({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex justify-between items-center text-left"
      >
        <span className="text-[1.5rem] font-serif p-5 font-semibold text-white">{question}</span>
        
        {/* Toggling arrows (back and down) with smooth transition */}
        {isOpen ? (
          <IoIosArrowBack 
            className={`text-white transition-transform duration-[1200ms] ease-in-out`} 
          />
        ) : (
          <IoIosArrowDown 
            className={`text-white transition-transform duration-[1200ms] ease-in-out transform rotate-0`} 
          />
        )}
      </button>
      
      {/* Smooth transition for opening/closing the answer */}
      <div 
        className={`overflow-hidden transition-all duration-[1200ms] ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'}`}
      >
        {isOpen && <p className="p-10 text-black_color">{answer}</p>}
      </div>
    </div>
  );
});

FAQItem.displayName = "FAQItem";

// According komponenten, der accepterer props
const According = ({ title, faqItems }) => {
  return (
    <div 
      className="m-[100px] bg-cover bg-center"
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


