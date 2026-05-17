/**
 * Testimonials — Rotating Customer Quotes Carousel
 *
 * Displays rotating testimonials with company logos and names.
 * Auto-rotates with manual navigation.
 */

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";

const testimonials = [
  {
    quote: "ShaderKit reduced our render time by 40% while improving visual quality. The performance gains were immediate.",
    author: "Sarah Chen",
    company: "Vercel",
    logo: "V",
  },
  {
    quote: "The composable shader graph is exactly what we needed. Building complex effects is now as simple as React components.",
    author: "Alex Rodriguez",
    company: "Linear",
    logo: "L",
  },
  {
    quote: "Zero dependencies and production-ready. We shipped to 2M users without a single performance regression.",
    author: "Jordan Kim",
    company: "Figma",
    logo: "F",
  },
  {
    quote: "The TypeScript-first API caught errors at compile time that would have been runtime bugs. Highly recommended.",
    author: "Morgan Lee",
    company: "Stripe",
    logo: "S",
  },
];

export default function Testimonials() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [autoPlay]);

  const next = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
    setAutoPlay(false);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setAutoPlay(false);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        padding: "80px 16px",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          style={{ marginBottom: "64px", textAlign: "center" }}
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
            Trusted by Teams
          </span>
          <h2
            style={{
              fontFamily: "'Geist', 'Inter', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2rem, 5vw, 3.25rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              color: isDark ? "#ffffff" : "#0a0a0a",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            What Developers Say
          </h2>
        </motion.div>

        {/* Carousel */}
        <div
          style={{
            position: "relative",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              style={{
                background: isDark
                  ? "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)"
                  : "linear-gradient(145deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.01) 100%)",
                border: isDark
                  ? "1px solid rgba(255,255,255,0.07)"
                  : "1px solid rgba(0,0,0,0.1)",
                borderRadius: "16px",
                padding: "40px 32px",
                textAlign: "center",
              }}
            >
              <blockquote
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "1.125rem",
                  lineHeight: 1.7,
                  color: isDark ? "#ffffff" : "#0a0a0a",
                  marginBottom: "24px",
                  fontStyle: "italic",
                }}
              >
                "{testimonials[current].quote}"
              </blockquote>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #fb923c 0%, #38bdf8 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "18px",
                    color: "#0a0a0a",
                  }}
                >
                  {testimonials[current].logo}
                </div>
                <div style={{ textAlign: "left" }}>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.9375rem",
                      fontWeight: 600,
                      color: isDark ? "#ffffff" : "#0a0a0a",
                      margin: "0",
                    }}
                  >
                    {testimonials[current].author}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.8125rem",
                      color: isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)",
                      margin: "4px 0 0 0",
                    }}
                  >
                    {testimonials[current].company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              marginTop: "32px",
            }}
          >
            <button
              onClick={prev}
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 160ms cubic-bezier(0.23, 1, 0.32, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
              }}
            >
              <ChevronLeft size={20} color="#ffffff" />
            </button>

            {/* Dots */}
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrent(index);
                    setAutoPlay(false);
                  }}
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: index === current ? "#fb923c" : "rgba(255,255,255,0.2)",
                    border: "none",
                    cursor: "pointer",
                    transition: "background 160ms ease-out",
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 160ms cubic-bezier(0.23, 1, 0.32, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
              }}
            >
              <ChevronRight size={20} color="#ffffff" />
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
