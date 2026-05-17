/**
 * Footer — "Obsidian Prism" design system
 *
 * Minimal dark footer with logo, nav columns, and a bottom bar.
 */

import { Zap } from "lucide-react";

const FOOTER_LINKS = {
  Product: ["Features", "Changelog", "Roadmap", "Pricing"],
  Developers: ["Documentation", "API Reference", "Examples", "GitHub"],
  Company: ["About", "Blog", "Careers", "Contact"],
};

export default function Footer() {
  return (
    <footer
      style={{
        background: "#080808",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "64px 1.5rem 32px",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Top row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: "40px",
            marginBottom: "56px",
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  background: "linear-gradient(135deg, #fb923c 0%, #f97316 100%)",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 12px rgba(251,146,60,0.35)",
                }}
              >
                <Zap size={14} color="#0a0a0a" strokeWidth={2.5} />
              </div>
              <span
                style={{
                  fontFamily: "'Geist', 'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: "15px",
                  color: "#ffffff",
                  letterSpacing: "-0.03em",
                }}
              >
                ShaderKit
              </span>
            </div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                lineHeight: 1.65,
                color: "rgba(255,255,255,0.35)",
                maxWidth: "240px",
              }}
            >
              GPU-accelerated shader animations for the modern web. Built for
              developers who care about performance.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.5)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                }}
              >
                {category}
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.4)",
                        textDecoration: "none",
                        transition: "color 160ms ease",
                      }}
                      onMouseEnter={(e) => {
                        (e.target as HTMLAnchorElement).style.color = "rgba(255,255,255,0.8)";
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLAnchorElement).style.color = "rgba(255,255,255,0.4)";
                      }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
              color: "rgba(255,255,255,0.25)",
            }}
          >
            © 2025 ShaderKit. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: "20px" }}>
            {["Privacy", "Terms", "Security"].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.25)",
                  textDecoration: "none",
                  transition: "color 160ms ease",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLAnchorElement).style.color = "rgba(255,255,255,0.55)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLAnchorElement).style.color = "rgba(255,255,255,0.25)";
                }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
