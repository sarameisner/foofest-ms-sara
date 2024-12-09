
import { useState } from "react";

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
    <div>
      {Object.keys(dayMapping).map((day) => (
        <button
          key={day}
          onClick={() => handleDayClick(day)}

        >
          {selectedDay === dayMapping[day] && "☆"} {/* Fremhæv den valgte dag med en stjerne */}
          {day}
        </button>
      ))}
    </div>
  );
};

export default DaySelector;
