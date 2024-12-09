"use client";
import React from "react";
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";
import BottomNav from "../components/BottomNav";
import FrontPageHeader from "@/components/FrontPageHeader";

export default function Home() {
  return (
    <div className="layout-wrapper">
      {/* top navigation (kun synlig på desktop) */}
      <div className="hidden md:block">
        <TopNav />
      </div>

      {/* forsidens hovedindhold */}
      <FrontPageHeader />

      {/* footer */}
      <Footer />

      {/* bottom navigation (kun synlig på mobil) */}
      <div className="block md:hidden">
        <BottomNav />
      </div>
    </div>
  );
}
