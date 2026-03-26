export const metadata = {
  title: "JEE AI Tools – Study AI Hub",
  description:
    "Explore the best AI tools for JEE preparation including problem solvers, concept explainers, and mock test generators.",
};

import Link from "next/link";

const tools = [
  { name: "Flashcard Generator", href: "/tools/flashcard-generator", desc: "Quick concept memory aids for theory topics." },
  { name: "NCERT Concept Explainer", href: "/tools/ncert-explainer", desc: "Understand NCERT fundamentals and exam links." },
  { name: "JEE Problem Breakdown", href: "/tools/jee-problem-breakdown", desc: "Stepwise solution support for tricky problems." },
  { name: "Current Affairs Digest", href: "/tools/current-affairs", desc: "Spot relevant trend connections for engineering entrance context." },
];

export default function JEEPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <section className="mb-14 text-center">
          <h1 className="text-4xl font-bold text-slate-900">JEE AI Toolkit</h1>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Master Physics, Chemistry and Mathematics with AI-backed explanations, flashcards, and problem breakdowns.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Available JEE Tools</h2>
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
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Core JEE Subjects</h3>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li>Physics: Mechanics, EM, Optics, Thermodynamics.</li>
              <li>Chemistry: Physical, Inorganic, Organic fundamentals.</li>
              <li>Mathematics: Algebra, Calculus, Coordinate Geometry.</li>
            </ul>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">How to Use</h3>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li>Pick a topic and generate flashcards for speed revision.</li>
              <li>Use NCERT explainer for strong foundational understanding.</li>
              <li>Break down solved problems into learning steps and weaker areas.</li>
            </ul>
          </div>
        </section>

        <section className="text-center">
          <p className="text-slate-600 mb-4">Ready to accelerate your JEE study plan?</p>
          <Link
            href="/tools/jee-problem-breakdown"
            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-8 py-3 text-white font-semibold hover:bg-indigo-700"
          >
            Start with Problem Breakdown
          </Link>
        </section>
      </div>
    </main>
  );
}
