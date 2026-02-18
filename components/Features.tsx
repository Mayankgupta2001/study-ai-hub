"use client";

import Link from "next/link";
import { useState } from "react";
import ToolCard from "@/components/ToolCard";
import {
  EXAMS,
  TOOLS,
  TRUST_POINTS,
  TESTIMONIALS,
  FAQ_ITEMS,
} from "@/lib/data";

/* ─────────────────────────────────────────
   EXAM CATEGORIES
───────────────────────────────────────── */
function ExamCategories() {
  return (
    <section
      id="exams"
      className="border-t border-rule"
      aria-labelledby="exams-heading"
    >
      <div className="max-w-6xl mx-auto px-6 py-20">
        <header className="mb-12">
          <span className="block text-xs uppercase tracking-widest text-ink-muted font-medium mb-3">
            Browse by exam
          </span>
          <h2
            id="exams-heading"
            className="font-serif text-3xl sm:text-4xl font-bold text-ink tracking-tight mb-3"
          >
            Which exam are you preparing for?
          </h2>
          <p className="text-ink-soft max-w-lg leading-relaxed">
            Each section contains AI tools, study guides, and practice sets
            built specifically for that exam&apos;s pattern and syllabus.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {EXAMS.map((exam) => (
            <Link
              key={exam.key}
              href={exam.href}
              className={`group bg-white border border-rule border-t-4 ${exam.borderColor} rounded-lg p-6 flex flex-col hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200`}
              aria-label={`${exam.name} — ${exam.fullName}`}
            >
              <p className={`font-serif text-3xl font-bold mb-1 ${exam.textColor}`}>
                {exam.name}
              </p>
              <p className="text-xs text-ink-muted mb-5 leading-snug">
                {exam.fullName}
              </p>

              <ul className="flex flex-col gap-2 mb-6 list-none flex-1" role="list">
                {exam.tools.map((tool) => (
                  <li
                    key={tool}
                    className="text-sm text-ink-soft flex items-start gap-2"
                  >
                    <span className="text-ink-muted text-xs mt-0.5 flex-shrink-0">
                      →
                    </span>
                    {tool}
                  </li>
                ))}
              </ul>

              <span
                className={`text-sm font-medium flex items-center gap-1 ${exam.linkColor}`}
              >
                Explore {exam.name} tools →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   HOW IT WORKS
───────────────────────────────────────── */
const STEPS = [
  {
    num: "01",
    title: "Pick your exam",
    desc: "Select UPSC, JEE, NEET, or SSC. All tools, notes, and quizzes are filtered to match your exam's syllabus and pattern — no irrelevant content.",
  },
  {
    num: "02",
    title: "Use the right AI tool",
    desc: "From concept explainers to answer evaluators, each tool serves a specific study need. Ask questions, generate summaries, or run practice tests in minutes.",
  },
  {
    num: "03",
    title: "Review & revise",
    desc: "Track weak areas, bookmark important explanations, and return to personalised revision sets — all in one place without juggling multiple apps.",
  },
];

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="border-t border-rule"
      aria-labelledby="how-heading"
    >
      <div className="max-w-6xl mx-auto px-6 py-20">
        <header className="mb-12">
          <span className="block text-xs uppercase tracking-widest text-ink-muted font-medium mb-3">
            How it works
          </span>
          <h2
            id="how-heading"
            className="font-serif text-3xl sm:text-4xl font-bold text-ink tracking-tight"
          >
            Three steps to better preparation
          </h2>
        </header>

        <ol
          className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-rule border border-rule rounded-lg bg-white overflow-hidden"
          aria-label="How Study AI Hub works"
        >
          {STEPS.map((step) => (
            <li key={step.num} className="p-8 md:p-10">
              <span
                className="font-serif text-5xl font-bold text-rule leading-none block mb-5"
                aria-hidden="true"
              >
                {step.num}
              </span>
              <h3 className="font-serif text-xl font-semibold text-ink mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-ink-soft leading-relaxed">{step.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   AI TOOLS SHOWCASE
───────────────────────────────────────── */
function ToolsShowcase() {
  return (
    <section
      id="tools"
      className="border-t border-rule bg-paper-warm"
      aria-labelledby="tools-heading"
    >
      <div className="max-w-6xl mx-auto px-6 py-20">
        <header className="mb-12">
          <span className="block text-xs uppercase tracking-widest text-ink-muted font-medium mb-3">
            Featured AI tools
          </span>
          <h2
            id="tools-heading"
            className="font-serif text-3xl sm:text-4xl font-bold text-ink tracking-tight mb-3"
          >
            Tools that actually help you study
          </h2>
          <p className="text-ink-soft max-w-xl leading-relaxed">
            Not gimmicks. Each tool is built around a real study problem that
            aspirants face — from understanding dense concepts to improving
            answer quality.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOOLS.map((tool) => (
            <ToolCard key={tool.title} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   TRUST + TESTIMONIALS
───────────────────────────────────────── */
function TrustSection() {
  return (
    <section
      className="border-t border-rule"
      aria-labelledby="trust-heading"
    >
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Trust points */}
          <div>
            <header className="mb-10">
              <span className="block text-xs uppercase tracking-widest text-ink-muted font-medium mb-3">
                Why trust us
              </span>
              <h2
                id="trust-heading"
                className="font-serif text-3xl sm:text-4xl font-bold text-ink tracking-tight"
              >
                Built by people who understand Indian competitive exams
              </h2>
            </header>

            <ul className="flex flex-col gap-6 list-none" role="list">
              {TRUST_POINTS.map((point) => (
                <li key={point.title} className="flex gap-4 items-start">
                  <div
                    className="w-8 h-8 border border-rule rounded bg-white flex items-center justify-center text-base flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    {point.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-ink mb-1">
                      {point.title}
                    </h3>
                    <p className="text-sm text-ink-soft leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Testimonials */}
          <div className="flex flex-col gap-4">
            {TESTIMONIALS.map((t) => (
              <figure
                key={t.author}
                className="bg-paper-warm border border-rule rounded-lg px-6 py-5"
              >
                <blockquote className="text-sm text-ink-soft italic leading-relaxed mb-4">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="flex items-center gap-2 text-xs text-ink-muted">
                  <span
                    className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${t.dotColor}`}
                    aria-hidden="true"
                  />
                  {t.author}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   FAQ
───────────────────────────────────────── */
function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-rule py-5">
      <button
        className="w-full flex items-start justify-between gap-4 text-left group"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-serif text-lg text-ink group-hover:text-accent transition-colors">
          {question}
        </span>
        <span
          className={`text-ink-muted text-lg leading-none flex-shrink-0 transition-transform duration-200 mt-0.5 ${
            open ? "rotate-45" : ""
          }`}
          aria-hidden="true"
        >
          +
        </span>
      </button>

      {open && (
        <p className="mt-3 text-sm text-ink-soft leading-relaxed max-w-2xl">
          {answer}
        </p>
      )}
    </div>
  );
}

function FaqSection() {
  return (
    <section
      id="faq"
      className="border-t border-rule bg-paper-warm"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-6xl mx-auto px-6 py-20">
        <header className="mb-10">
          <span className="block text-xs uppercase tracking-widest text-ink-muted font-medium mb-3">
            Common questions
          </span>
          <h2
            id="faq-heading"
            className="font-serif text-3xl sm:text-4xl font-bold text-ink tracking-tight"
          >
            Frequently asked questions
          </h2>
        </header>

        <div className="max-w-2xl border-t border-rule">
          {FAQ_ITEMS.map((item) => (
            <FaqItem
              key={item.question}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   CTA BANNER
───────────────────────────────────────── */
function CtaBanner() {
  return (
    <section
      className="bg-ink border-t border-ink"
      aria-labelledby="cta-heading"
    >
      <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-center">
        <div>
          <h2
            id="cta-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-paper tracking-tight mb-3"
          >
            Start preparing better,
            <br />
            starting today.
          </h2>
          <p className="text-slate-400 leading-relaxed max-w-lg">
            Free to join. No credit card required. Pick your exam and explore
            tools built for your syllabus.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
          <Link
            href="/signup"
            className="bg-white text-ink px-7 py-3 rounded text-sm font-medium text-center hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            Create free account →
          </Link>
          <Link
            href="#exams"
            className="border border-slate-700 text-slate-400 px-7 py-3 rounded text-sm text-center hover:border-slate-500 hover:text-slate-300 transition-colors whitespace-nowrap"
          >
            Browse by exam
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   FEATURES — composed export
───────────────────────────────────────── */
export default function Features() {
  return (
    <main>
      <ExamCategories />
      <HowItWorks />
      <ToolsShowcase />
      <TrustSection />
      <FaqSection />
      <CtaBanner />
    </main>
  );
}
