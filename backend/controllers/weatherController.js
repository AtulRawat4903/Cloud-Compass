import axios from "axios";
import mongoose from "mongoose";
import SearchHistory from "../models/searchHistory.js";

const BASE_URL = "https://api.openweathermap.org/data/2.5";
const GEO_URL = "https://api.openweathermap.org/geo/1.0";

const apiKey = () => process.env.OPENWEATHER_API_KEY;

export const getCurrentWeather = async (req, res, next) => {
  try {
    const {
      city,
      lat,
      lon,
      units = "metric",
      saveHistory = "true",
    } = req.query;

    if (!city && !(lat && lon)) {
      return res.status(400).json({
        message: "Provide either a 'city' query param or 'lat' & 'lon'.",
      });
    }

    const params = {
      appid: apiKey(),
      units,
      ...(city ? { q: city } : { lat, lon }),
    };

    const { data } = await axios.get(`${BASE_URL}/weather`, { params });

    const payload = {
      city: data.name,
      country: data.sys?.country,
      coord: data.coord,
      temperature: data.main?.temp,
      feelsLike: data.main?.feels_like,
      tempMin: data.main?.temp_min,
      tempMax: data.main?.temp_max,
      humidity: data.main?.humidity,
      pressure: data.main?.pressure,
      windSpeed: data.wind?.speed,
      windDeg: data.wind?.deg,
      visibility: data.visibility,
      condition: data.weather?.[0]?.main,
      description: data.weather?.[0]?.description,
      icon: data.weather?.[0]?.icon,
      sunrise: data.sys?.sunrise,
      sunset: data.sys?.sunset,
      timezone: data.timezone,
      dt: data.dt,
    };

    if (mongoose.connection.readyState === 1 && saveHistory === "true") {
      SearchHistory.create({
        city: payload.city,
        country: payload.country,
        lat: payload.coord?.lat,
        lon: payload.coord?.lon,
        temperature: payload.temperature,
        condition: payload.condition,
      }).catch((err) => console.error("History save failed:", err.message));
    }

    res.json(payload);
  } catch (error) {
    next(error);
  }
};

export const getForecast = async (req, res, next) => {
  try {
    const { city, lat, lon, units = "metric" } = req.query;

    if (!city && !(lat && lon)) {
      return res.status(400).json({
        message: "Provide either a 'city' query param or 'lat' & 'lon'.",
      });
    }

    const params = {
      appid: apiKey(),
      units,
      ...(city ? { q: city } : { lat, lon }),
    };

    const { data } = await axios.get(`${BASE_URL}/forecast`, { params });

    const byDay = new Map();
    for (const slot of data.list) {
      const day = slot.dt_txt.split(" ")[0];
      const hour = slot.dt_txt.split(" ")[1];
      if (!byDay.has(day) || hour === "12:00:00") {
        byDay.set(day, slot);
      }
    }

    const daily = Array.from(byDay.entries())
      .slice(0, 5)
      .map(([day, slot]) => ({
        date: day,
        temperature: slot.main.temp,
        tempMin: slot.main.temp_min,
        tempMax: slot.main.temp_max,
        condition: slot.weather?.[0]?.main,
        description: slot.weather?.[0]?.description,
        icon: slot.weather?.[0]?.icon,
        humidity: slot.main.humidity,
        windSpeed: slot.wind?.speed,
      }));

    res.json({ city: data.city?.name, country: data.city?.country, daily });
  } catch (error) {
    next(error);
  }
};

export const searchCities = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q || q.trim().length < 2) {
      return res.json([]);
    }

    const { data } = await axios.get(`${GEO_URL}/direct`, {
      params: { q, limit: 5, appid: apiKey() },
    });

    const results = data.map((place) => ({
      name: place.name,
      state: place.state,
      country: place.country,
      lat: place.lat,
      lon: place.lon,
    }));

    res.json(results);
  } catch (error) {
    next(error);
  }
};

export const getHistory = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json([]);
    }
    const history = await SearchHistory.find()
      .sort({ searchedAt: -1 })
      .limit(10);
    res.json(history);
  } catch (error) {
    next(error);
  }
};

export const clearHistory = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        message: "Database unavailable.",
      });
    }

    await SearchHistory.deleteMany({});

    res.json({
      message: "Search history cleared successfully.",
    });
  } catch (error) {
    next(error);
  }
};
