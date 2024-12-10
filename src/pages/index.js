"use client";
import React, { useState, useEffect } from "react";
import FrontPageHeader from "@/components/FrontPageHeader";
import Popup from "@/components/PopUp";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Åbn modal automatisk når komponenten først bliver indlæst
  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = () => {
    setIsModalOpen(false); // Luk modal
  };

  return (
    <div>
      <Popup isOpen={isModalOpen} closeModal={closeModal}  />
     <FrontPageHeader/>
    </div>
  );
}
