import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import ListItem from "./ListItem"; 
import TentIcon from "../../public/pics/tent.svg";
import GreenIcon from "../../public/pics/greenicon.svg";

function SelectOptional() {
  const { selectedOptional, setSelectedOptional } = useContext(CartContext);

  // Valgmulighederne
  const optionalItems = [
    { id: 1, name: "2 person tent (including the tent)", price: 299, icon: TentIcon },
    { id: 2, name: "3 person tent (including the tent)", price: 399, icon: TentIcon },
    { id: 3, name: "Green camping", price: 249, icon: GreenIcon },
  ];

  // Tilføj et item
  const handleAdd = (item) => {
    const existingItem = selectedOptional.find((p) => p.id === item.id);
    if (existingItem) {
      setSelectedOptional(selectedOptional.map((p) => (p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p)));
    } else {
      setSelectedOptional([...selectedOptional, { ...item, quantity: 1 }]);
    }
  };

  // Fjern et item
  const handleRemove = (item) => {
    const existingItem = selectedOptional.find((p) => p.id === item.id);
    if (existingItem && existingItem.quantity > 1) {
      setSelectedOptional(selectedOptional.map((p) => (p.id === item.id ? { ...p, quantity: p.quantity - 1 } : p)));
    } else {
      setSelectedOptional(selectedOptional.filter((p) => p.id !== item.id));
    }
  };

  return (
    <div className="pt-[50px] basket-container text-white p-4 md:p-8">
      <h3 className="text-2xl font-bold">Choose Optional Add-Ons</h3>

      <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-5xl mx-auto">
        {optionalItems.map((item) => (
          <li key={item.id} className="md:col-span-3 flex flex-col gap-6">
            <ListItem
              item={{
                name: item.name,
                price: item.price,
                icon: item.icon,
              }}
              quantity={selectedOptional.find((p) => p.id === item.id)?.quantity || 0}
              onAdd={() => handleAdd(item)} // Send kun item, som forventes af handleAdd
              onRemove={() => handleRemove(item)} // Send kun item, som forventes af handleRemove
              iconSize={40} // Tilpas ikonstørrelsen
            />
          </li>
        ))}
      </ul>
      </div>
  );
}

export default SelectOptional;

