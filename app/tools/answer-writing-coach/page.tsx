"use client";

import { useState } from "react";
import Link from "next/link";

interface EvaluationResult {
  score: number;
  strengths: string[];
  weaknesses: string[];
  improvements: string[];
  examinerSummary: string;
}

export default function AnswerWritingCoach() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [wordLimit, setWordLimit] = useState("150");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<EvaluationResult | null>(null);

  async function handleEvaluate() {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/tools/answer-writing-coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          answer,
          wordLimit: Number(wordLimit) || undefined,
        }),
      });

      const data = (await response.json()) as
        | EvaluationResult
        | { error?: string; details?: string };

      if (!response.ok) {
        const message =
          "error" in data && data.error
            ? data.error
            : "Could not evaluate answer.";
        const details = "details" in data && data.details ? ` ${data.details}` : "";
        throw new Error(`${message}${details}`);
      }

      setResult(data as EvaluationResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
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
          <h1 className="font-dm-sans text-4xl font-bold text-slate-900 mb-2">
            Answer Writing Coach
          </h1>
          <p className="text-slate-600 text-base leading-relaxed">
            Submit your UPSC-style response and get examiner-style feedback: score, strengths,
            weaknesses, and actionable improvements.
          </p>
        </div>

        {/* Input Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm mb-8">
          <div className="space-y-6">
            {/* Question */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Question <span className="text-slate-400 font-normal">(optional, recommended)</span>
              </label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={3}
                placeholder="Example: Discuss the significance of federalism in Indian polity."
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-slate-900 placeholder-slate-500"
              />
            </div>

            {/* Word Limit */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Word limit <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <input
                type="number"
                min={50}
                max={500}
                value={wordLimit}
                onChange={(e) => setWordLimit(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-900"
              />
            </div>

            {/* Answer */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Paste your answer
              </label>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                rows={12}
                placeholder="Write your UPSC mains-style answer here..."
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-slate-900 placeholder-slate-500"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-8">
            <button
              onClick={handleEvaluate}
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
                  <span>Evaluating...</span>
                </>
              ) : (
                <>
                  <span>Evaluate Answer</span>
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
              Back
            </Link>
          </div>

          {error && (
            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
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

        {/* Results Section */}
        {result && (
          <section className="space-y-6">
            {/* Score Card */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Main Score */}
              <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm sm:col-span-3">
                <p className="text-slate-600 text-sm font-semibold uppercase tracking-widest mb-3">
                  Overall Score
                </p>
                <div className="flex items-baseline justify-center gap-1 mb-4">
                  <span className={`text-6xl font-bold ${
                    result.score >= 7
                      ? "text-emerald-600"
                      : result.score >= 5
                      ? "text-amber-600"
                      : "text-red-600"
                  }`}>
                    {result.score}
                  </span>
                  <span className="text-2xl text-slate-400">/10</span>
                </div>
                <p className="text-slate-700 text-base leading-relaxed max-w-2xl mx-auto">
                  {result.examinerSummary}
                </p>
              </div>

              {/* Strengths */}
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-50/50 border border-emerald-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-slate-900">Strengths</h3>
                </div>
                <ul className="space-y-2">
                  {result.strengths.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-slate-700">
                      <span className="text-emerald-600 font-bold flex-shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses */}
              <div className="bg-gradient-to-br from-red-50 to-red-50/50 border border-red-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-slate-900">Weaknesses</h3>
                </div>
                <ul className="space-y-2">
                  {result.weaknesses.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-slate-700">
                      <span className="text-red-600 font-bold flex-shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Improvements */}
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-50/50 border border-indigo-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
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
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-slate-900">Improvements</h3>
                </div>
                <ul className="space-y-2">
                  {result.improvements.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-slate-700">
                      <span className="text-indigo-600 font-bold flex-shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
