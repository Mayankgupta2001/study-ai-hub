import Link from "next/link";
import { EXAMS } from "@/lib/data";

export default function CTASection() {
  return (
    <section
      className="bg-ink"
      aria-labelledby="cta-heading"
    >
      <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20">
        {/* Top: heading + primary CTAs */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-start mb-14">
          <div>
            <h2
              id="cta-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-paper tracking-tight leading-tight mb-4"
            >
              Your exam is specific.
              <br />
              Your tools should be too.
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-[48ch]">
              Free tools require no sign-up. Create an account to unlock
              progress tracking, saved notes, and Pro tools.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 bg-white text-ink text-sm font-semibold px-6 py-3 rounded hover:bg-slate-100 transition-colors duration-150 whitespace-nowrap"
            >
              Start Preparing — it&apos;s free
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center justify-center gap-2 border border-slate-700 text-slate-300 text-sm font-medium px-6 py-3 rounded hover:border-slate-500 hover:text-white transition-colors duration-150 whitespace-nowrap"
            >
              Try a Free Tool →
            </Link>
          </div>
        </div>

        {/* Bottom: per-exam quick links */}
        <div className="border-t border-slate-800 pt-10">
          <p className="text-[11px] font-medium uppercase tracking-widest text-slate-600 mb-5">
            Jump directly to your exam
          </p>
          <ul
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 list-none m-0 p-0"
            role="list"
          >
            {EXAMS.map((exam) => (
              <li key={exam.key}>
                <Link
                  href={exam.href}
                  className="group flex items-center justify-between bg-slate-900 border border-slate-800 rounded-lg px-4 py-3.5 hover:border-slate-600 hover:bg-slate-800 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                >
                  <span>
                    <span className="block font-serif text-lg font-bold text-slate-200 leading-none mb-0.5">
                      {exam.name}
                    </span>
                    <span className="block text-[11px] text-slate-600">
                      {exam.fullName}
                    </span>
                  </span>
                  <svg
                    className="w-4 h-4 text-slate-600 group-hover:text-slate-400 group-hover:translate-x-0.5 transition-all"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.75}
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
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
