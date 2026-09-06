"use client";

import { useState } from "react";
import Link from "next/link";
import type { Metric } from "@/data/types";
import { getConceptById, conceptHref } from "@/data/concepts";
import {
  formatMetricValue,
  metricStatusHeading,
  metricStatusLabel,
} from "@/lib/format";
import MetricConceptDialog from "./MetricConceptDialog";

interface Props {
  metric: Metric;
  companyName: string;
}

export default function MetricCard({ metric, companyName }: Props) {
  const [open, setOpen] = useState(false);

  // Values are stored exactly as the source records them — percentages as
  // decimals — so the formatter is the only thing that turns 0.7415 into 74.15%.
  const displayValue = formatMetricValue(metric);
  const statusLabel = metricStatusLabel(metric.status);
  const statusHeading = metricStatusHeading(metric.status);

  // Concept content is never copied onto a metric — it is looked up centrally.
  const concept = getConceptById(metric.conceptId);
  const isCore = concept?.tier === "core";

  return (
    <div
      id={`metric-${metric.id}`}
      className="flex scroll-mt-24 flex-col rounded-lg border border-gray-200 bg-white p-5"
    >
      <div className="mb-3 flex items-start justify-between gap-4">
        <h4 className="font-semibold text-gray-900">{metric.name}</h4>
        <div className="shrink-0 text-right">
          {displayValue !== null ? (
            <>
              <span className="text-lg font-bold text-gray-900">
                {displayValue}
              </span>
              {metric.basis && (
                <span className="block text-xs text-gray-400">
                  {metric.basis}
                </span>
              )}
            </>
          ) : (
            <span className="inline-block rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-500">
              {statusLabel}
            </span>
          )}
        </div>
      </div>

      {/* Short interpretation — what the metric means, never a verdict on it. */}
      <p className="mb-3 text-sm text-gray-600">{metric.explanation}</p>

      {metric.formula && (
        <div className="mb-3 rounded border border-gray-100 bg-gray-50 px-3 py-2 font-mono text-xs text-gray-600">
          {metric.formula}
        </div>
      )}

      {/* Why there is no number — never leave a blank metric unexplained. */}
      {metric.statusNote && (
        <div className="mb-3 rounded border border-gray-200 bg-gray-50 px-3 py-2">
          {statusHeading && (
            <p className="mb-0.5 text-xs font-semibold text-gray-600">
              {statusHeading}
            </p>
          )}
          <p className="text-xs text-gray-500">{metric.statusNote}</p>
        </div>
      )}

      {metric.context && (
        <p className="mb-2 text-xs text-gray-500">{metric.context}</p>
      )}

      {metric.limitation && (
        <div className="flex gap-2 rounded border border-amber-100 bg-amber-50 px-3 py-2">
          <span className="mt-0.5 text-xs text-amber-500">⚠</span>
          <p className="text-xs text-amber-700">{metric.limitation}</p>
        </div>
      )}

      {/* The audit flags some figures as distorted and not safely comparable. */}
      {metric.status === "reported" && !metric.comparable && (
        <div className="mt-2 flex gap-2 rounded border border-red-100 bg-red-50 px-3 py-2">
          <span className="mt-0.5 text-xs text-red-500">⚠</span>
          <p className="text-xs text-red-700">
            The audit flags this figure as distorted — not safely comparable
            against other companies.
          </p>
        </div>
      )}

      {metric.status === "reported" && (
        <p className="mt-3 border-t border-gray-100 pt-3 text-[11px] leading-relaxed text-gray-400">
          {metric.accountingBasis && <>{metric.accountingBasis} · </>}
          {metric.source}
          {metric.asOf && <> · {metric.asOf}</>}
        </p>
      )}

      {/* Learn → Apply. Only core concepts have teaching content to open. */}
      {concept && isCore && (
        <div className="mt-3 flex items-center gap-3 border-t border-gray-100 pt-3">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Learn more
          </button>
          <Link
            href={conceptHref(concept)}
            className="text-xs text-gray-400 hover:text-gray-600 hover:underline"
          >
            Concept page →
          </Link>
        </div>
      )}

      {open && concept && (
        <MetricConceptDialog
          concept={concept}
          metric={metric}
          companyName={companyName}
          appliedValue={displayValue ?? statusLabel ?? "—"}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}
