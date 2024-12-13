import React, { useState, useEffect } from "react";
import Image from "next/image";
import backgroundCard from "../../public/pics/card.png";
import backgroundWhite from "../../public/pics/white.png";
import Loading from "./Loading";

function Camping({ selectedCampingArea, setCampingArea, ticketCount }) {
  const [campingData, setCampingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://peach-polar-planarian.glitch.me/available-spots")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch camping data");
        }
        return response.json();
      })
      .then((data) => {
        setCampingData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching camping data:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading/>;
  }

  if (error) {
    return <p className="text-center">Error: {error}</p>;
  }

  if (campingData.length === 0) {
    return <p className="text-center">No camping options available.</p>;
  }

  return (
    <div className="pt-[50px]">
      <div>
        <h3 className="text-2xl font-bold mb-4">Choose a Camping Area</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-1 w-[400px] m-auto mt-10 lg:grid-cols-1 gap-5">
          {campingData.map((area) => {
            // Disable if not enough spots or no spots available
            const isDisabled = area.available < ticketCount || area.available === 0;
            const isSelected = selectedCampingArea === area.area;

            return (
              <li
                key={area.area}
                onClick={() => {
                  if (!isDisabled) setCampingArea(area.area);
                }}
                className={`relative group p-4 rounded-lg ${
                  isDisabled
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer"
                } ${isSelected ? "border-white" : "border-transparent"}`}
              >
                <div className={`absolute inset-0  before:content-[''] before:absolute before:-top-1 before:-right-8 before:-z-10 before:w-full before:h-24 before:border-[8px] before:border-[#881523]   before:opacity-100 before:rounded-lg transition-all duration-500 ease-out group-hover:top-[1rem] group-hover:left-[1rem] ${
                    isSelected ? "before:border-[white]" : ""}`}></div>

                <div
                  className="relative w-full  p-8 group-hover:translate-x-4 group-hover:translate-y-4 transition-all duration-500 ease-out rounded-2xl flex flex-col justify-center items-center ${
                    "
                >
                  <div className="absolute rounded-xl inset-0 z-0">
                    <Image
                      src={isSelected ? backgroundWhite : backgroundCard}
                      alt="Camping area background"
                      layout="fill"
                      objectFit="cover"
                      quality={100}
                      className="w-full rounded-xl"
                    />
                  </div>

                  <div className="relative flex justify-between gap-10">
                    <h4 className={`text-lg ${
                    isSelected ? "text-black":""}`}>{area.area}</h4>
                    <p className={`opacaity-50 ${
                    isSelected ? "text-black":""}`}>
                      {area.available}/{area.spots} spots available
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Camping;
