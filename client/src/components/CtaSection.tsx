/**
 * CtaSection — "Obsidian Prism" design system
 *
 * Bottom CTA block before the footer. Dark card with a subtle orange/blue
 * radial glow, large headline, and the primary + secondary buttons.
 */

import { motion } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";

export default function CtaSection() {
  return (
    <section
      style={{
        background: "#0a0a0a",
        padding: "0 1.5rem 100px",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" as const }}
          style={{
            position: "relative",
            borderRadius: "20px",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
            padding: "80px 48px",
            textAlign: "center",
            overflow: "hidden",
          }}
        >
          {/* Radial glow background */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "600px",
              height: "300px",
              background: "radial-gradient(ellipse, rgba(251,146,60,0.08) 0%, rgba(56,189,248,0.05) 50%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            <span
              style={{
                display: "inline-block",
                fontFamily: "'Inter', sans-serif",
                fontSize: "12px",
                fontWeight: 500,
                color: "#fb923c",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              Start building today
            </span>

            <h2
              style={{
                fontFamily: "'Geist', 'Inter', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(2.25rem, 6vw, 4rem)",
                lineHeight: 1.0,
                letterSpacing: "-0.04em",
                color: "#ffffff",
                marginBottom: "20px",
              }}
            >
              Ship your first shader
              <br />
              in under 5 minutes.
            </h2>

            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "16px",
                lineHeight: 1.65,
                color: "rgba(255,255,255,0.45)",
                maxWidth: "440px",
                margin: "0 auto 36px",
              }}
            >
              Free forever for open-source projects. No credit card required.
              Deploy to any CDN with a single command.
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <button
                className="btn-orange-glow"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "14px 32px",
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

              <button
                className="btn-dark-border"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "14px 24px",
                  borderRadius: "8px",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: "15px",
                  color: "rgba(255,255,255,0.7)",
                  letterSpacing: "-0.02em",
                }}
              >
                <Github size={16} strokeWidth={1.75} />
                Star on GitHub
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
