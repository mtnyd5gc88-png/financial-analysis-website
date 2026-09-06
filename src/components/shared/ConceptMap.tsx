"use client";

// ConceptMap renders the terminology document's concept map: the six analytical
// categories, and inside each one the actual concept-to-concept relationships.
//
// The document's legend is preserved exactly — solid means an accounting or
// economic flow, dashed means a mathematical or definitional relationship. One
// category is shown at a time so a beginner meets a readable diagram rather
// than the whole graph at once.
//
// The connections communicate that concepts are related, not that one directly
// causes another (e.g. high earnings ≠ higher stock price).

import { useState } from "react";
import Link from "next/link";
import type { CategoryId } from "@/data/types";
import { CATEGORIES, CONCEPT_MAP_OVERVIEW } from "@/lib/constants";
import { CATEGORY_RELATIONSHIPS } from "@/data/relationships";
import { coreConceptCount } from "@/data/concepts";
import CategoryDiagram from "./CategoryDiagram";

export default function ConceptMap() {
  const [active, setActive] = useState<CategoryId>("profitability");
  const activeCategory = CATEGORIES.find((c) => c.id === active);

  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 sm:p-8">
      <p className="mb-6 text-center text-xs uppercase tracking-widest text-gray-400">
        Six Areas of Financial Analysis
      </p>

      {/* Category selector — also the six-category overview */}
      <div
        role="tablist"
        aria-label="Concept map categories"
        className="grid grid-cols-2 gap-3 md:grid-cols-3"
      >
        {CATEGORIES.map((category) => {
          const selected = category.id === active;
          return (
            <button
              key={category.id}
              role="tab"
              aria-selected={selected}
              type="button"
              onClick={() => setActive(category.id)}
              className={`rounded-lg border px-4 py-3 text-center transition-all ${
                selected
                  ? "border-blue-500 bg-white shadow-sm"
                  : "border-gray-200 bg-white hover:border-blue-300"
              }`}
            >
              <span
                className={`block text-sm font-medium ${
                  selected ? "text-blue-700" : "text-gray-800"
                }`}
              >
                {category.label}
              </span>
              <span className="mt-0.5 block text-xs text-gray-400">
                {coreConceptCount(category.id)}{" "}
                {coreConceptCount(category.id) === 1 ? "concept" : "concepts"}
              </span>
            </button>
          );
        })}
      </div>

      {/* The selected section's diagram */}
      {activeCategory && (
        <div className="mt-6 rounded-lg border border-gray-200 bg-white p-4 sm:p-6">
          <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-base font-bold text-gray-900">
              {activeCategory.label}
              {activeCategory.subtitle && (
                <span className="ml-2 text-sm font-normal text-gray-400">
                  {activeCategory.subtitle}
                </span>
              )}
            </h3>
            <Link
              href={`/learn/${activeCategory.slug}`}
              className="text-xs font-medium text-blue-600 hover:underline"
            >
              Open {activeCategory.label} →
            </Link>
          </div>
          <p className="mb-4 max-w-2xl text-sm text-gray-500">
            {activeCategory.question}
          </p>

          <CategoryDiagram categoryId={activeCategory.id} />

          <p className="mt-4 max-w-2xl text-xs text-gray-500">
            {activeCategory.connectingIdea}
          </p>

          <Legend />
        </div>
      )}

      {/* How the six categories relate to one another */}
      <div className="mt-6">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
          How the categories connect
        </h3>
        <ul className="grid gap-2 sm:grid-cols-2">
          {CATEGORY_RELATIONSHIPS.map((rel) => (
            <li
              key={`${rel.from}-${rel.to}`}
              className="flex flex-wrap items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-xs"
            >
              <span className="font-medium text-gray-700">
                {CATEGORIES.find((c) => c.id === rel.from)?.label}
              </span>
              <span className="rounded bg-gray-100 px-1.5 py-0.5 text-gray-600">
                {rel.label}
              </span>
              <span className="text-gray-400">→</span>
              <span className="font-medium text-gray-700">
                {CATEGORIES.find((c) => c.id === rel.to)?.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-gray-500">
        {CONCEPT_MAP_OVERVIEW}
      </p>

      <p className="mt-4 text-center text-xs text-gray-400">
        These categories are related but measure different aspects of a company.
        A strong result in one area does not guarantee a positive result in
        another.
      </p>
    </div>
  );
}

function Legend() {
  return (
    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 border-t border-gray-100 pt-3 text-xs text-gray-500">
      <span className="flex items-center gap-2">
        <svg width="26" height="8" aria-hidden="true">
          <line x1="0" y1="4" x2="26" y2="4" stroke="#4b5563" strokeWidth="1.8" />
        </svg>
        Solid — an accounting or economic flow
      </span>
      <span className="flex items-center gap-2">
        <svg width="26" height="8" aria-hidden="true">
          <line
            x1="0"
            y1="4"
            x2="26"
            y2="4"
            stroke="#9ca3af"
            strokeWidth="1.4"
            strokeDasharray="4 4"
          />
        </svg>
        Dashed — a mathematical or definitional relationship
      </span>
      <span className="flex items-center gap-2">
        <span className="inline-block h-3 w-5 rounded border-[1.5px] border-blue-500 bg-white" />
        Core concept
      </span>
      <span className="flex items-center gap-2">
        <span className="inline-block h-3 w-5 rounded border border-dashed border-gray-300 bg-gray-50" />
        Building block
      </span>
      <span className="flex items-center gap-2">
        <span className="inline-block h-3 w-5 rounded border border-gray-200 bg-gray-100" />
        Diagram input
      </span>
    </div>
  );
}
