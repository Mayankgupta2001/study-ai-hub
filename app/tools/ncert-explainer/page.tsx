"use client";

import { useState } from "react";
import Link from "next/link";

export default function NcertExplainer() {
  const [q, setQ] = useState("");

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-serif text-3xl font-bold mb-6">NCERT Concept Explainer</h1>

      <label className="block mb-2 text-sm font-medium">Ask a question</label>
      <textarea
        value={q}
        onChange={(e) => setQ(e.target.value)}
        rows={6}
        className="w-full p-3 border rounded mb-4"
      />

      <div className="flex gap-3">
        <button
          onClick={() => alert("Explain — backend not implemented.")}
          className="px-4 py-2 bg-ink text-paper rounded"
        >
          Explain
        </button>
        <Link href="/" className="px-4 py-2 border rounded">
          Home
        </Link>
      </div>
    </main>
  );
}
