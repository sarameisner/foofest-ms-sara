"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import Banner from "@/components/Banner";

const BandDetails = () => {
  const router = useRouter();
  const { slug } = router.query; 
  const [bandDetails, setBandDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return; // Vent på, at slug bliver tilgængelig

    const fetchBandDetails = async () => {
      try {
        const res = await fetch(`https://peach-polar-planarian.glitch.me/bands/${slug}`);
        if (!res.ok) throw new Error("Failed to fetch band details.");
        const data = await res.json();
        setBandDetails(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching band details:", error);
      }
    };

    fetchBandDetails();
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (!bandDetails) return <p>Band not found</p>;

  return (

    <div className="p-6">
            <Banner text={bandDetails.name}/>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Første kolonne: Billede */}
        <div className="relative w-full h-64 md:h-96">
          <Image
            src={bandDetails.logo.startsWith("http") ? bandDetails.logo : `/uploads/${bandDetails.logo}`} 
            alt={bandDetails.name}
            fill
            objectFit="cover"
            className="rounded-lg"
          />
        </div>

        {/* Anden kolonne: Band detaljer */}
        <div>

          {/* Dag og tidspunkt */}
          <p className="mb-2">
            <span className="font-semibold">Day:</span> {bandDetails.day}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Time:</span> {bandDetails.time}
          </p>

          {/* Scene */}
          <p className="mb-2">
            <span className="font-semibold">Stage:</span> {bandDetails.stage}
          </p>

          {/* Beskrivelse */}
          <h2 className="text-2xl font-semibold mt-6">Description</h2>
          <p className="mb-4">{bandDetails.description}</p>

          {/* Knap */}
          <button
            className="bg-[#881523] text-white px-4 py-2 rounded-md hover:bg-[#a71a2d] transition-colors"
            onClick={() => alert(`You clicked on ${bandDetails.name}`)}
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default BandDetails;

