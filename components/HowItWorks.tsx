import { STEPS } from "@/lib/data";

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-gray-50 py-16 sm:py-20"
      aria-labelledby="how-heading"
    >
      <div className="max-w-6xl mx-auto px-6">
        <header className="text-center mb-16">
          <h2
            id="how-heading"
            className="font-dm-sans text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4"
          >
            Simple, structured preparation
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed max-w-2xl mx-auto">
            Follow these three steps to transform your study routine with AI-powered tools.
          </p>
        </header>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-12 left-1/2 transform -translate-x-1/2 w-full max-w-4xl">
            <div className="h-0.5 bg-indigo-200"></div>
          </div>

          <ol
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
            aria-label="Steps to use Study AI Hub"
          >
            {STEPS.map((step, index) => (
              <li key={step.num} className="relative text-center">
                {/* Number circle */}
                <div className="w-24 h-24 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 shadow-lg">
                  {step.num}
                </div>

                {/* Title */}
                <h3 className="font-dm-sans text-xl font-semibold text-slate-900 mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
