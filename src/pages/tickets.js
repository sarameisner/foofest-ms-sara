import React from "react";
import Tickets from "@/components/Tickets";
import According from "@/components/According";

export default function TicketsPage() {
    const faq1 = [
        {
          question: "How to i get my tickets",
          answer: "After u",
        },
        {
          question: "When and Where?",
          answer: "Foo Fest takes place in December at Svinoy Bygd, Faroe Islands. Don't miss out on this unforgettable alternative rock experience!",
        },
        {
          question: "How do i buy tickets",
          answer: "Tickets can be sold in our ticket link up top. You can either but a VIP ticket priced at 1299,- or a regular ticket priced at 799,-",
        },
        
      ];
  return (
    <>
      <Tickets />
      <According title="WHAT IS FOO FEST" faqItems={faq1} /> {/* Første FAQ-sektion */}
    </>
  );
}
