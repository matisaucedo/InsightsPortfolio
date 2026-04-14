export default function IconItem({ icon, title, desc, gap = 10, titleSize = 16, descColor = "#8a8a8a" }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap }}>
        <span style={{ color: "#fff", opacity: 0.75, flexShrink: 0, marginTop: 1, lineHeight: 0 }}>
          {icon}
        </span>
        <p style={{ fontSize: titleSize, fontWeight: 500, letterSpacing: "-0.02em", lineHeight: "1.2em", color: "#fff", margin: 0 }}>
          {title}
        </p>
      </div>
      <p style={{ fontSize: 14, color: descColor, lineHeight: "1.6em", letterSpacing: "-0.005em", margin: 0 }}>
        {desc}
      </p>
    </div>
  );
}
