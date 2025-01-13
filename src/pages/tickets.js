import React from "react";
import Tickets from "@/components/Tickets";
import Head from "next/head";
import According from "@/components/According";

export default function TicketsPage() {
    const faq1 = [
        {
          question: "How to I get my tickets",
          answer: "After you have purchased your tickets, you will receive a ticket ID. This is your ticket.",
        },
        {
          question: "Do I need to bring a tent",
          answer: "You are welcome to bring your own tent. You are also more than welcome to buy you tent from us, it will be ready the day of the festival start. You can either buy a 2-person tent or a 3-person tent.",
        },
        {
          question: "What is green camping",
          answer: "Green camping can be purchase with you tent. This will be added to your cost of ticket. Here we insure bio-degredible tents for your festival.",
        },
        
      ];
  return (
    <>
    <Head>
      <title>Tickets</title>
      <meta name="description" content="Review and manage your festival tickets. Checkout to secure your spot at the event!" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
      <Tickets />
      <According title="OFTEN ASKED" faqItems={faq1} /> {/* Første FAQ-sektion */}
    </>
  );
}
