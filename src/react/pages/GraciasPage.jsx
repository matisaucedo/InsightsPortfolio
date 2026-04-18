import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import GrainOverlay from "../components/ui/GrainOverlay.jsx";

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 },
  }),
};

const StarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="#fa8039" stroke="none" aria-hidden="true">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default function GraciasPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0a0a0d 0%, #0d0b12 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px 160px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <GrainOverlay />

      {/* Subtle warm glow — tighter, more centred */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 60% 40% at 50% 42%, rgba(250,128,57,0.07), transparent 65%)",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          maxWidth: 920,
          width: "100%",
        }}
      >
        {/* Stars row */}
        <motion.div
          custom={0}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          style={{ display: "flex", gap: 3, marginBottom: 16 }}
        >
          {[0, 1, 2, 3, 4].map((i) => <StarIcon key={i} />)}
        </motion.div>

        {/* Badge pill */}
        <motion.div
          custom={1}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "5px 14px",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 999,
            marginBottom: 40,
            background: "rgba(255,255,255,0.03)",
          }}
        >
          {/* Animated dot */}
          <span style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#4ade80",
                display: "block",
              }}
            />
            <span
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "rgba(74,222,128,0.4)",
                animation: "pingBadge 1.8s ease-out infinite",
              }}
            />
            <style>{`@keyframes pingBadge{0%{transform:scale(1);opacity:.6}70%{transform:scale(2.2);opacity:0}100%{transform:scale(2.2);opacity:0}}`}</style>
          </span>
          <span
            style={{
              fontSize: 11,
              fontFamily: "Inter, system-ui, sans-serif",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.65)",
            }}
          >
            Mensaje recibido · Respuesta en &lt;24h
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={2}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          style={{
            fontSize: "clamp(44px, 8.5vw, 112px)",
            fontWeight: 700,
            letterSpacing: "-0.045em",
            lineHeight: 0.92,
            color: "#fff",
            margin: "0 0 28px",
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          Gracias. Vamos a crear algo increíble.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          custom={3}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          style={{
            fontSize: "clamp(15px, 1.4vw, 18px)",
            color: "rgba(255,255,255,0.5)",
            maxWidth: 500,
            lineHeight: 1.65,
            margin: "0 0 14px",
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          Recibimos tu idea. Te respondemos en menos de 24 horas con un plan claro para tu software.
        </motion.p>

        {/* Detail row */}
        <motion.p
          custom={4}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.38)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            fontWeight: 500,
            margin: "0 0 48px",
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          CONSULTA GRATUITA · 60 MINUTOS · SIN COMPROMISO
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={5}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}
        >
          {/* Primary — white/black per editr ref */}
          <Link
            to="/"
            style={{
              height: 44,
              padding: "0 24px",
              borderRadius: 999,
              background: "#fff",
              color: "#000",
              fontSize: 14,
              fontWeight: 500,
              fontFamily: "Inter, system-ui, sans-serif",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              letterSpacing: "-0.005em",
              transition: "background 0.2s, transform 0.15s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#f0f0f0"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Volver al inicio
          </Link>

          {/* Secondary — ghost */}
          <Link
            to="/proyectos"
            style={{
              height: 44,
              padding: "0 24px",
              borderRadius: 999,
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#fff",
              fontSize: 14,
              fontWeight: 500,
              fontFamily: "Inter, system-ui, sans-serif",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              letterSpacing: "-0.005em",
              transition: "background 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.06)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.24)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
            }}
          >
            Ver proyectos
          </Link>
        </motion.div>
      </div>

      {/* Giant wordmark at bottom — opacity ≤0.05 */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: -16,
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "clamp(80px, 20vw, 280px)",
          fontWeight: 900,
          color: "rgba(255,255,255,0.04)",
          letterSpacing: "-0.06em",
          lineHeight: 1,
          whiteSpace: "nowrap",
          pointerEvents: "none",
          fontFamily: "Inter, system-ui, sans-serif",
          userSelect: "none",
        }}
      >
        INSIGHTS
      </div>
    </div>
  );
}
