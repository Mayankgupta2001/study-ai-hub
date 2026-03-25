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
    <div className="border-b border-slate-200 last:border-b-0">
      <button
        className="w-full flex items-start justify-between gap-6 py-6 text-left group"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="font-dm-sans text-lg text-slate-900 group-hover:text-indigo-600 transition-colors duration-150 leading-snug font-semibold">
          {question}
        </span>
        <span
          className={`shrink-0 w-6 h-6 flex items-center justify-center text-indigo-600 transition-transform duration-300 mt-0.5 ${
            isOpen ? "rotate-45" : ""
          }`}
          aria-hidden="true"
        >
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
            className="w-5 h-5"
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
        <p className="pb-6 text-base text-slate-600 leading-relaxed max-w-[66ch] font-dm-sans">
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
      className="border-t border-slate-200"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-6xl mx-auto px-6 py-20 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-20">
          {/* Left label */}
          <header>
            <span className="block text-xs font-semibold uppercase tracking-widest text-slate-600 mb-3">
              FAQ
            </span>
            <h2
              id="faq-heading"
              className="font-dm-sans text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight"
            >
              Common questions
            </h2>
          </header>

          {/* Right accordion */}
          <div className="border-t border-slate-200">
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
