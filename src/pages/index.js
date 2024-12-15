"use client";
import React, { useState, useEffect } from "react";
import Loading from "@/components/Loading";
import FrontPageHeader from "@/components/FrontPageHeader";
import Popup from "@/components/PopUp";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true); 

  setTimeout(() => {
    setLoading(false); // Data er hentet, fjern loading
  }, 100); // Simuler en forsinkelse på 3 sekunder for demonstration

  // Åbn modal automatisk når komponenten først bliver indlæst
  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  
  const closeModal = () => {
    setIsModalOpen(false); // Luk modal
  };
  if (loading) {
    return <Loading />; // Vis Loading-komponenten, mens data bliver hentet
  }
  const bannerItems = [
    <div key="1" className="text-xl font-bold">FOO FEST</div>,
    <div key="2" className="text-xl font-bold">DECEMBER 2TH - 20th, 2024</div>,
      <div key="3" className="text-xl font-bold">
      <Image
        src={Star}
        alt="Star"
        width={35} 
        height={35} 
        priority 
      />
    </div>,

  return (
    <div>
      <Popup isOpen={isModalOpen} closeModal={closeModal}  />
     <FrontPageHeader/>
    </div>
  );
}
