"use client";

import { useState } from "react";
import Link from "next/link";

interface DigestResult {
  summary: string;
  key_points: string[];
  importance_for_exam: string;
  related_topics: string[];
  quick_revision: string;
}

export default function CurrentAffairs() {
  const [topic, setTopic] = useState("");
  const [examType, setExamType] = useState<"UPSC" | "SSC" | "General">("UPSC");
  const [timeframe, setTimeframe] = useState<"This Week" | "This Month" | "Recent">("This Week");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DigestResult | null>(null);

  async function handleDigest() {
    setIsLoading(true);
    setError(null);
    setResult(null);

    if (!topic.trim()) {
      setError("Please enter a topic or current affairs issue.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/tools/current-affairs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, examType, timeframe }),
      });

      const data = (await res.json()) as DigestResult | { error?: string; details?: string };

      if (!res.ok) {
        const message = "error" in data && data.error ? data.error : "Could not generate digest.";
        const details = "details" in data && data.details ? ` ${data.details}` : "";
        throw new Error(`${message}${details}`);
      }

      setResult(data as DigestResult);
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
          <h1 className="font-dm-sans text-4xl font-bold text-slate-900 mb-2">Current Affairs Digest</h1>
          <p className="text-slate-600 text-base leading-relaxed">
            Get exam-ready current affairs insights with summary, key points, exam importance, and quick revision.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm mb-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">Topic</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="E.g., India-Australia trade agreement, monsoon updates, food security, etc."
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-3">Exam Type</label>
                <select
                  value={examType}
                  onChange={(e) => setExamType(e.target.value as "UPSC" | "SSC" | "General")}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-900 bg-white"
                >
                  <option value="UPSC">UPSC</option>
                  <option value="SSC">SSC</option>
                  <option value="General">General</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-3">Timeframe</label>
                <select
                  value={timeframe}
                  onChange={(e) =>
                    setTimeframe(e.target.value as "This Week" | "This Month" | "Recent")
                  }
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-900 bg-white"
                >
                  <option value="This Week">This Week</option>
                  <option value="This Month">This Month</option>
                  <option value="Recent">Recent</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <button
              onClick={handleDigest}
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
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <span>Generate Digest</span>
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
              <h2 className="font-semibold text-xl text-slate-900 mb-3">Summary</h2>
              <p className="text-slate-700 leading-relaxed">{result.summary}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold text-lg text-slate-900 mb-3">Key Points</h3>
                <ul className="space-y-2 text-slate-700">
                  {result.key_points.map((point, idx) => (
                    <li key={`${point}-${idx}`} className="flex gap-2">
                      <span className="text-indigo-600">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold text-lg text-slate-900 mb-3">Exam Relevance</h3>
                <p className="text-slate-700 leading-relaxed">{result.importance_for_exam}</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold text-lg text-slate-900 mb-3">Related Topics</h3>
                <ul className="space-y-2 text-slate-700">
                  {result.related_topics.map((topicItem, idx) => (
                    <li key={`${topicItem}-${idx}`} className="flex gap-2">
                      <span className="text-emerald-600">•</span>
                      <span>{topicItem}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold text-lg text-slate-900 mb-3">Quick Revision</h3>
                <p className="text-slate-700 leading-relaxed">{result.quick_revision}</p>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
