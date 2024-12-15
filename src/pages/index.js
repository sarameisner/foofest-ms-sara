"use client";

import React, { useState, useEffect } from "react";
import Loading from "@/components/Loading";
import FrontPageHeader from "@/components/FrontPageHeader";
import Popup from "@/components/PopUp";


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

 

  const closeModal = () => setIsModalOpen(false);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Popup isOpen={isModalOpen} closeModal={closeModal} />
      <FrontPageHeader />
    </div>
  );
}
