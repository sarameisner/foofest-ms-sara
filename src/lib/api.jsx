const API_BASE_URL = "http://localhost:8080";

export const api = {
  getAvailableSpots: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/available-spots`);
      if (!response.ok) throw new Error("Failed to fetch spots");
      return response.json();
    } catch (error) {
      console.error("Error fetching spots:", error);
      throw error;
    }
  },

  reserveSpot: async (area, amount) => {
    try {
      const response = await fetch(`${API_BASE_URL}/reserve-spot`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ area, amount }),
      });
      if (!response.ok) throw new Error("Failed to reserve spot");
      return response.json();
    } catch (error) {
      console.error("Error reserving spot:", error);
      throw error;
    }
  },

  fulfillReservation: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/fullfill-reservation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error("Failed to fulfill reservation");
      return response.json();
    } catch (error) {
      console.error("Error fulfilling reservation:", error);
      throw error;
    }
  },

  // Tilføj evt. flere funktioner baseret på dine API-behov
};
