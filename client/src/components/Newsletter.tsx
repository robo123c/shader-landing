/**
 * Newsletter — Email Subscription Component
 *
 * Collects email addresses for newsletter signup with validation.
 */

import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";


export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Thanks for subscribing! Check your email for updates.");
      setEmail("");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        padding: "80px 16px",
        background: "linear-gradient(145deg, rgba(251,146,60,0.05) 0%, rgba(56,189,248,0.03) 100%)",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          style={{ textAlign: "center", marginBottom: "40px" }}
        >
          <h2
            style={{
              fontFamily: "'Geist', 'Inter', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              color: "#ffffff",
              margin: "0 0 16px 0",
            }}
          >
            Stay Updated
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.0625rem",
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.7)",
            }}
          >
            Get the latest updates, shader techniques, and performance tips delivered to your inbox.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            gap: "12px",
            maxWidth: "500px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              flex: 1,
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Mail
              size={18}
              color="rgba(255,255,255,0.4)"
              style={{
                position: "absolute",
                left: "12px",
                pointerEvents: "none",
              }}
            />
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "8px",
                padding: "12px 12px 12px 40px",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.9375rem",
                color: "#ffffff",
                outline: "none",
                transition: "all 160ms cubic-bezier(0.23, 1, 0.32, 1)",
              }}
              onFocus={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              background: "linear-gradient(135deg, #fb923c 0%, #f97316 50%, #ea580c 100%)",
              border: "none",
              color: "#0a0a0a",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.9375rem",
              fontWeight: 600,
              padding: "12px 24px",
              borderRadius: "8px",
              cursor: isLoading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 160ms cubic-bezier(0.23, 1, 0.32, 1)",
              opacity: isLoading ? 0.7 : 1,
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.transform = "translateY(-1px)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {isLoading ? "Subscribing..." : "Subscribe"}
            {!isLoading && <ArrowRight size={16} />}
          </button>
        </motion.form>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.8125rem",
            color: "rgba(255,255,255,0.4)",
            textAlign: "center",
            marginTop: "16px",
          }}
        >
          No spam. Unsubscribe anytime. We respect your privacy.
        </p>
      </div>
    </motion.section>
  );
}
