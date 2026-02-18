import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Study AI Hub — AI Tools for UPSC, JEE, NEET & SSC",
  description:
    "AI-powered study tools designed specifically for Indian competitive exam aspirants. Ace UPSC, JEE, NEET, and SSC with intelligent answer coaching, concept explainers, flashcards, and more.",
  alternates: {
    canonical: "https://studyaihub.in",
  },
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </>
  );
}
