"use client";

import Link from "next/link";
import { useState } from "react";
import { NAV_LINKS } from "@/lib/data";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur-sm border-b border-rule">
      <nav
        className="max-w-6xl mx-auto px-6 flex items-center justify-between h-[60px]"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-serif text-xl font-bold text-ink tracking-tight"
          aria-label="Study AI Hub - Home"
        >
          Study<span className="text-accent">AI</span>Hub
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 list-none" role="list">
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
          <li>
            <Link
              href="/signup"
              className="text-sm font-medium bg-ink text-paper px-4 py-2 rounded hover:bg-ink/90 transition-colors duration-150"
            >
              Get Started →
            </Link>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span
            className={`block w-5 h-0.5 bg-ink transition-all duration-200 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-ink transition-all duration-200 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-ink transition-all duration-200 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-rule bg-paper px-6 pb-4">
          <ul className="flex flex-col gap-1 pt-3 list-none" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 text-sm text-ink-soft hover:text-ink transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/signup"
                className="block text-center text-sm font-medium bg-ink text-paper px-4 py-2.5 rounded hover:bg-ink/90 transition-colors"
              >
                Get Started →
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
