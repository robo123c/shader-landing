/**
 * ShaderBackground — "Obsidian Prism" design system
 *
 * Renders an array of skewed vertical dark strips (#121212) that fill the
 * hero viewport. Each strip hosts one or more "sweep beams" — tall, narrow
 * gradient shapes that animate vertically with different delays and colors
 * (Orange #fb923c, Sky Blue #38bdf8, White) to simulate a dynamic shader
 * light-sweep effect. The entire strip layer is clipped to the hero bounds.
 */

import React from "react";

interface SweepBeam {
  color: "orange" | "blue" | "white";
  delay: number;   // seconds
  duration: number; // seconds
  height: string;  // e.g. "35%"
  opacity: number;
  top: string;     // initial top offset
}

interface Strip {
  left: string;    // percentage
  width: string;
  beams: SweepBeam[];
}

const STRIPS: Strip[] = [
  {
    left: "-2%",
    width: "7%",
    beams: [
      { color: "orange", delay: 0, duration: 4.2, height: "30%", opacity: 0.7, top: "-30%" },
    ],
  },
  {
    left: "6%",
    width: "5%",
    beams: [
      { color: "blue", delay: 1.4, duration: 5.1, height: "25%", opacity: 0.55, top: "-30%" },
    ],
  },
  {
    left: "13%",
    width: "8%",
    beams: [
      { color: "white", delay: 0.7, duration: 6.0, height: "20%", opacity: 0.3, top: "-30%" },
      { color: "orange", delay: 3.5, duration: 4.8, height: "15%", opacity: 0.4, top: "-30%" },
    ],
  },
  {
    left: "23%",
    width: "4%",
    beams: [
      { color: "blue", delay: 2.1, duration: 4.5, height: "28%", opacity: 0.6, top: "-30%" },
    ],
  },
  {
    left: "29%",
    width: "9%",
    beams: [
      { color: "orange", delay: 0.3, duration: 5.5, height: "35%", opacity: 0.5, top: "-30%" },
      { color: "white", delay: 2.8, duration: 4.0, height: "18%", opacity: 0.25, top: "-30%" },
    ],
  },
  {
    left: "40%",
    width: "5%",
    beams: [
      { color: "blue", delay: 1.0, duration: 5.8, height: "22%", opacity: 0.65, top: "-30%" },
    ],
  },
  {
    left: "47%",
    width: "7%",
    beams: [
      { color: "white", delay: 3.2, duration: 4.3, height: "30%", opacity: 0.35, top: "-30%" },
      { color: "orange", delay: 0.9, duration: 6.2, height: "20%", opacity: 0.55, top: "-30%" },
    ],
  },
  {
    left: "56%",
    width: "4%",
    beams: [
      { color: "blue", delay: 2.5, duration: 4.7, height: "26%", opacity: 0.5, top: "-30%" },
    ],
  },
  {
    left: "62%",
    width: "8%",
    beams: [
      { color: "orange", delay: 1.7, duration: 5.3, height: "32%", opacity: 0.6, top: "-30%" },
    ],
  },
  {
    left: "72%",
    width: "5%",
    beams: [
      { color: "white", delay: 0.5, duration: 4.9, height: "24%", opacity: 0.3, top: "-30%" },
      { color: "blue", delay: 3.0, duration: 5.6, height: "18%", opacity: 0.5, top: "-30%" },
    ],
  },
  {
    left: "79%",
    width: "6%",
    beams: [
      { color: "orange", delay: 2.2, duration: 4.4, height: "28%", opacity: 0.45, top: "-30%" },
    ],
  },
  {
    left: "87%",
    width: "9%",
    beams: [
      { color: "blue", delay: 0.8, duration: 5.0, height: "30%", opacity: 0.6, top: "-30%" },
      { color: "white", delay: 3.8, duration: 4.1, height: "16%", opacity: 0.28, top: "-30%" },
    ],
  },
  {
    left: "97%",
    width: "6%",
    beams: [
      { color: "orange", delay: 1.3, duration: 5.7, height: "22%", opacity: 0.5, top: "-30%" },
    ],
  },
];

const BEAM_GRADIENTS: Record<string, string> = {
  orange: "linear-gradient(180deg, transparent 0%, #fb923c 30%, #fb923c 70%, transparent 100%)",
  blue:   "linear-gradient(180deg, transparent 0%, #38bdf8 30%, #38bdf8 70%, transparent 100%)",
  white:  "linear-gradient(180deg, transparent 0%, #ffffff 30%, #ffffff 70%, transparent 100%)",
};

const ANIMATION_NAMES: Record<string, string> = {
  orange: "sweep-orange",
  blue:   "sweep-blue",
  white:  "sweep-white",
};

export default function ShaderBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      {/* Base dark layer */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#0a0a0a",
        }}
      />

      {/* Strips */}
      {STRIPS.map((strip, si) => (
        <div
          key={si}
          style={{
            position: "absolute",
            top: "-30%",
            left: strip.left,
            width: strip.width,
            height: "160%",
            background: "#121212",
            transform: "skewX(-15deg)",
            overflow: "hidden",
            borderRadius: "2px",
          }}
        >
          {strip.beams.map((beam, bi) => (
            <div
              key={bi}
              style={{
                position: "absolute",
                left: 0,
                top: beam.top,
                width: "100%",
                height: beam.height,
                background: BEAM_GRADIENTS[beam.color],
                opacity: beam.opacity,
                borderRadius: "9999px",
                animation: `${ANIMATION_NAMES[beam.color]} ${beam.duration}s ${beam.delay}s ease-in-out infinite`,
                pointerEvents: "none",
              }}
            />
          ))}
        </div>
      ))}

      {/* Radial vignette overlay — darkens edges, focuses center */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, rgba(0,0,0,0.72) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Bottom fade to page background */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "35%",
          background: "linear-gradient(to bottom, transparent 0%, #0a0a0a 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
