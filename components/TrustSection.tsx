import { TRUST_POINTS } from "@/lib/data";

export default function TrustSection() {
  return (
    <section
      id="trust"
      className="border-t border-rule bg-paper-warm"
      aria-labelledby="trust-heading"
    >
      <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20">
        <header className="mb-12">
          <span className="block text-[11px] font-medium uppercase tracking-widest text-ink-muted mb-3">
            What to expect
          </span>
          <h2
            id="trust-heading"
            className="font-serif text-3xl sm:text-4xl font-bold text-ink tracking-tight mb-3"
          >
            Built for Indian competitive exams.
            <br className="hidden sm:block" />
            No inflated claims.
          </h2>
          <p className="text-ink-soft text-sm sm:text-base leading-relaxed max-w-[52ch]">
            These are the constraints we operate under. We think transparency is
            more useful to you than marketing copy.
          </p>
        </header>

        <ul
          className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-rule border border-rule rounded-xl overflow-hidden list-none m-0 p-0"
          role="list"
          aria-label="Our principles"
        >
          {TRUST_POINTS.map((point, idx) => (
            <li
              key={point.title}
              className={`bg-white p-7 lg:p-8 ${
                idx === TRUST_POINTS.length - 1 && TRUST_POINTS.length % 2 !== 0
                  ? "sm:col-span-2"
                  : ""
              }`}
            >
              <h3 className="font-serif text-lg font-semibold text-ink mb-2.5">
                {point.title}
              </h3>
              <p className="text-sm text-ink-soft leading-relaxed">
                {point.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
