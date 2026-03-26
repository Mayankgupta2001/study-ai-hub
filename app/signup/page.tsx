"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function validateEmail(text: string) {
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(text);
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!name.trim()) {
      setError("Name is required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setIsLoading(false);
    setMessage("Account created successfully (mock). You can integrate backend signup later.");
  };

  const handleGoogle = async () => {
    setError(null);
    setMessage(null);
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsLoading(false);
    setMessage("Continue with Google clicked (UI only). Backend flow not implemented.");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 py-16">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        <h1 className="font-serif text-2xl font-bold mb-6 text-slate-900">Create account</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {error && (
            <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded p-2">{error}</p>
          )}
          {message && (
            <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded p-2">{message}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-70"
          >
            {isLoading ? "Creating..." : "Create account"}
          </button>
        </form>

        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-sm text-slate-500">or</div>
        </div>

        <button
          onClick={handleGoogle}
          disabled={isLoading}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100 transition"
        >
          Continue with Google
        </button>

        <p className="mt-6 text-sm text-slate-600">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-700">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
