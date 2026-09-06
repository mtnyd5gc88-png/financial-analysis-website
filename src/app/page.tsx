import Link from "next/link";
import ConceptMap from "@/components/shared/ConceptMap";

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="py-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Understand financial analysis.
          <br />
          Not just the numbers.
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
          FinLearn guides you through real financial concepts, applies them to
          real companies, and asks you to form your own judgement.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/learn"
            className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            Start Learning
          </Link>
          <Link
            href="/companies"
            className="rounded-lg border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            View Companies
          </Link>
        </div>
      </section>

      {/* User journey */}
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-6 text-center">
          How it works
        </h2>
        <div className="grid grid-cols-3 gap-6">
          {[
            {
              step: "1. Learn",
              title: "Understand the concept",
              description:
                "Each financial term is explained clearly, with a formula, a worked example, and a quick question to check your understanding.",
            },
            {
              step: "2. Apply",
              title: "See it on a real company",
              description:
                "Navigate to a company and see the concept applied to real financial data, organised across six analytical areas.",
            },
            {
              step: "3. Judge",
              title: "Form your own view",
              description:
                "Use guided questions to interpret what the data means. There are no automatic buy or sell recommendations.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="rounded-lg border border-gray-200 bg-white p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-2">
                {item.step}
              </p>
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Concept map */}
      <section>
        <ConceptMap />
      </section>
    </div>
  );
}
