export const metadata = {
  title: "SSC AI Tools – Study AI Hub",
  description:
    "Top AI tools for SSC preparation including GK revision tools, quant practice generators, and grammar improvement assistants.",
};

import Link from "next/link";

const tools = [
  { name: "Current Affairs Digest", href: "/tools/current-affairs", desc: "Focus on important news for SSC reasoning and general awareness." },
  { name: "Flashcard Generator", href: "/tools/flashcard-generator", desc: "Quick concepts for general studies and quant topics." },
  { name: "Answer Writing Coach", href: "/tools/answer-writing-coach", desc: "Structured answer practice for descriptive paper sections." },
  { name: "Weak Area Identifier", href: "/tools/weak-area-identifier", desc: "Find practice gaps in English, Maths and GA." },
];

export default function SSCPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <section className="mb-14 text-center">
          <h1 className="text-4xl font-bold text-slate-900">SSC AI Toolkit</h1>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Sharpen SSC General Awareness, Quant and English practice with AI-powered insights and error analysis.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Available SSC Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tools.map((tool) => (
              <Link
                key={tool.name}
                href={tool.href}
                className="block border border-slate-200 rounded-xl p-5 bg-white hover:border-indigo-400 hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-indigo-700">{tool.name}</h3>
                <p className="mt-2 text-slate-600">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Key SSC Areas</h3>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li>General Awareness: Current Affairs, History, Geography, Polity.</li>
              <li>Quantitative Aptitude: Arithmetic, Algebra, Geometry, Data Interpretation.</li>
              <li>English Language: Grammar, Vocabulary, Comprehension, Writing.</li>
            </ul>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">How to Use</h3>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li>Use quiz-style practice and summarization for quick current affairs retention.</li>
              <li>Analyse sample answers and correct formatting using answer coach.</li>
              <li>Track weaknesses and adjust daily revision plans accordingly.</li>
            </ul>
          </div>
        </section>

        <section className="text-center">
          <p className="text-slate-600 mb-4">Launch your SSC prep routine with one AI tool now.</p>
          <Link
            href="/tools/current-affairs"
            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-8 py-3 text-white font-semibold hover:bg-indigo-700"
          >
            Start with Current Affairs
          </Link>
        </section>
      </div>
    </main>
  );
}
