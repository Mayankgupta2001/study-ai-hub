"use client";

import { useState } from "react";
import Link from "next/link";

export default function WeakAreaIdentifier() {
  const [name, setName] = useState("");

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-serif text-3xl font-bold mb-6">Weak Area Identifier</h1>

      <label className="block mb-2 text-sm font-medium">Enter a short diagnostic input</label>
      <textarea
        value={name}
        onChange={(e) => setName(e.target.value)}
        rows={5}
        className="w-full p-3 border rounded mb-4"
      />

      <div className="flex gap-3">
        <button
          onClick={() => alert("Run diagnostics — backend not wired.")}
          className="px-4 py-2 bg-ink text-paper rounded"
        >
          Run
        </button>
        <Link href="/" className="px-4 py-2 border rounded">
          Home
        </Link>
      </div>
    </main>
  );
}
