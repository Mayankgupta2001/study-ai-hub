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

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-serif text-3xl font-bold mb-6">JEE Problem Breakdown</h1>

      <label className="block mb-2 text-sm font-medium">Subject</label>
      <select
        value={subject}
        onChange={(e) => setSubject(e.target.value as "Physics" | "Chemistry" | "Math")}
        className="w-full p-3 border rounded mb-4"
      >
        <option value="Physics">Physics</option>
        <option value="Chemistry">Chemistry</option>
        <option value="Math">Math</option>
      </select>

      <label className="block mb-2 text-sm font-medium">Paste the problem</label>
      <textarea
        value={problem}
        onChange={(e) => setProblem(e.target.value)}
        rows={8}
        className="w-full p-3 border rounded mb-4"
      />

      <div className="flex gap-3">
        <button
          onClick={handleAnalyze}
          disabled={isLoading}
          className="px-4 py-2 bg-ink text-paper rounded inline-flex items-center gap-2 disabled:opacity-80"
        >
          {isLoading ? "Analyzing... (may take ~10-15s)" : "Analyze"}
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
          <div className="flex items-baseline justify-between gap-4 mb-4">
            <h2 className="font-serif text-2xl font-semibold">Breakdown</h2>
            <span className="text-sm text-ink-muted">
              Difficulty:{" "}
              <span className="font-semibold text-ink">{result.difficulty}</span>
            </span>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="font-semibold text-sm mb-2">Step-by-step</h3>
              <ol className="list-decimal pl-5 text-sm text-ink-soft space-y-1">
                {result.step_by_step.map((item, idx) => (
                  <li key={`${item}-${idx}`}>{item}</li>
                ))}
              </ol>
            </div>

            <div>
              <h3 className="font-semibold text-sm mb-2">Concepts used</h3>
              <ul className="list-disc pl-5 text-sm text-ink-soft space-y-1">
                {result.concept_used.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <h3 className="font-semibold text-sm mt-5 mb-2">Common mistakes</h3>
              <ul className="list-disc pl-5 text-sm text-ink-soft space-y-1">
                {result.common_mistakes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 rounded border border-rule bg-rule/5 p-4">
            <h3 className="font-semibold text-sm mb-2">Best tip</h3>
            <p className="text-sm text-ink-soft">{result.tip}</p>
          </div>
        </section>
      )}
    </main>
  );
}
