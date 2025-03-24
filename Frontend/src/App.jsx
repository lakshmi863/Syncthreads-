import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login";
import Dashboard from "./components/pages/Dashboard";
import MapView from "./components/pages/MapView";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
  <Route path="/" element={<Login />} />
  <Route path="/login" element={<Login />} /> {/* Add this route */}
  <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
  <Route path="/map" element={<ProtectedRoute><MapView /></ProtectedRoute>} />
</Routes>
    </>
  );
};

export default App;
