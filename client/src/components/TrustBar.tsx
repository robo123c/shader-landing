/**
 * TrustBar — "Obsidian Prism" design system
 *
 * A subtle horizontal marquee strip showing "used by teams at" tech brands.
 * Infinite scroll animation via CSS. Fades at edges with a gradient mask.
 */

import { motion } from "framer-motion";

const BRANDS = [
  "Vercel", "Linear", "Figma", "Stripe", "Notion", "Loom",
  "Retool", "Supabase", "PlanetScale", "Resend", "Clerk", "Neon",
];

export default function TrustBar() {
  return (
    <section
      style={{
        background: "#0a0a0a",
        padding: "0 0 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{
          textAlign: "center",
          fontFamily: "'Inter', sans-serif",
          fontSize: "12px",
          fontWeight: 500,
          color: "rgba(255,255,255,0.2)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: "28px",
        }}
      >
        Trusted by engineering teams at
      </motion.p>

      {/* Marquee wrapper */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "0",
            animation: "marquee-scroll 28s linear infinite",
            width: "max-content",
          }}
        >
          {/* Duplicate for seamless loop */}
          {[...BRANDS, ...BRANDS].map((brand, i) => (
            <div
              key={i}
              style={{
                padding: "0 40px",
                fontFamily: "'Geist', 'Inter', sans-serif",
                fontWeight: 600,
                fontSize: "14px",
                color: "rgba(255,255,255,0.18)",
                letterSpacing: "-0.02em",
                whiteSpace: "nowrap",
                transition: "color 200ms ease",
              }}
            >
              {brand}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
