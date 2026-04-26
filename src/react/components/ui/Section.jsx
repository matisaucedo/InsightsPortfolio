export default function Section({ children, className = "", id, backgroundElement, noFade = false }) {
  return (
    <section id={id} className={`section-py relative overflow-hidden ${className}`}>
      {backgroundElement && (
        <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
          {backgroundElement}
        </div>
      )}
      {!noFade && (
        <>
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 120,
              background: "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 100%)",
              pointerEvents: "none",
              zIndex: 2,
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 120,
              background: "linear-gradient(0deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 100%)",
              pointerEvents: "none",
              zIndex: 2,
            }}
          />
        </>
      )}
      <div style={{ position: "relative", zIndex: 1 }}>
        {children}
      </div>
    </section>
  );
}
