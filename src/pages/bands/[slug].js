import React, { useEffect, useState } from "react";
import { useRouter } from "next/router"; // Importer useRouter
import Image from "next/image";
import ButtonWIcon from "@/components/ButtonWIcon";
import Banner from "@/components/Banner";
import Hjerte from "../../../public/pics/heart.svg";

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
          const res = await fetch(`https://peach-polar-planarian.glitch.me/bands/${slug}`);
          if (!res.ok) throw new Error("Failed to fetch band details.");
          const bandData = await res.json();
          setBandDetails(bandData);
  
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
  
    const handleAddToFavorites = () => {
        if (!bandSchedule) {
          console.error("No schedule information available for this band.");
          return;
        }
      
        const favoriteBand = {
          name: bandDetails.name,
          bio: bandDetails.bio,
          logo: bandDetails.logo,
          day: bandSchedule.day,
          time: bandSchedule.time,
          stage: bandSchedule.stage,
        };
      
        const existingFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        const updatedFavorites = [...existingFavorites, favoriteBand];
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        console.log(`${bandDetails.name} added to favorites!`);
      };
  
    let bandSchedule = null;
    if (schedule) {
      for (const [stage, days] of Object.entries(schedule)) {
        for (const [day, acts] of Object.entries(days)) {
          const foundAct = acts.find((act) => act.act === bandDetails.name);
          if (foundAct) {
            bandSchedule = {
              day: day,
              time: foundAct.start,
              stage,
            };
            break;
          }
        }
        if (bandSchedule) break;
      }
    }
  
    const imageUrl = "https://peach-polar-planarian.glitch.me/logos/" + bandDetails.logo;
  
    return (
      <div>
        <Banner text={bandDetails.name} />
  
        <div className="grid max-w-[1000px] m-auto grid-cols-1 mt-10 mb-52 md:grid-cols-2 gap-20">
          <div className="relative w-full h-64 md:h-96 px-4 md:px-0">
            <div className="relative p-2 w-96 before:content-[''] before:absolute before:-top-4 before:-right-4 before:-z-10 before:w-full before:h-full before:border-[8px] before:border-[#881523] before:opacity-100 before:rounded-lg">
              <img src={imageUrl} alt="{bandDetails.name}" />
            </div>
          </div>
          <div className="px-4 md:px-0">
            {bandSchedule && (
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
            )}
            <p className="mb-10">{bandDetails.bio}</p>
            <div className="flex justify-center mt-10">
              <ButtonWIcon
                text="Add to your favorite"
                defaultIcon={<Image src={Hjerte} alt="Heart Icon" width={20} height={20} />}
                defaultBgColor="#881523"
                onClick={handleAddToFavorites}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default BandDetails;
  