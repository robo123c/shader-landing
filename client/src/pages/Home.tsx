/**
 * Home — "Obsidian Prism" design system
 *
 * Full landing page assembly:
 *   Navbar → Hero (shader strips) → TrustBar → Features → CodePreview → CtaSection → Footer
 */

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Features from "@/components/Features";
import CodePreview from "@/components/CodePreview";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        overflowX: "hidden",
      }}
    >
      <Navbar />
      <Hero />
      <TrustBar />
      <Features />
      <CodePreview />
      <CtaSection />
      <Footer />
    </div>
  );
}
