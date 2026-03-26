import Link from "next/link";
import { EXAMS } from "@/lib/data";

export default function Hero() {
  return (
    <section
      className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center"
      aria-label="Introduction"
    >
      {/* Badge */}
      <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-emerald-600 mb-6">
        <span className="block w-5 h-px bg-emerald-600" aria-hidden="true" />
        AI tools for Indian competitive exams
      </p>

      {/* Headline */}
      <h1 className="font-dm-sans text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight tracking-tight mb-6">
        Prepare with tools
        <br />
        <span style={{
          background: 'linear-gradient(to right, #4F46E5, #9333EA)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          built for your exam
        </span>
      </h1>

      {/* Subheadline */}
      <p className="text-slate-500 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
        Study AI Hub provides AI-assisted tools aligned to the UPSC, JEE, NEET, and SSC syllabi — for concept clarity, answer practice, and focused revision.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
        <Link
          href="#exams"
          className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white text-base font-semibold px-8 py-4 rounded-xl hover:from-indigo-700 hover:to-indigo-600 transition-all duration-150 shadow-md hover:shadow-lg"
        >
          Start Preparing →
        </Link>
        <Link
          href="#tools"
          className="text-base font-semibold text-indigo-600 hover:text-indigo-700 border-2 border-indigo-600 hover:border-indigo-700 px-8 py-4 rounded-xl hover:bg-indigo-50 transition-colors duration-150"
        >
          Explore free tools
        </Link>
      </div>

      {/* Exam Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {EXAMS.map((exam) => (
          <Link
            key={exam.key}
            href={exam.href}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:border-indigo-300 hover:shadow-md transition-all duration-150 group"
          >
            <span className="text-sm font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors">
              {exam.name}
            </span>
            <svg
              className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        ))}
      </div>
    </section>
  );
}
