import express from "express";
import {
  getCurrentWeather,
  getForecast,
  searchCities,
  getHistory,
  clearHistory,
} from "../controllers/weatherController.js";

const router = express.Router();

router.get("/current", getCurrentWeather);
router.get("/forecast", getForecast);
router.get("/search", searchCities);
router.get("/history", getHistory);
router.delete("/history", clearHistory);

export default router;