import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { fetchMapData } from "../services/mapService";
import "leaflet/dist/leaflet.css";

const MapView = () => {
  const [mapData, setMapData] = useState(null);

  useEffect(() => {
    fetchMapData().then((data) => setMapData(data));
  }, []);

  return (
    <div className="map-container">
      <h2>Map View</h2>
      {mapData?.message ? (
        <p>{mapData.message}</p>
      ) : (
        <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: "500px", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[20.5937, 78.9629]}>
            <Popup>India</Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default MapView;
