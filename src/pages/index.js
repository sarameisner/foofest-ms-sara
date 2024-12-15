"use client";

import React, { useState, useEffect } from "react";
import Loading from "@/components/Loading";
import FrontPageHeader from "@/components/FrontPageHeader";
import Popup from "@/components/PopUp";
import According from "@/components/According"


export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 100); // Fjern loading efter 100ms
    return () => clearTimeout(timer); // Rens op
  }, []);

  useEffect(() => {
    setIsModalOpen(true); // Åbn modal ved første render
  }, []);

  const faq1 = [
    {
      question: "What is Foo Fest?",
      answer: "Foo Fest is an alternative rock festival celebrating timeless classics. Featuring legendary bands and artists, it offers a unique experience for music lovers of all ages.",
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




  const closeModal = () => setIsModalOpen(false);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Popup isOpen={isModalOpen} closeModal={closeModal} />
      <FrontPageHeader />
      <According title="WHAT IS FOO FEST" faqItems={faq1} /> 

    </div>
  );
}
