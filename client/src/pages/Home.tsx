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
import ShaderPlayground from "@/components/ShaderPlayground";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--background)",
        overflowX: "hidden",
      }}
    >
      <Navbar />
      <Hero />
      <TrustBar />
      <div id="features">
        <Features />
      </div>
      <CodePreview />
      <ShaderPlayground onUniformsChange={() => {}} />
      <div id="testimonials">
        <Testimonials />
      </div>
      <div id="pricing">
        <Pricing />
      </div>
      <Newsletter />
      <CtaSection />
      <Footer />
    </div>
  );
}
