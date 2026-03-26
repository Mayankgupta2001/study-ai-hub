"use client";

import { useState } from "react";
import Link from "next/link";

export default function WeakAreaIdentifier() {
  const [examType, setExamType] = useState<"UPSC" | "JEE" | "NEET" | "SSC">("UPSC");
  const [topicInput, setTopicInput] = useState("");
  const [ratingInput, setRatingInput] = useState(3);
  const [topics, setTopics] = useState<Array<{ topic: string; rating: number }>>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    weak_areas: string[];
    strong_areas: string[];
    study_plan: string[];
    priority_topic: string;
  } | null>(null);

  function addTopic() {
    const topic = topicInput.trim();
    if (!topic) {
      setError("Topic name cannot be empty.");
      return;
    }
    if (topic.length < 2) {
      setError("Topic name is too short.");
      return;
    }
    if (ratingInput < 1 || ratingInput > 5) {
      setError("Rating must be between 1 and 5.");
      return;
    }

    setTopics((prev) => {
      const existingIdx = prev.findIndex(
        (t) => t.topic.trim().toLowerCase() === topic.toLowerCase(),
      );
      if (existingIdx >= 0) {
        const copy = [...prev];
        copy[existingIdx] = { topic, rating: ratingInput };
        return copy;
      }
      return [...prev, { topic, rating: ratingInput }];
    });

    setTopicInput("");
    setRatingInput(3);
    setError(null);
  }

  function removeTopic(topicToRemove: string) {
    setTopics((prev) => prev.filter((t) => t.topic !== topicToRemove));
  }

  async function handleRun() {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/tools/weak-area-identifier", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          examType,
          topics,
        }),
      });

      const data = (await response.json()) as
        | {
            weak_areas: string[];
            strong_areas: string[];
            study_plan: string[];
            priority_topic: string;
          }
        | { error?: string; details?: string };

      if (!response.ok) {
        const message =
          "error" in data && data.error
            ? data.error
            : "Could not identify weak areas.";
        const details = "details" in data && data.details ? ` ${data.details}` : "";
        throw new Error(`${message}${details}`);
      }

      setResult(data as {
        weak_areas: string[];
        strong_areas: string[];
        study_plan: string[];
        priority_topic: string;
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
            Weak Area Identifier
          </h1>
          <p className="text-slate-600 text-base leading-relaxed">
            Rate your topics from 1-5 and get personalized insights on your weak areas, strong
            areas, and a customized study plan.
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
                onChange={(e) => setExamType(e.target.value as "UPSC" | "JEE" | "NEET" | "SSC")}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-900 bg-white"
              >
                <option value="UPSC">UPSC</option>
                <option value="JEE">JEE</option>
                <option value="NEET">NEET</option>
                <option value="SSC">SSC</option>
              </select>
            </div>

            {/* Topic Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Add Topics & Rate Yourself
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <input
                    value={topicInput}
                    onChange={(e) => setTopicInput(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-900 placeholder-slate-500"
                    placeholder="E.g., Waves, Organic Chemistry, Mensuration..."
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        addTopic();
                      }
                    }}
                  />
                </div>
                <div className="w-full sm:w-32">
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={ratingInput}
                    onChange={(e) => setRatingInput(Number(e.target.value) || 1)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-900"
                    placeholder="Rating (1-5)"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={addTopic}
                disabled={topics.length >= 12}
                className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold text-sm"
              >
                Add Topic
              </button>
              <button
                onClick={() => {
                  setTopics([]);
                  setError(null);
                }}
                className="px-6 py-3 border border-gray-300 text-slate-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold text-sm disabled:opacity-50"
                disabled={topics.length === 0}
              >
                Clear All
              </button>
            </div>

            {/* Topics List */}
            {topics.length > 0 && (
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <p className="text-sm font-semibold text-slate-900 mb-4">
                  Topics Added ({topics.length}/12)
                </p>
                <ul className="space-y-2">
                  {topics.map((t) => (
                    <li
                      key={t.topic}
                      className="flex items-center justify-between gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 hover:border-indigo-300 transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <span className="text-sm text-slate-900 font-medium flex-1 truncate">
                          {t.topic}
                        </span>
                        <span className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap ${
                          t.rating <= 2
                            ? "bg-red-100 text-red-700"
                            : t.rating === 3
                            ? "bg-amber-100 text-amber-700"
                            : "bg-emerald-100 text-emerald-700"
                        }`}>
                          {t.rating}/5
                        </span>
                      </div>
                      <button
                        onClick={() => removeTopic(t.topic)}
                        className="text-sm text-slate-500 hover:text-slate-700 font-medium transition-colors flex-shrink-0"
                        type="button"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Run Button */}
            <button
              onClick={handleRun}
              disabled={isLoading || topics.length === 0}
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
                  <span>Analyzing...</span>
                </>
              ) : (
                <span>Generate Study Plan</span>
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
            {/* Priority Topic */}
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
                      d="M12 9v2m0 4v2m0 0v2m0-6v-2m0-6h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900">Priority Focus</h3>
              </div>
              <p className="text-xl font-bold text-indigo-900 mb-2">{result.priority_topic}</p>
              <p className="text-sm text-slate-600">
                This topic needs immediate attention based on your ratings.
              </p>
            </div>

            {/* Weak Areas */}
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
                <h3 className="font-semibold text-slate-900">Weak Areas</h3>
              </div>
              <ul className="space-y-2">
                {result.weak_areas.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-slate-700">
                    <span className="text-red-600 font-bold flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Strong Areas */}
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
                <h3 className="font-semibold text-slate-900">Strong Areas</h3>
              </div>
              <ul className="space-y-2">
                {result.strong_areas.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-slate-700">
                    <span className="text-emerald-600 font-bold flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Study Plan */}
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
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900">Personalized Study Plan</h3>
              </div>
              <ol className="space-y-3">
                {result.study_plan.map((step, idx) => (
                  <li key={`${step}-${idx}`} className="flex gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 font-semibold text-xs flex-shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-sm text-slate-700 pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
