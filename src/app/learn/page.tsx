import CategoryCard from "@/components/learn/CategoryCard";
import ConceptMap from "@/components/shared/ConceptMap";
import { CATEGORIES } from "@/lib/constants";
import { coreConceptCount } from "@/data/concepts";

export default function LearnPage() {
  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Learn</h1>
        <p className="text-gray-500 max-w-2xl">
          Financial analysis is organised into six categories. Start with any
          concept — each one builds towards a fuller picture of how to evaluate
          a company.
        </p>
      </header>

      <ConceptMap />

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-4">
          Categories
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat) => (
            <CategoryCard
              key={cat.id}
              label={cat.label}
              slug={cat.slug}
              shortDescription={cat.shortDescription}
              // Counts only the concepts the terminology document defines, so
              // supporting building blocks do not inflate the number.
              conceptCount={coreConceptCount(cat.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
