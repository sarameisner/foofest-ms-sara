"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Loading from "@/components/Loading";
import FrontPageHeader from "@/components/FrontPageHeader";
import Popup from "@/components/PopUp";
import RunningBanner from "@/components/RunningBanner";
import Star from "../../public/pics/star.svg"; // Tjek importen!

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

  const bannerItems = [
    <div key="1" className="text-xl font-bold">FOO FEST</div>,
    <div key="2" className="text-xl font-bold">MARCH 24th - 28th, 2025</div>,
    <div key="3" className="text-xl font-bold">
      <Image
        src={Star}
        alt="star"
        width={35}
        height={35}
        priority
      />
    </div>,
  ];

  const closeModal = () => setIsModalOpen(false);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Popup isOpen={isModalOpen} closeModal={closeModal} />
      <FrontPageHeader />
      <RunningBanner items={bannerItems} speed="medium" />
    </div>
  );
}
