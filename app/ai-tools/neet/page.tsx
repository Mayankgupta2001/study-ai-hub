export const metadata = {
  title: "NEET AI Tools – Study AI Hub",
  description: "Personalised AI guides for NEET coaching and topic mastery.",
};

import Link from "next/link";

const tools = [
  { name: "Flashcard Generator", href: "/tools/flashcard-generator", desc: "Rapid concept recall for biology and chemistry." },
  { name: "NCERT Concept Explainer", href: "/tools/ncert-explainer", desc: "Clear NCERT-based explanations with examples." },
  { name: "Current Affairs Digest", href: "/tools/current-affairs", desc: "Link biology and environment news to exam trends." },
  { name: "Weak Area Identifier", href: "/tools/weak-area-identifier", desc: "Find chapter-level gaps to prioritise revision." },
];

export default function NEETPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <section className="mb-14 text-center">
          <h1 className="text-4xl font-bold text-slate-900">NEET AI Toolkit</h1>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Boost NEET scores with AI-backed concept summaries, exam applicability, and quick revision tools.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Available NEET Tools</h2>
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
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Core NEET Topics</h3>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li>Biology: Genetics, Ecology, Human Physiology, Evolution.</li>
              <li>Chemistry: Organic, Inorganic and Physical chemistry concepts.</li>
              <li>Physics: Mechanics, Electricity, Optics, Modern Physics.</li>
            </ul>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">How to Use</h3>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li>Start with NCERT explainer for weak chapters and list points.</li>
              <li>Generate flashcards for high-yield terms and definitions.</li>
              <li>Use weak-area diagnostics to allocate daily practice blocks.</li>
            </ul>
          </div>
        </section>

        <section className="text-center">
          <p className="text-slate-600 mb-4">Ready to revise smarter and score higher?</p>
          <Link
            href="/tools/ncert-explainer"
            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-8 py-3 text-white font-semibold hover:bg-indigo-700"
          >
            Start with Concept Explainer
          </Link>
        </section>
      </div>
    </main>
  );
}
