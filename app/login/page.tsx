"use client";

import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="max-w-md mx-auto px-6 py-16">
      <h1 className="font-serif text-2xl font-bold mb-6">Sign in</h1>

      <label className="block text-sm mb-1">Email</label>
      <input className="w-full p-2 mb-3 border rounded" />

      <label className="block text-sm mb-1">Password</label>
      <input type="password" className="w-full p-2 mb-4 border rounded" />

      <div className="flex gap-3">
        <button className="px-4 py-2 bg-ink text-paper rounded">Sign in</button>
        <Link href="/signup" className="px-4 py-2 border rounded">Create account</Link>
      </div>
    </main>
  );
}
