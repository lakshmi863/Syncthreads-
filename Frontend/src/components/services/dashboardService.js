import axios from "axios";

export const fetchDashboardData = async () => {
  const token = localStorage.getItem('token'); // Get the token from localStorage

  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await axios.get('http://localhost:5000/api/dashboard', {  // Add full URL here
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token as Authorization header
      },
    });
    
    return response.data;  // Return the data from the response
  } catch (error) {
    throw new Error(error.response?.data || 'Error fetching dashboard data');
  }
};
