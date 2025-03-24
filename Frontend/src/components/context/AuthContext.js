import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const data = await getUserDetails();
        if (data) {
          setUser(data);
          setIsAuthenticated(true);
        }
      } catch (err) {
        setIsAuthenticated(false);
      }
    };
    fetchUserDetails();
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    navigate("/dashboard");
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}