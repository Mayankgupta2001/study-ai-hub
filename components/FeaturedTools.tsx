import Link from "next/link";
import ToolCard from "@/components/ToolCard";
import { TOOLS } from "@/lib/data";

export default function FeaturedTools() {
  return (
    <section
      id="tools"
      className="border-t border-slate-200"
      aria-labelledby="tools-heading"
    >
      <div className="max-w-6xl mx-auto px-6 py-20 sm:py-24">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-14">
          <header>
            <span className="block text-xs font-semibold uppercase tracking-widest text-slate-600 mb-3">
              AI Tools
            </span>
            <h2
              id="tools-heading"
              className="font-dm-sans text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-4"
            >
              Study smarter with
              <br />
              <span className="bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">
                AI-powered tools
              </span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-[54ch]">
              Each tool targets a specific task in the preparation cycle — not a general-purpose chatbot repurposed for exams.
            </p>
          </header>

          <Link
            href="/tools"
            className="text-base font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5 shrink-0 transition-colors"
            aria-label="View all available tools"
          >
            View all tools
            <svg
              className="w-5 h-5"
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
          </Link>
        </div>

        {/* Tools grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {TOOLS.map((tool) => (
            <ToolCard key={tool.title} tool={tool} />
          ))}
        </div>

        {/* Free tools callout */}
        <div className="bg-gradient-to-r from-emerald-50 to-emerald-50 border border-emerald-200 rounded-xl p-6 text-center">
          <p className="text-sm text-slate-700">
            Tools marked{" "}
            <span className="font-semibold text-emerald-700 bg-emerald-100 px-2 py-1 rounded text-xs uppercase tracking-wide inline-block mx-1">
              Free
            </span>{" "}
            require no account.{" "}
            <Link
              href="/signup"
              className="text-emerald-700 font-semibold hover:text-emerald-800 transition-colors"
            >
              Create a free account
            </Link>{" "}
            to save your progress.
          </p>
        </div>
      </div>
    </section>
  );
}
