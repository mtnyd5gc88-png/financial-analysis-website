"use client";

import { useRouter } from "next/navigation";
import type { CategoryId, ConceptRelationship } from "@/data/types";
import { getConceptById, conceptHref } from "@/data/concepts";
import { diagramNodeLabel, relationshipsForCategory } from "@/data/relationships";
import {
  CONCEPT_MAP_LAYOUT,
  NODE_H,
  NODE_W,
} from "@/data/conceptMapLayout";

interface Props {
  categoryId: CategoryId;
}

// One section of the terminology document's concept map, drawn from the
// relationship data. Only "diagram" edges are rendered — formula-derived edges
// are listed as text on the concept pages, so the picture stays readable.
export default function CategoryDiagram({ categoryId }: Props) {
  const router = useRouter();
  const layout = CONCEPT_MAP_LAYOUT[categoryId];
  const edges = relationshipsForCategory(categoryId).filter(
    (e) => e.basis === "diagram"
  );

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${layout.width} ${layout.height}`}
        width="100%"
        style={{ minWidth: Math.min(layout.width, 560) }}
        role="img"
        aria-label={`Concept diagram for ${categoryId}`}
      >
        <defs>
          <marker
            id="arrow-flow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#4b5563" />
          </marker>
          <marker
            id="arrow-def"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#9ca3af" />
          </marker>
        </defs>

        {edges.map((edge, i) => (
          <Edge key={`${edge.from}-${edge.to}-${i}`} edge={edge} layout={layout} />
        ))}

        {Object.keys(layout.nodes).map((id) => (
          <Node
            key={id}
            id={id}
            layout={layout}
            onNavigate={(href) => router.push(href)}
          />
        ))}
      </svg>
    </div>
  );
}

function Edge({
  edge,
  layout,
}: {
  edge: ConceptRelationship;
  layout: (typeof CONCEPT_MAP_LAYOUT)[CategoryId];
}) {
  const a = layout.nodes[edge.from];
  const b = layout.nodes[edge.to];
  if (!a || !b) return null;

  const ac = { x: a.x + NODE_W / 2, y: a.y + NODE_H / 2 };
  const bc = { x: b.x + NODE_W / 2, y: b.y + NODE_H / 2 };

  const start = boundaryPoint(ac, bc);
  const end = boundaryPoint(bc, ac);

  const isFlow = edge.kind === "flow";
  const mid = { x: (start.x + end.x) / 2, y: (start.y + end.y) / 2 };

  // Keep the label off its own line: a mostly-vertical edge gets its label to
  // the side, a mostly-horizontal edge gets it above.
  const vertical = Math.abs(end.y - start.y) > Math.abs(end.x - start.x);
  const labelX = vertical ? mid.x + 8 : mid.x;
  const labelY = vertical ? mid.y + 3 : mid.y - 5;

  return (
    <g>
      <line
        x1={start.x}
        y1={start.y}
        x2={end.x}
        y2={end.y}
        stroke={isFlow ? "#4b5563" : "#9ca3af"}
        strokeWidth={isFlow ? 1.8 : 1.4}
        strokeDasharray={isFlow ? undefined : "4 4"}
        markerEnd={isFlow ? "url(#arrow-flow)" : "url(#arrow-def)"}
      />
      {edge.label && (
        <text
          x={labelX}
          y={labelY}
          textAnchor={vertical ? "start" : "middle"}
          fontSize="9.5"
          fill={isFlow ? "#4b5563" : "#6b7280"}
          stroke="#ffffff"
          strokeWidth="3"
          paintOrder="stroke"
        >
          {edge.label}
        </text>
      )}
    </g>
  );
}

// Where the centre-to-centre line crosses the source box's edge.
function boundaryPoint(
  from: { x: number; y: number },
  to: { x: number; y: number }
) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  if (dx === 0 && dy === 0) return from;

  const hw = NODE_W / 2 + 4;
  const hh = NODE_H / 2 + 4;
  const scale = Math.min(
    dx === 0 ? Infinity : hw / Math.abs(dx),
    dy === 0 ? Infinity : hh / Math.abs(dy)
  );
  return { x: from.x + dx * scale, y: from.y + dy * scale };
}

function Node({
  id,
  layout,
  onNavigate,
}: {
  id: string;
  layout: (typeof CONCEPT_MAP_LAYOUT)[CategoryId];
  onNavigate: (href: string) => void;
}) {
  const pos = layout.nodes[id];
  const concept = getConceptById(id);
  const label = concept?.name ?? diagramNodeLabel(id) ?? id;

  const isCore = concept?.tier === "core";
  const isBuildingBlock = concept?.tier === "building-block";
  const href = concept ? conceptHref(concept) : null;

  const fill = isCore ? "#ffffff" : isBuildingBlock ? "#f9fafb" : "#f3f4f6";
  const stroke = isCore ? "#3b82f6" : isBuildingBlock ? "#d1d5db" : "#e5e7eb";
  const textColor = isCore ? "#111827" : "#4b5563";

  const interactive = Boolean(href);

  return (
    <g
      role={interactive ? "link" : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={
        interactive
          ? `${label} — ${isCore ? "concept" : "building block"}`
          : `${label} — diagram input`
      }
      style={{ cursor: interactive ? "pointer" : "default", outline: "none" }}
      onClick={() => href && onNavigate(href)}
      onKeyDown={(e) => {
        if (href && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onNavigate(href);
        }
      }}
      className={interactive ? "group" : undefined}
    >
      <rect
        x={pos.x}
        y={pos.y}
        width={NODE_W}
        height={NODE_H}
        rx="7"
        fill={fill}
        stroke={stroke}
        strokeWidth={isCore ? 1.6 : 1.2}
        strokeDasharray={isBuildingBlock ? "4 3" : undefined}
        className={interactive ? "group-hover:stroke-blue-600" : undefined}
      />
      <text
        x={pos.x + NODE_W / 2}
        y={pos.y + NODE_H / 2 + 4}
        textAnchor="middle"
        fontSize="11"
        fontWeight={isCore ? 600 : 400}
        fill={textColor}
      >
        {label}
      </text>
    </g>
  );
}
