import React, { useEffect, useState } from "react";
import { fetchDashboardData } from "../services/dashboardService";
import Card from "../Card";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token"); // Check login status

  useEffect(() => {
    if (!isAuthenticated) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    const loadData = async () => {
      try {
        const data = await fetchDashboardData();
        if (Array.isArray(data) && data.length > 0) {
          setCards(data);
        } else {
          setCards([]); // Empty state
        }
      } catch (err) {
        setError("Error fetching dashboard data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [isAuthenticated]);

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
              key={card.id}
              id={card.id}
              name={card.name}
              imageUrl={card.imageUrl}
              description={card.description}
              purpose={card.Purpose}
              keyFeatures={card.Key_Features}
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
