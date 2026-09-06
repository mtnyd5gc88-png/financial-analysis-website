"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import type { Concept, Metric } from "@/data/types";
import { conceptHref } from "@/data/concepts";
import ConceptRelationships from "@/components/learn/ConceptRelationships";
import { FormulaWithTerms } from "@/components/shared/TermTooltip";

interface Props {
  concept: Concept;
  metric: Metric;
  companyName: string;
  // What the metric currently shows — a formatted value, or a status label.
  appliedValue: string;
  onClose: () => void;
}

// The "Learn more" detail view. All concept content is read from the central
// concept data — nothing is duplicated per metric — so Learn and Apply stay in
// sync and the learner can move between them without losing their place.
export default function MetricConceptDialog({
  concept,
  metric,
  companyName,
  appliedValue,
  onClose,
}: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-gray-900/40 p-0 sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${concept.name} — learn more`}
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-xl bg-white shadow-xl sm:rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Where the learner came from, so the applied context is never lost */}
        <div className="sticky top-0 border-b border-gray-200 bg-white px-6 py-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400">
                {companyName} · {metric.name}
              </p>
              <p className="mt-0.5 text-lg font-bold text-gray-900">
                {appliedValue}
                {metric.basis && (
                  <span className="ml-2 text-xs font-normal text-gray-400">
                    {metric.basis}
                  </span>
                )}
              </p>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-md border border-gray-200 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
            >
              ← Back to {metric.name}
            </button>
          </div>
        </div>

        <div className="space-y-6 px-6 py-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {concept.name}
            {concept.fullName && (
              <span className="ml-2 text-sm font-normal text-gray-400">
                {concept.fullName}
              </span>
            )}
          </h2>

          {concept.definition && (
            <Section title="What is it?">
              <p className="text-gray-700">{concept.definition}</p>
            </Section>
          )}

          {concept.formula && (
            <Section title="Formula">
              <div className="rounded-md border border-gray-200 bg-gray-50 px-4 py-3 font-mono text-sm text-gray-800">
                <FormulaWithTerms formula={concept.formula} />
              </div>
            </Section>
          )}

          {concept.workedExample && (
            <Section title="Worked example">
              <p className="text-gray-700">{concept.workedExample}</p>
            </Section>
          )}

          {concept.whyItMatters && (
            <Section title="Why does it matter?">
              <p className="text-gray-700">{concept.whyItMatters}</p>
            </Section>
          )}

          {concept.furtherNote && (
            <Section title="Going further">
              <p className="text-gray-700">{concept.furtherNote}</p>
            </Section>
          )}

          <Section title="How it connects">
            <ConceptRelationships conceptId={concept.id} bare />
          </Section>

          <div className="flex flex-wrap gap-3 border-t border-gray-200 pt-5">
            <Link
              href={conceptHref(concept)}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Open the full concept page →
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
            >
              ← Back to {companyName}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
        {title}
      </h3>
      {children}
    </section>
  );
}
