import Link from "next/link";

const FOOTER_LINKS = [
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ink border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <Link
          href="/"
          className="font-serif text-base font-bold text-slate-400"
          aria-label="Study AI Hub - Home"
        >
          Study<span className="text-blue-400">AI</span>Hub
        </Link>

        {/* Links */}
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 list-none" role="list">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-xs text-slate-600 hover:text-slate-400 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Copyright */}
        <p className="text-xs text-slate-700">
          &copy; {currentYear} StudyAIHub. Made for Indian aspirants.
        </p>
      </div>
    </footer>
  );
}
