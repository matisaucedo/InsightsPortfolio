import React from "react";
import { motion } from "framer-motion";

/*
 * TestimonialWall — animated 2-row marquee adapted from
 * Framer Marketplace "Testimonial Animated" template.
 * - Two rows scroll in opposite directions, pause on hover.
 * - Cards: 5-star rating (orange), quote, photo avatar + name/role.
 * - Edge fade masks for seamless infinite loop.
 *
 * Props:
 *   testimonials: [{ quote, name, role, company, image }]
 *   rowSpeeds?: [topSec, bottomSec]  (default [42, 38])
 */

const ORANGE = "#fa8039";

function Stars() {
  return (
    <div style={{ display: "flex", gap: 3, marginBottom: 14 }} aria-label="5 de 5 estrellas">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill={ORANGE}
          aria-hidden="true"
          style={{ filter: "drop-shadow(0 0 6px rgba(250,128,57,0.45))" }}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function Avatar({ image, name }) {
  return (
    <div
      style={{
        width: 38,
        height: 38,
        borderRadius: "50%",
        overflow: "hidden",
        flexShrink: 0,
        background: "rgba(232,93,47,0.16)",
        border: "1px solid rgba(250,128,57,0.30)",
        boxShadow: "0 0 0 1px rgba(0,0,0,0.4)",
      }}
    >
      <img
        src={image}
        alt={name}
        loading="lazy"
        decoding="async"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    </div>
  );
}

function TestimonialCard({ t }) {
  return (
    <div
      style={{
        position: "relative",
        width: 340,
        flexShrink: 0,
        borderRadius: 18,
        background:
          "linear-gradient(180deg, rgba(22,22,24,0.92) 0%, rgba(12,12,14,0.94) 100%)",
        border: "1px solid rgba(255,255,255,0.07)",
        padding: "22px 24px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 0,
        userSelect: "none",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.05), 0 18px 40px -24px rgba(0,0,0,0.7)",
      }}
    >
      {/* Subtle inner top-left highlight (matches Framer haze) */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 18,
          pointerEvents: "none",
          background:
            "radial-gradient(120% 80% at 0% 0%, rgba(250,128,57,0.06) 0%, rgba(255,255,255,0) 55%)",
        }}
      />

      <Stars />

      <p
        style={{
          fontSize: 14,
          color: "rgba(255,255,255,0.74)",
          lineHeight: "1.6em",
          letterSpacing: "-0.005em",
          margin: 0,
          marginBottom: 22,
          fontStyle: "italic",
          minHeight: "5.6em",
        }}
      >
        &ldquo;{t.quote}&rdquo;
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: "auto" }}>
        <Avatar image={t.image} name={t.name} />
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontSize: 13.5,
              fontWeight: 600,
              color: "#fff",
              letterSpacing: "-0.01em",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {t.name}
          </div>
          <div
            style={{
              fontSize: 11.5,
              color: "rgba(255,255,255,0.45)",
              marginTop: 2,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {t.role}
            {t.company ? ` · ${t.company}` : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({ items, direction = "left", duration = 40 }) {
  const doubled = [...items, ...items];

  return (
    <div
      style={{ overflow: "hidden", width: "100%" }}
      onMouseEnter={(e) => {
        const track = e.currentTarget.querySelector(".tw-track");
        if (track) track.style.animationPlayState = "paused";
      }}
      onMouseLeave={(e) => {
        const track = e.currentTarget.querySelector(".tw-track");
        if (track) track.style.animationPlayState = "running";
      }}
    >
      <div
        className="tw-track"
        style={{
          display: "flex",
          gap: 18,
          width: "max-content",
          animation: `tw-marquee-${direction} ${duration}s linear infinite`,
          animationPlayState: "running",
          willChange: "transform",
        }}
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
}

export default function TestimonialWall({ testimonials, rowSpeeds = [42, 38], fadeColor = "#000" }) {
  const half = Math.ceil(testimonials.length / 2);
  const ROW_1 = testimonials.slice(0, half);
  const ROW_2 = testimonials.slice(half);

  return (
    <motion.div
      style={{ display: "flex", flexDirection: "column", gap: 18 }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
    >
      <style>{`
        @keyframes tw-marquee-left {
          from { transform: translate3d(0,0,0); }
          to   { transform: translate3d(-50%,0,0); }
        }
        @keyframes tw-marquee-right {
          from { transform: translate3d(-50%,0,0); }
          to   { transform: translate3d(0,0,0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .tw-track { animation: none !important; }
        }
      `}</style>

      <div style={{ position: "relative" }}>
        <EdgeFade side="left" color={fadeColor} />
        <EdgeFade side="right" color={fadeColor} />
        <MarqueeRow items={ROW_1} direction="left" duration={rowSpeeds[0]} />
      </div>

      <div style={{ position: "relative" }}>
        <EdgeFade side="left" color={fadeColor} />
        <EdgeFade side="right" color={fadeColor} />
        <MarqueeRow items={ROW_2.length ? ROW_2 : ROW_1} direction="right" duration={rowSpeeds[1]} />
      </div>
    </motion.div>
  );
}

function EdgeFade({ side, color }) {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        [side]: 0,
        width: 140,
        background: `linear-gradient(to ${side === "left" ? "right" : "left"}, ${color}, transparent)`,
        zIndex: 2,
        pointerEvents: "none",
      }}
    />
  );
}
