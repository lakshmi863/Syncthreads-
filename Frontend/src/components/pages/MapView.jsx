import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useLocation } from "react-router-dom";
import { fetchMapData } from "../services/mapService";
import "leaflet/dist/leaflet.css";

const MapView = () => {
  const [mapData, setMapData] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const cardId = queryParams.get("id");  // Extracting the 'id' from the URL

  useEffect(() => {
    if (cardId) {
      console.log("Fetching map data for card ID:", cardId);

      fetchMapData(cardId).then((data) => {
        console.log("Map Data:", data);
        setMapData(data);
      }).catch((error) => {
        console.error("Error fetching map data:", error);
        setMapData({ message: "No map data available" });
      });
    }
  }, [cardId]);

  return (
    <div className="map-container">
      <h2>Map View</h2>
      {mapData?.message ? (
        <p>{mapData.message}</p>
      ) : (
        <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: "500px", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {mapData?.coordinates && (
            <Marker position={mapData.coordinates}>
              <Popup>{mapData.name}</Popup>
            </Marker>
          )}
        </MapContainer>
      )}
    </div>
  );
};

export default MapView;
