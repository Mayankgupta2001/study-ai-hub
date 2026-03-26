import Link from "next/link";
import { EXAMS } from "@/lib/data";

export default function CTASection() {
  return (
    <section
      className="bg-gradient-to-r from-indigo-600 to-indigo-500 py-16 sm:py-20"
      aria-labelledby="cta-heading"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2
          id="cta-heading"
          className="font-dm-sans text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-6"
        >
          Your exam is specific.
          <br />
          Your tools should be too.
        </h2>

        {/* Button */}
        <Link
          href="/signup"
          className="inline-flex items-center justify-center gap-2 bg-white text-indigo-600 text-base font-semibold px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors duration-150 shadow-lg hover:shadow-xl"
        >
          Start Preparing — it&apos;s free
        </Link>
      </div>
    </section>
  );
}
