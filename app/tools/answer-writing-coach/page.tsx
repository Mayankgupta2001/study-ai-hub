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
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-serif text-3xl font-bold mb-6">Answer Writing Coach</h1>

      <p className="text-sm text-ink-soft mb-6">
        Submit your UPSC-style response and get examiner-style feedback: score,
        strengths, weaknesses, and actionable improvements.
      </p>

      <label className="block mb-2 text-sm font-medium">Question (optional, recommended)</label>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        rows={3}
        placeholder="Example: Discuss the significance of federalism in Indian polity."
        className="w-full p-3 border rounded mb-4"
      />

      <label className="block mb-2 text-sm font-medium">Word limit (optional)</label>
      <input
        type="number"
        min={50}
        max={500}
        value={wordLimit}
        onChange={(e) => setWordLimit(e.target.value)}
        className="w-full p-3 border rounded mb-4"
      />

      <label className="block mb-2 text-sm font-medium">Paste your answer</label>
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        rows={12}
        placeholder="Write your UPSC mains-style answer here..."
        className="w-full p-3 border rounded mb-4"
      />

      <div className="flex gap-3">
        <button
          onClick={handleEvaluate}
          disabled={isLoading}
          className="px-4 py-2 bg-ink text-paper rounded inline-flex items-center gap-2 disabled:opacity-80"
        >
          {isLoading ? (
            <>
              <svg
                className="w-4 h-4 animate-spin"
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
              <span>Evaluating your answer... This may take 15-20 seconds</span>
            </>
          ) : (
            "Evaluate Answer"
          )}
        </button>
        <Link href="/" className="px-4 py-2 border rounded">
          Home
        </Link>
      </div>

      {error && (
        <div className="mt-6 rounded border border-red-300 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {result && (
        <section className="mt-8 rounded-xl border border-rule bg-white p-6">
          <div className="flex items-baseline gap-3 mb-4">
            <h2 className="font-serif text-2xl font-semibold">Evaluation</h2>
            <p className="text-sm text-ink-muted">
              Score: <span className="font-semibold text-ink">{result.score}/10</span>
            </p>
          </div>

          <p className="text-sm text-ink-soft mb-5">{result.examinerSummary}</p>

          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <h3 className="font-semibold text-sm mb-2">Strengths</h3>
              <ul className="list-disc pl-5 text-sm text-ink-soft space-y-1">
                {result.strengths.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-sm mb-2">Weaknesses</h3>
              <ul className="list-disc pl-5 text-sm text-ink-soft space-y-1">
                {result.weaknesses.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-sm mb-2">Improvements</h3>
              <ul className="list-disc pl-5 text-sm text-ink-soft space-y-1">
                {result.improvements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
