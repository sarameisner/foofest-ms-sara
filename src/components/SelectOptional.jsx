import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import ListItem from "./ListItem";
import TentIcon from "../../public/pics/tent.svg";
import GreenIcon from "../../public/pics/greenicon.svg";

function SelectOptional() {
  const { selectedOptional, setSelectedOptional, cartItems } = useContext(CartContext);

  // Beregn samlet antal billetter
  const totalTickets = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Valgmulighederne
  const optionalItems = [
    { id: 1, name: "2 person tent (including the tent)", price: 299, icon: TentIcon, capacity: 2 },
    { id: 2, name: "3 person tent (including the tent)", price: 399, icon: TentIcon, capacity: 3 },
    { id: 3, name: "Green camping", price: 249, icon: GreenIcon },
  ];

  // Beregn, hvor mange personer der allerede er dækket af valgte telte
  const totalCoveredCapacity = selectedOptional.reduce((total, item) => {
    const matchedItem = optionalItems.find((opt) => opt.id === item.id);
    return matchedItem && matchedItem.capacity ? total + matchedItem.capacity * item.quantity : total;
  }, 0);

  // Tilføj et item
  const handleAdd = (item) => {
    if (item.capacity) {
      // Sørg for, at det samlede dækkede antal ikke overstiger antallet af billetter
      if (totalCoveredCapacity + item.capacity > totalTickets) {
        alert("You can't select more tents than the total ticket capacity.");
        return;
      }
    }

    const existingItem = selectedOptional.find((p) => p.id === item.id);
    if (existingItem) {
      setSelectedOptional(selectedOptional.map((p) => (p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p)));
    } else {
      setSelectedOptional([...selectedOptional, { ...item, quantity: 1 }]);
    }
  };

  // fjerenr et item
  const handleRemove = (item) => {
    const existingItem = selectedOptional.find((p) => p.id === item.id);
    if (existingItem && existingItem.quantity > 1) {
      setSelectedOptional(selectedOptional.map((p) => (p.id === item.id ? { ...p, quantity: p.quantity - 1 } : p)));
    } else {
      setSelectedOptional(selectedOptional.filter((p) => p.id !== item.id));
    }
  };

  return (
    <div className="mt-10 basket-container text-white md:p-8">
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
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
              iconSize={40}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SelectOptional;
