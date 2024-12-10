"use client";
import Banner from "@/components/Banner";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import StageFiltering from "@/components/Stagefiltering"; // For Stage Filtering
import DayFiltering from "@/components/DayFiltering"; // Ny dropdown til dagene

const Program = () => {
  const [schedule, setSchedule] = useState({});
  const [bands, setBands] = useState([]);
  const [day, setDay] = useState("all");
  const [selectedStage, setSelectedStage] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const scheduleRes = await fetch("https://peach-polar-planarian.glitch.me/schedule");
        const scheduleData = await scheduleRes.json();
        if (!scheduleRes.ok) throw new Error("Failed to fetch schedule data");
        setSchedule(scheduleData);

        const bandsRes = await fetch("https://peach-polar-planarian.glitch.me/bands");
        const bandsData = await bandsRes.json();
        if (!bandsRes.ok) throw new Error("Failed to fetch bands data");
        setBands(bandsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleStageChange = (value) => {
    setSelectedStage(value);
  };

  const handleDayChange = (value) => {
    setDay(value);
  };

  const filterSchedule = () => {
    if (selectedStage === "all") {
      return schedule;
    } else if (selectedStage && schedule[selectedStage]) {
      return { [selectedStage]: schedule[selectedStage] };
    } else {
      return schedule;
    }
  };

  const filterDay = (filteredSchedule) => {
    if (day === "all") {
      return filteredSchedule;
    }

    const filtered = {};
    Object.entries(filteredSchedule).forEach(([stage, stageData]) => {
      const filteredDays = Object.entries(stageData).reduce((acc, [dayKey, acts]) => {
        if (dayKey === day) {
          acc[dayKey] = acts;
        }
        return acc;
      }, {});

      if (Object.keys(filteredDays).length > 0) {
        filtered[stage] = filteredDays;
      }
    });

    return filtered;
  };

  const filteredSchedule = filterDay(filterSchedule());

  const stages = [
    { value: "all", label: "All stages" },
    { value: "Midgard", label: "Midgard" },
    { value: "Vanaheim", label: "Vanaheim" },
    { value: "Jotunheim", label: "Jotunheim" },
  ];

  const days = [
    { value: "all", label: "All days" },
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
    { value: "Sunday", label: "Sunday" },
  ];

  return (
    <div>
      <Banner text="PROGRAM" />
      <div className="mt-10 p-4">
        {/* Filter Section */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-10 justify-center mb-8">
          <h3 className="text-2xl text-center sm:text-left">Filter by...</h3>
          <div className="flex gap-4">
            {/* Stage Filtering with Custom Dropdown */}
            <StageFiltering
              options={stages}
              onChange={handleStageChange} // Handle stage change here
            />
            {/* Day Filtering with Custom Day Dropdown */}
            <DayFiltering
              options={days}
              onChange={handleDayChange} // Handle day change here
            />
          </div>
        </div>

        {/* Schedule Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 w-full max-w-[1200px] mx-auto pb-52">
  {Object.entries(filteredSchedule).length === 0 ? (
    <div className="text-center text-gray-500 col-span-full">No data available for this filter</div>
  ) : (
    Object.entries(filteredSchedule).map(([stage, days]) => (
      <div key={stage} className=" p-4">
        <h3 className="text-xl text-center font-bold mb-5 uppercase">{stage}</h3>
        <div className="space-y-2">
          {Object.entries(days).map(([dayKey, acts]) => (
            <div key={dayKey}>
              <h4 className="text-center">{dayKey}</h4>
              {acts.map((act, index) => (
  <div key={index} className="grid grid-cols-[6fr,1fr,1fr] text-white items-center">
    <span className="uppercase">
      {/* Link to band's specific page */}
      <Link href={`/bands/${act.act.toLowerCase().replace(/ /g, "-")}`}>
        {act.act}
      </Link>
    </span>
    <span>-</span>
    <span className="text-white">{act.start}</span>
  </div>
))}
            </div>
          ))}
        </div>
      </div>
    ))
  )}
</div>
      </div>
    </div>
  );
};

export default Program;
