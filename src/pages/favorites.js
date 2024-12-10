import React, { useEffect, useState } from "react";
import Banner from "@/components/Banner";
import ButtonWIcon from "@/components/ButtonWIcon";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    console.log("Loaded Favorites:", storedFavorites); // Debug log
    setFavorites(storedFavorites);
  }, []);

  const handleRemoveFavorite = (indexToRemove) => {
    const updatedFavorites = favorites.filter((_, index) => index !== indexToRemove);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    console.log("Updated Favorites after removal:", updatedFavorites);
  };


  return (
    <div className="mb-52">
      <Banner text="Your profile"/>
      <div className="text-center w-[900px] m-auto " >
      <h3 className="text-xl pt-10" >Welcome to your profile. Here you can view your personalized schedule for Foo Festival, including your favorite artists and details on where and when they perform</h3> <h4 className="text-[2rem] pt-10" >Your <span className="font-sans">favorites</span></h4></div>
      <ul className="grid grid-cols-3 w-[1100px] pt-10 m-auto gap-16">
        {favorites.map((favorite, index) => (
          <li key={index} className="mb-4 ">
             {favorite.logo && (
              

            <div className="mt-2">
                <div className="relative w-58  before:content-[''] before:absolute before:-top-5 before:-right-5 before:-z-10 before:w-full before:h-full before:border-[8px] before:border-[#881523] before:opacity-100 before:rounded-lg">
                <img
                  src={`https://peach-polar-planarian.glitch.me/logos/${favorite.logo}`}
                  alt={`${favorite.name} logo`}
                  className="object-cover rounded-lg"
                />
              </div>
              </div>
             )}
            
            <h2 className="text-2xl pt-10 text-center font-bold">{favorite.name}</h2>
            <div className="grid grid-cols-3 pt-5 justify-between text-center md:items-center text-white">
              <span className=" uppercase"> {favorite.day}</span>
              <span >{favorite.time}</span>
              <span className="uppercase"> {favorite.stage}</span>
            </div>
           
             <div className="mt-4 grid justify-center">
              <ButtonWIcon
                text="Remove"
                defaultBgColor="#881523"
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
