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
import { motion } from "framer-motion";

const SectionWrapper = ({ children, id }: { children: React.ReactNode; id?: string }) => (
  <motion.div
    id={id}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
  >
    {children}
  </motion.div>
);

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
      <SectionWrapper>
        <TrustBar />
      </SectionWrapper>
      <SectionWrapper id="features">
        <Features />
      </SectionWrapper>
      <SectionWrapper>
        <CodePreview />
      </SectionWrapper>
      <SectionWrapper>
        <ShaderPlayground onUniformsChange={() => {}} />
      </SectionWrapper>
      <SectionWrapper id="testimonials">
        <Testimonials />
      </SectionWrapper>
      <SectionWrapper id="pricing">
        <Pricing />
      </SectionWrapper>
      <SectionWrapper>
        <Newsletter />
      </SectionWrapper>
      <SectionWrapper>
        <CtaSection />
      </SectionWrapper>
      <Footer />
    </div>
  );
}
