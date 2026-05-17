/**
 * Features — "Obsidian Prism" design system with Shader Demos
 *
 * 3-column grid of dark feature cards. Each card includes:
 * - A miniature Three.js shader demo at the top
 * - An orange icon in a subtle glow container
 * - A bold condensed heading
 * - A muted body paragraph
 * Framer Motion staggered fade-up entrance using IntersectionObserver (whileInView).
 */

import { motion } from "framer-motion";
import {
  Cpu,
  Layers,
  Zap,
  Code2,
  Shield,
  BarChart3,
} from "lucide-react";

import ShaderDemo from "./ShaderDemo";

const FEATURES = [
  {
    icon: Cpu,
    title: "GPU-Native Rendering",
    body: "Every animation runs directly on the GPU via WebGL 2.0. No canvas 2D fallbacks. Consistent 60fps across all modern browsers and devices.",
    shaderType: "gpu-render" as const,
  },
  {
    icon: Layers,
    title: "Composable Shader Graph",
    body: "Build complex visual effects by chaining modular GLSL nodes. Mix, blend, and layer shaders like React components — declaratively.",
    shaderType: "composable" as const,
  },
  {
    icon: Zap,
    title: "Sub-5ms Frame Budget",
    body: "Optimized draw calls, instanced geometry, and automatic LOD management keep your frame budget under 5ms even at 4K resolution.",
    shaderType: "performance" as const,
  },
  {
    icon: Code2,
    title: "TypeScript-First API",
    body: "Full type safety from shader uniforms to animation timelines. Autocomplete for every GLSL variable, no runtime surprises.",
    shaderType: "typescript" as const,
  },
  {
    icon: Shield,
    title: "Zero Runtime Dependencies",
    body: "The entire core is 14kB gzipped. No Three.js, no Babylon.js. Just a thin abstraction over raw WebGL that stays out of your way.",
    shaderType: "zero-deps" as const,
  },
  {
    icon: BarChart3,
    title: "Built-in Profiler",
    body: "Integrated GPU timing queries expose per-pass render costs in the browser DevTools. Find bottlenecks before they reach production.",
    shaderType: "profiler" as const,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.07,
      duration: 0.6,
      ease: "easeOut" as const,
    },
  }),
};

export default function Features() {
  return (
    <section
      style={{
        background: "#0a0a0a",
        padding: "100px 1.5rem 120px",
        position: "relative",
      }}
    >
      {/* Section header */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          style={{ marginBottom: "64px" }}
        >
          <span
            style={{
              display: "inline-block",
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
              fontWeight: 500,
              color: "#fb923c",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            Why ShaderKit
          </span>
          <h2
            style={{
              fontFamily: "'Geist', 'Inter', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2rem, 5vw, 3.25rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              color: "#ffffff",
              maxWidth: "520px",
            }}
          >
            Built for the
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #fb923c 0%, #38bdf8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              performance-obsessed.
            </span>
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "16px",
          }}
        >
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="feature-card"
                style={{
                  borderRadius: "12px",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Shader demo at top */}
                <div
                  style={{
                    marginLeft: "-20px",
                    marginRight: "-20px",
                    marginTop: "-20px",
                    marginBottom: "8px",
                    borderRadius: "12px 12px 0 0",
                    overflow: "hidden",
                    width: "calc(100% + 40px)",
                    height: "140px",
                  }}
                >
                  <ShaderDemo type={feature.shaderType} />
                </div>

                {/* Icon container */}
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background: "rgba(251,146,60,0.1)",
                    border: "1px solid rgba(251,146,60,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={18} color="#fb923c" strokeWidth={1.75} />
                </div>

                {/* Text */}
                <div>
                  <h3
                    style={{
                      fontFamily: "'Geist', 'Inter', sans-serif",
                      fontWeight: 700,
                      fontSize: "16px",
                      color: "#ffffff",
                      letterSpacing: "-0.025em",
                      marginBottom: "8px",
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                      fontSize: "14px",
                      lineHeight: 1.65,
                      color: "rgba(255,255,255,0.45)",
                      letterSpacing: "-0.005em",
                    }}
                  >
                    {feature.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
