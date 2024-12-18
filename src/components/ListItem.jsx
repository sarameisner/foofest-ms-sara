import React from "react";
import Image from "next/image";

const ListItem = ({ 
  item, 
  onAdd, 
  onRemove, 
  quantity, 
  iconSize = 40 // Default size for the icon
}) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-700">
      {/* Left section with icon and text */}
      <div className="flex items-center gap-4">
        <Image src={item.icon} alt={item.name} width={iconSize} height={iconSize} />
        <div>
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p>{item.price} DKK</p>
        </div>
      </div>

      {/* Right section with quantity controls */}
      <div className="flex items-center gap-2">
        <button 
          onClick={() => onRemove(item)} 
          className="bg-[ --light-grey] text-[--color-black] rounded-full w-8 h-8 flex items-center justify-center" 
          disabled={quantity <= 0}
        >
          -
        </button>
        <span>{quantity}</span>
        <button 
          onClick={() => onAdd(item)} 
          className="bg-[ --light-grey] text-[--color-black] rounded-full w-8 h-8 flex items-center justify-center"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ListItem;
