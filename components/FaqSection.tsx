"use client";

import { useState } from "react";
import { FAQ_ITEMS } from "@/lib/data";

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FaqItem({ question, answer, isOpen, onToggle }: FaqItemProps) {
  return (
    <div className="border-b border-rule last:border-b-0">
      <button
        className="w-full flex items-start justify-between gap-6 py-5 text-left group"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="font-serif text-base sm:text-lg text-ink group-hover:text-accent transition-colors duration-150 leading-snug">
          {question}
        </span>
        <span
          className={`shrink-0 w-5 h-5 flex items-center justify-center text-ink-muted transition-transform duration-200 mt-0.5 ${
            isOpen ? "rotate-45" : ""
          }`}
          aria-hidden="true"
        >
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            viewBox="0 0 24 24"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </span>
      </button>

      {isOpen && (
        <p className="pb-5 text-sm text-ink-soft leading-relaxed max-w-[64ch]">
          {answer}
        </p>
      )}
    </div>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      id="faq"
      className="border-t border-rule"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-20">
          {/* Left label */}
          <header>
            <span className="block text-[11px] font-medium uppercase tracking-widest text-ink-muted mb-3">
              FAQ
            </span>
            <h2
              id="faq-heading"
              className="font-serif text-3xl sm:text-4xl font-bold text-ink tracking-tight"
            >
              Common questions
            </h2>
          </header>

          {/* Right accordion */}
          <div className="border-t border-rule">
            {FAQ_ITEMS.map((item, idx) => (
              <FaqItem
                key={item.question}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === idx}
                onToggle={() => toggle(idx)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
