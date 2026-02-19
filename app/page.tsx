import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ExamSection from "@/components/ExamSection";
import HowItWorks from "@/components/HowItWorks";
import FeaturedTools from "@/components/FeaturedTools";
import TrustSection from "@/components/TrustSection";
import FaqSection from "@/components/FaqSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Study AI Hub — AI Tools for UPSC, JEE, NEET & SSC",
  description:
    "AI-assisted study tools aligned to the UPSC, JEE, NEET, and SSC syllabi. Practice answer writing, clarify concepts, generate flashcards, and identify weak areas.",
  alternates: {
    canonical: "https://studyaihub.in",
  },
};

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* Visually separate the hero from the rest of the page */}
      <main id="main-content">
        <Hero />

        {/* Divider between hero and content sections */}
        <div className="border-t border-rule" aria-hidden="true" />

        <ExamSection />
        <HowItWorks />
        <FeaturedTools />
        <TrustSection />
        <FaqSection />
        <CTASection />
      </main>

      <Footer />
    </>
  );
}
