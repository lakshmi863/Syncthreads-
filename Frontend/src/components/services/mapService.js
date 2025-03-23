import axios from "axios";

export const fetchMapData = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/map", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching map data:", error);
    return { message: "User not logged in" };
  }
};
