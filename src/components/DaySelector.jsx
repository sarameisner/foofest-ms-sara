import React from "react";

const DaySelector = ({ onDayChange, selectedDay }) => {
  const dayMapping = {
    Monday: "mon",
    Tuesday: "tue",
    Wednesday: "wed",
    Thursday: "thu",
    Friday: "fri",
    Saturday: "sat",
    Sunday: "sun",
  };

  const handleDayClick = (day) => {
    onDayChange(dayMapping[day]);
  };

  return (
    <div className="grid grid-cols-2 ">
    
      <div>
        {["Monday", "Tuesday", "Wednesday", "Thursday"].map((day) => (
          <button
          style={{ backgroundColor: "transparent" }}
            key={day}
            onClick={() => handleDayClick(day)}
            className="w-full text-start font-bold mb-2 text-white uppercase"
          >
            {selectedDay === dayMapping[day] && "☆"} 
            {day}
          </button>
        ))}
      </div>

      
      <div>
        {["Friday", "Saturday", "Sunday", "All"].map((day) => (
          <button
          style={{ backgroundColor: "transparent" }}
            key={day}
            onClick={() => handleDayClick(day)}
            className="w-full font-bold text-start mb-2 text-white uppercase"
    
          >
            {selectedDay === dayMapping[day] || day === "All" ? "☆" : null}
            {day}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DaySelector;
