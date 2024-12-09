"use client";
import React from "react";
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";
import BottomNav from "../components/BottomNav";



export default function Home() {
  return (
    <div className="layout-wrapper">
    <div className="hidden md:block">
      <TopNav />
    </div>
    <Footer />

 
    <div className="block md:hidden">
      <BottomNav />
    </div>
  </div>
  );
}
