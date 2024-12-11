import React, { useState, useEffect } from "react";
import Image from "next/image"; // Don't forget to import Image if you're using Next.js
import backgroundCard from "../../public/pics/card.png";

function Camping({ selectedCampingArea, setCampingArea }) {
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
    return <p className="text-center text-[var(--font-color)]">Loading camping options...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  if (campingData.length === 0) {
    return <p className="text-center text-[var(--font-color)]">No camping options available.</p>;
  }

  return (
    <div className="">
      <div className="">
        <h3 className="text-2xl font-bold text-[var(--font-color)] mb-4">Choose a Camping Area</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-1 w-[370px]  m-auto lg:grid-cols-1 gap-12">
          {/* Map over campingData here */}
          {campingData.map((area) => (
            <li
              key={area.area}
              onClick={() => setCampingArea(area.area)}
              className={`relative group p-4 border rounded-lg cursor-pointer ${selectedCampingArea === area.area ? "border-transparent" : ""}`}
            >
              {/* Border div */}
              <div className="absolute inset-0 z-0 before:content-[''] before:absolute before:-top-5 before:-right-10 before:-z-10 before:w-full before:h-full before:border-[8px] before:border-[#881523] before:opacity-100 before:rounded-lg transition-all duration-500 ease-out group-hover:top-[1rem] group-hover:left-[1rem]"></div>
    
              {/* Content div with area name and availability, move together on hover */}
              <div className="relative z-10 p-8 w-96 h-full group-hover:translate-x-4 group-hover:translate-y-4 transition-all duration-500 ease-out rounded-2xl  flex flex-col justify-center items-center">
                
                {/* Background Image (Placeholder Image) */}
                <div className="absolute rounded-xl inset-0 z-0">
                  <Image
                    src={backgroundCard} // Replace with an actual background image if needed
                    alt="Camping area background"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                    className="rounded-xl"
                  />
                </div>
    
                {/* Area Details */}
                <div className="relative z-10 text-center">
                  <h4 className="text-lg font-semibold mb-2">{area.area}</h4>
                  <p className="text-xl font-bold mb-2">
                    {area.available}/{area.spots} spots available
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Camping;
