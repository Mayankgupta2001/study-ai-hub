import { STEPS } from "@/lib/data";

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="border-t border-rule bg-paper-warm"
      aria-labelledby="how-heading"
    >
      <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20">
        <header className="mb-12">
          <span className="block text-[11px] font-medium uppercase tracking-widest text-ink-muted mb-3">
            How it works
          </span>
          <h2
            id="how-heading"
            className="font-serif text-3xl sm:text-4xl font-bold text-ink tracking-tight"
          >
            Simple, structured preparation
          </h2>
        </header>

        <ol
          className="grid grid-cols-1 md:grid-cols-3 border border-rule rounded-xl bg-white overflow-hidden divide-y md:divide-y-0 md:divide-x divide-rule"
          aria-label="Steps to use Study AI Hub"
        >
          {STEPS.map((step) => (
            <li key={step.num} className="p-8 lg:p-10">
              <span
                className="font-serif text-5xl font-bold text-rule leading-none block mb-6 select-none"
                aria-hidden="true"
              >
                {step.num}
              </span>
              <h3 className="font-serif text-xl font-semibold text-ink mb-2.5">
                {step.title}
              </h3>
              <p className="text-sm text-ink-soft leading-relaxed">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
