"use client";
import Banner from "@/components/Banner";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import StageFiltering from "@/components/Stagefiltering"; // For stage filtering
import DayFiltering from "@/components/DayFiltering";
import Head from "next/head";
import Loading from "@/components/Loading"; // For days filtering

const Program = () => {
    //state for gemme festivallens schedule
  const [schedule, setSchedule] = useState({});
  // state for at gemme banddata
  const [bands, setBands] = useState([]);
  // state til at gemme den valgte data
  const [day, setDay] = useState("all");
  //State til at gemme den valgte scene
  const [selectedStage, setSelectedStage] = useState("all");
  // state til at håndtere loading status
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Henter programdata
        const scheduleRes = await fetch("https://peach-polar-planarian.glitch.me/schedule");
        const scheduleData = await scheduleRes.json();
        if (!scheduleRes.ok) throw new Error("Failed to fetch schedule data");
        setSchedule(scheduleData); // Sætter hentet programdata i state

        // Henter banddata
        const bandsRes = await fetch("https://peach-polar-planarian.glitch.me/bands");
        const bandsData = await bandsRes.json();
        if (!bandsRes.ok) throw new Error("Failed to fetch bands data");
        setBands(bandsData); // Sætter hentet bands data i state
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Når data er hentet (eller fejl), sæt loading til false
      }
    };

    fetchData(); // Kalder fetchData for at hente data
  }, []); // Tomt afhængighedsarray betyder, at effekten kun kører én gang ved første render

  // Funktion til at håndtere ændringer i den valgte scene
  const handleStageChange = (value) => {
    setSelectedStage(value); // Opdaterer den valgte scene
  };

  const handleDayChange = (value) => {
    setDay(value); // Opdaterer den valgte dag
  };

  // Funktion til at filtrere programmet baseret på den valgte scene
  const filterSchedule = () => {
    if (selectedStage === "all") {
      return schedule; // Hvis "all" er valgt, returneres hele programmet
    } else if (selectedStage && schedule[selectedStage]) {
      // Hvis en specifik scene er valgt og den findes i programmet
      return { [selectedStage]: schedule[selectedStage] }; // Returner kun den valgte scene
    } else {
      return schedule; // Hvis ingen scene findes, returneres hele programmet
    }
  };

  // Funktion til at filtrere programmet, men den virker altså ikke æv
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
        filtered[stage] = filteredDays; // Hvis der er fundet nogen aktører for den valgte dag, tilføjes scenen til det filtrerede program
      }
    });

    return filtered;
  };
  if (loading) {
    return <Loading />; // Vis Loading-komponenten, mens data bliver hentet
  }

  // Filtrerer programmet baseret på både den valgte scene og dag
  const filteredSchedule = filterDay(filterSchedule());

  // Definerer mulighederne for de valgte scener
  const stages = [
    { value: "all", label: "All stages" },
    { value: "Midgard", label: "Midgard" },
    { value: "Vanaheim", label: "Vanaheim" },
    { value: "Jotunheim", label: "Jotunheim" },
  ];

  // Definerer mulighederne for de valgte dage
  const days = [
    { value: "all", label: "All days" },
    { value: "mon", label: "Monday" },
    { value: "tue", label: "Tuesday" },
    { value: "wed", label: "Wednesday" },
    { value: "thu", label: "Thursday" },
    { value: "fri", label: "Friday" },
    { value: "sat", label: "Saturday" },
    { value: "sun", label: "Sunday" },
  ];

  return (
    <>

    <Head>
      <title>Program</title>
      <meta name="description" content="Review and manage your festival tickets. Checkout to secure your spot at the event!" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <div>
      <Banner text="PROGRAM" />
      <div className="mt-[--padding-10] p-[--padding-5]">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-10 justify-center mb-8">
          <h3 className="text-2xl text-center sm:text-left">Filter by...</h3>
          <div className="flex gap-4">
            <StageFiltering options={stages} onChange={handleStageChange} />

            <DayFiltering options={days} onChange={handleDayChange} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 w-full max-w-[1200px] mx-auto pb-[--padding-200]">
          {Object.entries(filteredSchedule).length === 0 ? (
            <div className="text-center text-gray-500 col-span-full">No data available for this filter</div>
          ) : (
            Object.entries(filteredSchedule).map(([stage, days]) => (
              <div key={stage} className=" p-4">
                <h2 className="text-xl text-center font-bold mb-[--padding-5] uppercase">{stage}</h2>
                <div className="space-y-2">
                  {Object.entries(days).map(([dayKey, acts]) => (
  <div key={dayKey}>
    <h3 className="text-center">{dayKey}</h3>
    {acts
      ?.filter((event) => event.act.toLowerCase() !== "break") // Filtrer "break" ud
      .map((act, index) => (
        <div key={index} className="grid grid-cols-[6fr,1fr,1fr] text-[--font-color] items-center">
          <span className="uppercase">
            <Link href={`/bands/${bands.find(band => band.name === act.act)?.slug || act.act}`}>
              {act.act}
            </Link>
          </span>
          <span>-</span>
          <span className="text-[--font-color]">{act.start}</span>
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
    </>
  );
};

export default Program;
