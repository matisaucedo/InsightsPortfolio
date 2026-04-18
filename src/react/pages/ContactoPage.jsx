import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import GrainOverlay from "../components/ui/GrainOverlay.jsx";
import { PROJECTS } from "../data/projects.js";

/* ─────────────────────────────────────────────────────────────────────────
 * BACKEND HANDOFF — leer esto antes de tocar el form
 * ─────────────────────────────────────────────────────────────────────────
 * La UI está 100% terminada (4-step wizard con validación, animaciones,
 * estados de error y loading). Lo ÚNICO que falta es el POST real al
 * backend. El flujo actual es stub:
 *
 *   1. Usuario completa los 4 steps.
 *   2. Clickea "Enviar" → se llama a submitContactoForm(payload) (abajo).
 *   3. El stub actualmente guarda el payload en sessionStorage, hace un
 *      console.log y resuelve inmediatamente. Luego el wizard navega a
 *      /gracias.
 *
 * Para wirear el backend real:
 *   - Reemplazar el cuerpo de submitContactoForm() con el fetch definitivo.
 *   - Respetar el contrato: si resuelve OK → navega a /gracias. Si rechaza
 *     con Error(msg) → muestra msg en el form y queda en el último step.
 *   - Shape del payload está documentado en el JSDoc de la función.
 *   - Timeout recomendado: 10s (ver AbortController).
 *   - Endpoint sugerido: POST /api/contacto (Render web_service expose o
 *     edge function). CORS ya está OK porque el portfolio es mismo origen.
 *
 * Referencia (endpoint Formspree previo, ya deprecado): xblzjjow
 * ───────────────────────────────────────────────────────────────────────── */

/**
 * Envía el payload del form al backend.
 * @param {{
 *   nombre: string,         // min 2 chars
 *   email: string,          // validado con regex básica
 *   idea: string,           // 20–1000 chars
 *   presupuesto: string,    // uno de BUDGET_OPTIONS[].value
 *   proyecto: string,       // id del proyecto o "general"
 *   meta: { submittedAt: string, userAgent: string, referrer: string }
 * }} payload
 * @returns {Promise<void>}  resolver = éxito · rejectar con Error(msg) = fallo
 */
async function submitContactoForm(payload) {
  // ── STUB (sin backend) ────────────────────────────────────────────────
  // Guardo el payload para que el backend dev pueda inspeccionarlo en
  // DevTools y para que /gracias pueda mostrar "Gracias {nombre}" si quiere.
  try {
    sessionStorage.setItem("insights_last_contacto_submission", JSON.stringify(payload));
  } catch { /* sessionStorage puede estar bloqueado, no importa */ }
  if (import.meta.env.DEV) {
    // Payload visible para el backend dev cuando haga QA.
    // eslint-disable-next-line no-console
    console.info("[ContactoPage] submitContactoForm payload:", payload);
  }
  // Ficción de latencia para que el botón "Enviando…" no parpadee.
  await new Promise((r) => setTimeout(r, 400));
  return; // ← el backend dev reemplaza TODO lo de arriba por un fetch real.

  // ── CUANDO EL BACKEND EXISTA, usar algo así: ─────────────────────────
  //
  // const controller = new AbortController();
  // const timeout = setTimeout(() => controller.abort(), 10_000);
  // try {
  //   const res = await fetch("/api/contacto", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json", Accept: "application/json" },
  //     body: JSON.stringify(payload),
  //     signal: controller.signal,
  //   });
  //   if (!res.ok) {
  //     const data = await res.json().catch(() => ({}));
  //     throw new Error(data.message || "No pudimos enviar tu mensaje. Probá de nuevo.");
  //   }
  // } finally {
  //   clearTimeout(timeout);
  // }
}

const BUDGET_OPTIONS = [
  { value: "$6k — $8k USD", label: "💸 $6k — $8k USD" },
  { value: "$8k — $10k USD", label: "💰 $8k — $10k USD" },
  { value: "$10k+ USD", label: "💎 $10k+ USD" },
];

const STEPS = [
  {
    key: "nombre",
    title: "¿Cómo te llamás?",
    subtitle: null,
    type: "text",
    placeholder: "Tu nombre",
    validate: (v) => v.trim().length >= 2 ? null : "Mínimo 2 caracteres",
  },
  {
    key: "email",
    title: "¿Cuál es tu email?",
    subtitle: "Te respondemos en menos de 24 horas.",
    type: "email",
    placeholder: "tu@email.com",
    validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? null : "Email inválido",
  },
  {
    key: "idea",
    title: "Contanos tu idea.",
    subtitle: "Mientras más detalle, mejor podemos ayudarte.",
    type: "textarea",
    placeholder: "Describí qué querés construir, para qué audiencia, y qué problema resuelve…",
    validate: (v) => {
      if (v.trim().length < 20) return "Mínimo 20 caracteres";
      if (v.length > 1000) return "Máximo 1000 caracteres";
      return null;
    },
  },
  {
    key: "presupuesto",
    title: "¿Cuál es tu presupuesto?",
    subtitle: "Nos ayuda a dimensionar el alcance.",
    type: "radio",
    options: BUDGET_OPTIONS,
    validate: (v) => v ? null : "Seleccioná una opción",
  },
];

// Pure opacity crossfade — 180ms easeOut, per LeadQualification spec §6
const fadeProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.18, ease: "easeOut" },
};

const CARD_STYLES = `
  /* Input + textarea: matched to option card aesthetic */
  .contacto-input,
  .contacto-textarea {
    width: 100%;
    background: rgba(255,255,255,0.03);
    border: 1.5px solid rgba(255,255,255,0.12);
    border-radius: 12px;
    color: #fff;
    font-size: 14px;
    font-family: Inter, system-ui, sans-serif;
    font-weight: 400;
    line-height: 1.5;
    outline: none;
    box-sizing: border-box;
    transition: border-color 0.18s ease-out, box-shadow 0.18s ease-out;
  }
  .contacto-input {
    height: 48px;
    padding: 0 16px;
  }
  .contacto-textarea {
    min-height: 120px;
    padding: 14px 16px;
    resize: vertical;
  }
  .contacto-input::placeholder,
  .contacto-textarea::placeholder {
    color: rgba(255,255,255,0.40);
  }
  .contacto-input:focus,
  .contacto-textarea:focus {
    border-color: #fa8039;
    box-shadow: 0 0 22px rgba(250,128,57,0.22), inset 0 1px 0 rgba(255,255,255,0.12);
  }
  .contacto-input[aria-invalid="true"],
  .contacto-textarea[aria-invalid="true"] {
    border-color: #ff5555;
  }

  /* Option card: LeadQualification reference §5 (accent swapped violet→orange) */
  .lq-option {
    width: 100%;
    padding: 12px 16px;
    border-radius: 12px;
    border: 1.5px solid rgba(255,255,255,0.12);
    background: transparent;
    color: #fff;
    font: 500 13px/1 Inter, system-ui, sans-serif;
    display: flex;
    align-items: center;
    gap: 12px;
    transition: border-color 0.18s ease-out, box-shadow 0.18s ease-out, transform 0.18s ease-out;
    cursor: pointer;
    text-align: left;
    outline: none;
  }
  .lq-option:hover {
    border-color: rgba(255,255,255,0.22);
  }
  .lq-option[data-selected="true"] {
    border-color: #fa8039;
    box-shadow:
      0 0 22px rgba(250,128,57,0.27),
      inset 0 1px 0 rgba(255,255,255,0.12);
    transform: translateY(-1px) scale(1.015);
  }
  .lq-option:focus-visible {
    border-color: rgba(250,128,57,0.6);
    box-shadow: 0 0 0 2px rgba(250,128,57,0.25);
  }

  /* Back ghost button */
  .lq-back {
    height: 42px;
    padding: 0 16px;
    border-radius: 10px;
    border: 1.5px solid rgba(255,255,255,0.12);
    background: rgba(255,255,255,0.04);
    color: rgba(255,255,255,0.55);
    font: 500 13px/1 Inter, system-ui, sans-serif;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: border-color 0.18s, color 0.18s;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .lq-back:hover {
    border-color: rgba(255,255,255,0.22);
    color: rgba(255,255,255,0.75);
  }
  .lq-back:focus-visible {
    outline: 2px solid rgba(250,128,57,0.5);
    outline-offset: 2px;
  }

  /* Continue muted */
  .lq-continue {
    flex: 1;
    height: 42px;
    padding: 0;
    border-radius: 10px;
    border: none;
    background: rgba(255,255,255,0.07);
    color: #fff;
    font: 600 13px/1 Inter, system-ui, sans-serif;
    cursor: pointer;
    transition: background 0.18s, color 0.18s;
  }
  .lq-continue:hover:not(:disabled) {
    background: rgba(255,255,255,0.10);
  }
  .lq-continue:disabled {
    color: rgba(255,255,255,0.40);
    cursor: not-allowed;
  }
  .lq-continue:focus-visible {
    outline: 2px solid rgba(250,128,57,0.5);
    outline-offset: 2px;
  }

  /* Final submit — accent gradient */
  .lq-submit {
    flex: 1;
    height: 46px;
    padding: 0;
    border-radius: 12px;
    border: none;
    background: linear-gradient(135deg, rgba(250,128,57,0.87), #fa8039);
    box-shadow: 0 6px 24px rgba(250,128,57,0.33);
    color: #fff;
    font: 700 14px/1 Inter, system-ui, sans-serif;
    cursor: pointer;
    transition: opacity 0.18s, box-shadow 0.18s;
  }
  .lq-submit:hover:not(:disabled) {
    opacity: 0.92;
    box-shadow: 0 8px 28px rgba(250,128,57,0.40);
  }
  .lq-submit:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
  .lq-submit:focus-visible {
    outline: 2px solid rgba(250,128,57,0.7);
    outline-offset: 3px;
  }
`;

export default function ContactoPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const project = projectId ? PROJECTS.find((p) => p.id === projectId) : null;

  const [step, setStep] = useState(0);
  const [data, setData] = useState({ nombre: "", email: "", idea: "", presupuesto: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const currentStep = STEPS[step];
  const currentValue = data[currentStep.key];
  const progressPct = Math.round(((step + 1) / STEPS.length) * 100);
  const isLast = step === STEPS.length - 1;
  const err = errors[currentStep.key];

  function handleChange(val) {
    setData((d) => ({ ...d, [currentStep.key]: val }));
    if (errors[currentStep.key]) setErrors((e) => ({ ...e, [currentStep.key]: null }));
  }

  function handleNext() {
    const error = currentStep.validate(currentValue);
    if (error) { setErrors((e) => ({ ...e, [currentStep.key]: error })); return; }
    if (step < STEPS.length - 1) { setStep((s) => s + 1); } else { handleSubmit(); }
  }

  function handleBack() {
    if (step > 0) setStep((s) => s - 1);
  }

  async function handleSubmit() {
    setSubmitting(true);
    setSubmitError(null);
    try {
      await submitContactoForm({
        nombre: data.nombre.trim(),
        email: data.email.trim(),
        idea: data.idea.trim(),
        presupuesto: data.presupuesto,
        proyecto: projectId || "general",
        meta: {
          submittedAt: new Date().toISOString(),
          userAgent: navigator.userAgent,
          referrer: document.referrer || "",
        },
      });
      navigate("/gracias");
    } catch (e) {
      setSubmitError(e?.message || "Algo salió mal. Intentá de nuevo.");
      setSubmitting(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && currentStep.type !== "textarea") handleNext();
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "72px 20px 48px",
        position: "relative",
      }}
    >
      <style>{CARD_STYLES}</style>
      <GrainOverlay />

      {/* Radial orange glow behind card */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 70% 50% at 50% 55%, rgba(250,128,57,0.10), transparent 65%)",
          pointerEvents: "none",
        }}
      />

      {/* Back to home */}
      <div style={{ position: "absolute", top: 24, left: 24, zIndex: 2 }}>
        <Link
          to="/"
          style={{
            fontSize: 13,
            color: "rgba(255,255,255,0.4)",
            textDecoration: "none",
            fontFamily: "Inter, system-ui, sans-serif",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            transition: "color 0.18s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Insights
        </Link>
      </div>

      {/* Glass card — LeadQualification spec §4, wider for text inputs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: "easeOut" }}
        style={{
          width: "100%",
          maxWidth: 460,
          background: "#0f0f11",
          backdropFilter: "blur(20px) saturate(1.8) brightness(1.04)",
          WebkitBackdropFilter: "blur(20px) saturate(1.8) brightness(1.04)",
          borderRadius: 24,
          padding: "24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Card overlay gradients (§2) */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: [
              "radial-gradient(rgba(255,255,255,0.07) 0%, transparent 65%)",
              "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
            ].join(", "),
            borderRadius: 24,
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative" }}>
          {/* Project context pill */}
          {project && (
            <div
              style={{
                fontSize: 11,
                color: "rgba(250,128,57,0.85)",
                fontFamily: "Inter, system-ui, sans-serif",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontWeight: 700,
                marginBottom: 16,
                background: "rgba(250,128,57,0.10)",
                border: "1px solid rgba(250,128,57,0.25)",
                borderRadius: 999,
                padding: "4px 10px",
                display: "inline-block",
              }}
            >
              {project.name}
            </div>
          )}

          {/* Header: top label + step counter row */}
          <div style={{ marginBottom: 10 }}>
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "1.4px",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.38)",
                fontFamily: "Inter, system-ui, sans-serif",
                marginBottom: 6,
              }}
            >
              Contacto
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              role="progressbar"
              aria-valuenow={step + 1}
              aria-valuemin={1}
              aria-valuemax={STEPS.length}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 400,
                  letterSpacing: "1.32px",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.45)",
                  fontFamily: "Inter, system-ui, sans-serif",
                }}
              >
                PASO {step + 1} DE {STEPS.length}
              </span>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#fa8039",
                  fontFamily: "Inter, system-ui, sans-serif",
                }}
              >
                {progressPct}%
              </span>
            </div>
          </div>

          {/* Progress bar — spring overshoot, fill gradient + glow */}
          <div
            style={{
              width: "100%",
              height: 4,
              borderRadius: 99,
              background: "rgba(255,255,255,0.10)",
              marginBottom: 20,
              overflow: "hidden",
            }}
          >
            <motion.div
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
              style={{
                height: "100%",
                borderRadius: 99,
                background: "linear-gradient(90deg, rgba(250,128,57,0.53), #fa8039)",
                boxShadow: "0 0 10px rgba(250,128,57,0.53)",
              }}
            />
          </div>

          {/* Step content — pure opacity crossfade 180ms */}
          <AnimatePresence mode="wait">
            <motion.div key={step} {...fadeProps}>
              {/* Question H2 */}
              <h2
                style={{
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontSize: 18,
                  fontWeight: 700,
                  letterSpacing: "-0.36px",
                  lineHeight: 1.3,
                  color: "#fff",
                  margin: "0 0 6px",
                }}
              >
                {currentStep.title}
              </h2>

              {currentStep.subtitle ? (
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.40)",
                    lineHeight: 1.5,
                    margin: "0 0 18px",
                    fontFamily: "Inter, system-ui, sans-serif",
                  }}
                >
                  {currentStep.subtitle}
                </p>
              ) : (
                <div style={{ marginBottom: 18 }} />
              )}

              {/* Text / email input */}
              {(currentStep.type === "text" || currentStep.type === "email") && (
                <div>
                  <label
                    htmlFor={`field-${currentStep.key}`}
                    style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)" }}
                  >
                    {currentStep.title}
                  </label>
                  <input
                    id={`field-${currentStep.key}`}
                    type={currentStep.type}
                    value={currentValue}
                    onChange={(e) => handleChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={currentStep.placeholder}
                    aria-invalid={!!err}
                    autoFocus
                    className="contacto-input"
                  />
                </div>
              )}

              {/* Textarea */}
              {currentStep.type === "textarea" && (
                <div style={{ position: "relative" }}>
                  <label
                    htmlFor={`field-${currentStep.key}`}
                    style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)" }}
                  >
                    {currentStep.title}
                  </label>
                  <textarea
                    id={`field-${currentStep.key}`}
                    value={currentValue}
                    onChange={(e) => handleChange(e.target.value)}
                    placeholder={currentStep.placeholder}
                    aria-invalid={!!err}
                    autoFocus
                    maxLength={1000}
                    className="contacto-textarea"
                  />
                  <span
                    style={{
                      position: "absolute",
                      bottom: 10,
                      right: 12,
                      fontSize: 11,
                      color: currentValue.length > 900 ? "rgba(250,128,57,0.7)" : "rgba(255,255,255,0.22)",
                      fontFamily: "Inter, system-ui, sans-serif",
                      pointerEvents: "none",
                    }}
                  >
                    {currentValue.length}/1000
                  </span>
                </div>
              )}

              {/* Radio option cards — LeadQualification §5 */}
              {currentStep.type === "radio" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {currentStep.options.map((opt) => {
                    const selected = currentValue === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        className="lq-option"
                        data-selected={selected}
                        onClick={() => handleChange(opt.value)}
                        role="radio"
                        aria-checked={selected}
                      >
                        <span style={{ fontSize: 15, lineHeight: 1, flexShrink: 0 }}>
                          {opt.label.split(" ")[0]}
                        </span>
                        <span>
                          {opt.label.split(" ").slice(1).join(" ")}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Validation error */}
              {err && (
                <p role="alert" style={{ fontSize: 12, color: "rgba(255,80,80,0.9)", marginTop: 8, fontFamily: "Inter, system-ui, sans-serif" }}>
                  {err}
                </p>
              )}
              {submitError && (
                <p role="alert" style={{ fontSize: 12, color: "rgba(255,80,80,0.9)", marginTop: 10, fontFamily: "Inter, system-ui, sans-serif" }}>
                  {submitError}
                </p>
              )}

              {/* Button row: Back (ghost) + Continue/Submit */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginTop: 20,
                }}
              >
                {step > 0 && (
                  <button type="button" className="lq-back" onClick={handleBack}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M19 12H5M12 5l-7 7 7 7" />
                    </svg>
                    Atrás
                  </button>
                )}

                {isLast ? (
                  <button
                    type="button"
                    className="lq-submit"
                    onClick={handleNext}
                    disabled={submitting}
                  >
                    {submitting ? "Enviando…" : "Enviar →"}
                  </button>
                ) : (
                  <button
                    type="button"
                    className="lq-continue"
                    onClick={handleNext}
                    disabled={submitting}
                  >
                    Continuar
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
