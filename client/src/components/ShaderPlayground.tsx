/**
 * ShaderPlayground — Interactive Shader Uniform Controls
 *
 * Allows users to adjust shader parameters in real-time via sliders.
 * Demonstrates shader composability and customization.
 */

import { motion } from "framer-motion";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";

interface ShaderPlaygroundProps {
  onUniformsChange: (uniforms: {
    speed: number;
    intensity: number;
    frequency: number;
  }) => void;
}

export default function ShaderPlayground({ onUniformsChange }: ShaderPlaygroundProps) {
  const [speed, setSpeed] = useState(1);
  const [intensity, setIntensity] = useState(1);
  const [frequency, setFrequency] = useState(1);

  const handleChange = (newSpeed: number, newIntensity: number, newFrequency: number) => {
    setSpeed(newSpeed);
    setIntensity(newIntensity);
    setFrequency(newFrequency);
    onUniformsChange({ speed: newSpeed, intensity: newIntensity, frequency: newFrequency });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        background: "linear-gradient(145deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 100%)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "16px",
        padding: "48px 32px",
        marginTop: "80px",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          style={{ marginBottom: "48px" }}
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
            Customize
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
            Adjust Shader
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #fb923c 0%, #38bdf8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Parameters
            </span>
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.0625rem",
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.7)",
              maxWidth: "600px",
              marginTop: "16px",
            }}
          >
            Tweak shader uniforms to see how composable effects work in real-time. Speed, intensity, and frequency are all customizable.
          </p>
        </motion.div>

        {/* Sliders */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "32px",
            marginTop: "40px",
          }}
        >
          {/* Speed Slider */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <label
              style={{
                display: "block",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "#ffffff",
                marginBottom: "12px",
              }}
            >
              Animation Speed
            </label>
            <Slider
              value={[speed]}
              onValueChange={(value) => handleChange(value[0], intensity, frequency)}
              min={0.1}
              max={3}
              step={0.1}
              style={{ width: "100%" }}
            />
            <span
              style={{
                display: "inline-block",
                marginTop: "8px",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.875rem",
                color: "#fb923c",
                fontWeight: 600,
              }}
            >
              {speed.toFixed(1)}x
            </span>
          </motion.div>

          {/* Intensity Slider */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          >
            <label
              style={{
                display: "block",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "#ffffff",
                marginBottom: "12px",
              }}
            >
              Effect Intensity
            </label>
            <Slider
              value={[intensity]}
              onValueChange={(value) => handleChange(speed, value[0], frequency)}
              min={0.1}
              max={2}
              step={0.1}
              style={{ width: "100%" }}
            />
            <span
              style={{
                display: "inline-block",
                marginTop: "8px",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.875rem",
                color: "#38bdf8",
                fontWeight: 600,
              }}
            >
              {intensity.toFixed(1)}x
            </span>
          </motion.div>

          {/* Frequency Slider */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          >
            <label
              style={{
                display: "block",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "#ffffff",
                marginBottom: "12px",
              }}
            >
              Wave Frequency
            </label>
            <Slider
              value={[frequency]}
              onValueChange={(value) => handleChange(speed, intensity, value[0])}
              min={0.5}
              max={3}
              step={0.1}
              style={{ width: "100%" }}
            />
            <span
              style={{
                display: "inline-block",
                marginTop: "8px",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.875rem",
                color: "#ffffff",
                fontWeight: 600,
              }}
            >
              {frequency.toFixed(1)}x
            </span>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
