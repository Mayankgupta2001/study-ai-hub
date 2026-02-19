import Link from "next/link";
import ToolCard from "@/components/ToolCard";
import { TOOLS } from "@/lib/data";

export default function FeaturedTools() {
  return (
    <section
      id="tools"
      className="border-t border-rule"
      aria-labelledby="tools-heading"
    >
      <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <header>
            <span className="block text-[11px] font-medium uppercase tracking-widest text-ink-muted mb-3">
              AI tools
            </span>
            <h2
              id="tools-heading"
              className="font-serif text-3xl sm:text-4xl font-bold text-ink tracking-tight mb-3"
            >
              Tools built around real study problems
            </h2>
            <p className="text-ink-soft text-sm sm:text-base leading-relaxed max-w-[52ch]">
              Each tool targets a specific task in the preparation cycle — not a
              general-purpose chatbot repurposed for exams.
            </p>
          </header>

          <Link
            href="/tools"
            className="text-sm font-medium text-accent hover:text-accent-hover flex items-center gap-1 shrink-0 transition-colors"
            aria-label="View all available tools"
          >
            View all tools
            <svg
              className="w-4 h-4"
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
        </div>

        {/* Tools grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOOLS.map((tool) => (
            <ToolCard key={tool.title} tool={tool} />
          ))}
        </div>

        {/* Free tools callout */}
        <p className="mt-8 text-sm text-ink-muted text-center">
          Tools marked{" "}
          <span className="font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-xs uppercase tracking-wide">
            Free
          </span>{" "}
          require no account.{" "}
          <Link
            href="/signup"
            className="text-accent hover:underline transition-colors"
          >
            Create a free account
          </Link>{" "}
          to save your progress.
        </p>
      </div>
    </section>
  );
}
