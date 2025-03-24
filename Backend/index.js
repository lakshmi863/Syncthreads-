import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import dotenv from "dotenv";
import { verifyToken } from "./middlewares/authMiddleware.js"; //  Import middleware

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const users = [{ username: "admin", password: "password123" }]; // Dummy User Data

// Login API
app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    console.log("Received Login Request:", { username, password });
    console.log("Current Users List:", users);

    const user = users.find(u => u.username === username);
    if (!user) {
        console.log("User not found:", username);
        return res.status(401).json({ message: "Invalid credentials" });
    }

    if (user.password !== password) {
        console.log("Invalid Credentials:", username, password);
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });
    console.log("Login Successful, Token Generated:", token);
    res.json({ token });
});


// Dashboard API
app.get("/api/dashboard", async (req, res) => {
    try {
        const authHeader = req.headers["authorization"];
        console.log("🔑 Received Authorization Header:", authHeader);

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(403).json({ message: "User not logged in" });
        }

        const token = authHeader.split(" ")[1];
        console.log("📌 Extracted Token:", token);

        const decoded = jwt.verify(token, "mysecretkey");
        console.log("✅ Token Verified! User:", decoded);

        // Fetch dashboard data (Replace with your database query)
        const dashboardData = [
            { id: 1, name: "Card 1" },
            { id: 2, name: "Card 2" },
        ];

        res.json(dashboardData);
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token has expired" });
        }
        console.error("❌ Error verifying token:", error.message);
        res.status(403).json({ message: "Invalid token" });
    }
});

// Map View API
app.get("/api/map", verifyToken, (req, res) => {
    res.json({ center: [20.5937, 78.9629], zoom: 5 }); // India Coordinates
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
