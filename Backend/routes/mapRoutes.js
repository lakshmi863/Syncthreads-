import express from "express";
import { getMapData } from "../controllers/mapController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Updated route to accept dynamic cardId parameter
router.get("/:cardId", verifyToken, getMapData);

export default router;
