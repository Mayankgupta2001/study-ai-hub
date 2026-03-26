"use client";

import { useState } from "react";
import Link from "next/link";

interface ExplainerResult {
  simple_explanation: string;
  key_points: string[];
  examples: string[];
  exam_relevance: string;
  remember_this: string;
}

export default function NcertExplainer() {
  const [concept, setConcept] = useState("");
  const [subject, setSubject] = useState<
    "Physics" | "Chemistry" | "Biology" | "History" | "Geography" | "Political Science" | "Economics"
  >("Physics");
  const [classLevel, setClassLevel] = useState<"6-8" | "9-10" | "11-12">("9-10");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ExplainerResult | null>(null);

  async function handleExplain() {
    setIsLoading(true);
    setError(null);
    setResult(null);

    if (!concept.trim()) {
      setError("Please enter a concept to explain.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/tools/ncert-explainer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          concept,
          subject,
          class_level: classLevel,
        }),
      });

      const data = (await res.json()) as ExplainerResult | { error?: string; details?: string };

      if (!res.ok) {
        const message = "error" in data && data.error ? data.error : "Could not generate explanation.";
        const details = "details" in data && data.details ? ` ${data.details}` : "";
        throw new Error(`${message}${details}`);
      }

      setResult(data as ExplainerResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium text-sm mb-4"
          >
            <span>← Back to Home</span>
          </Link>
          <h1 className="font-dm-sans text-4xl font-bold text-slate-900 mb-2">NCERT Concept Explainer</h1>
          <p className="text-slate-600 text-base leading-relaxed">
            Get concept clarity with simple explanation, key points, examples, exam relevance and a memory tip.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm mb-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">Concept</label>
              <input
                type="text"
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
                placeholder="E.g., Photosynthesis, Newton's laws, Democracy, Plate tectonics"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-3">Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value as any)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-900 bg-white"
                >
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                  <option value="History">History</option>
                  <option value="Geography">Geography</option>
                  <option value="Political Science">Political Science</option>
                  <option value="Economics">Economics</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-3">Class Level</label>
                <select
                  value={classLevel}
                  onChange={(e) => setClassLevel(e.target.value as "6-8" | "9-10" | "11-12")}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-900 bg-white"
                >
                  <option value="6-8">6-8</option>
                  <option value="9-10">9-10</option>
                  <option value="11-12">11-12</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <button
              onClick={handleExplain}
              disabled={isLoading}
              className="flex-1 sm:flex-none px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 inline-flex items-center justify-center gap-2 font-semibold text-sm"
            >
              {isLoading ? (
                <>
                  <svg
                    className="w-5 h-5 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-90"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  <span>Explaining...</span>
                </>
              ) : (
                <>
                  <span>Explain Concept</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
            <Link
              href="/"
              className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-semibold text-sm"
            >
              Home
            </Link>
          </div>

          {error && (
            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              <div className="flex gap-3">
                <span>{error}</span>
              </div>
            </div>
          )}
        </div>

        {result && (
          <section className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h2 className="font-semibold text-xl text-slate-900 mb-3">Simple Explanation</h2>
              <p className="text-slate-700 leading-relaxed">{result.simple_explanation}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold text-lg text-slate-900 mb-3">Key Points</h3>
                <ul className="space-y-2 text-slate-700">
                  {result.key_points.map((item, idx) => (
                    <li key={`${item}-${idx}`} className="flex gap-2">
                      <span className="text-indigo-600">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold text-lg text-slate-900 mb-3">Examples</h3>
                <ul className="space-y-2 text-slate-700">
                  {result.examples.map((item, idx) => (
                    <li key={`${item}-${idx}`} className="flex gap-2">
                      <span className="text-emerald-600">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm md:col-span-2">
                <h3 className="font-semibold text-lg text-slate-900 mb-3">Exam Relevance</h3>
                <p className="text-slate-700 leading-relaxed">{result.exam_relevance}</p>
                <h3 className="font-semibold text-lg text-slate-900 mb-3 mt-4">Remember This</h3>
                <p className="text-slate-700 leading-relaxed">{result.remember_this}</p>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
