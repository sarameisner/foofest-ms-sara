"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import DaySelector from "@/components/DaySelector";


const Schedule = () => {
  const [schedule, setSchedule] = useState({});
  const [bands, setBands] = useState([]);
  const [day, setDay] = useState("mon");

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
    <div>
      <div >
        <div >
          <h1 >Programme</h1>
          <DaySelector onDayChange={filterBands} selectedDay={day} /> {/* Pass selectedDay for highlighting */}
        </div>
        <div >
          {/* Gennemgå alle scener og vis bands for den valgte dag */}
          {Object.entries(schedule).map(([stage, days]) => (
            <div>
              {days[day] && 
                days[day].map((act, index) => {
                  // Find bandet ud fra navnet på optræden
                  const band = bands.find(b => b.name === act.act);
                  return (
                    <div key={index} >
                      {act.act !== "break" && (
                        <>
                          <p>{band?.name}</p>  {/* Bandnavn */}
                         
                          <p>
                            {act.start} - {act.end}
                            {/* Vis annullering */}
                            {act.cancelled && (
                              <Image
                                src="/images/cancelled.png"
                                alt="Cancelled"
                                width={100}
                                height={70}
                
                              />
                            )}
                          </p>
                        </>
                      )}
                    </div>
                  );
                })
              }
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Schedule;
