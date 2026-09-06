import Link from "next/link";
import { notFound } from "next/navigation";
import { CONCEPT_CATEGORIES } from "@/data/concepts";
import { conceptSlug } from "@/lib/constants";
import ConceptCard from "@/components/learn/ConceptCard";
import { companiesWithConcept } from "@/data";
import { formatMetricValue, metricStatusLabel } from "@/lib/format";

export default async function ConceptPage(
  props: PageProps<"/learn/[category]/[concept]">
) {
  const { category, concept: conceptParam } = await props.params;

  const categoryData = CONCEPT_CATEGORIES.find((c) => c.id === category);
  if (!categoryData) notFound();

  const concept = categoryData.concepts.find(
    (c) => conceptSlug(c.name) === conceptParam
  );
  if (!concept) notFound();

  // Same concept, shown as a real metric — the Apply half of Learn → Apply.
  const applied = companiesWithConcept(concept.id);

  return (
    <div className="max-w-2xl space-y-8">
      <header>
        <p className="text-sm text-gray-400 mb-1">
          <Link href="/learn" className="hover:underline">
            Learn
          </Link>{" "}
          /{" "}
          <Link href={`/learn/${category}`} className="hover:underline">
            {categoryData.label}
          </Link>{" "}
          /
        </p>
      </header>

      <ConceptCard concept={concept} currentCategoryId={categoryData.id} />

      {/* Apply — the same concept on a real company, linked to the exact metric */}
      {applied.length > 0 && (
        <section className="rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
            See it on a real company
          </h2>
          <ul className="space-y-2">
            {applied.map(({ company, metric }) => (
              <li key={company.ticker}>
                <Link
                  href={`/companies/${company.ticker}#metric-${metric.id}`}
                  className="flex items-center justify-between rounded-md border border-gray-200 bg-white px-4 py-3 hover:border-blue-300"
                >
                  <span className="text-sm font-medium text-gray-900">
                    {company.name}
                    <span className="ml-2 font-mono text-xs text-gray-400">
                      {company.ticker}
                    </span>
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    {formatMetricValue(metric) ??
                      metricStatusLabel(metric.status)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Navigation between concepts */}
      <nav className="flex justify-between pt-4 border-t border-gray-200">
        <Link
          href={`/learn/${category}`}
          className="text-sm text-gray-500 hover:text-gray-900"
        >
          ← Back to {categoryData.label}
        </Link>
        <Link href="/companies" className="text-sm text-blue-600 hover:underline">
          All companies →
        </Link>
      </nav>
    </div>
  );
}

export async function generateStaticParams() {
  return CONCEPT_CATEGORIES.flatMap((cat) =>
    cat.concepts.map((concept) => ({
      category: cat.id,
      concept: conceptSlug(concept.name),
    }))
  );
}
