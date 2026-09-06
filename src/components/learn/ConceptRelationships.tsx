import Link from "next/link";
import { getConceptById, conceptHref } from "@/data/concepts";
import { diagramNodeLabel, relationshipsForConcept } from "@/data/relationships";
import type { ConceptRelationship } from "@/data/types";

interface Props {
  conceptId: string;
  // Hide the heading when the caller supplies its own.
  bare?: boolean;
}

// Renders the terminology document's relationships for one concept, keeping the
// document's own distinction: solid = an accounting or economic flow, dashed =
// a mathematical or definitional relationship.
export default function ConceptRelationships({ conceptId, bare }: Props) {
  const edges = relationshipsForConcept(conceptId);
  if (edges.length === 0) return null;

  return (
    <section>
      {!bare && (
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
          How it connects
        </h2>
      )}
      <ul className="space-y-2">
        {edges.map((edge, i) => (
          <li
            key={`${edge.from}-${edge.to}-${i}`}
            className="flex flex-wrap items-center gap-x-2 gap-y-1 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm"
          >
            <EdgeGlyph kind={edge.kind} />
            <Endpoint id={edge.from} current={conceptId} />
            <span className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-xs text-gray-600">
              {edge.label}
            </span>
            <span className="text-gray-400">→</span>
            <Endpoint id={edge.to} current={conceptId} />
            {edge.basis === "formula" && (
              <span className="text-xs text-gray-400">(from the formula)</span>
            )}
          </li>
        ))}
      </ul>

      <p className="mt-3 text-xs text-gray-400">
        Solid means an accounting or economic flow — one thing becomes, drives,
        or causes another. Dashed means a mathematical or definitional
        relationship — one is calculated from another.
      </p>
    </section>
  );
}

function EdgeGlyph({ kind }: { kind: ConceptRelationship["kind"] }) {
  return (
    <span
      aria-label={kind === "flow" ? "flow" : "definitional"}
      title={kind === "flow" ? "Flow (solid)" : "Definitional (dashed)"}
      className="shrink-0"
    >
      <svg width="22" height="8" viewBox="0 0 22 8" aria-hidden="true">
        <line
          x1="0"
          y1="4"
          x2="22"
          y2="4"
          stroke={kind === "flow" ? "#4b5563" : "#9ca3af"}
          strokeWidth="1.5"
          strokeDasharray={kind === "flow" ? undefined : "3 3"}
        />
      </svg>
    </span>
  );
}

// A concept endpoint links to its canonical page; a diagram-only node (Total
// Assets, EBITDA, …) renders as plain text — it is not a concept.
function Endpoint({ id, current }: { id: string; current: string }) {
  const concept = getConceptById(id);

  if (!concept) {
    return (
      <span className="text-gray-500">{diagramNodeLabel(id) ?? id}</span>
    );
  }

  if (concept.id === current) {
    return <span className="font-semibold text-gray-900">{concept.name}</span>;
  }

  return (
    <Link
      href={conceptHref(concept)}
      className="font-medium text-blue-600 hover:underline"
    >
      {concept.name}
    </Link>
  );
}
