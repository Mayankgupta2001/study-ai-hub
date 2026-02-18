import Link from "next/link";

export const metadata = {
  title: "Study AI Hub – Best AI Tools for Indian Competitive Exams",
  description:
    "Discover the best AI tools for UPSC, JEE, NEET, and SSC preparation. Curated resources for Indian students preparing for competitive exams.",
};

export default function Home() {
  return (
    <main className="min-h-screen">

      {/* HERO SECTION */}
      <section className="py-20 px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Smart AI Tools for Indian Competitive Exams
        </h1>
        <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
          Curated AI tools to help you prepare smarter for UPSC, JEE, NEET,
          SSC and other major exams in India.
        </p>

        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <Link
            href="/ai-tools/upsc"
            className="bg-black text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
          >
            Explore UPSC Tools
          </Link>

          <Link
            href="/ai-tools/jee"
            className="border border-black dark:border-white px-6 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Explore JEE Tools
          </Link>
        </div>
      </section>

      {/* CATEGORY GRID */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center">
          Browse by Exam
        </h2>

        <div className="grid md:grid-cols-4 gap-6 mt-10">

          {[
            { name: "UPSC", link: "/ai-tools/upsc" },
            { name: "JEE", link: "/ai-tools/jee" },
            { name: "NEET", link: "/ai-tools/neet" },
            { name: "SSC", link: "/ai-tools/ssc" },
          ].map((exam) => (
            <Link
              key={exam.name}
              href={exam.link}
              className="p-6 border rounded-xl hover:shadow-md transition"
            >
              <h3 className="text-xl font-medium">{exam.name}</h3>
              <p className="mt-2 text-sm text-gray-500">
                Best AI tools curated for {exam.name} preparation.
              </p>
            </Link>
          ))}

        </div>
      </section>

      {/* WHY SECTION */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold">
            Why Use AI for Exam Preparation?
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-10 text-left">
            <div>
              <h3 className="font-semibold text-lg">Personalized Learning</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
                AI tools adapt to your weak areas and create focused study plans.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">Faster Revision</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
                Generate summaries, flashcards, and mock questions instantly.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">Smart Practice</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
                Practice answer writing, MCQs, and interview simulations using AI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 px-6 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-semibold">
          Start Preparing Smarter Today
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Explore curated AI tools and level up your preparation.
        </p>

        <Link
          href="/ai-tools/upsc"
          className="inline-block mt-8 bg-black text-white px-8 py-3 rounded-lg hover:opacity-90 transition"
        >
          Get Started
        </Link>
      </section>

    </main>
  );
}
