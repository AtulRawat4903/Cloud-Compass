export default function Loader() {
  return (
    <div style={styles.wrap} role="status" aria-live="polite">
      <div style={styles.ring} />
      <span style={styles.text}>ACQUIRING SIGNAL…</span>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

const styles = {
  wrap: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "40px 0",
    color: "var(--text-muted)",
    fontFamily: "var(--font-mono)",
    fontSize: 12,
    letterSpacing: "0.1em",
  },
  ring: {
    width: 22,
    height: 22,
    borderRadius: "50%",
    border: "3px solid var(--line)",
    borderTopColor: "var(--accent)",
    animation: "spin 0.8s linear infinite",
  },
  text: {},
};