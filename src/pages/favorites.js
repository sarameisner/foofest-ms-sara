import React, { useEffect, useState } from "react"; // importere React, samt hooks: useEffect og useState
import Banner from "@/components/Banner";
import ButtonWIcon from "@/components/ButtonWIcon";
import Hjerte from "../../public/pics/heart.svg"
import Image from "next/image";
import Head from "next/head";


const Favorites = () => {
    //  State variabel til at gemme brugerens favoritter
    const [favorites, setFavorites] = useState([]);
  
    // useEffect hooker når komponenten først bliver renderet
    useEffect(() => {
      // vi henter de gemte favoritter fra localStorage
      const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || []; // henter favoritter fra localStorage og konverter JSON-streng til objekt og returneres en tom array
      console.log("Loaded Favorites:", storedFavorites); 
      setFavorites(storedFavorites); // sætter de hentede favoritter i state
    }, []); // Tomt afhængighedsarray betyder, at effekten kun kører én gang ved komponentens første render
  
    // Funktion så vi kan remove favoriter
    const handleRemoveFavorite = (indexToRemove) => {
      // Fjerner favoritter
      const updatedFavorites = favorites.filter((_, index) => index !== indexToRemove); //filter der fjerner det element
      setFavorites(updatedFavorites); // Opdaterer state med de opdaterede favoritter
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Gemmer de opdaterede favoritter i localStorage
      console.log("Updated Favorites after removal:", updatedFavorites); // D
    };
  
  return (
    <>
    <Head>
      <title>Favorites</title>
      <meta name="description" content="Review and manage your festival tickets. Checkout to secure your spot at the event!" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <div className="mb-[--padding-50]">
      <Banner text="Your profile" />
      <div className="text-center sm:w-[600px] md:w-[700px] lg:w-[900px] m-auto">
        <h3 className="text-xl pt-[--padding-10]">
          Welcome to your profile. Here you can view your personalized schedule for Foo Festival, including your favorite artists and details on where and when they perform
        </h3>
        <h4 className="text-[2rem] pt-[--padding-10]">Your <span className="font-sans">favorites</span></h4>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-3 sm:w-[600px] md:w-[700px] lg:w-[1100px] pt-[--padding-10] m-auto gap-16">
        {/*Mapper gennem favoritter og viser dem*/}
        {favorites.map((favorite, index) => (
          <li key={index} className="mb-[--padding-5]">
            {favorite.logo && (
              <div className="mt-[--padding-5] grid justify-center">
              <div className="relative w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] before:content-[''] before:absolute before:-top-5 before:-right-5 before:-z-10 before:w-full before:h-full before:border-[8px] before:border-[--accent-color] before:opacity-100 before:rounded-lg">
                <img
                  src={`https://peach-polar-planarian.glitch.me/logos/${favorite.logo}`}
                  alt={`${favorite.name} logo`}
                  className="object-cover w-full h-auto rounded-lg " 
                />
              </div>
            </div>
            
            )}

            <h2 className="text-2xl pt-[--padding-10] text-center font-bold">{favorite.name}</h2>
            <div className="grid grid-cols-3 pt-[--padding-5] justify-between text-center md:items-center text-[--font-color]">
              <span className="uppercase">{favorite.day}</span>
              <span>{favorite.time}</span>
              <span className="uppercase">{favorite.stage}</span>
            </div>

            <div className="mt-[--padding-5] grid justify-center">
              <ButtonWIcon
                text="Remove"
                defaultIcon={<Image src={Hjerte} alt="Heart" width={20} height={20} />}
                activeIcon={<Image src={Hjerte} alt="Heart-black" width={20} height={20} />}
                activeColor="--font-color"
                activeBgColor="--accent-color"
                onClick={() => handleRemoveFavorite(index)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default Favorites;
