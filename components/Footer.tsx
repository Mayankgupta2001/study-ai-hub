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
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6">
        {/* Main footer grid */}
        <div className="py-16 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="font-dm-sans text-xl font-bold text-slate-900 inline-block mb-4"
              aria-label="Study AI Hub — Home"
            >
              Study<span className="text-indigo-600">AI</span>Hub
            </Link>
            <p className="text-sm text-slate-600 leading-relaxed max-w-[28ch]">
              AI-assisted preparation tools for UPSC, JEE, NEET, and SSC
              aspirants.
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-900 mb-5">
                {col.heading}
              </h3>
              <ul className="flex flex-col gap-3 list-none m-0 p-0" role="list">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-600 hover:text-slate-900 transition-colors duration-150"
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
        <div className="border-t border-gray-200 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            &copy; {year} Study AI Hub. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-xs text-slate-600">
              Made in India for Indian aspirants.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              <Link
                href="#"
                className="text-slate-400 hover:text-slate-600 transition-colors"
                aria-label="Follow us on Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </Link>
              <Link
                href="#"
                className="text-slate-400 hover:text-slate-600 transition-colors"
                aria-label="Follow us on LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
