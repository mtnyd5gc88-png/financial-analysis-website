import Link from "next/link";
import { notFound } from "next/navigation";
import type { Concept } from "@/data/types";
import { CONCEPT_CATEGORIES } from "@/data/concepts";
import { conceptSlug } from "@/lib/constants";

export default async function CategoryPage(
  props: PageProps<"/learn/[category]">
) {
  const { category } = await props.params;

  const categoryData = CONCEPT_CATEGORIES.find((c) => c.id === category);
  if (!categoryData) notFound();

  // Building blocks are listed separately so they read as supporting inputs
  // rather than as concepts of the same standing.
  const core = categoryData.concepts.filter((c) => c.tier === "core");
  const buildingBlocks = categoryData.concepts.filter(
    (c) => c.tier === "building-block"
  );

  return (
    <div className="space-y-8">
      <header>
        <p className="text-sm text-gray-400 mb-1">
          <Link href="/learn" className="hover:underline">
            Learn
          </Link>{" "}
          /
        </p>
        <h1 className="text-3xl font-bold text-gray-900 mb-1">
          {categoryData.label}
        </h1>
        {categoryData.subtitle && (
          <p className="text-gray-400 mb-3">{categoryData.subtitle}</p>
        )}
        <p className="text-gray-700 max-w-2xl font-medium">
          {categoryData.question}
        </p>
        <p className="text-gray-500 max-w-2xl mt-3">
          {categoryData.connectingIdea}
        </p>
      </header>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-4">
          Concepts
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {core.map((concept) => (
            <ConceptLink
              key={concept.id}
              concept={concept}
              category={category}
            />
          ))}
        </div>
      </section>

      {buildingBlocks.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-1">
            Supporting building blocks
          </h2>
          <p className="text-sm text-gray-500 mb-4 max-w-2xl">
            Inputs the concepts above are built from. They appear inside the
            diagrams rather than being defined as concepts of their own.
          </p>
          <div className="grid gap-2 sm:grid-cols-3">
            {buildingBlocks.map((concept) => (
              <Link
                key={concept.id}
                href={`/learn/${category}/${conceptSlug(concept.name)}`}
                className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 hover:border-blue-300 transition-all"
              >
                <p className="text-sm font-medium text-gray-700">
                  {concept.name}
                </p>
                {concept.formula && (
                  <p className="text-xs font-mono text-gray-400 mt-1">
                    {concept.formula}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function ConceptLink({
  concept,
  category,
}: {
  concept: Concept;
  category: string;
}) {
  return (
    <Link
      href={`/learn/${category}/${conceptSlug(concept.name)}`}
      className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-5 py-4 hover:border-blue-300 hover:shadow-sm transition-all"
    >
      <div>
        <p className="font-medium text-gray-900">{concept.name}</p>
        {concept.formula && (
          <p className="text-xs font-mono text-gray-400 mt-1">
            {concept.formula}
          </p>
        )}
      </div>
      <span className="text-gray-300 text-lg">›</span>
    </Link>
  );
}

export async function generateStaticParams() {
  return CONCEPT_CATEGORIES.map((c) => ({ category: c.id }));
}
