export default function HistoryPanel({ items, onSelect }) {
  return (
    <aside style={styles.wrap}>
      <p style={styles.label}>SEARCH LOG</p>
      {items.length === 0 ? (
        <p style={styles.empty}>No lookups logged yet.</p>
      ) : (
        <ul style={styles.list}>
          {items.map((item) => (
            <li key={item._id}>
              <button
                style={styles.row}
                onClick={() => onSelect({ city: item.city })}
              >
                <span style={styles.city}>{item.city}</span>
                <span style={styles.temp}>
                  {item.temperature != null
                    ? `${Math.round(item.temperature)}°`
                    : "—"}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}

const styles = {
  wrap: {
    background: "var(--panel)",
    border: "1px solid var(--line)",
    borderRadius: 16,
    padding: 20,
    height: "fit-content",
  },
  label: {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    letterSpacing: "0.14em",
    color: "var(--text-muted)",
    margin: "0 0 12px",
  },
  empty: {
    fontSize: 13,
    color: "var(--text-muted)",
  },
  list: { listStyle: "none", margin: 0, padding: 0 },
  row: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid var(--line)",
    color: "var(--text)",
    padding: "10px 2px",
    cursor: "pointer",
    fontFamily: "var(--font-body)",
    fontSize: 14,
  },
  city: { textAlign: "left" },
  temp: { fontFamily: "var(--font-mono)", color: "var(--accent)" },
};