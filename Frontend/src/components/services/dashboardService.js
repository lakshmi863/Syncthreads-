import axios from "axios";

export const fetchDashboardData = async () => {
  const token = localStorage.getItem('token');  // Get the token from localStorage

  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await axios.get('http://localhost:5000/api/dashboard', {
      headers: {
        Authorization: `Bearer ${token}`,  // Pass the token as Authorization header
      },
    });

    return response.data;  // Return the data from the response
  } catch (error) {
    if (error.response) {
      
      console.error("Error response:", error.response);
      throw new Error(`Error fetching dashboard data: ${error.response.data.message || error.response.statusText}`);
    } else if (error.request) {
    
      console.error("Error request:", error.request);
      throw new Error('Error: No response received from server');
    } else {
    
      console.error("Error message:", error.message);
      throw new Error(`Error: ${error.message}`);
    }
  }
};
