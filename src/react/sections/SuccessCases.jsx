import React from "react";
import { motion } from "framer-motion";
import Section from "../components/ui/Section.jsx";
import Container from "../components/ui/Container.jsx";
import SectionLabel from "../components/ui/SectionLabel.jsx";
import TestimonialWall from "../components/ui/TestimonialWall.jsx";

/*
 * Success Cases — animated wall of testimonials
 * (adapted from Framer Marketplace "Testimonial Animated").
 */

/*
 * Testimonios canónicos. Imágenes desde randomuser.me (deterministas):
 *   men/{N}.jpg   → fotos de hombres (N = 0..99)
 *   women/{N}.jpg → fotos de mujeres (N = 0..99)
 * Cada testimonio usa un índice único para evitar duplicados.
 * Importado también en HomePage.jsx (NosotrosScreen) para mantener
 * la misma fuente de verdad en Inicio y Nosotros.
 */
export const ALL_TESTIMONIALS = [
  {
    quote:
      "Nos entregaron el dashboard en 3 semanas. Ahora vemos en 2 minutos lo que antes tardábamos un día en consolidar.",
    name: "Martín R.",
    role: "Director de Operaciones",
    company: "Fintech · BA",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    quote:
      "Nunca pensé que automatizar nuestro flujo de pedidos fuera tan simple. El equipo de Insights lo hizo parecer obvio.",
    name: "Carolina S.",
    role: "CEO & Co-fundadora",
    company: "E-commerce · CBA",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    quote:
      "El sistema de turnos que construyeron redujo nuestros no-shows un 40%. La IA de recordatorios es un antes y un después.",
    name: "Diego M.",
    role: "Dueño",
    company: "Salud · MZA",
    image: "https://randomuser.me/api/portraits/men/15.jpg",
  },
  {
    quote:
      "En 3 semanas teníamos el MVP funcionando. No podía creer la velocidad sin sacrificar calidad.",
    name: "Martín G.",
    role: "Founder",
    company: "SaaS · BA",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    quote:
      "Nuestra app de logística maneja 800 envíos diarios sin un solo bug desde el lanzamiento.",
    name: "Ana V.",
    role: "Directora de Logística",
    company: "Operaciones · MZA",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    quote:
      "Probé con otras agencias antes. Insights es otra liga — entienden el negocio, no solo el código.",
    name: "Diego F.",
    role: "Gerente Comercial",
    company: "Retail · ROS",
    image: "https://randomuser.me/api/portraits/men/41.jpg",
  },
  {
    quote:
      "El dashboard de métricas que hicieron es lo primero que miro cada mañana. Cambió cómo tomamos decisiones.",
    name: "Sofía L.",
    role: "Head of Growth",
    company: "Digital · MVD",
    image: "https://randomuser.me/api/portraits/women/53.jpg",
  },
  {
    quote:
      "Me dieron exactamente lo que necesitaba, ni más ni menos. Respetan el presupuesto y los plazos.",
    name: "Carlos M.",
    role: "Gerente General",
    company: "PyME · CABA",
    image: "https://randomuser.me/api/portraits/men/8.jpg",
  },
];

export default function SuccessCases() {
  return (
    <Section id="success-cases">
      <Container>
        <div style={{ marginBottom: 56 }}>
          <SectionLabel>Lo que dicen nuestros clientes</SectionLabel>
          <motion.h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 4.5vw, 52px)",
              fontWeight: 400,
              letterSpacing: "-0.04em",
              lineHeight: "1.05em",
              color: "#fff",
              maxWidth: 560,
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            Los que entraron primero.
          </motion.h2>
        </div>
      </Container>

      {/* Full-width wall — outside Container */}
      <TestimonialWall testimonials={ALL_TESTIMONIALS} rowSpeeds={[44, 38]} fadeColor="#000" />
    </Section>
  );
}
