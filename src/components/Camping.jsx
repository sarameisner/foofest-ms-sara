import React, { useContext } from "react";
import Image from "next/image";
import backgroundCard from "../../public/pics/card.png";
import backgroundWhite from "../../public/pics/white.png";
import { CartContext } from "../contexts/CartContext";
import Loading from "./Loading";

function Camping() {
  const { campingData, loading, error, selectedCamping, setSelectedCamping } = useContext(CartContext);

  // Håndterer indlæsningsstatus og fejl
  if (loading) return <Loading />;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!campingData || campingData.length === 0) return <p className="text-center">No camping options available.</p>;

  return (
    <div className="mt-10">
      <h2 className="text-center text-xl font-bold mb-6">Select Your Camping Area</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-1 w-[400px] m-auto mt-5 lg:grid-cols-1 gap-5">
        {campingData.map((area) => {
          const isDisabled = area.available === 0;
          const isSelected = selectedCamping === area.area;

          return (
            <li
              key={area.area}
              onClick={() => {
                if (!isDisabled) setSelectedCamping(area.area);
              }}
              className={`relative group p-4 rounded-lg ${isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"} ${isSelected ? "border-[#881523]" : "border-transparent"} border-2`}
            >
              <div className="relative w-full p-8 group-hover:translate-x-4 group-hover:translate-y-4 transition-all duration-500 ease-out rounded-2xl flex flex-col justify-center items-center">
                <div className="absolute rounded-xl inset-0 z-0">
                  <Image src={isSelected ? backgroundWhite : backgroundCard} alt="Camping area background" layout="fill" objectFit="cover" quality={100} className="w-full rounded-xl" />
                </div>
                <div className="relative flex flex-col items-center gap-2">
                  <h4 className={`text-lg ${isSelected ? "text-black" : "text-white"}`}>{area.area}</h4>
                  <p className={`opacity-70 ${isSelected ? "text-black" : "text-white"}`}>
                    {area.available}/{area.spots} spots available
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Camping;
