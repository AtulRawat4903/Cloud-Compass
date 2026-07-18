import { useEffect } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastList from "./components/ForecastList";
import HistoryPanel from "./components/HistoryPanel";
import Loader from "./components/Loader";
import { useWeather } from "./hooks/useWeather";

export default function App() {
  const {
    current,
    forecast,
    history,
    loading,
    error,
    search,
    clearSearchHistory,
  } = useWeather();

  useEffect(() => {
    search({
      city: "London",
      saveHistory: false,
    });
  }, [search]);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <header style={styles.top}>
          <div>
            <p style={styles.eyebrow}>CLOUD COMPASS</p>
            <h1 style={styles.title}>Weather Station</h1>
          </div>
          <p style={styles.tagline}>
            Live atmospheric readings, sourced in real time.
          </p>
        </header>

        <SearchBar onSearch={search} loading={loading} />

        {error && <p style={styles.error}>⚠ {error}</p>}

        <main className="app-grid" style={styles.grid}>
          <div style={styles.main}>
            {loading && !current ? (
              <Loader />
            ) : (
              <>
                <WeatherCard data={current} />
                <div style={{ height: 24 }} />
                <ForecastList days={forecast} />
              </>
            )}
          </div>
          <HistoryPanel
            items={history}
            onSelect={search}
            onClearHistory={clearSearchHistory}
          />
        </main>

        <footer style={styles.footer}>
          Data via OpenWeatherMap · Cloud Compass
        </footer>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", padding: "40px 20px" },
  container: { maxWidth: 1080, margin: "0 auto" },
  top: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 24,
  },
  eyebrow: {
    margin: 0,
    fontFamily: "var(--font-mono)",
    fontSize: 12,
    letterSpacing: "0.18em",
    color: "var(--accent)",
  },
  title: {
    margin: "6px 0 0",
    fontFamily: "var(--font-display)",
    fontSize: 40,
    fontWeight: 700,
  },
  tagline: {
    margin: 0,
    color: "var(--text-muted)",
    fontSize: 14,
  },
  error: {
    color: "var(--danger)",
    fontFamily: "var(--font-mono)",
    fontSize: 13,
    marginTop: 16,
  },
  grid: {
    marginTop: 28,
    display: "grid",
    gridTemplateColumns: "1fr 280px",
    gap: 24,
    alignItems: "start",
  },
  main: { minWidth: 0 },
  footer: {
    marginTop: 40,
    textAlign: "center",
    color: "var(--text-muted)",
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    letterSpacing: "0.08em",
  },
};
