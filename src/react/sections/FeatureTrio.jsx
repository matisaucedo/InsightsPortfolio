import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import Container from "../components/ui/Container.jsx";
import Section from "../components/ui/Section.jsx";
import SectionLabel from "../components/ui/SectionLabel.jsx";
import featureAppsImg from "../../../assets/icons/feature-apps.webp";
import featureIntegrationsImg from "../../../assets/icons/feature-integrations.webp";
import featureAiImg from "../../../assets/icons/feature-ai.webp";

const CARDS = [
  {
    img: featureAppsImg,
    imgAlt: "Aplicaciones a medida",
    title: "Aplicaciones a medida",
    desc: "Construimos desde cero o mejoramos lo que ya tenés. Sin plantillas, sin límites — cada funcionalidad pensada para tu operación.",
    objectPosition: "50% 30%",
  },
  {
    img: featureIntegrationsImg,
    imgAlt: "Integraciones sin fricción",
    title: "Integraciones sin fricción",
    desc: "Conectamos tu software con las herramientas que ya usás. APIs, ERPs, pagos — sin duplicar trabajo ni interrumpir tu flujo.",
    objectPosition: "50% 50%",
  },
  {
    img: featureAiImg,
    imgAlt: "IA como ventaja competitiva",
    title: "IA como ventaja competitiva",
    desc: "Automatizamos decisiones repetitivas para que tu equipo se concentre en lo que importa. Cuanto más usás el sistema, más inteligente se vuelve.",
    objectPosition: "50% 34%",
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.16, delayChildren: 0.05 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 64 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] } },
};

const MAX_TILT = 10;
const SPRING = { stiffness: 220, damping: 18, mass: 0.5 };

function TiltCard({ data }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, v => v * MAX_TILT), SPRING);
  const ry = useSpring(useTransform(mx, v => v * MAX_TILT), SPRING);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.article
      ref={ref}
      variants={cardVariant}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        position: "relative",
        borderRadius: 16,
        overflow: "hidden",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.10)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 0 rgba(255,255,255,0.08)",
        display: "flex",
        flexDirection: "column",
        aspectRatio: "0.92 / 1",
        minHeight: 380,
        transformStyle: "preserve-3d",
        perspective: 800,
        rotateX: rx,
        rotateY: ry,
        willChange: "transform",
        transition: "border-color 0.25s ease, box-shadow 0.25s ease",
        cursor: "pointer",
      }}
      whileHover={{
        borderColor: "rgba(255,255,255,0.18)",
        boxShadow: "0 18px 48px rgba(0,0,0,0.45), 0 0 0 1px rgba(232,93,47,0.12), inset 0 1px 0 0 rgba(255,255,255,0.10)",
        transition: { duration: 0.28, ease: "easeOut" },
      }}
    >
      <div
        style={{
          width: "100%",
          flex: "0 0 65%",
          overflow: "hidden",
          background: "#0a0d0d",
          position: "relative",
        }}
      >
        <img
          src={data.img}
          alt={data.imgAlt}
          loading="lazy"
          draggable="false"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: data.objectPosition || "50% 50%",
            display: "block",
            pointerEvents: "none",
            userSelect: "none",
          }}
        />
        {/* Subtle bottom fade so the title area blends in */}
        <div
          style={{
            position: "absolute",
            inset: "auto 0 0 0",
            height: "40%",
            background: "linear-gradient(180deg, rgba(8,12,12,0) 0%, rgba(8,12,12,0.55) 100%)",
            pointerEvents: "none",
          }}
        />
      </div>

      <div
        style={{
          flex: 1,
          padding: "24px 26px 28px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          background: "rgba(8,12,12,0.55)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <h3
          style={{
            fontSize: 20,
            fontWeight: 500,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            color: "#fff",
            margin: 0,
            fontFamily: "var(--font-display)",
          }}
        >
          {data.title}
        </h3>
        <p
          style={{
            fontSize: 14,
            color: "#8a8a8a",
            lineHeight: "1.6em",
            letterSpacing: "-0.005em",
            margin: 0,
          }}
        >
          {data.desc}
        </p>
      </div>
    </motion.article>
  );
}

export default function FeatureTrio() {
  return (
    <Section id="features">
      <Container>
        {/* Header */}
        <div style={{ marginBottom: 56 }}>
          <SectionLabel>Lo que hacemos</SectionLabel>

          <motion.h2
            style={{
              fontSize: "clamp(28px, 3.5vw, 42px)",
              fontWeight: 400,
              letterSpacing: "-0.04em",
              lineHeight: "1.05em",
              color: "#fff",
              maxWidth: 520,
              marginBottom: 16,
              fontFamily: "var(--font-display)",
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.05 }}
          >
            Un equipo.{" "}
            <span style={{ color: "rgba(255,255,255,0.40)" }}>Tres superpoderes.</span>
          </motion.h2>

          <motion.p
            style={{
              fontSize: 16,
              color: "#8a8a8a",
              maxWidth: 400,
              lineHeight: "1.55em",
            }}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.14 }}
          >
            Todo lo que necesitás para crecer, automatizar y diferenciarte — guiado por IA.
          </motion.p>
        </div>

        {/* 3-card grid */}
        <motion.div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
            perspective: 1200,
          }}
          className="feat-trio-grid"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-48px" }}
        >
          {CARDS.map((c) => (
            <TiltCard key={c.title} data={c} />
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
