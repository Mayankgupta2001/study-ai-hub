export const metadata = {
  title: "UPSC AI Tools – Study AI Hub",
  description:
    "Best AI tools curated for UPSC preparation including answer writing, current affairs analysis, and prelims practice.",
};

import Link from "next/link";

const tools = [
  { name: "Answer Writing Coach", href: "/tools/answer-writing-coach", desc: "Get UPSC-style feedback on your mains answers." },
  { name: "Current Affairs Digest", href: "/tools/current-affairs", desc: "Summarise current events with exam relevance." },
  { name: "Flashcard Generator", href: "/tools/flashcard-generator", desc: "Create flashcards for any UPSC topic instantly." },
  { name: "JEE Problem Breakdown", href: "/tools/jee-problem-breakdown", desc: "Clarify difficult concepts used in exams." },
  { name: "Weak Area Identifier", href: "/tools/weak-area-identifier", desc: "Discover learning gaps and remediation steps." },
];

export default function UPSCPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <section className="mb-14 text-center">
          <h1 className="text-4xl font-bold text-slate-900">UPSC AI Toolkit</h1>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Prepare smartly with AI tools built for Prelims, Mains and interview-ready analytical thinking.
            Get structured feedback, concise current affairs insights, and topic-focused study aids.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Available UPSC Tools</h2>
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
            <h3 className="text-xl font-semibold text-slate-900 mb-3">UPSC Syllabus Focus</h3>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li>Polity, Economy, Environment, Science & Tech, International Relations, Ethics.</li>
              <li>Prelims static facts + linked current affairs for dynamic questions.</li>
              <li>Mains answer structuring, argument depth and fact-based analysis.</li>
            </ul>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">How to Use</h3>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li>Select tool relevant to your prep phase (current affairs, writing practice, memory tools).</li>
              <li>Input topics as per last 6 months trends and expected UPSC themes.</li>
              <li>Iterate, refine, and convert insights into answer habit and notes.</li>
            </ul>
          </div>
        </section>

        <section className="text-center">
          <p className="text-slate-600 mb-4">Ready to boost your UPSC prep?</p>
          <Link
            href="/tools/answer-writing-coach"
            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-8 py-3 text-white font-semibold hover:bg-indigo-700"
          >
            Start with Answer Coaching
          </Link>
        </section>
      </div>
    </main>
  );
}
