import React, { useState, useEffect } from "react";

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
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-1">
        <h3 className="text-2xl font-bold text-[var(--font-color)] mb-4">Choose a Camping Area</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {campingData.map((area) => (
            <li key={area.area} onClick={() => setCampingArea(area.area)} className={`p-4 border rounded-lg cursor-pointer ${selectedCampingArea === area.area ? "bg-[var(--accent-color)] text-white" : "bg-[var(--background)] text-[var(--font-color)] hover:bg-gray-700"}`}>
              <h4 className="text-lg font-semibold">{area.area}</h4>
              <p>
                {area.available}/{area.spots} spots available
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Camping;
