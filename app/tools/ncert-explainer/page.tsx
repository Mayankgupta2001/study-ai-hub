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
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium text-sm mb-4"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          <h1 className="font-dm-sans text-3xl font-bold text-slate-900 mb-2">
            NCERT Concept Explainer
          </h1>
          <p className="text-slate-600 text-base leading-relaxed">
            Get concept clarity with simple explanation, key points, examples, exam relevance and a memory tip.
          </p>
        </div>

        {/* Input Card */}
        <div className="bg-white rounded-2xl p-8 shadow-md mb-8">
          <div className="space-y-6">
            {/* Concept Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">Concept</label>
              <input
                type="text"
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
                placeholder="E.g., Photosynthesis, Newton's laws, Democracy, Plate tectonics"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-900 placeholder-slate-500"
              />
            </div>

            {/* Subject and Class Level */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-3">Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value as any)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-900 bg-white"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-900 bg-white"
                >
                  <option value="6-8">6-8</option>
                  <option value="9-10">9-10</option>
                  <option value="11-12">11-12</option>
                </select>
              </div>
            </div>

            {/* Explain Button */}
            <button
              onClick={handleExplain}
              disabled={isLoading}
              className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-xl hover:from-indigo-700 hover:to-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 inline-flex items-center justify-center gap-2 font-semibold text-base shadow-md hover:shadow-lg"
            >
              {isLoading ? (
                <>
                  <svg
                    className="w-5 h-5 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-90"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  <span>Explaining...</span>
                </>
              ) : (
                <span>Explain Concept</span>
              )}
            </button>

            {error && (
              <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                <div className="flex gap-3">
                  <svg
                    className="w-5 h-5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{error}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <section className="space-y-6">
            {/* Simple Explanation */}
            <div className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-indigo-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-xl bg-indigo-100 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900">Simple Explanation</h3>
              </div>
              <p className="text-slate-700 leading-relaxed">{result.simple_explanation}</p>
            </div>

            {/* Key Points */}
            <div className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-emerald-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M9 12l2 2 4-4m7 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900">Key Points</h3>
              </div>
              <ul className="space-y-2">
                {result.key_points.map((item, idx) => (
                  <li key={`${item}-${idx}`} className="flex gap-2 text-sm text-slate-700">
                    <span className="text-emerald-600 font-bold flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Examples */}
            <div className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-purple-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900">Examples</h3>
              </div>
              <ul className="space-y-2">
                {result.examples.map((item, idx) => (
                  <li key={`${item}-${idx}`} className="flex gap-2 text-sm text-slate-700">
                    <span className="text-purple-600 font-bold flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exam Relevance */}
            <div className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-amber-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900">Exam Relevance</h3>
              </div>
              <p className="text-slate-700 leading-relaxed">{result.exam_relevance}</p>
            </div>

            {/* Remember This */}
            <div className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-blue-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900">Remember This</h3>
              </div>
              <p className="text-slate-700 leading-relaxed">{result.remember_this}</p>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
