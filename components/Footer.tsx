import Link from "next/link";

const FOOTER_COLUMNS = [
  {
    heading: "Exams",
      links: [
      { label: "UPSC", href: "/ai-tools/upsc" },
      { label: "JEE", href: "/ai-tools/jee" },
      { label: "NEET", href: "/ai-tools/neet" },
      { label: "SSC", href: "/ai-tools/ssc" },
    ],
  },
  {
    heading: "Tools",
    links: [
      { label: "Answer Writing Coach", href: "/tools/answer-writing-coach" },
      { label: "JEE Problem Breakdown", href: "/tools/jee-problem-breakdown" },
      { label: "Current Affairs Digest", href: "/tools/current-affairs" },
      { label: "Flashcard Generator", href: "/tools/flashcard-generator" },
    ],
  },
  {
    heading: "Platform",
    links: [
      { label: "How It Works", href: "#how-it-works" },
      { label: "Pricing", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Use", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6">
        {/* Main footer grid */}
        <div className="py-14 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="font-serif text-xl font-bold text-slate-300 inline-block mb-4"
              aria-label="Study AI Hub — Home"
            >
              Study<span className="text-blue-400">AI</span>Hub
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed max-w-[28ch]">
              AI-assisted preparation tools for UPSC, JEE, NEET, and SSC
              aspirants.
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3 className="text-[11px] font-semibold uppercase tracking-widest text-slate-600 mb-4">
                {col.heading}
              </h3>
              <ul className="flex flex-col gap-2.5 list-none m-0 p-0" role="list">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-slate-300 transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-700">
            &copy; {year} Study AI Hub. All rights reserved.
          </p>
          <p className="text-xs text-slate-700">
            Made in India for Indian aspirants.
          </p>
        </div>
      </div>
    </footer>
  );
}
