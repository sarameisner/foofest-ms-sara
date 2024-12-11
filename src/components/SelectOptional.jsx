import React, { useContext } from "react";
import Image from "next/image";
import { CartContext } from "../contexts/CartContext";
import TentIcon from "../../public/pics/tent.svg";
import GreenIcon from "../../public/pics/greenicon.svg";

function SelectOptional() {
  const { selectedOptional, setSelectedOptional } = useContext(CartContext);

  const optionalItems = [
    { id: 1, name: "2 person tent (including the tent)", price: 299, icon: TentIcon },
    { id: 2, name: "3 person tent (including the tent)", price: 399, icon: TentIcon },
    { id: 3, name: "Green camping", price: 249, icon: GreenIcon },
  ];

  const handleAdd = (item) => {
    const existingItem = selectedOptional.find((p) => p.id === item.id);
    if (existingItem) {
      setSelectedOptional(selectedOptional.map((p) => (p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p)));
    } else {
      setSelectedOptional([...selectedOptional, { ...item, quantity: 1 }]);
    }
  };

  const handleRemove = (item) => {
    const existingItem = selectedOptional.find((p) => p.id === item.id);
    if (existingItem && existingItem.quantity > 1) {
      setSelectedOptional(selectedOptional.map((p) => (p.id === item.id ? { ...p, quantity: p.quantity - 1 } : p)));
    } else {
      setSelectedOptional(selectedOptional.filter((p) => p.id !== item.id));
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-2xl font-bold">Choose Optional Add-Ons</h3>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {optionalItems.map((item) => (
          <li key={item.id} className="flex items-center justify-between border rounded p-4">
            <div className="flex items-center gap-4">
              <Image src={item.icon} alt={item.name} width={40} height={40} />
              <div>
                <h4 className="text-lg font-semibold">{item.name}</h4>
                <p>{item.price} DKK</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => handleRemove(item)} className="p-2 bg-red-500 text-white rounded">
                -
              </button>
              <span>{selectedOptional.find((p) => p.id === item.id)?.quantity || 0}</span>
              <button onClick={() => handleAdd(item)} className="p-2 bg-green-500 text-white rounded">
                +
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SelectOptional;
