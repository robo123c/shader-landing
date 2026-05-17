/**
 * Pricing — 3-Tier Pricing Section
 *
 * Displays pricing tiers with feature comparisons and CTA buttons.
 */

import { motion } from "framer-motion";
import { Check } from "lucide-react";


const pricingTiers = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    description: "Perfect for learning and small projects",
    features: [
      "Core shader library",
      "Basic documentation",
      "Community support",
      "Up to 100K requests/month",
      "Open-source projects only",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$29",
    period: "/month",
    description: "For production applications",
    features: [
      "Everything in Starter",
      "Advanced shader graph",
      "Priority email support",
      "Up to 10M requests/month",
      "Commercial license",
      "Performance profiler",
      "Custom shader templates",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
    description: "For large-scale deployments",
    features: [
      "Everything in Professional",
      "Dedicated support",
      "Unlimited requests",
      "Custom integrations",
      "SLA guarantee",
      "On-premise deployment",
      "Custom training",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export default function Pricing() {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
      },
    }),
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
            Pricing
          </span>
          <h2
            style={{
              fontFamily: "'Geist', 'Inter', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2rem, 5vw, 3.25rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              color: "#ffffff",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Simple, Transparent
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #fb923c 0%, #38bdf8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Pricing
            </span>
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.0625rem",
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.7)",
              maxWidth: "600px",
              margin: "16px auto 0",
            }}
          >
            Choose the plan that fits your needs. Always free for open-source.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          {pricingTiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              style={{
                background: tier.highlighted
                  ? "linear-gradient(145deg, rgba(251,146,60,0.1) 0%, rgba(56,189,248,0.05) 100%)"
                  : "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                border: tier.highlighted
                  ? "2px solid rgba(251,146,60,0.3)"
                  : "1px solid rgba(255,255,255,0.07)",
                borderRadius: "16px",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                transition: "all 240ms cubic-bezier(0.23, 1, 0.32, 1)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(-4px)";
                el.style.borderColor = tier.highlighted
                  ? "rgba(251,146,60,0.5)"
                  : "rgba(255,255,255,0.15)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(0)";
                el.style.borderColor = tier.highlighted
                  ? "rgba(251,146,60,0.3)"
                  : "rgba(255,255,255,0.07)";
              }}
            >
              {tier.highlighted && (
                <div
                  style={{
                    position: "absolute",
                    top: "-12px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "linear-gradient(135deg, #fb923c 0%, #f97316 100%)",
                    color: "#0a0a0a",
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  Most Popular
                </div>
              )}

              <h3
                style={{
                  fontFamily: "'Geist', 'Inter', sans-serif",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#ffffff",
                  margin: "0 0 8px 0",
                }}
              >
                {tier.name}
              </h3>

              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.875rem",
                  color: "rgba(255,255,255,0.55)",
                  margin: "0 0 24px 0",
                }}
              >
                {tier.description}
              </p>

              <div style={{ marginBottom: "24px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "4px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Geist', 'Inter', sans-serif",
                      fontSize: "2.5rem",
                      fontWeight: 700,
                      color: "#ffffff",
                    }}
                  >
                    {tier.price}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.875rem",
                      color: "rgba(255,255,255,0.55)",
                    }}
                  >
                    {tier.period}
                  </span>
                </div>
              </div>

              <button
                style={{
                  background: tier.highlighted
                    ? "linear-gradient(135deg, #fb923c 0%, #f97316 50%, #ea580c 100%)"
                    : "rgba(255,255,255,0.03)",
                  border: tier.highlighted ? "none" : "1px solid rgba(255,255,255,0.12)",
                  color: tier.highlighted ? "#0a0a0a" : "#ffffff",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.9375rem",
                  fontWeight: 600,
                  padding: "12px 24px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 160ms cubic-bezier(0.23, 1, 0.32, 1)",
                  marginBottom: "24px",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  if (!tier.highlighted) {
                    el.style.background = "rgba(255,255,255,0.07)";
                    el.style.borderColor = "rgba(255,255,255,0.22)";
                  }
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  if (!tier.highlighted) {
                    el.style.background = "rgba(255,255,255,0.03)";
                    el.style.borderColor = "rgba(255,255,255,0.12)";
                  }
                }}
              >
                {tier.cta}
              </button>

              {/* Features List */}
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  flex: 1,
                }}
              >
                {tier.features.map((feature, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: "flex",
                      gap: "12px",
                      alignItems: "flex-start",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.9375rem",
                      color: "rgba(255,255,255,0.7)",
                    }}
                  >
                    <Check
                      size={18}
                      color="#fb923c"
                      style={{ flexShrink: 0, marginTop: "2px" }}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
