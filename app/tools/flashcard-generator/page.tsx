"use client";

import { useState } from "react";
import Link from "next/link";

export default function FlashcardGenerator() {
  const [text, setText] = useState("");

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-serif text-3xl font-bold mb-6">Flashcard Generator</h1>

      <label className="block mb-2 text-sm font-medium">Paste notes or chapter text</label>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={8}
        className="w-full p-3 border rounded mb-4"
      />

      <div className="flex gap-3">
        <button
          onClick={() => alert("Generate — backend not implemented.")}
          className="px-4 py-2 bg-ink text-paper rounded"
        >
          Generate
        </button>
        <Link href="/" className="px-4 py-2 border rounded">
          Home
        </Link>
      </div>
    </main>
  );
}
