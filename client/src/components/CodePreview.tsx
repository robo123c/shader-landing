/**
 * CodePreview — "Obsidian Prism" design system
 *
 * A section that showcases a GLSL code snippet in a terminal-style window.
 * Left side: headline + description + CTA. Right side: code window.
 * Framer Motion fade-in from left/right on scroll.
 */

import { motion } from "framer-motion";
import { ArrowRight, Circle } from "lucide-react";

const CODE_LINES = [
  { tokens: [{ text: "// ShaderKit — light sweep fragment shader", color: "rgba(255,255,255,0.28)" }] },
  { tokens: [] },
  { tokens: [{ text: "uniform ", color: "#38bdf8" }, { text: "float ", color: "#fb923c" }, { text: "uTime", color: "#e2e8f0" }, { text: ";", color: "rgba(255,255,255,0.4)" }] },
  { tokens: [{ text: "uniform ", color: "#38bdf8" }, { text: "vec2 ", color: "#fb923c" }, { text: "uResolution", color: "#e2e8f0" }, { text: ";", color: "rgba(255,255,255,0.4)" }] },
  { tokens: [] },
  { tokens: [{ text: "void ", color: "#38bdf8" }, { text: "main", color: "#fbbf24" }, { text: "() {", color: "#e2e8f0" }] },
  { tokens: [{ text: "  vec2 ", color: "#fb923c" }, { text: "uv ", color: "#e2e8f0" }, { text: "= ", color: "rgba(255,255,255,0.4)" }, { text: "gl_FragCoord.xy ", color: "#e2e8f0" }, { text: "/ ", color: "rgba(255,255,255,0.4)" }, { text: "uResolution", color: "#e2e8f0" }, { text: ";", color: "rgba(255,255,255,0.4)" }] },
  { tokens: [] },
  { tokens: [{ text: "  // Skewed strip mask", color: "rgba(255,255,255,0.28)" }] },
  { tokens: [{ text: "  float ", color: "#fb923c" }, { text: "strip ", color: "#e2e8f0" }, { text: "= ", color: "rgba(255,255,255,0.4)" }, { text: "fract", color: "#fbbf24" }, { text: "((uv.x ", color: "#e2e8f0" }, { text: "+ ", color: "rgba(255,255,255,0.4)" }, { text: "uv.y ", color: "#e2e8f0" }, { text: "* ", color: "rgba(255,255,255,0.4)" }, { text: "0.27", color: "#a78bfa" }, { text: ") * ", color: "#e2e8f0" }, { text: "6.0", color: "#a78bfa" }, { text: ");", color: "rgba(255,255,255,0.4)" }] },
  { tokens: [] },
  { tokens: [{ text: "  // Sweep animation", color: "rgba(255,255,255,0.28)" }] },
  { tokens: [{ text: "  float ", color: "#fb923c" }, { text: "sweep ", color: "#e2e8f0" }, { text: "= ", color: "rgba(255,255,255,0.4)" }, { text: "sin", color: "#fbbf24" }, { text: "(uv.y ", color: "#e2e8f0" }, { text: "* ", color: "rgba(255,255,255,0.4)" }, { text: "3.14159 ", color: "#a78bfa" }, { text: "+ ", color: "rgba(255,255,255,0.4)" }, { text: "uTime", color: "#e2e8f0" }, { text: ");", color: "rgba(255,255,255,0.4)" }] },
  { tokens: [] },
  { tokens: [{ text: "  vec3 ", color: "#fb923c" }, { text: "orange ", color: "#e2e8f0" }, { text: "= ", color: "rgba(255,255,255,0.4)" }, { text: "vec3", color: "#fbbf24" }, { text: "(", color: "#e2e8f0" }, { text: "0.98", color: "#a78bfa" }, { text: ", ", color: "rgba(255,255,255,0.4)" }, { text: "0.57", color: "#a78bfa" }, { text: ", ", color: "rgba(255,255,255,0.4)" }, { text: "0.24", color: "#a78bfa" }, { text: ");", color: "rgba(255,255,255,0.4)" }] },
  { tokens: [{ text: "  gl_FragColor ", color: "#e2e8f0" }, { text: "= ", color: "rgba(255,255,255,0.4)" }, { text: "vec4", color: "#fbbf24" }, { text: "(orange ", color: "#e2e8f0" }, { text: "* ", color: "rgba(255,255,255,0.4)" }, { text: "strip ", color: "#e2e8f0" }, { text: "* ", color: "rgba(255,255,255,0.4)" }, { text: "sweep, ", color: "#e2e8f0" }, { text: "1.0", color: "#a78bfa" }, { text: ");", color: "rgba(255,255,255,0.4)" }] },
  { tokens: [{ text: "}", color: "#e2e8f0" }] },
];

export default function CodePreview() {
  return (
    <section
      style={{
        background: "#0a0a0a",
        padding: "0 1.5rem 120px",
        position: "relative",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "64px",
          alignItems: "center",
        }}
        className="code-preview-grid"
      >
        {/* Left: text */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" as const }}
        >
          <span
            style={{
              display: "inline-block",
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
              fontWeight: 500,
              color: "#38bdf8",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            Developer Experience
          </span>
          <h2
            style={{
              fontFamily: "'Geist', 'Inter', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.04em",
              color: "#ffffff",
              marginBottom: "20px",
            }}
          >
            Write shaders like
            <br />
            you write components.
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "15px",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.45)",
              marginBottom: "32px",
              maxWidth: "400px",
            }}
          >
            ShaderKit wraps raw GLSL in a composable, type-safe API. Declare
            uniforms as React state, chain passes as JSX children, and let the
            compiler handle the rest.
          </p>
          <button
            className="btn-dark-border"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "11px 22px",
              borderRadius: "8px",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: "14px",
              color: "rgba(255,255,255,0.75)",
              letterSpacing: "-0.01em",
            }}
          >
            Read the Docs
            <ArrowRight size={14} strokeWidth={2} />
          </button>
        </motion.div>

        {/* Right: code window */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" as const, delay: 0.1 }}
        >
          <div
            style={{
              background: "#111111",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            {/* Window chrome */}
            <div
              style={{
                padding: "12px 16px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <Circle size={10} fill="#ff5f57" color="#ff5f57" />
              <Circle size={10} fill="#febc2e" color="#febc2e" />
              <Circle size={10} fill="#28c840" color="#28c840" />
              <span
                style={{
                  marginLeft: "8px",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.3)",
                }}
              >
                sweep.frag
              </span>
            </div>

            {/* Code */}
            <div
              style={{
                padding: "20px 20px 20px 0",
                overflowX: "auto",
              }}
            >
              <table style={{ borderCollapse: "collapse", width: "100%" }}>
                <tbody>
                  {CODE_LINES.map((line, li) => (
                    <tr key={li}>
                      <td
                        style={{
                          width: "40px",
                          minWidth: "40px",
                          textAlign: "right",
                          paddingRight: "16px",
                          paddingLeft: "12px",
                          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                          fontSize: "12px",
                          color: "rgba(255,255,255,0.15)",
                          userSelect: "none",
                          verticalAlign: "top",
                          lineHeight: "20px",
                        }}
                      >
                        {li + 1}
                      </td>
                      <td
                        style={{
                          fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
                          fontSize: "12.5px",
                          lineHeight: "20px",
                          whiteSpace: "pre",
                          paddingRight: "20px",
                        }}
                      >
                        {line.tokens.length === 0 ? (
                          <span>&nbsp;</span>
                        ) : (
                          line.tokens.map((tok, ti) => (
                            <span key={ti} style={{ color: tok.color }}>
                              {tok.text}
                            </span>
                          ))
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .code-preview-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
