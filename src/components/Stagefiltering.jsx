import { useState } from "react";

function CustomDropdown({ options, onChange }) {
  const [selected, setSelected] = useState(options[0].value);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value) => {
    setSelected(value);
    onChange(value);  // Update the parent component's state
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-32 text-center hover:opacity-90 transition-all duration-200">
      <div
        className="bg-[#881523] text-white rounded-full px-4 py-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {options.find(option => option.value === selected)?.label}
      </div>
      {isOpen && (
        <div className="absolute bg-[#881523] text-white rounded-md shadow-lg mt-2 z-10 w-full">
          {options.map((option) => (
            <div
              key={option.value}
              className="px-4 py-2 hover:bg-opacity-80 cursor-pointer"
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


