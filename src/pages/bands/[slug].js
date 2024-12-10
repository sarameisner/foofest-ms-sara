"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import ButtonWIcon from "@/components/ButtonWIcon";
import Banner from "@/components/Banner";
import Hjerte from "../../../public/pics/heart.svg";

const daysMap = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
};

const BandDetails = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [schedule, setSchedule] = useState(null);
  const [bandDetails, setBandDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        // Fetch band details
        const res = await fetch(`https://peach-polar-planarian.glitch.me/bands/${slug}`);
        if (!res.ok) throw new Error("Failed to fetch band details.");
        const bandData = await res.json();
        setBandDetails(bandData);

        // Fetch schedule data
        const scheduleRes = await fetch("https://peach-polar-planarian.glitch.me/schedule");
        if (!scheduleRes.ok) throw new Error("Failed to fetch schedule data.");
        const scheduleData = await scheduleRes.json();
        setSchedule(scheduleData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (!bandDetails) return <p>Band not found</p>;

  // Match bandet med schedule-data for at finde dag, tid og scene
  let bandSchedule = null;
  if (schedule) {
    for (const [stage, days] of Object.entries(schedule)) {
      for (const [day, acts] of Object.entries(days)) {
        const foundAct = acts.find((act) => act.act === bandDetails.name);
        if (foundAct) {
          bandSchedule = {
            day: day, // Brug forkortelsen (f.eks. 'Mon', 'Tue', etc.)
            time: foundAct.start, // Brug start-tidspunkt
            stage,
          };
          break;
        }
      }
      if (bandSchedule) break; // Exit outer loop hvis bandet findes
    }
  }

  let imageUrl = "https://peach-polar-planarian.glitch.me/logos/" + bandDetails.logo;

  if ((bandDetails.logo = "")) {
  }
  return (
    <div>
      {/* Banner med bandets navn */}
      <Banner text={bandDetails.name} />

      <div className="grid max-w-[1000px] m-auto grid-cols-1 mt-10 mb-52 md:grid-cols-2 gap-20">
        {/* Første kolonne: Billede */}
        <div className="relative w-full h-64 md:h-96 px-4 md:px-0">
          {" "}
          {/* Tilføj padding kun på mobil */}
          <img src={imageUrl} alt="{bandDetails.name}"></img>
        </div>

        <div className="px-4 md:px-0">
          {" "}
          {/* Tilføj padding kun på mobil */}
          {/* Dag, tidspunkt og scene */}
          {bandSchedule ? (
            <div className="grid grid-cols-3 md:grid-rows-3 gap-4">
              <p className="text-center md:text-left mb-2">
                <span className="text-xl uppercase">{bandSchedule.day}</span>
              </p>
              <p className="text-center md:text-left mb-2">
                <span className="text-xl">{bandSchedule.time}</span>
              </p>
              <p className="text-center md:text-left mb-2">
                <span className="text-xl uppercase">{bandSchedule.stage}</span>
              </p>
            </div>
          ) : (
            <p className="text-gray-500">No schedule information available.</p>
          )}
          <p className="mb-10">{bandDetails.bio}</p>
          {/* Knap centreret på mobil */}
          <div className="block md:hidden flex items-center justify-center mt-10">
            <ButtonWIcon text="Add to your favorite" defaultIcon={<Image src={Hjerte} alt="Default Icon" width={20} height={20} />} activeIcon={<Image src={Hjerte} alt="Active Icon" width={20} height={20} />} defaultBgColor="#881523" activeBgColor="#ffffff" onClick={() => console.log("Button toggled!")} />
          </div>
          {/* Knap synlig på både mobil og desktop, men ikke centreret på desktop */}
          <div className="hidden md:block flex justify-center mt-10">
            <ButtonWIcon text="Add to your favorite" defaultIcon={<Image src={Hjerte} alt="Default Icon" width={20} height={20} />} activeIcon={<Image src={Hjerte} alt="Active Icon" width={20} height={20} />} defaultBgColor="#881523" activeBgColor="#ffffff" onClick={() => console.log("Button toggled!")} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BandDetails;
