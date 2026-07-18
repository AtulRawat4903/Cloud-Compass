import { useCallback, useState } from "react";
import {
  fetchCurrentWeather,
  fetchForecast,
  fetchHistory,
  clearHistory,
  extractErrorMessage,
} from "../services/api";

export const useWeather = () => {
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadHistory = useCallback(async () => {
    try {
      const data = await fetchHistory();
      setHistory(data);
    } catch {
      // history is a nice-to-have; fail silently
    }
  }, []);

  const search = useCallback(
    async (target) => {
      setLoading(true);
      setError(null);
      try {
        const [weather, forecastData] = await Promise.all([
          fetchCurrentWeather(target),
          fetchForecast(target),
        ]);
        setCurrent(weather);
        setForecast(forecastData.daily || []);
        loadHistory();
      } catch (err) {
        setError(extractErrorMessage(err));
        setCurrent(null);
        setForecast([]);
      } finally {
        setLoading(false);
      }
    },
    [loadHistory]
  );

  const clearSearchHistory = async () => {
  try {
    await clearHistory();
    setHistory([]);
  } catch (error) {
    setError(extractErrorMessage(error));
  }
};

  return {
    current,
    forecast,
    history,
    loading,
    error,
    search,
    loadHistory,
    clearSearchHistory,
  };
};