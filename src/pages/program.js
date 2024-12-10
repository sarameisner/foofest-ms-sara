"use client";
import Banner from "@/components/Banner";
import React, { useEffect, useState } from "react";

const Program = () => {
  const [schedule, setSchedule] = useState({});
  const [bands, setBands] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const scheduleRes = await fetch("https://peach-polar-planarian.glitch.me/schedule");
        const scheduleData = await scheduleRes.json();
        setSchedule(scheduleData); // Sæt schedule i state

        const bandsRes = await fetch("https://peach-polar-planarian.glitch.me/bands"); // Hent bands.json
        const bandsData = await bandsRes.json();
        setBands(bandsData); // Sæt bands i state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const stages = Object.keys(schedule); // Få scener fra schedule

  return (
    <div>
      <Banner text="PROGRAM" />

      <div className="mt-10 p-4">
        <h3 className="text-2xl font-bold mb-4">Filter by Stage</h3>

        <div className="grid grid-cols-3 w-[1200px] m-auto">
          {stages.map((stage) => (
            <div key={stage} className="">
              <h4 className="text-xl text-center font-bold mb-4 uppercase">{stage}</h4>
              <div className="space-y-2">
                {/* Bands under scenen */}
                {Object.entries(schedule[stage]).map(([day, acts]) =>
                  acts.map((act, index) => (
                    <div key={index} className="grid grid-cols-[6fr,1fr,1fr] text-white  items-center">
                      <span className="uppercase">{act.act}</span>
                      <span>-</span>
                      <span className="text-gray-500">{act.start}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Program;
