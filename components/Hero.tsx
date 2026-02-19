import Link from "next/link";
import { EXAMS } from "@/lib/data";

export default function Hero() {
  return (
    <section
      className="max-w-6xl mx-auto px-6 pt-16 pb-14 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 items-center"
      aria-label="Introduction"
    >
      {/* ── Left: Copy ─────────────────────────────── */}
      <div>
        <p className="anim-0 inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-accent mb-5">
          <span className="block w-5 h-px bg-accent" aria-hidden="true" />
          AI tools for Indian competitive exams
        </p>

        <h1 className="anim-1 font-serif text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-ink leading-[1.1] tracking-tight mb-5">
          Prepare with tools built
          <br />
          for{" "}
          <em className="not-italic text-accent">your exam.</em>
        </h1>

        <p className="anim-2 text-ink-soft text-base sm:text-lg leading-relaxed mb-8 max-w-[42ch]">
          Study AI Hub provides AI-assisted tools aligned to the UPSC, JEE,
          NEET, and SSC syllabi — for concept clarity, answer practice, and
          focused revision.
        </p>

        <div className="anim-3 flex flex-wrap items-center gap-3">
          <Link
            href="#exams"
            className="bg-ink text-paper text-sm font-medium px-5 py-2.5 rounded hover:bg-ink/90 transition-colors duration-150"
          >
            Start Preparing →
          </Link>
          <Link
            href="#tools"
            className="text-sm text-ink-soft hover:text-ink border-b border-rule hover:border-ink-soft transition-colors duration-150 pb-px"
          >
            Explore free tools
          </Link>
        </div>
      </div>

      {/* ── Right: Exam preview panel ──────────────── */}
      <aside
        className="anim-2 hidden lg:block bg-paper-warm border border-rule rounded-xl p-6"
        aria-label="Exam categories preview"
      >
        <p className="text-[11px] font-medium uppercase tracking-widest text-ink-muted mb-4">
          Select your exam to get started
        </p>

        <ul className="grid grid-cols-2 gap-2.5 list-none m-0 p-0" role="list">
          {EXAMS.map((exam) => (
            <li key={exam.key}>
              <Link
                href={exam.href}
                className={`group block bg-white border border-rule border-t-4 ${exam.accentBorder} rounded-lg p-4 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent`}
                aria-label={`${exam.name} — ${exam.fullName}`}
              >
                <span
                  className={`font-serif text-2xl font-bold leading-none block mb-1 ${exam.accentText}`}
                >
                  {exam.name}
                </span>
                <span className="block text-[11px] text-ink-muted leading-snug mb-3">
                  {exam.fullName}
                </span>
                <span
                  className={`text-xs font-medium flex items-center gap-1 transition-colors ${exam.accentLink}`}
                >
                  View tools
                  <svg
                    className="w-3 h-3 translate-x-0 group-hover:translate-x-0.5 transition-transform"
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
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Live indicator */}
        <div className="mt-3 bg-white border border-rule rounded-lg px-4 py-3 flex items-center gap-2.5">
          <span
            className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-pulse"
            aria-hidden="true"
          />
          <p className="text-[11px] text-ink-muted italic leading-snug">
            &ldquo;Explain Article 356 with past precedents…&rdquo;
          </p>
        </div>
      </aside>
    </section>
  );
}
