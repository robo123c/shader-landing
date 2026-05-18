/**
 * Navbar — "Obsidian Prism" design system
 *
 * Glassmorphism navbar: blurred dark background, subtle border,
 * logo on the left, nav links in the center, CTA on the right.
 * Framer Motion fade-down entrance on mount.
 */

import { motion, AnimatePresence } from "framer-motion";
import { Zap, Menu, X } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/useMobile";

export default function Navbar() {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <motion.nav
      className="glass-nav"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: "60px",
        background: "rgba(10, 10, 10, 0.5)",
        backdropFilter: "blur(16px) saturate(180%)",
        WebkitBackdropFilter: "blur(16px) saturate(180%)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
      }}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" as const }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: isMobile ? "0 1.25rem" : "0 2rem",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "6px" : "8px" }}>
          <div
            style={{
              width: isMobile ? "24px" : "28px",
              height: isMobile ? "24px" : "28px",
              background: "linear-gradient(135deg, #fb923c 0%, #f97316 100%)",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 12px rgba(251,146,60,0.4)",
            }}
          >
            <Zap size={isMobile ? 12 : 14} color="#0a0a0a" strokeWidth={2.5} />
          </div>
          <span
            style={{
              fontFamily: "'Geist', 'Inter', sans-serif",
              fontWeight: 700,
              fontSize: isMobile ? "14px" : "15px",
              color: "#ffffff",
              letterSpacing: "-0.03em",
            }}
          >
            ShaderKit
          </span>
        </div>

        {/* Nav links */}
        {!isMobile && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "32px",
            }}
          >
          {[
            { label: "Features", href: "#features" },
            { label: "Pricing", href: "#pricing" },
            { label: "Testimonials", href: "#testimonials" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.55)",
                  textDecoration: "none",
                  transition: "color 160ms ease",
                  letterSpacing: "-0.01em",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.querySelector(item.href);
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLAnchorElement).style.color = "rgba(255,255,255,0.9)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLAnchorElement).style.color = "rgba(255,255,255,0.55)";
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}

        {/* Right actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {!isMobile && (
            <button
              className="btn-orange-glow"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: "13px",
                color: "#0a0a0a",
                padding: "7px 16px",
                borderRadius: "6px",
                border: "none",
                letterSpacing: "-0.01em",
                whiteSpace: "nowrap",
              }}
            >
              Get Started
            </button>
          )}
          
          {isMobile && (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                background: "none",
                border: "none",
                color: "white",
                cursor: "pointer",
                padding: "4px"
              }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobile && isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            style={{
              position: "fixed",
              inset: 0,
              top: "60px",
              background: "rgba(10, 10, 10, 0.85)",
              backdropFilter: "blur(32px) saturate(180%)",
              WebkitBackdropFilter: "blur(32px) saturate(180%)",
              zIndex: 100,
              display: "flex",
              flexDirection: "column",
              padding: "2rem",
              paddingTop: "4rem"
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
              {[
                { label: "Features", href: "#features" },
                { label: "Pricing", href: "#pricing" },
                { label: "Testimonials", href: "#testimonials" },
                { label: "Github", href: "https://github.com/robo123c/shader-landing" },
              ].map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  onClick={(e) => {
                    if (item.href.startsWith("#")) {
                      e.preventDefault();
                      setIsMenuOpen(false);
                      const target = document.querySelector(item.href);
                      if (target) {
                        target.scrollIntoView({ behavior: "smooth" });
                      }
                    }
                  }}
                  style={{
                    fontFamily: "'Geist', 'Inter', sans-serif",
                    fontSize: "32px",
                    fontWeight: 700,
                    color: "white",
                    textDecoration: "none",
                    letterSpacing: "-0.04em"
                  }}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{ marginTop: "auto", paddingBottom: "2rem" }}
            >
              <button
                className="btn-orange-glow"
                style={{
                  width: "100%",
                  padding: "16px",
                  borderRadius: "12px",
                  border: "none",
                  fontWeight: 700,
                  fontSize: "18px",
                  color: "#0a0a0a"
                }}
              >
                Get Started Free
              </button>
              <p style={{ 
                textAlign: "center", 
                marginTop: "1.5rem", 
                color: "rgba(255,255,255,0.3)",
                fontSize: "14px"
              }}>
                © 2026 ShaderKit. All rights reserved.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
