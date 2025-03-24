import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useLocation } from "react-router-dom";
import { fetchMapData } from "../services/mapService";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/MapView.css"; // Import CSS file

// Import marker icon from assets
import markerIconRed from "../../assets/marker-icon-red.png";

// Custom marker icon
const customIcon = L.icon({
  iconUrl: markerIconRed, // ✅ Use imported image
  iconSize: [32, 48], // Adjust size as needed
  iconAnchor: [16, 48], // Center the icon properly
  popupAnchor: [0, -40], // Adjust popup position
});

const MapView = () => {
  const [mapData, setMapData] = useState(null);
  const [center, setCenter] = useState([20.5937, 78.9629]); // Default center (India)
  const [zoom, setZoom] = useState(5); // Default zoom level
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const cardId = queryParams.get("id");

  useEffect(() => {
    if (cardId) {
      console.log("Fetching map data for card ID:", cardId);
      fetchMapData(cardId)
        .then((data) => {
          console.log("Fetched Data:", data);
          if (data && data.center && Array.isArray(data.center) && data.center.length === 2) {
            setCenter(data.center);
            setZoom(data.zoom || 12);
          } else {
            console.error("Invalid center data:", data.center);
          }
          setMapData(data);
        })
        .catch((error) => {
          console.error("Error fetching map data:", error);
          setMapData({ message: "No map data available" });
        });
    }
  }, [cardId]);

  return (
    <div className="map-container">
      <h2>Map View</h2>
      {mapData?.message ? (
        <p className="error-message">{mapData.message}</p>
      ) : (
        <MapContainer center={center} zoom={zoom} className="leaflet-map">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {mapData?.center && (
            <Marker position={mapData.center} icon={customIcon}>
              <Popup>
                <strong>{mapData.name}</strong><br />
                {mapData.address}
              </Popup>
            </Marker>
          )}
        </MapContainer>
      )}
    </div>
  );
};

export default MapView;
