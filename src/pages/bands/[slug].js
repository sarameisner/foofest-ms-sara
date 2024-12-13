import React, { useEffect, useState } from "react";
import { useRouter } from "next/router"; // Importer useRouter
import Image from "next/image";
import ButtonWIcon from "@/components/ButtonWIcon";
import Banner from "@/components/Banner";
import Hjerte from "../../../public/pics/heart.svg";
import SortHjerte from "../../../public/pics/blackheart.svg";
import Loading from "@/components/Loading";

const BandDetails = () => {
  // Vi ruger  router til at få adgang til `slug`
  const router = useRouter();
  const { slug } = router.query;

  // State variabler til at gemme de hentede data
  const [schedule, setSchedule] = useState(null);
  const [bandDetails, setBandDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect der henter data, når `slug` ændres
  useEffect(() => {
    // Hvis `slug` ikke er tilgængelig, gør vi ikke noget
    if (!slug) return;

    // hunktion til at hente band data og tidsplan data
    const fetchData = async () => {
      try {
        // henter detaljer om det specifikke band baseret på slug
        const res = await fetch(`https://peach-polar-planarian.glitch.me/bands/${slug}`);
        if (!res.ok) throw new Error("Fejl ved hentning af band detaljer."); // fejl afhentning besked
        const bandData = await res.json(); // parser banddetaljerne til JSON
        setBandDetails(bandData); // gem banddata i state

        // henter data ligesom oven over, bare med schedule data
        const scheduleRes = await fetch("https://peach-polar-planarian.glitch.me/schedule");
        if (!scheduleRes.ok) throw new Error("Fejl ved hentning af tidsplan data.");
        const scheduleData = await scheduleRes.json();
        setSchedule(scheduleData);

        setLoading(false); // sætter loading til false når data er hentet
      } catch (error) {
        console.error("Fejl ved hentning af data:", error);
      }finally {
        setLoading(false); // Når data er hentet, stop med at loade
      }
    };

    // call funktionen til at hente data
    fetchData();
  }, [slug]);

  if (loading) {
    return <Loading />; // Vis Loading-komponenten, mens data bliver hentet
  }

  if (!bandDetails) return <p>Bandet blev ikke fundet</p>;

  // funktion til at tilføje bandet til brugerens favoritter
  const handleAddToFavorites = () => {
    // tjekker om der er tidsplaninformation tilgængelig for bandet
    if (!bandSchedule) {
      console.error("Der er ikke tidsplaninformation tilgængelig for dette band.");
      return;
    }

    // Opretter et objekt til favorit siden, til hjælpe af localstoarage neden under.
    const favoriteBand = {
      name: bandDetails.name,
      bio: bandDetails.bio,
      logo: bandDetails.logo,
      day: bandSchedule.day,
      time: bandSchedule.time,
      stage: bandSchedule.stage,
    };

    // Henter eksisterende favoritter fra localStorage, eller en tom array hvis der ikke er nogen
    const existingFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const updatedFavorites = [...existingFavorites, favoriteBand]; // Tilføjer det nuværende band til favoritter

    // Gemmer de opdaterede favoritter tilbage i localStorage
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    console.log(`${bandDetails.name} blev tilføjet til favoritter!`);
  };

  // Finder bandets tidsplan i `schedule` data
  let bandSchedule = null;
  if (schedule) {
    // Går igennem hver scene i tidsplanen
    for (const [stage, days] of Object.entries(schedule)) {
      // Går igennem hver dag i scenens tidsplan
      for (const [day, acts] of Object.entries(days)) {
        // Finder den handling (band) der matcher det nuværende bands navn
        const foundAct = acts.find((act) => act.act === bandDetails.name);
        if (foundAct) {
          // Hvis fundet, sætter vi bandSchedule objektet med dag, tid og scene
          bandSchedule = {
            day: day,
            time: foundAct.start,
            stage,
          };
          break; // Stopper løkken når bandet er fundet
        }
      }
      if (bandSchedule) break; // stopper den ydre løkke hvis bandSchedule er sat
    }
  }
  let imageUrl;
  if (bandDetails.logo.match(/[^/]+(jpg|png)$/)) {
    imageUrl = "https://peach-polar-planarian.glitch.me/logos/" + bandDetails.logo;
  } else {
    imageUrl = bandDetails.logo;
  }

  return (
    <div>
      <Banner text={bandDetails.name} />

      <div className="grid max-w-[1000px] m-auto grid-cols-1 mt-10 mb-52 md:grid-cols-2 gap-20">
        <div className="relative w-full h-64 md:h-96 px-4 md:px-0">
          <div className="relative p-2 w-96 before:content-[''] before:absolute before:-top-4 before:-right-4 before:-z-10 before:w-full before:h-full before:border-[8px] before:border-[#881523] before:opacity-100 before:rounded-lg">
            <img src={imageUrl} alt={bandDetails.name} className="rounded-lg" />
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
            <ButtonWIcon text="Add to your favorite" defaultIcon={<Image src={Hjerte} alt="Heart Icon" width={20} height={20} />} activeIcon={<Image src={SortHjerte} alt="Active Icon" width={20} height={20} />} defaultBgColor="#881523" onClick={handleAddToFavorites} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BandDetails;
