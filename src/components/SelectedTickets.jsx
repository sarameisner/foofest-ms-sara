import React from "react";

function SelectedTickets({ tickets, setTickets }) {
  // en array der indeholder valgte billetter med navn og priser. Hver billet er et objekt med name og price
  const availableTickets = [
    { name: "Regular Ticket", price: 799 },
    { name: "VIP Ticket", price: 1299 },
    { name: "Student Ticket", price: 499 },
  ];

  // tager en bilet som argument og håndter tilføjelsen af billettr. 
  const handleAddTicket = (ticket) => {
    //find() søger efter en billet. Hvis billetter allerede eksitere, opdatere den. 
    const existingTicket = tickets.find((t) => t.name === ticket.name);
    if (existingTicket) {
      //Funktion der opdatere state, som ændrer indholdet af tickets
      setTickets(tickets.map((t) => (t.name === ticket.name ? { ...t, quantity: t.quantity + 1 } : t)));
    } else {
      setTickets([...tickets, { ...ticket, quantity: 1 }]);
    }
  };

  const handleRemoveTicket = (ticket) => {
    const existingTicket = tickets.find((t) => t.name === ticket.name);
    if (existingTicket.quantity > 1) {
      setTickets(tickets.map((t) => (t.name === ticket.name ? { ...t, quantity: t.quantity - 1 } : t)));
    } else {
      setTickets(tickets.filter((t) => t.name !== ticket.name));
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-bold text-[--font-color] mb-[--padding-20]">Select Your Tickets</h3>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableTickets.map((ticket) => (
          <li key={ticket.name} className="p-[--padding-20] border border-[--accent-color] rounded-lg flex justify-between items-center">
            <div>
              <h4 className="text-lg font-semibold text-[--font-color]">{ticket.name}</h4>
              <p className="text-sm text-[--light-grey-font]">{ticket.price} DKK</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => handleRemoveTicket(ticket)} className="px-3 py-1 bg-[var(--accent-color)] text-white rounded-lg hover:bg-[var(--light-grey)]">
                -
              </button>
              <span className="text-[--font-color]">{tickets.find((t) => t.name === ticket.name)?.quantity || 0}</span>
              <button onClick={() => handleAddTicket(ticket)} className="px-3 py-1 bg-[var(--accent-color)] text-white rounded-lg hover:bg-[var(--light-grey)]">
                +
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SelectedTickets;
