// lib/api.js
// denne fil samler alle API-kald til én central fil for at gøre koden mere overskuelig og nemmere at vedligeholde

// henter campingdata fra API
export const fetchCampingData = async () => {
  try {
    const response = await fetch("https://peach-polar-planarian.glitch.me/available-spots"); // henter ledige campingpladser
    if (!response.ok) throw new Error("Failed to fetch camping data"); // håndterer fejl
    return await response.json(); // returner campingdata
  } catch (error) {
    console.error("Error fetching camping data:", error.message);
    throw error;
  }
};

// reserver en campingplads
export const reserveSpot = async (area, amount) => {
  try {
    const response = await fetch("https://peach-polar-planarian.glitch.me/reserve-spot", {
      method: "PUT", // API'en kræver en PUT-anmodning for at reservere
      headers: { "Content-Type": "application/json" }, // sæt headers til JSON
      body: JSON.stringify({ area, amount }), // send data som JSON
    });

    if (!response.ok) throw new Error("Failed to reserve spot"); // håndterer fejl
    return await response.json(); // returnerer reservationsdata
  } catch (error) {
    console.error("Error reserving spot:", error.message); // logger fejl
    throw error; // ooog genkaster fejlen
  }
};

// Bekræft en reservation
export const confirmReservation = async (reservationId) => {
  try {
    const response = await fetch("https://peach-polar-planarian.glitch.me/fullfill-reservation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: reservationId }),
    });

    if (!response.ok) throw new Error("Failed to confirm reservation");
  } catch (error) {
    console.error("Error confirming reservation:", error.message);
    throw error;
  }
};
