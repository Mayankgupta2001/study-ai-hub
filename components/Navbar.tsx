"use client";

import Link from "next/link";
import { useState } from "react";
import { NAV_LINKS } from "@/lib/data";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur-md border-b border-rule">
      <nav
        className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-serif text-xl font-bold text-ink tracking-tight shrink-0"
          aria-label="Study AI Hub — Home"
        >
          Study<span className="text-accent">AI</span>Hub
        </Link>

        {/* Desktop links */}
        <ul
          className="hidden md:flex items-center gap-7 list-none m-0 p-0"
          role="list"
        >
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-ink-soft hover:text-ink transition-colors duration-150"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm text-ink-soft hover:text-ink transition-colors duration-150"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="text-sm font-medium bg-ink text-paper px-4 py-2 rounded hover:bg-ink/90 transition-colors duration-150"
          >
            Start Preparing
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 -mr-2 text-ink-soft hover:text-ink transition-colors"
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
          className="md:hidden border-t border-rule bg-paper"
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
                  className="block py-2.5 text-sm text-ink-soft hover:text-ink transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-3 pb-1 border-t border-rule mt-2 flex flex-col gap-2">
              <Link
                href="/login"
                className="block text-center py-2.5 text-sm text-ink-soft border border-rule rounded hover:bg-paper-warm transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="block text-center py-2.5 text-sm font-medium bg-ink text-paper rounded hover:bg-ink/90 transition-colors"
              >
                Start Preparing
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
