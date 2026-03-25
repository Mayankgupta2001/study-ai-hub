"use client";

import Link from "next/link";
import { useState } from "react";
import { NAV_LINKS } from "@/lib/data";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <nav
        className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-dm-sans text-xl font-bold text-slate-900 tracking-tight shrink-0"
          aria-label="Study AI Hub — Home"
        >
          Study<span className="text-indigo-600">AI</span>Hub
        </Link>

        {/* Desktop links */}
        <ul
          className="hidden md:flex items-center gap-8 list-none m-0 p-0"
          role="list"
        >
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors duration-150"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors duration-150"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="text-sm font-medium bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors duration-150 shadow-sm"
          >
            Start Free
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 -mr-2 text-slate-700 hover:text-slate-900 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-slate-200 bg-white"
        >
          <ul
            className="flex flex-col list-none m-0 p-0 px-6 py-4 gap-1"
            role="list"
          >
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-2.5 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-4 pb-1 border-t border-slate-200 mt-3 flex flex-col gap-2">
              <Link
                href="/login"
                className="block text-center py-2.5 text-sm font-medium text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="block text-center py-2.5 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Start Free
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
