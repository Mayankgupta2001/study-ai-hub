"use client";

import { useState } from "react";
import Link from "next/link";

export default function FlashcardGenerator() {
  const [examType, setExamType] = useState<"NEET" | "SSC" | "UPSC">("NEET");
  const [numberOfCards, setNumberOfCards] = useState(8);
  const [topic, setTopic] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    flashcards: Array<{ front: string; back: string }>;
    topic_summary: string;
  } | null>(null);

  async function handleGenerate() {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/tools/flashcard-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, examType, numberOfCards }),
      });

      const data = (await response.json()) as
        | { flashcards: Array<{ front: string; back: string }>; topic_summary: string }
        | { error?: string; details?: string };

      if (!response.ok) {
        const message =
          "error" in data && data.error ? data.error : "Could not generate flashcards.";
        const details = "details" in data && data.details ? ` ${data.details}` : "";
        throw new Error(`${message}${details}`);
      }

      setResult(data as {
        flashcards: Array<{ front: string; back: string }>;
        topic_summary: string;
      });
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
            Flashcard Generator
          </h1>
          <p className="text-slate-600 text-base leading-relaxed">
            Generate custom flashcards for your exam topics in seconds. Perfect for concept review
            and memorization.
          </p>
        </div>

        {/* Input Card */}
        <div className="bg-white rounded-2xl p-8 shadow-md mb-8">
          <div className="space-y-6">
            {/* Exam Type */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Exam Type
              </label>
              <select
                value={examType}
                onChange={(e) => setExamType(e.target.value as "NEET" | "SSC" | "UPSC")}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-900 bg-white"
              >
                <option value="NEET">NEET</option>
                <option value="SSC">SSC</option>
                <option value="UPSC">UPSC</option>
              </select>
            </div>

            {/* Number of Cards */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Number of cards <span className="text-slate-400 font-normal">(max 10)</span>
              </label>
              <input
                type="number"
                min={1}
                max={10}
                value={numberOfCards}
                onChange={(e) => setNumberOfCards(Number(e.target.value) || 1)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-900"
              />
            </div>

            {/* Topic */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Topic
              </label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                rows={6}
                placeholder="E.g., Photosynthesis (NEET) or Polity (UPSC) or Quant chapter basics (SSC)"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-slate-900 placeholder-slate-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleGenerate}
            disabled={isLoading || !topic.trim()}
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
              <span>Generate Flashcards</span>
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
            {/* Summary Card */}
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
                <h3 className="font-semibold text-slate-900">Topic Summary</h3>
              </div>
              <p className="text-slate-700 text-base leading-relaxed">
                {result.topic_summary}
              </p>
            </div>

            {/* Flashcards Grid */}
            <div>
              <h3 className="font-dm-sans text-xl font-bold text-slate-900 mb-5">
                Generated Flashcards ({result.flashcards.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {result.flashcards.map((card, idx) => (
                  <div
                    key={`${card.front}-${idx}`}
                    className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                  >
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-2">
                        Front
                      </p>
                      <p className="text-sm font-medium text-slate-900">{card.front}</p>
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-2">
                        Back
                      </p>
                      <p className="text-sm text-slate-700 leading-relaxed">{card.back}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
