"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Band from "@/components/Band"; 
import FrontPage from "../../public/pics/frontpagepic.jpg";
import DaySelector from "@/components/DaySelector";
import Loading from "@/components/Loading";


const Schedule = () => {
  // state til at gemme festialen skema
  const [schedule, setSchedule] = useState({});
  // state til at gemem lsiten af bands
  const [bands, setBands] = useState([]);
  //state til at hold styr på den valgte dag
  const [day, setDay] = useState(null);
  //state for vise/hide loading indikator
  const [loading, setLoading] = useState(true);
  
  
  // Fetch schedule and band data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const scheduleRes = await fetch("https://peach-polar-planarian.glitch.me/schedule");
        const scheduleData = await scheduleRes.json(); //gem data i state
        
        setSchedule(scheduleData);

        const bandsRes = await fetch("https://peach-polar-planarian.glitch.me/bands");
        const bandsData = await bandsRes.json();
        
        setBands(bandsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Når data er hentet, stop med at loade
      }
    };

    fetchData(); // kald fetchData ved første render
  }, []); // tomt afhængigsarray betyder at effekt kun kører én gnag ved første render

  const filterBands = (day) => {
    setDay(day); // opdaterer den valgte dag i state
  };

  if (loading) {
    return <Loading />; // Vis Loading-komponenten, mens data bliver hentet
  }

  return (
    <div>
    <div className="p-[--padding-5] mt-[--padding-150]">
      {/* Background Image */}
      <div className="relative h-[10rem]">
        <Image
          src={FrontPage}
          alt="Background"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="absolute inset-0"
        />

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-[--font-color]">
          <h1 className="text-4xl font-bold">LINE UP</h1>
        </div>

        <div className="hidden md:block absolute top-1/2 left-4 transform -translate-y-1/2">
          <DaySelector onDayChange={filterBands} selectedDay={day} />
        </div>

        <div className="block md:hidden mt-[--padding-5] z-10 align-self-center">
          <div className="absolute top-52 left-[55%] transform -translate-x-1/2 -translate-y-1/2 text-center">
            <DaySelector onDayChange={filterBands} selectedDay={day} />
          </div>
        </div>
      </div>
      {/* Band Grid */}
      <div className="flex flex-row flex-wrap w-[80vw] m-auto justify-center lg:grid-cols-5 gap-3 mt-[--padding-150] pb-[--padding-50]">
       
        {bands.map((band, index) => {
          let isBandPlaying = false;
 {/* Kontroller om bandet spiller den dag */ }
          if (day) {
            Object.entries(schedule).forEach(([stage, days]) => {
              if (
                days[day] &&
                days[day].some(
                  (act) => act.act.toLowerCase() === band.name.toLowerCase()
                )
              ) {
                isBandPlaying = true;
              }
            });
          }

          return (
            <Band
              key={index}
              band={band}
              isBandPlaying={isBandPlaying}
              index={index}
            />
          );
        })}
      </div>
      
    </div>
    </div>
  );
};

export default Schedule;
