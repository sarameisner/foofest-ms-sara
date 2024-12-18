import { useState } from "react";

function CustomDropdown({ options, onChange }) {
  // state så den tager den valgte værdi
  const [selected, setSelected] = useState(options[0].value);
  // en variabel der bestemmer om dropdown menuen er åben eller lukeket. Den er initialiseret til false
  const [isOpen, setIsOpen] = useState(false);

  // Den opdatere selected til den valgte value.
  const handleSelect = (value) => {
    setSelected(value);
    onChange(value);  // UDen kalder den som er sendt som en prop fra forældre komoponentet og sender den valgte value videre. Den gør at komoponentet opdatere sin egen state
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-32 text-center hover:opacity-90 transition-all duration-200">
      <div
        className="bg-[--accent-color] text-[--font-color] rounded-full px-[--padding-20] py-[--padding-10] cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {options.find(option => option.value === selected)?.label}
      </div>
      {isOpen && (
        <div className="absolute bg-[--accent-color] text-[--font-color] rounded-md shadow-lg mt-[--padding-10] z-10 w-full">
          {options.map((option) => (
            <div
              key={option.value}
              className="px-[--padding-20] py-[--padding-10] hover:bg-opacity-80 cursor-pointer"
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomDropdown;


