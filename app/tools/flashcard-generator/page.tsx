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
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-serif text-3xl font-bold mb-6">Flashcard Generator</h1>

      <label className="block mb-2 text-sm font-medium">Exam type</label>
      <select
        value={examType}
        onChange={(e) => setExamType(e.target.value as "NEET" | "SSC" | "UPSC")}
        className="w-full p-3 border rounded mb-4"
      >
        <option value="NEET">NEET</option>
        <option value="SSC">SSC</option>
        <option value="UPSC">UPSC</option>
      </select>

      <label className="block mb-2 text-sm font-medium">Number of cards (max 10)</label>
      <input
        type="number"
        min={1}
        max={10}
        value={numberOfCards}
        onChange={(e) => setNumberOfCards(Number(e.target.value) || 1)}
        className="w-full p-3 border rounded mb-4"
      />

      <label className="block mb-2 text-sm font-medium">Topic</label>
      <textarea
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        rows={6}
        className="w-full p-3 border rounded mb-4"
        placeholder="E.g., Photosynthesis (NEET) or Polity (UPSC) or Quant chapter basics (SSC)"
      />

      <div className="flex gap-3">
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="px-4 py-2 bg-ink text-paper rounded inline-flex items-center gap-2 disabled:opacity-80"
        >
          {isLoading ? "Generating... (may take ~10-15s)" : "Generate"}
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
          <h2 className="font-serif text-2xl font-semibold mb-3">Flashcards</h2>
          <p className="text-sm text-ink-soft mb-5">{result.topic_summary}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {result.flashcards.map((card, idx) => (
              <div
                key={`${card.front}-${idx}`}
                className="rounded border border-rule bg-rule/5 p-4"
              >
                <div className="text-sm font-semibold text-ink mb-2">Front</div>
                <p className="text-sm text-ink-soft mb-3">{card.front}</p>
                <div className="text-sm font-semibold text-ink mb-2">Back</div>
                <p className="text-sm text-ink-soft">{card.back}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
