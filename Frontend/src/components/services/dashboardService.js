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
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Error response:", error.response);
      throw new Error(`Error fetching dashboard data: ${error.response.data.message || error.response.statusText}`);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Error request:", error.request);
      throw new Error('Error: No response received from server');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error message:", error.message);
      throw new Error(`Error: ${error.message}`);
    }
  }
};
