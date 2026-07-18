const SCALE_MIN = -20;
const SCALE_MAX = 45;

const clampPercent = (temp) => {
  const pct = (temp - SCALE_MIN) / (SCALE_MAX - SCALE_MIN);
  return Math.min(1, Math.max(0, pct));
};

const formatTime = (unixSeconds, tzOffsetSeconds = 0) => {
  if (!unixSeconds) return "—";
  const date = new Date((unixSeconds + tzOffsetSeconds) * 1000);
  return date.toUTCString().slice(17, 22);
};

function Dial({ temperature }) {
  const radius = 84;
  const circumference = 2 * Math.PI * radius;
  const pct = clampPercent(temperature);
  const offset = circumference * (1 - pct);

  return (
    <div style={{ position: "relative", width: 210, height: 210 }}>
      <svg width="210" height="210" viewBox="0 0 210 210">
        <circle
          cx="105"
          cy="105"
          r={radius}
          fill="none"
          stroke="var(--line)"
          strokeWidth="10"
        />
        <circle
          cx="105"
          cy="105"
          r={radius}
          fill="none"
          stroke="url(#dialGradient)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 105 105)"
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
        <defs>
          <linearGradient id="dialGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3e9cd6" />
            <stop offset="55%" stopColor="#ffb84d" />
            <stop offset="100%" stopColor="#e06a6a" />
          </linearGradient>
        </defs>
      </svg>
      <div style={styles.dialCenter}>
        <span style={styles.dialTemp}>{Math.round(temperature)}°</span>
        <span style={styles.dialUnit}>CELSIUS</span>
      </div>
    </div>
  );
}

export default function WeatherCard({ data }) {
  if (!data) return null;

  const {
    city,
    country,
    coord,
    temperature,
    feelsLike,
    tempMin,
    tempMax,
    humidity,
    pressure,
    windSpeed,
    visibility,
    description,
    sunrise,
    sunset,
    timezone,
    dt,
  } = data;

  return (
    <section style={styles.card}>
      <header style={styles.header}>
        <div>
          <p style={styles.stationLabel}>STATION</p>
          <h2 style={styles.city}>
            {city}
            {country ? `, ${country}` : ""}
          </h2>
          <p style={styles.coords}>
            {coord?.lat?.toFixed(2)}°N&nbsp;&nbsp;{coord?.lon?.toFixed(2)}°E
            &nbsp;&nbsp;LOCAL {formatTime(dt, timezone)}
          </p>
        </div>
        <p style={styles.description}>{description}</p>
      </header>

      <div style={styles.body}>
        <Dial temperature={temperature} />

        <div style={styles.readouts}>
          <Readout label="FEELS LIKE" value={`${Math.round(feelsLike)}°`} />
          <Readout
            label="RANGE"
            value={`${Math.round(tempMin)}° / ${Math.round(tempMax)}°`}
          />
          <Readout label="HUMIDITY" value={`${humidity}%`} />
          <Readout label="PRESSURE" value={`${pressure} hPa`} />
          <Readout label="WIND" value={`${windSpeed} m/s`} />
          <Readout
            label="VISIBILITY"
            value={
              visibility != null ? `${(visibility / 1000).toFixed(1)} km` : "—"
            }
          />
          <Readout label="SUNRISE" value={formatTime(sunrise, timezone)} />
          <Readout label="SUNSET" value={formatTime(sunset, timezone)} />
        </div>
      </div>
    </section>
  );
}

function Readout({ label, value }) {
  return (
    <div style={styles.readout}>
      <span style={styles.readoutLabel}>{label}</span>
      <span style={styles.readoutValue}>{value}</span>
    </div>
  );
}

const styles = {
  card: {
    background: "var(--panel)",
    border: "1px solid var(--line)",
    borderRadius: 16,
    padding: 28,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 20,
  },
  stationLabel: {
    margin: 0,
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    letterSpacing: "0.14em",
    color: "var(--text-muted)",
  },
  city: {
    margin: "4px 0",
    fontFamily: "var(--font-display)",
    fontSize: 30,
    fontWeight: 600,
  },
  coords: {
    margin: 0,
    fontFamily: "var(--font-mono)",
    fontSize: 12,
    color: "var(--accent)",
  },
  description: {
    margin: 0,
    textTransform: "capitalize",
    color: "var(--text-muted)",
    fontSize: 14,
    alignSelf: "flex-end",
  },
  body: {
    display: "flex",
    gap: 32,
    flexWrap: "wrap",
    alignItems: "center",
  },
  dialCenter: {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  dialTemp: {
    fontFamily: "var(--font-display)",
    fontSize: 44,
    fontWeight: 700,
    lineHeight: 1,
  },
  dialUnit: {
    marginTop: 6,
    fontFamily: "var(--font-mono)",
    fontSize: 10,
    letterSpacing: "0.14em",
    color: "var(--text-muted)",
  },
  readouts: {
    flex: 1,
    minWidth: 260,
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 16,
  },
  readout: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    borderLeft: "2px solid var(--line)",
    paddingLeft: 10,
  },
  readoutLabel: {
    fontFamily: "var(--font-mono)",
    fontSize: 10,
    letterSpacing: "0.1em",
    color: "var(--text-muted)",
  },
  readoutValue: {
    fontFamily: "var(--font-display)",
    fontSize: 20,
    fontWeight: 600,
  },
};