/**
 * Hero — "Obsidian Prism" design system with Three.js Shader Background
 *
 * Full-viewport hero section. The Three.js ripple shader fills the background.
 * Centered typographic monument: badge → headline → subheadline → CTAs.
 * Framer Motion staggered fade-up entrance on all text elements.
 * Orange (#fb923c) and Sky Blue (#38bdf8) are used as accent light sources.
 */

import { motion } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";
import { lazy, Suspense } from "react";

const ShaderCanvas = lazy(() => import("./ShaderCanvas"));

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.65,
      ease: "easeOut" as const,
    },
  }),
};

export default function Hero() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        paddingTop: "60px", // navbar height
      }}
    >
      {/* Three.js shader animation background */}
      <Suspense fallback={null}>
        <ShaderCanvas />
      </Suspense>

      {/* Overlay vignette to focus center */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, rgba(0,0,0,0.5) 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "0 1.5rem",
          maxWidth: "900px",
          width: "100%",
        }}
      >
        {/* Badge */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{ marginBottom: "28px" }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "5px 14px",
              borderRadius: "9999px",
              background: "rgba(251,146,60,0.1)",
              border: "1px solid rgba(251,146,60,0.25)",
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
              fontWeight: 500,
              color: "#fb923c",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#fb923c",
                boxShadow: "0 0 6px #fb923c",
                display: "inline-block",
              }}
            />
            Open Source · v2.4.0
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: "'Geist', 'Inter', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(4rem, 12vw, 9rem)",
            lineHeight: 0.92,
            letterSpacing: "-0.04em",
            marginBottom: "24px",
            userSelect: "none",
            color: "#ffffff",
            textShadow: "0 4px 32px rgba(0,0,0,0.5)",
          }}
        >
          Shader
          <br />
          Animation
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(1rem, 2.2vw, 1.2rem)",
            lineHeight: 1.65,
            color: "rgba(255,255,255,0.7)",
            maxWidth: "520px",
            marginBottom: "40px",
            letterSpacing: "-0.01em",
            textShadow: "0 2px 16px rgba(0,0,0,0.4)",
          }}
        >
          A high-performance WebGL shader toolkit for building immersive,
          GPU-accelerated visual experiences in the browser. Zero dependencies.
          Production-ready.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {/* Primary CTA */}
          <button
            className="btn-orange-glow"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "13px 28px",
              borderRadius: "8px",
              border: "none",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: "15px",
              color: "#0a0a0a",
              letterSpacing: "-0.02em",
            }}
          >
            Get Started Free
            <ArrowRight size={16} strokeWidth={2.5} />
          </button>

          {/* Secondary CTA */}
          <button
            className="btn-dark-border"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "13px 24px",
              borderRadius: "8px",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: "15px",
              color: "rgba(255,255,255,0.75)",
              letterSpacing: "-0.02em",
            }}
          >
            <Github size={16} strokeWidth={1.75} />
            View Code
          </button>
        </motion.div>

        {/* Social proof */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{
            marginTop: "48px",
            display: "flex",
            alignItems: "center",
            gap: "24px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {[
            { value: "12k+", label: "GitHub Stars" },
            { value: "4.9ms", label: "Avg. frame time" },
            { value: "99.9%", label: "Uptime SLA" },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "2px",
              }}
            >
              <span
                style={{
                  fontFamily: "'Geist', 'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: "20px",
                  color: "#ffffff",
                  letterSpacing: "-0.03em",
                  textShadow: "0 2px 8px rgba(0,0,0,0.3)",
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.35)",
                  letterSpacing: "0.01em",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "11px",
            color: "rgba(255,255,255,0.25)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "32px",
            background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)",
          }}
        />
      </motion.div>
    </section>
  );
}
