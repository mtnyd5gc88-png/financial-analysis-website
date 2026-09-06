import type { CategoryId, Concept } from "@/data/types";
import { CATEGORIES } from "@/lib/constants";
import ConceptRelationships from "@/components/learn/ConceptRelationships";

interface Props {
  concept: Concept;
  // The category being viewed, so cross-references can exclude it.
  currentCategoryId: CategoryId;
}

// Reusable template for any financial concept.
// Each slot is only rendered if the data field is populated —
// this allows partial scaffolding while content is built out.
export default function ConceptCard({ concept, currentCategoryId }: Props) {
  const isBuildingBlock = concept.tier === "building-block";

  // Every category this concept appears in — the one the document defines it
  // under, plus any it is shared into — minus the one being viewed.
  const otherCategories = [
    concept.categoryId,
    ...(concept.sharedWithCategories ?? []),
  ]
    .filter((id) => id !== currentCategoryId)
    .map((id) => CATEGORIES.find((c) => c.id === id)?.label)
    .filter((label): label is string => Boolean(label));
  const sharedWith = Array.from(new Set(otherCategories));

  // When viewed outside its defining category, say where it is defined.
  const definedElsewhere =
    concept.categoryId !== currentCategoryId
      ? CATEGORIES.find((c) => c.id === concept.categoryId)?.label
      : null;

  return (
    <article className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">{concept.name}</h1>
        {concept.fullName && (
          <p className="text-sm text-gray-500 mt-1">{concept.fullName}</p>
        )}
      </header>

      {/* Building blocks are inputs the diagrams pass through, not concepts the
          terminology document defines in their own right. */}
      {isBuildingBlock && (
        <p className="rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
          A supporting building block — this feeds the concepts in this
          category rather than being defined as one itself.
        </p>
      )}

      {concept.definition && (
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
            What is it?
          </h2>
          <p className="text-gray-700">{concept.definition}</p>
        </section>
      )}

      {concept.formula && (
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
            Formula
          </h2>
          <div className="rounded-md bg-gray-50 border border-gray-200 px-4 py-3 font-mono text-sm text-gray-800">
            {concept.formula}
          </div>
        </section>
      )}

      {concept.workedExample && (
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
            Worked Example
          </h2>
          <p className="text-gray-700">{concept.workedExample}</p>
        </section>
      )}

      {concept.whyItMatters && (
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
            Why does it matter?
          </h2>
          <p className="text-gray-700">{concept.whyItMatters}</p>
        </section>
      )}

      {concept.furtherNote && (
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
            Going further
          </h2>
          <p className="text-gray-700">{concept.furtherNote}</p>
        </section>
      )}

      <ConceptRelationships conceptId={concept.id} />

      {sharedWith.length > 0 && (
        <p className="text-sm text-gray-500">
          {definedElsewhere
            ? `Defined under ${definedElsewhere}; shown here because the two are linked.`
            : `Also appears in ${sharedWith.join(", ")}.`}
        </p>
      )}

      {concept.quickQuestion && (
        <section className="rounded-lg border border-blue-100 bg-blue-50 p-5">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-3">
            Quick Question
          </h2>
          <QuickQuestion question={concept.quickQuestion} />
        </section>
      )}
    </article>
  );
}

function QuickQuestion({
  question,
}: {
  question: NonNullable<Concept["quickQuestion"]>;
}) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-800 mb-3">{question.prompt}</p>
      <ul className="space-y-2">
        {question.options.map((option, i) => (
          <li key={i}>
            <button
              type="button"
              className="w-full text-left text-sm rounded border border-gray-200 bg-white px-4 py-2 hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
