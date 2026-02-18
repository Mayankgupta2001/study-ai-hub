import Link from "next/link";
import { STATS } from "@/lib/data";

const EXAM_PREVIEWS = [
  {
    tag: "UPSC",
    tagClass: "bg-exam-upsc-bg text-exam-upsc",
    title: "Answer Writing AI",
    count: "8 tools",
  },
  {
    tag: "JEE",
    tagClass: "bg-exam-jee-bg text-exam-jee",
    title: "Problem Explainer",
    count: "11 tools",
  },
  {
    tag: "NEET",
    tagClass: "bg-exam-neet-bg text-exam-neet",
    title: "Diagram Tutor",
    count: "9 tools",
  },
  {
    tag: "SSC",
    tagClass: "bg-exam-ssc-bg text-exam-ssc",
    title: "GK Flashcards",
    count: "12 tools",
  },
];

export default function Hero() {
  return (
    <section
      className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
      aria-label="Hero section"
    >
      {/* Left — text */}
      <div>
        <p className="animate-fade-up flex items-center gap-2 text-xs tracking-widest uppercase text-accent font-medium mb-4">
          <span className="inline-block w-6 h-px bg-accent" aria-hidden="true" />
          Purpose-built for Indian students
        </p>

        <h1 className="animate-fade-up-1 font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-ink leading-tight tracking-tight mb-5">
          Study Smarter.
          <br />
          Crack{" "}
          <em className="not-italic text-accent">Your Exam.</em>
        </h1>

        <p className="animate-fade-up-2 text-ink-soft text-lg leading-relaxed mb-8 max-w-md">
          AI-powered tools designed specifically for UPSC, JEE, NEET, and SSC
          aspirants. Understand concepts faster, practice with intent, and track
          what matters.
        </p>

        <div className="animate-fade-up-3 flex flex-wrap items-center gap-4 mb-10">
          <Link
            href="#exams"
            className="bg-ink text-paper px-6 py-3 rounded text-sm font-medium hover:bg-ink/90 transition-colors duration-150"
          >
            Choose Your Exam →
          </Link>
          <Link
            href="#tools"
            className="text-sm text-ink-soft border-b border-rule pb-px hover:text-ink hover:border-ink transition-colors duration-150"
          >
            See all AI tools ↓
          </Link>
        </div>

        {/* Stats */}
        <dl className="animate-fade-up-4 flex items-center gap-6">
          {STATS.map((stat, index) => (
            <div key={stat.label} className="flex items-center gap-6">
              <div>
                <dt className="text-xs uppercase tracking-widest text-ink-muted">
                  {stat.label}
                </dt>
                <dd className="font-serif text-2xl font-bold text-ink leading-tight">
                  {stat.num}
                </dd>
              </div>
              {index < STATS.length - 1 && (
                <div
                  className="w-px h-9 bg-rule"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </dl>
      </div>

      {/* Right — visual preview */}
      <aside
        className="hidden lg:block bg-paper-warm border border-rule rounded-lg p-7 animate-fade-up-2"
        aria-label="Tool preview panel"
      >
        <p className="text-xs uppercase tracking-widest text-ink-muted font-medium mb-5">
          Exam-specific AI tools
        </p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          {EXAM_PREVIEWS.map((exam) => (
            <div
              key={exam.tag}
              className="bg-white border border-rule rounded-md p-4"
            >
              <span
                className={`inline-block text-xs font-medium tracking-wide uppercase px-2 py-0.5 rounded mb-2 ${exam.tagClass}`}
              >
                {exam.tag}
              </span>
              <p className="text-sm font-medium text-ink leading-snug">
                {exam.title}
              </p>
              <p className="text-xs text-ink-muted mt-0.5">{exam.count}</p>
            </div>
          ))}
        </div>

        {/* Live query indicator */}
        <div className="bg-white border border-rule rounded-md px-4 py-3 flex items-center gap-3">
          <span
            className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0"
            aria-hidden="true"
          />
          <p className="text-xs text-ink-soft italic">
            &ldquo;Explain Article 356 with past examples…&rdquo; — generating
            answer
          </p>
        </div>
      </aside>
    </section>
  );
}
