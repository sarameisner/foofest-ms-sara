import React, { useEffect, useState } from "react";
import Banner from "@/components/Banner";
import ButtonWIcon from "@/components/ButtonWIcon";
import Hjerte from "../../public/pics/heart.svg"
import Image from "next/image";
import SorteHjerte from "../../public/pics/blackheart.svg"

const Favorites = () => {
    //  variabel til at gemme brugerens favoritter
    const [favorites, setFavorites] = useState([]);
  
    // useEffect hooker når komponenten først bliver renderet
    useEffect(() => {
      // vi henter de gemte favoritter fra localStorage
      const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
      console.log("Loaded Favorites:", storedFavorites); // Debug log for at vise de indlæste favoritter
      setFavorites(storedFavorites); // sætter de hentede favoritter i state
    }, []); // Tomt afhængighedsarray betyder, at effekten kun kører én gang ved komponentens første render
  
    // Funktion så vi kan remove favoriter
    const handleRemoveFavorite = (indexToRemove) => {
      // Fjerner favoritter
      const updatedFavorites = favorites.filter((_, index) => index !== indexToRemove);
      setFavorites(updatedFavorites); // Opdaterer state med de opdaterede favoritter
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Gemmer de opdaterede favoritter i localStorage
      console.log("Updated Favorites after removal:", updatedFavorites); // Debug log for at vise de opdaterede favoritter
    };
  
  return (
    <div className="mb-52">
      <Banner text="Your profile" />
      <div className="text-center sm:w-[600px] md:w-[700px] lg:w-[900px] m-auto">
        <h3 className="text-xl pt-10">
          Welcome to your profile. Here you can view your personalized schedule for Foo Festival, including your favorite artists and details on where and when they perform
        </h3>
        <h4 className="text-[2rem] pt-10">Your <span className="font-sans">favorites</span></h4>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-3 sm:w-[600px] md:w-[700px] lg:w-[1100px] pt-10 m-auto gap-16">
        {favorites.map((favorite, index) => (
          <li key={index} className="mb-4">
            {favorite.logo && (
              <div className="mt-2 grid justify-center">
              <div className="relative w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] before:content-[''] before:absolute before:-top-5 before:-right-5 before:-z-10 before:w-full before:h-full before:border-[8px] before:border-[#881523] before:opacity-100 before:rounded-lg">
                <img
                  src={`https://peach-polar-planarian.glitch.me/logos/${favorite.logo}`}
                  alt={`${favorite.name} logo`}
                  className="object-cover w-full h-auto rounded-lg jus" // Makes the image responsive while maintaining aspect ratio
                />
              </div>
            </div>
            
            )}

            <h2 className="text-2xl pt-10 text-center font-bold">{favorite.name}</h2>
            <div className="grid grid-cols-3 pt-5 justify-between text-center md:items-center text-white">
              <span className="uppercase">{favorite.day}</span>
              <span>{favorite.time}</span>
              <span className="uppercase">{favorite.stage}</span>
            </div>

            <div className="mt-4 grid justify-center">
              <ButtonWIcon
                text="Remove"
                defaultIcon={<Image src={Hjerte} alt="Heart" width={20} height={20} />}
                activeIcon={<Image src={Hjerte} alt="Heart-black" width={20} height={20} />}
                defaultBgColor="#881523"
                activeColor="#fffff"
                activeBgColor="#881523"
                onClick={() => handleRemoveFavorite(index)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
