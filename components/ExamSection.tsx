import Link from "next/link";
import { EXAMS } from "@/lib/data";

export default function ExamSection() {
  return (
    <section
      id="exams"
      className="border-t border-rule"
      aria-labelledby="exams-heading"
    >
      <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20">
        {/* Header */}
        <header className="mb-12">
          <span className="block text-[11px] font-medium uppercase tracking-widest text-ink-muted mb-3">
            Browse by exam
          </span>
          <h2
            id="exams-heading"
            className="font-serif text-3xl sm:text-4xl font-bold text-ink tracking-tight mb-3"
          >
            Which exam are you preparing for?
          </h2>
          <p className="text-ink-soft text-sm sm:text-base leading-relaxed max-w-[52ch]">
            Every tool, practice set, and explanation is scoped to the official
            syllabus and paper pattern of the selected exam.
          </p>
        </header>

        {/* Exam grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {EXAMS.map((exam) => (
            <Link
              key={exam.key}
              href={exam.href}
              className={`group flex flex-col bg-white border border-rule border-t-4 ${exam.accentBorder} rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 active:translate-y-0 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent`}
              aria-label={`${exam.name} — ${exam.fullName}`}
            >
              {/* Exam identifier */}
              <div className="mb-4">
                <p
                  className={`font-serif text-3xl font-bold leading-none mb-1 ${exam.accentText}`}
                >
                  {exam.name}
                </p>
                <p className="text-xs text-ink-muted leading-snug">
                  {exam.fullName}
                </p>
              </div>

              {/* Short description */}
              <p className="text-sm text-ink-soft leading-relaxed mb-5 flex-1">
                {exam.description}
              </p>

              {/* Tool list */}
              <ul
                className="flex flex-col gap-1.5 mb-6 list-none m-0 p-0"
                role="list"
                aria-label={`Tools for ${exam.name}`}
              >
                {exam.tools.map((tool) => (
                  <li
                    key={tool}
                    className="flex items-start gap-2 text-sm text-ink-soft"
                  >
                    <span
                      className="text-ink-muted text-xs mt-0.5 shrink-0 select-none"
                      aria-hidden="true"
                    >
                      →
                    </span>
                    {tool}
                  </li>
                ))}
              </ul>

              {/* Footer link */}
              <span
                className={`text-sm font-medium flex items-center gap-1.5 transition-colors ${exam.accentLink}`}
              >
                Open {exam.name} tools
                <svg
                  className="w-3.5 h-3.5 translate-x-0 group-hover:translate-x-0.5 transition-transform"
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
          ))}
        </div>
      </div>
    </section>
  );
}
