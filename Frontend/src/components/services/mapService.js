import axios from "axios";

// Arrow function with destructuring in the parameter
export const fetchMapData = async (cardId) => {
  try {
    // Using template literals for URL
    const response = await axios.get(`http://localhost:5000/api/map/${cardId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching map data:", error);
    return { message: "User not logged in" };
  }
};
