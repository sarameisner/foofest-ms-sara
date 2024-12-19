"use client";

import React, { useState, useEffect } from "react";
import Loading from "@/components/Loading";
import FrontPageHeader from "@/components/FrontPageHeader";
import Popup from "@/components/PopUp";
import According from "@/components/According";

export default function Home() {
  // state til at styre om login pop uppen er åben eller ikke
  const [isModalOpen, setIsModalOpen] = useState(false);
  // indlæsningsstatus
  const [loading, setLoading] = useState(true);

  // effekt til at fjerne loading efter 100ms
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  // pop up åbner når siden indlæses
  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  // array med spg og svar til vores faq sektion
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
  // lukning af pop up
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
