import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useLocation } from "react-router-dom";
import { fetchMapData } from "../services/mapService";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/MapView.css";
import markerIconRed from "../../assets/marker-icon-red.png";

// Custom marker icon
const customIcon = L.icon({
  iconUrl: markerIconRed,
  iconSize: [32, 48],
  iconAnchor: [16, 48],
  popupAnchor: [0, -40],
});

const MapView = () => {
  const [mapData, setMapData] = useState(null);
  const [center, setCenter] = useState([20.5937, 78.9629]); // Default center (India)
  const [zoom, setZoom] = useState(5);
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const cardId = queryParams.get("id");
  const isAuthenticated = !!localStorage.getItem("token"); // Check login status

  useEffect(() => {
    if (!isAuthenticated) {
      setMapData({ message: "User not logged in" });
      return;
    }

    if (cardId) {
      fetchMapData(cardId)
        .then((data) => {
          if (data?.center && Array.isArray(data.center) && data.center.length === 2) {
            setCenter(data.center);
            setZoom(data.zoom || 12);
          }
          setMapData(data);
        })
        .catch(() => {
          setMapData({ message: "No map data available" });
        });
    }
  }, [cardId, isAuthenticated]);

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
