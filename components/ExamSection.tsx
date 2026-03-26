import Link from "next/link";
import { EXAMS } from "@/lib/data";

const examIcons = {
  upsc: "📚",
  jee: "🧮",
  neet: "🩺",
  ssc: "📋"
};

export default function ExamSection() {
  return (
    <section
      id="exams"
      className="bg-gray-50 py-16 sm:py-20"
      aria-labelledby="exams-heading"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <header className="text-center mb-12">
          <h2
            id="exams-heading"
            className="font-dm-sans text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4"
          >
            Which exam are you preparing for?
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed max-w-2xl mx-auto">
            Every tool, practice set, and explanation is scoped to the official syllabus and paper pattern of the selected exam.
          </p>
        </header>

        {/* Exam grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {EXAMS.map((exam) => (
            <Link
              key={exam.key}
              href={exam.href}
              className="group block bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              aria-label={`${exam.name} — ${exam.fullName}`}
            >
              {/* Header with icon and accent */}
              <div className="flex items-center gap-4 mb-4">
                <div className="text-3xl">{examIcons[exam.key]}</div>
                <div className={`w-1 h-12 rounded-full ${
                  exam.key === 'upsc' ? 'bg-violet-500' :
                  exam.key === 'jee' ? 'bg-sky-500' :
                  exam.key === 'neet' ? 'bg-emerald-500' : 'bg-amber-500'
                }`} />
                <div>
                  <h3 className="font-dm-sans text-xl font-bold text-slate-900">
                    {exam.name}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {exam.fullName}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-600 leading-relaxed mb-6">
                {exam.description}
              </p>

              {/* Tool count and link */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">
                  {exam.tools.length} tools available
                </span>
                <span className="text-sm font-semibold text-indigo-600 group-hover:text-indigo-700 flex items-center gap-2 transition-colors">
                  View tools
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
