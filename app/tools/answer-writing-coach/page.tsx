"use client";

import { useState } from "react";
import Link from "next/link";

export default function AnswerWritingCoach() {
  const [text, setText] = useState("");

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-serif text-3xl font-bold mb-6">Answer Writing Coach</h1>

      <label className="block mb-2 text-sm font-medium">Paste your answer</label>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={10}
        className="w-full p-3 border rounded mb-4"
      />

      <div className="flex gap-3">
        <button
          onClick={() => alert("Submit received — backend not wired yet.")}
          className="px-4 py-2 bg-ink text-paper rounded"
        >
          Submit
        </button>
        <Link href="/" className="px-4 py-2 border rounded">
          Home
        </Link>
      </div>
    </main>
  );
}
