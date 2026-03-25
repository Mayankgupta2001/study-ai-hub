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
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-serif text-3xl font-bold mb-6">Weak Area Identifier</h1>

      <label className="block mb-2 text-sm font-medium">Exam type</label>
      <select
        value={examType}
        onChange={(e) => setExamType(e.target.value as "UPSC" | "JEE" | "NEET" | "SSC")}
        className="w-full p-3 border rounded mb-4"
      >
        <option value="UPSC">UPSC</option>
        <option value="JEE">JEE</option>
        <option value="NEET">NEET</option>
        <option value="SSC">SSC</option>
      </select>

      <div className="rounded-xl border border-rule bg-white p-4 mb-5">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label className="block mb-2 text-sm font-medium">Topic</label>
            <input
              value={topicInput}
              onChange={(e) => setTopicInput(e.target.value)}
              className="w-full p-3 border rounded"
              placeholder="E.g., Waves, Organic Chemistry, Mensuration..."
            />
          </div>
          <div className="w-full sm:w-40">
            <label className="block mb-2 text-sm font-medium">Self rating (1-5)</label>
            <input
              type="number"
              min={1}
              max={5}
              value={ratingInput}
              onChange={(e) => setRatingInput(Number(e.target.value) || 1)}
              className="w-full p-3 border rounded"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <button
            onClick={addTopic}
            disabled={topics.length >= 12}
            className="px-4 py-2 bg-ink text-paper rounded disabled:opacity-80"
          >
            Add topic
          </button>
          <button
            onClick={() => {
              setTopics([]);
              setError(null);
            }}
            className="px-4 py-2 border rounded"
            disabled={topics.length === 0}
          >
            Clear
          </button>
        </div>

        {topics.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-semibold mb-2">Topics added</h3>
            <ul className="space-y-2">
              {topics.map((t) => (
                <li
                  key={t.topic}
                  className="flex items-center justify-between gap-3 border border-rule bg-rule/5 rounded px-3 py-2"
                >
                  <span className="text-sm text-ink-soft">
                    {t.topic}{" "}
                    <span className="text-ink font-semibold">({t.rating}/5)</span>
                  </span>
                  <button
                    onClick={() => removeTopic(t.topic)}
                    className="text-sm text-ink-muted hover:text-ink"
                    type="button"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleRun}
          disabled={isLoading || topics.length === 0}
          className="px-4 py-2 bg-ink text-paper rounded inline-flex items-center gap-2 disabled:opacity-80"
        >
          {isLoading ? "Analyzing... (may take ~10-15s)" : "Run"}
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
            <h2 className="font-serif text-2xl font-semibold">Study Diagnostics</h2>
            <span className="text-sm text-ink-muted">
              Priority:{" "}
              <span className="font-semibold text-ink">{result.priority_topic}</span>
            </span>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="font-semibold text-sm mb-2">Weak areas</h3>
              <ul className="list-disc pl-5 text-sm text-ink-soft space-y-1">
                {result.weak_areas.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-sm mb-2">Strong areas</h3>
              <ul className="list-disc pl-5 text-sm text-ink-soft space-y-1">
                {result.strong_areas.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 rounded border border-rule bg-rule/5 p-4">
            <h3 className="font-semibold text-sm mb-2">Suggested study plan</h3>
            <ol className="list-decimal pl-5 text-sm text-ink-soft space-y-1">
              {result.study_plan.map((step, idx) => (
                <li key={`${step}-${idx}`}>{step}</li>
              ))}
            </ol>
          </div>
        </section>
      )}
    </main>
  );
}
