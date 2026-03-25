"use client";

import { useState } from "react";
import Link from "next/link";

export default function JEEProblemBreakdown() {
  const [subject, setSubject] = useState<"Physics" | "Chemistry" | "Math">("Physics");
  const [problem, setProblem] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    step_by_step: string[];
    concept_used: string[];
    common_mistakes: string[];
    difficulty: "Easy" | "Medium" | "Hard";
    tip: string;
  } | null>(null);

  async function handleAnalyze() {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/tools/jee-problem-breakdown", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, problem }),
      });

      const data = (await response.json()) as
        | {
            step_by_step: string[];
            concept_used: string[];
            common_mistakes: string[];
            difficulty: "Easy" | "Medium" | "Hard";
            tip: string;
          }
        | { error?: string; details?: string };

      if (!response.ok) {
        const message =
          "error" in data && data.error ? data.error : "Could not analyze problem.";
        const details = "details" in data && data.details ? ` ${data.details}` : "";
        throw new Error(`${message}${details}`);
      }

      setResult(data as {
        step_by_step: string[];
        concept_used: string[];
        common_mistakes: string[];
        difficulty: "Easy" | "Medium" | "Hard";
        tip: string;
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error.");
    } finally {
      setIsLoading(false);
    }
  }

  const difficultyColor = {
    Easy: { bg: "emerald", border: "emerald", text: "emerald" },
    Medium: { bg: "amber", border: "amber", text: "amber" },
    Hard: { bg: "red", border: "red", text: "red" },
  };
  const diffColor = result?.difficulty ? difficultyColor[result.difficulty] : difficultyColor.Medium;

  const getDifficultyStyles = () => {
    if (!result) return { background: "", border: "", text: "", icon: "" };
    if (result.difficulty === "Easy") {
      return {
        background: "bg-gradient-to-r from-emerald-50 to-emerald-50/50",
        border: "border-emerald-200",
        text: "text-emerald-700",
        icon: "text-emerald-600",
      };
    } else if (result.difficulty === "Hard") {
      return {
        background: "bg-gradient-to-r from-red-50 to-red-50/50",
        border: "border-red-200",
        text: "text-red-700",
        icon: "text-red-600",
      };
    } else {
      return {
        background: "bg-gradient-to-r from-amber-50 to-amber-50/50",
        border: "border-amber-200",
        text: "text-amber-700",
        icon: "text-amber-600",
      };
    }
  };

  const diffStyles = getDifficultyStyles();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
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
            JEE Problem Breakdown
          </h1>
          <p className="text-slate-600 text-base leading-relaxed">
            Get step-by-step solutions, concept breakdown, and common mistakes for any JEE problem.
          </p>
        </div>

        {/* Input Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm mb-8">
          <div className="space-y-6">
            {/* Subject */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Subject
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value as "Physics" | "Chemistry" | "Math")}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-900 bg-white"
              >
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Math">Math</option>
              </select>
            </div>

            {/* Problem */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Paste the problem
              </label>
              <textarea
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                rows={10}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-slate-900 placeholder-slate-500"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-8">
            <button
              onClick={handleAnalyze}
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
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <span>Analyze Problem</span>
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
            {/* Difficulty Badge */}
            <div className={`${diffStyles.background} border ${diffStyles.border} rounded-xl p-6 flex items-center justify-between`}>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-600 mb-1">
                  Problem Difficulty
                </p>
                <p className={`text-2xl font-bold ${diffStyles.text}`}>
                  {result.difficulty}
                </p>
              </div>
              <div className={`text-5xl opacity-20 ${diffStyles.icon}`}>
                {result.difficulty === "Easy" ? "⚡" : result.difficulty === "Medium" ? "⚙️" : "🔥"}
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Step-by-step */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
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
                  <h3 className="font-semibold text-slate-900">Step-by-step Solution</h3>
                </div>
                <ol className="space-y-3">
                  {result.step_by_step.map((step, idx) => (
                    <li key={`${step}-${idx}`} className="flex gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 font-semibold text-xs flex-shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-sm text-slate-700 pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Concepts */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
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
                        d="M9 12l2 2 4-4m7 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-slate-900">Concepts Used</h3>
                </div>
                <ul className="space-y-2">
                  {result.concept_used.map((concept) => (
                    <li key={concept} className="flex gap-2 text-sm text-slate-700">
                      <span className="text-emerald-600 font-bold flex-shrink-0">•</span>
                      <span>{concept}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Common Mistakes */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
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
                      d="M12 9v2m0 4v2m0 0v2m0-6v-2m0-6h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900">Common Mistakes to Avoid</h3>
              </div>
              <ul className="space-y-2">
                {result.common_mistakes.map((mistake) => (
                  <li key={mistake} className="flex gap-2 text-sm text-slate-700">
                    <span className="text-red-600 font-bold flex-shrink-0">✕</span>
                    <span>{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pro Tip */}
            <div className="bg-gradient-to-r from-indigo-50 to-indigo-50/50 border border-indigo-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <div className="text-2xl flex-shrink-0">💡</div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Pro Tip</h3>
                  <p className="text-sm text-slate-700 leading-relaxed">{result.tip}</p>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
