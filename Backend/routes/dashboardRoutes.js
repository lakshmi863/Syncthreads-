import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js"; //  Correct Import

const router = express.Router();

app.get("/api/dashboard", verifyToken, (req, res) => {
    console.log("🔍 Dashboard API hit by:", req.user);
    res.json([{ id: 1, name: "Card 1" }, { id: 2, name: "Card 2" }]);
  });

router.get("/map", verifyToken, (req, res) => {
    res.json({ center: [20.5937, 78.9629], zoom: 5 }); // India Coordinates
});

export default router;
