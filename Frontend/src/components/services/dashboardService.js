import axios from "axios";

export const fetchDashboardData = async () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    console.error("🚨 No token found. Redirecting to login.");
    window.location.href = "/login";
    return [];
  }

  try {
    const response = await axios.get("http://localhost:5000/api/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("✅ API Response:", response.data);

    // The API already returns an array, so return it directly
    if (!Array.isArray(response.data)) {
      console.error("❌ API did not return a valid array:", response.data);
      return [];
    }

    return response.data;
  } catch (error) {
    console.error("❌ Error fetching dashboard data:", error.response?.data || error.message);
    return [];
  }
};
