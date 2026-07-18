import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const client = axios.create({ baseURL: API_URL, timeout: 10000 });

export const fetchCurrentWeather = async ({
  city,
  lat,
  lon,
  saveHistory = true,
}) => {
  const { data } = await client.get("/weather/current", {
    params: city ? { city, saveHistory } : { lat, lon, saveHistory },
  });

  return data;
};

export const fetchForecast = async ({ city, lat, lon }) => {
  const { data } = await client.get("/weather/forecast", {
    params: city ? { city } : { lat, lon },
  });
  return data;
};

export const searchCities = async (query) => {
  const { data } = await client.get("/weather/search", {
    params: { q: query },
  });
  return data;
};

export const fetchHistory = async () => {
  const { data } = await client.get("/weather/history");
  return data;
};

export const clearHistory = async () => {
  const { data } = await client.delete("/weather/history");
  return data;
};

export const extractErrorMessage = (error) =>
  error?.response?.data?.message ||
  error?.message ||
  "Unable to reach the weather station. Try again.";
