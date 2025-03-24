import React, { useEffect, useState } from "react";
import { fetchDashboardData } from "../services/dashboardService";
import Card from "../Card";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css"; // Import CSS

const Dashboard = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("useEffect triggered: Fetching dashboard data...");

    const loadData = async () => {
      try {
        const data = await fetchDashboardData();
        console.log("Dashboard Data Received:", data);

        if (Array.isArray(data) && data.length > 0) {
          setCards(data);
        } else {
          console.warn("No cards found in API response.");
          setCards([]); // Set empty state
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Error fetching dashboard data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="dashboard">
  
      <div className="card-container">
        {loading ? (
          <p className="loading-text">Loading dashboard data...</p>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : cards.length > 0 ? (
          cards.map((card) => (
            <Card
              key={card.id}  // Only pass `key` here for the list item
              id={card.id}
              name={card.name}
              imageUrl={card.imageUrl}  // Pass the image URL from the backend
              description={card.description}  // Pass the description from the backend
              purpose={card.Purpose}  // Pass the Purpose field from the backend
              keyFeatures={card.Key_Features}  // Pass the Key_Features field from the backend
              onClick={() => navigate(`/map?id=${card.id}`)}
            />
          ))
        ) : (
          <p className="loading-text">No data available</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
