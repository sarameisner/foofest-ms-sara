import React, { useState } from "react";

const ButtonWIcon = ({ text, defaultIcon, activeIcon, defaultBgColor, activeColor, activeBgColor ,defaultColor, onClick }) => {
  const [isActive, setIsActive] = useState(false);

  const handleButtonClick = () => {
    setIsActive((prev) => !prev); 
    if (onClick) onClick(); 
  };

  return (
    <button
      onClick={handleButtonClick}
      style={{
        backgroundColor: isActive ? activeBgColor || "#ffffff" : defaultBgColor || "#881523",
        borderRadius: "1.875rem",
        padding: "0.75rem 1rem",
        display: "flex",
        alignItems: "center",
        border: "none",
        cursor: "pointer",
        color: isActive ? activeColor || "#000000" : defaultColor || "#ffffff",
      }}
      className="hover:opacity-90 transition-all duration-200"
    >
      <span style={{ marginRight: "0.5rem", display: "flex", alignItems: "center"}}>{isActive ? activeIcon : defaultIcon}</span>
      <span>{text}</span>
    </button>
  );
};

export default ButtonWIcon;

// Sæt ind når den skal bruges, evt laver om på baggrundsfarve icon og evt farve når man trykker påden. Evt ændre på størrelse af icon
//  <ButtonWIcon
// text="Add to your favorite"
// defaultIcon={<Image src={Billede af iconet} alt="Default Icon" width={20} height={20} />}
// activeIcon={<Image src={Billede af iconet i sort} alt="Active Icon" width={20} height={20} />}
// defaultBgColor="#881523"
// activeBgColor="#ffffff"

// onClick={() => console.log("Button toggled!")}
// />
