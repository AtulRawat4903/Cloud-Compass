import { useEffect, useRef, useState } from "react";
import { searchCities } from "../services/api";

export default function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceRef = useRef(null);

  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      return;
    }
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const results = await searchCities(query);
        setSuggestions(results);
      } catch {
        setSuggestions([]);
      }
    }, 350);
    return () => clearTimeout(debounceRef.current);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch({ city: query.trim() });
    setShowSuggestions(false);
  };

  const handlePick = (place) => {
    const label = [place.name, place.state, place.country]
      .filter(Boolean)
      .join(", ");
    setQuery(label);
    setShowSuggestions(false);
    onSearch({ lat: place.lat, lon: place.lon });
  };

  const useMyLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      onSearch({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      });
      setQuery("Current location");
    });
  };

  return (
    <div style={styles.wrap}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <span style={styles.label}>STATION LOOKUP</span>
        <div style={styles.inputRow}>
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Search a city, e.g. Nairobi"
            style={styles.input}
            aria-label="Search for a city"
          />
          <button
            type="button"
            onClick={useMyLocation}
            style={styles.iconBtn}
            title="Use current location"
            aria-label="Use current location"
          >
            ◎
          </button>
          <button type="submit" style={styles.submitBtn} disabled={loading}>
            {loading ? "…" : "Scan"}
          </button>
        </div>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <ul style={styles.suggestions}>
          {suggestions.map((place, i) => (
            <li key={`${place.lat}-${place.lon}-${i}`}>
              <button
                type="button"
                style={styles.suggestionBtn}
                onClick={() => handlePick(place)}
              >
                <span>{place.name}</span>
                <span style={styles.suggestionMeta}>
                  {[place.state, place.country].filter(Boolean).join(", ")}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const styles = {
  wrap: { position: "relative", width: "100%" },
  form: { display: "flex", flexDirection: "column", gap: 6 },
  label: {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    letterSpacing: "0.14em",
    color: "var(--text-muted)",
  },
  inputRow: { display: "flex", gap: 8 },
  input: {
    flex: 1,
    background: "var(--panel)",
    border: "1px solid var(--line)",
    borderRadius: 8,
    padding: "12px 14px",
    color: "var(--text)",
    fontSize: 15,
    fontFamily: "var(--font-body)",
  },
  iconBtn: {
    width: 44,
    background: "var(--panel)",
    border: "1px solid var(--line)",
    borderRadius: 8,
    color: "var(--accent)",
    fontSize: 18,
    cursor: "pointer",
  },
  submitBtn: {
    padding: "0 20px",
    borderRadius: 8,
    border: "1px solid var(--accent-dim)",
    background: "var(--accent)",
    color: "#04121f",
    fontWeight: 600,
    fontFamily: "var(--font-display)",
    cursor: "pointer",
  },
  suggestions: {
    listStyle: "none",
    margin: "6px 0 0",
    padding: 4,
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    background: "var(--panel-raised)",
    border: "1px solid var(--line)",
    borderRadius: 8,
    zIndex: 10,
    overflow: "hidden",
  },
  suggestionBtn: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    background: "transparent",
    border: "none",
    color: "var(--text)",
    padding: "10px 12px",
    cursor: "pointer",
    fontSize: 14,
    borderRadius: 6,
  },
  suggestionMeta: {
    color: "var(--text-muted)",
    fontSize: 12,
    fontFamily: "var(--font-mono)",
  },
};