import Link from "next/link";
import { EXAMS } from "@/lib/data";

export default function Hero() {
  return (
    <section
      className="max-w-6xl mx-auto px-6 pt-20 pb-16 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 items-center"
      aria-label="Introduction"
    >
      {/* ── Left: Copy ─────────────────────────────── */}
      <div>
        <p className="anim-0 inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-emerald-600 mb-6">
          <span className="block w-5 h-px bg-emerald-600" aria-hidden="true" />
          AI tools for Indian competitive exams
        </p>

        <h1 className="anim-1 font-dm-sans text-5xl sm:text-6xl lg:text-[3.5rem] font-bold text-slate-900 leading-tight tracking-tight mb-6">
          Prepare with tools
          <br />
          <span className="bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">
            built for your exam
          </span>
        </h1>

        <p className="anim-2 text-slate-600 text-lg sm:text-xl leading-relaxed mb-8 max-w-[48ch] font-dm-sans">
          Study AI Hub provides AI-assisted tools aligned to the UPSC, JEE, NEET, and SSC syllabi — for concept clarity, answer practice, and focused revision.
        </p>

        <div className="anim-3 flex flex-wrap items-center gap-4">
          <Link
            href="#exams"
            className="bg-indigo-600 text-white text-base font-semibold px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-150 shadow-md hover:shadow-lg"
          >
            Start Preparing →
          </Link>
          <Link
            href="#tools"
            className="text-base font-semibold text-indigo-600 hover:text-indigo-700 border-b-2 border-indigo-600 hover:border-indigo-700 transition-colors duration-150 pb-1"
          >
            Explore free tools
          </Link>
        </div>
      </div>

      {/* ── Right: Exam preview panel ──────────────── */}
      <aside
        className="anim-2 hidden lg:block bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-2xl p-7 shadow-sm"
        aria-label="Exam categories preview"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-600 mb-5">
          Select your exam
        </p>

        <ul className="grid grid-cols-2 gap-3 list-none m-0 p-0" role="list">
          {EXAMS.map((exam) => (
            <li key={exam.key}>
              <Link
                href={exam.href}
                className="group block bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                aria-label={`${exam.name} — ${exam.fullName}`}
              >
                <span className="font-dm-sans text-2xl font-bold leading-none block mb-1 text-indigo-600">
                  {exam.name}
                </span>
                <span className="block text-xs text-slate-600 leading-snug mb-3">
                  {exam.fullName}
                </span>
                <span className="text-xs font-semibold flex items-center gap-1 text-indigo-600 group-hover:translate-x-0.5 transition-transform">
                  View tools
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Live indicator */}
        <div className="mt-5 bg-white border border-slate-200 rounded-lg px-4 py-3 flex items-center gap-2.5 shadow-xs">
          <span
            className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-pulse"
            aria-hidden="true"
          />
          <p className="text-xs text-slate-600 italic leading-snug">
            &ldquo;Explain Article 356 with past precedents…&rdquo;
          </p>
        </div>
      </aside>
    </section>
  );
}
