"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import FrontPage from "../../public/pics/frontpagepic.jpg";
import DaySelector from "@/components/DaySelector";

const Schedule = () => {
  const [schedule, setSchedule] = useState({});
  const [bands, setBands] = useState([]);
  const [day, setDay] = useState("all");

  // Hent både schedule og banddata samtidigt
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

  // Opdater valgt dag
  const filterBands = (day) => {
    setDay(day);
  };

  return (
    <div className="p-6 mt-40">
      {/* Baggrundsbillede */}
      <div className="relative h-[10rem]">
  <Image
    src={FrontPage}
    alt="Background"
    layout="fill"
    objectFit="cover" // Sikrer at billedet fylder containeren uden at blive forvrænget
    objectPosition="center" // Centrerer billedet
    className="absolute inset-0"
  />

  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
    <h1 className="text-4xl font-bold">LINE UP</h1>
  </div>


  <div className="hidden md:block absolute top-1/2 left-4 transform -translate-y-1/2">
    <DaySelector onDayChange={filterBands} selectedDay={day} />
  </div>

  {/* DaySelector under overskriften på mobil */}
  <div className="block md:hidden mt-4">
    <div className="text-center">
      <DaySelector onDayChange={filterBands} selectedDay={day} />
    </div>
  </div>
</div>

      {/* Grid til visning af bands */}
      <div className="flex flex-row flex-wrap w-[80vw] m-auto justify-center lg:grid-cols-5 gap-3 mt-28">
        {/* Vis alle bands */}
        {bands.map((band, index) => {
          // Check if the band is playing on the selected day
          let isBandPlaying = false;

          // Loop through all stages and days to check if the band plays on the selected day
          Object.entries(schedule).forEach(([stage, days]) => {
            if (days[day] && days[day].some((act) => act.act === band.name)) {
              isBandPlaying = true;
            }
          });

          return (
            <div
              key={index}
              className={`text-center ${
                isBandPlaying ? "bg-[#881523] rounded-s text-white rounded-[0.25rem] transition-all duration-300" : "bg-transparent"
              }`}
            >
              <p className="font-semibold uppercase p-1">{band.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Schedule;
