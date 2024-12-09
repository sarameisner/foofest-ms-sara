const Tickets = ({ tickets }) => {
  return (
    <section
      className="py-16"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--font-color)",
      }}
    >
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-12" style={{ fontFamily: "'Bangla Sangam MN', sans-serif" }}>
          Tickets
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="relative p-6 rounded-lg shadow-lg"
              style={{
                backgroundColor: "var(--accent-color)",
                color: "var(--font-color)",
              }}
            >
              <div
                className="absolute top-2 left-2 w-full h-full border-4 rounded-lg"
                style={{
                  borderColor: "var(--font-color)",
                  transform: "translate(-8px, -8px)",
                  zIndex: -1,
                }}
              ></div>
              <h2 className="text-2xl font-bold mb-2">{ticket.name}</h2>
              <p className="text-4xl font-bold mb-2" style={{ fontFamily: "'La Belle Aurore', cursive" }}>
                {ticket.price},-
              </p>
              <p className="text-sm mb-6" style={{ color: "var(--light-grey-font)" }}>
                *excluding order and transaction fees
              </p>
              <button
                className="px-6 py-2 rounded flex items-center justify-center gap-2"
                style={{
                  backgroundColor: "#000",
                  color: "#fff",
                  transition: "transform 0.2s ease-in-out, background-color 0.2s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.05)";
                  e.target.style.backgroundColor = "#333";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)";
                  e.target.style.backgroundColor = "#000";
                }}
              >
                {/* skal laves om */}
                <span>⭐</span> Add to cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tickets;
