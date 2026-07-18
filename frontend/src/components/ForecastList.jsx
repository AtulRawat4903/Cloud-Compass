const DAY_FORMAT = { weekday: "short", month: "short", day: "numeric" };

export default function ForecastList({ days }) {
  if (!days?.length) return null;

  return (
    <section>
      <p style={styles.label}>5-DAY OUTLOOK</p>
      <div style={styles.strip}>
        {days.map((day, i) => {
          const date = new Date(`${day.date}T12:00:00`);
          return (
            <div key={day.date} style={styles.card}>
              <span style={styles.day}>
                {i === 0
                  ? "Today"
                  : date.toLocaleDateString(undefined, DAY_FORMAT)}
              </span>
              <span style={styles.condition}>{day.condition}</span>
              <span style={styles.temp}>{Math.round(day.temperature)}°</span>
              <span style={styles.range}>
                {Math.round(day.tempMin)}° / {Math.round(day.tempMax)}°
              </span>
              <span style={styles.meta}>💧 {day.humidity}%</span>
              <span style={styles.meta}>🌬 {day.windSpeed} m/s</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

const styles = {
  label: {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    letterSpacing: "0.14em",
    color: "var(--text-muted)",
    marginBottom: 10,
  },
  strip: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: 12,
  },
  card: {
    background: "var(--panel)",
    border: "1px solid var(--line)",
    borderRadius: 12,
    padding: "16px 14px",
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  day: {
    fontFamily: "var(--font-display)",
    fontWeight: 600,
    fontSize: 14,
  },
  condition: {
    fontSize: 12,
    color: "var(--text-muted)",
    textTransform: "capitalize",
  },
  temp: {
    fontFamily: "var(--font-display)",
    fontSize: 26,
    fontWeight: 700,
    color: "var(--gold)",
    marginTop: 6,
  },
  range: {
    fontFamily: "var(--font-mono)",
    fontSize: 12,
    color: "var(--text-muted)",
  },
  meta: {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    color: "var(--text-muted)",
  },
};