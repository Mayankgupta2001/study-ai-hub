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
            Answer Writing Coach
          </h1>
          <p className="text-slate-600 text-base leading-relaxed">
            Submit your UPSC-style response and get examiner-style feedback: score, strengths,
            weaknesses, and actionable improvements.
          </p>
        </div>

        {/* Input Card */}
        <div className="bg-white rounded-2xl p-8 shadow-md mb-8">
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
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-slate-900 placeholder-slate-500"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-900"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-slate-900 placeholder-slate-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleEvaluate}
            disabled={isLoading || !answer.trim()}
            className="w-full mt-8 px-6 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-xl hover:from-indigo-700 hover:to-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 inline-flex items-center justify-center gap-2 font-semibold text-base shadow-md hover:shadow-lg"
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
                <span>Analyzing...</span>
              </>
            ) : (
              <span>Analyze Answer</span>
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

        {/* Results Section */}
        {result && (
          <section className="space-y-6">
            {/* Score Card */}
            <div className="bg-white rounded-2xl p-8 shadow-md text-center border-l-4 border-gray-300">
              <p className="text-slate-500 text-sm font-semibold uppercase tracking-widest mb-3">
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
              <p className="text-slate-700 text-base leading-relaxed">
                {result.examinerSummary}
              </p>
            </div>

            {/* Strengths */}
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
            <div className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-red-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-xl bg-red-100 flex items-center justify-center">
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
          </section>
        )}
      </div>
    </main>
  );
}
