import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import Section from "../components/ui/Section.jsx";
import Container from "../components/ui/Container.jsx";
import SectionLabel from "../components/ui/SectionLabel.jsx";

const STEPS = [
  {
    num: "01",
    title: "Llamada inicial",
    description:
      "Auditamos tu idea juntos. Definimos el alcance real, los tiempos y las prioridades antes de escribir una sola línea de código.",
  },
  {
    num: "02",
    title: "Desarrollo iterativo",
    description:
      "Construimos en ciclos cortos. Ves el avance en tiempo real y pedís cambios antes del lanzamiento.",
  },
  {
    num: "03",
    title: "Publicación",
    description:
      "Deploy en tu dominio con todo configurado. Hosting, dominio, SSL, performance — nada queda suelto.",
  },
  {
    num: "04",
    title: "Entrega total",
    description:
      "Código fuente, documentación completa y sesión de entrenamiento. Tu equipo queda autónomo.",
  },
];

/* SVG path — single source of truth, used both for rendering and for
   computing orb positions / activation thresholds via getPointAtLength. */
const ROADMAP_PATH = "M 303 35 C 540 70, 560 195, 494 219 C 428 243, 200 360, 303 390 C 406 420, 540 505, 494 538";

/* Orb anchor points on the path (viewBox 797×591). These correspond to the
   start of segment 1, end of seg 1, end of seg 2, end of seg 3 — exact
   endpoints, so getPointAtLength matches them deterministically. */
const ORB_POINTS = [
  { x: 303, y: 35 },
  { x: 494, y: 219 },
  { x: 303, y: 390 },
  { x: 494, y: 538 },
];

/* Positions for absolute card layout, expressed as % of viewBox dimensions. */
const STEP_POSITIONS = ORB_POINTS.map((p) => ({
  top: `${(p.y / 591) * 100}%`,
  left: `${(p.x / 797) * 100}%`,
}));

/* Fallback thresholds — overridden at mount with measured arc-length
   fractions. Defaults assume roughly equal thirds. */
const FALLBACK_THRESHOLDS = [0, 0.34, 0.67, 1];

/* ── Metallic Orb ──────────────────────────────────────────────────── */
function OrbPin({ isActive }) {
  return (
    <div style={{ position: "relative", width: 72, height: 72, flexShrink: 0 }}>
      {/* Pulse rings — only rendered when active */}
      {isActive && (
        <>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 52,
              height: 52,
              borderRadius: "50%",
              border: "1px solid rgba(250,128,57,0.22)",
              animation: "roadmap-ring-pulse 1.8s ease-out infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 72,
              height: 72,
              borderRadius: "50%",
              border: "1px solid rgba(250,128,57,0.08)",
              animation: "roadmap-ring-pulse 1.8s ease-out 0.4s infinite",
            }}
          />
        </>
      )}

      {/* Orb sphere */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: isActive
            ? "radial-gradient(circle at 30% 28%, rgba(255,255,255,0.98) 0%, rgba(230,218,205,0.85) 10%, rgba(185,168,148,0.7) 25%, rgba(130,112,92,0.5) 45%, rgba(70,58,44,0.3) 68%, rgba(18,14,10,0.18) 100%)"
            : "#111",
          boxShadow: isActive
            ? "0 0 10px rgba(250,128,57,1), 0 0 22px rgba(250,128,57,0.65), 0 0 48px rgba(250,128,57,0.3), 0 0 80px rgba(250,128,57,0.1), inset 0 1.5px 0 rgba(255,255,255,0.65), inset -1px -2px 6px rgba(0,0,0,0.5)"
            : "none",
          opacity: isActive ? 1 : 0.3,
          transition: "opacity 0.5s ease",
        }}
      />
    </div>
  );
}

/* ── Content card ──────────────────────────────────────────────────── */
function StepCard({ step, isActive }) {
  return (
    <div
      style={{
        background: "rgba(9,10,14,0.97)",
        border: "1px solid rgba(255,255,255,0.065)",
        borderRadius: 12,
        padding: "14px 16px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.03)",
        opacity: isActive ? 1 : 0.3,
        transition: "opacity 0.5s ease",
        width: 300,
      }}
    >
      <div>
        <div
          style={{
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: "-0.025em",
            color: "#fff",
            marginBottom: 5,
            lineHeight: "1.3em",
          }}
        >
          {step.title}
        </div>
        <div
          style={{
            fontSize: 11.5,
            color: "rgba(255,255,255,0.52)",
            lineHeight: "1.55em",
          }}
        >
          {step.description}
        </div>
      </div>
    </div>
  );
}

/* ── Desktop layout ────────────────────────────────────────────────── */
function DesktopRoadmap({ scrollYProgress }) {
  const pathRef = useRef(null);
  const [pathLength, setPathLength] = useState(1300);
  const thresholdsRef = useRef(FALLBACK_THRESHOLDS);
  const [activeSteps, setActiveSteps] = useState([false, false, false, false]);

  useEffect(() => {
    if (!pathRef.current) return;
    const total = pathRef.current.getTotalLength();
    setPathLength(total);

    /* For each orb point, sample the path and find the arc-length at which
       the path passes closest to it. That fraction is the exact scroll
       progress at which the animated line reaches that orb. */
    const SAMPLES = 600;
    const thresholds = ORB_POINTS.map((orb) => {
      let bestLen = 0;
      let bestDist = Infinity;
      for (let i = 0; i <= SAMPLES; i++) {
        const len = (i / SAMPLES) * total;
        const pt = pathRef.current.getPointAtLength(len);
        const dx = pt.x - orb.x;
        const dy = pt.y - orb.y;
        const d = dx * dx + dy * dy;
        if (d < bestDist) {
          bestDist = d;
          bestLen = len;
        }
      }
      return bestLen / total;
    });
    thresholdsRef.current = thresholds;
    const v = scrollYProgress.get();
    setActiveSteps(thresholds.map((t) => v >= t));
  }, [scrollYProgress]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActiveSteps((prev) => {
      const next = thresholdsRef.current.map((t) => v >= t);
      const changed = next.some((val, i) => val !== prev[i]);
      return changed ? next : prev;
    });
  });

  const strokeDashoffset = useTransform(
    scrollYProgress,
    [0, 1],
    [pathLength, 0]
  );

  return (
    <div
      className="roadmap-desktop"
      style={{ position: "relative", width: "100%", aspectRatio: "1.35 / 1", minHeight: 580 }}
    >
      {/* SVG curve */}
      <svg
        viewBox="0 0 797 591"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          overflow: "visible",
        }}
        preserveAspectRatio="none"
      >
        {/* Static dim rail */}
        <path
          d={ROADMAP_PATH}
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="1"
          fill="none"
        />

        {/* Animated glow path */}
        <g
          style={{
            filter:
              "drop-shadow(0 0 2px rgba(250,128,57,1)) drop-shadow(0 0 8px rgba(250,128,57,0.85)) drop-shadow(0 0 20px rgba(250,128,57,0.5)) drop-shadow(0 0 45px rgba(250,128,57,0.2))",
          }}
        >
          <motion.path
            ref={pathRef}
            d={ROADMAP_PATH}
            stroke="#fa8039"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={pathLength}
            style={{ strokeDashoffset }}
          />
        </g>
      </svg>

      {/* Steps */}
      {STEPS.map((step, i) => {
        const isActive = activeSteps[i];
        /* alternate card side based on position */
        return (
          <div
            key={step.num}
            style={{
              position: "absolute",
              top: STEP_POSITIONS[i].top,
              left: STEP_POSITIONS[i].left,
              transform: "translate(-50%, -50%)",
              display: "flex",
              alignItems: "center",
              gap: 0,
            }}
          >
            {/* Step number */}
            <span
              style={{
                position: "absolute",
                top: -18,
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: 11,
                fontFamily: "'Geist Mono', 'Courier New', monospace",
                color: "rgba(250,128,57,0.65)",
                letterSpacing: "0.05em",
                whiteSpace: "nowrap",
              }}
            >
              {step.num}
            </span>

            <OrbPin isActive={isActive} />

            {/* Card — toggled side */}
            <div
              style={{
                position: "absolute",
                ...(i % 2 === 0
                  ? { left: "calc(100% + 12px)" }
                  : { right: "calc(100% + 12px)" }),
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <StepCard step={step} isActive={isActive} index={i} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── Mobile layout ─────────────────────────────────────────────────── */
function MobileRoadmap({ scrollYProgress }) {
  const containerRef = useRef(null);
  const orbRefs = useRef([]);
  const thresholdsRef = useRef(FALLBACK_THRESHOLDS);
  const [activeSteps, setActiveSteps] = useState([false, false, false, false]);
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const measure = () => {
      const cRect = container.getBoundingClientRect();
      if (cRect.height === 0) return;
      const thresholds = orbRefs.current.map((el) => {
        if (!el) return 0;
        const r = el.getBoundingClientRect();
        const orbCenter = r.top + r.height / 2 - cRect.top;
        return Math.max(0, Math.min(1, orbCenter / cRect.height));
      });
      thresholdsRef.current = thresholds;
      const v = scrollYProgress.get();
      setActiveSteps(thresholds.map((t) => v >= t));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(container);
    return () => ro.disconnect();
  }, [scrollYProgress]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActiveSteps((prev) => {
      const next = thresholdsRef.current.map((t) => v >= t);
      const changed = next.some((val, i) => val !== prev[i]);
      return changed ? next : prev;
    });
  });

  return (
    <div
      ref={containerRef}
      className="roadmap-mobile"
      style={{ position: "relative", paddingLeft: 44, display: "none" }}
    >
      {/* Vertical rail */}
      <div
        style={{
          position: "absolute",
          left: 14,
          top: 0,
          bottom: 0,
          width: 1.5,
          background: "rgba(255,255,255,0.06)",
        }}
      />

      {/* Progress fill */}
      <motion.div
        style={{
          position: "absolute",
          left: 14,
          top: 0,
          width: 1.5,
          height: lineHeight,
          background: "linear-gradient(to bottom, #fa8039, rgba(250,128,57,0.25))",
        }}
      />

      {/* Glow on fill */}
      <motion.div
        style={{
          position: "absolute",
          left: 11,
          top: 0,
          width: 7,
          height: lineHeight,
          background: "linear-gradient(to bottom, rgba(250,128,57,0.6), transparent)",
          filter: "blur(4px)",
        }}
      />

      {/* Steps */}
      {STEPS.map((step, i) => {
        const isActive = activeSteps[i];
        return (
          <div
            key={step.num}
            style={{
              position: "relative",
              marginBottom: 32,
              display: "flex",
              alignItems: "flex-start",
              gap: 16,
            }}
          >
            {/* Orb on the rail */}
            <div
              ref={(el) => (orbRefs.current[i] = el)}
              style={{
                position: "absolute",
                left: -38,
                top: 4,
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: isActive
                  ? "radial-gradient(circle at 30% 28%, rgba(255,255,255,0.98) 0%, rgba(230,218,205,0.85) 10%, rgba(185,168,148,0.7) 25%, rgba(130,112,92,0.5) 45%, rgba(70,58,44,0.3) 68%, rgba(18,14,10,0.18) 100%)"
                  : "#111",
                boxShadow: isActive
                  ? "0 0 6px rgba(250,128,57,1), 0 0 14px rgba(250,128,57,0.6), 0 0 30px rgba(250,128,57,0.25), inset 0 1px 0 rgba(255,255,255,0.6)"
                  : "none",
                opacity: isActive ? 1 : 0.3,
                transition: "opacity 0.5s ease",
                flexShrink: 0,
              }}
            />

            {/* Card */}
            <div style={{ flex: 1 }}>
              <StepCard step={step} isActive={isActive} index={i} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── Root ──────────────────────────────────────────────────────────── */
export default function RoadmapSection() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    /* progress 0 when the roadmap canvas top hits 85% of viewport (just entering),
       progress 1 when the roadmap canvas bottom hits 90% of viewport (last orb
       still well above the fold). This guarantees the line finishes drawing
       — and the final card lights up — before the next section starts taking
       over the screen. */
    offset: ["start 85%", "end 90%"],
  });

  return (
    <Section id="roadmap">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute top-1/3 -left-32 rounded-full"
        style={{
          width: 400,
          height: 400,
          background: "radial-gradient(circle, rgba(232,93,47,0.05) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <Container className="relative z-10">
        {/* Header */}
        <div className="mb-20 md:mb-28">
          <SectionLabel>Cómo trabajamos</SectionLabel>

          <motion.h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 4.5vw, 52px)",
              fontWeight: 400,
              letterSpacing: "-0.04em",
              lineHeight: "1.05em",
              color: "#fff",
              maxWidth: 580,
              marginBottom: 16,
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            De cero a lanzado.
            <br />
            En semanas.
          </motion.h2>

          <motion.p
            style={{ fontSize: 16, color: "#8a8a8a", maxWidth: 420, lineHeight: "1.6em" }}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            Sin experiencia previa necesaria. Guiamos cada paso del proceso.
          </motion.p>

          <motion.button
            style={{
              marginTop: 32,
              borderRadius: 999,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#fff",
              fontSize: 14,
              fontWeight: 500,
              padding: "0 28px",
              height: 48,
              cursor: "pointer",
              fontFamily: "Inter, system-ui, sans-serif",
              display: "inline-flex",
              alignItems: "center",
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            whileHover={{ background: "rgba(255,255,255,0.14)" }}
            onClick={() => window.open("https://wa.me/5491112345678", "_blank")}
          >
            Quiero agendar →
          </motion.button>
        </div>

        {/* Roadmap canvas */}
        <div ref={containerRef}>
          <DesktopRoadmap scrollYProgress={scrollYProgress} />
          <MobileRoadmap  scrollYProgress={scrollYProgress} />
        </div>
      </Container>
    </Section>
  );
}
