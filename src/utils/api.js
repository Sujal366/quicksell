export const fetchTickets = async () => {
  try {
    const response = await fetch(
      "https://api.quicksell.co/v1/internal/frontend-assignment"
    );
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    console.log("Fetched tickets data:", data);
    return data; 
  } catch (error) {
    console.error("Fetch error:", error);
    return {}; 
  }
};
