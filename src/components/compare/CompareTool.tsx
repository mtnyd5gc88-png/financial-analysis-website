"use client";

import { useState } from "react";
import Link from "next/link";
import { getAllCompanies, getCompanyMetric } from "@/data";
import { formatMetricValue, metricStatusLabel } from "@/lib/format";
import { METRIC_NAME_TERMS } from "@/data/terminology";
import TermTooltip, { BasisWithTerms } from "@/components/shared/TermTooltip";

// A deliberately small set of understandable indicators, all of which already
// exist on every company record. Nothing is calculated here — every cell is a
// value the company data already holds, formatted by the shared formatter.
const COMPARE_METRIC_IDS = [
  "revenue-growth",
  "gross-margin",
  "operating-margin",
  "net-profit-margin",
  "eps-growth",
  "roe",
  "current-ratio",
  "debt-to-equity",
  "free-cash-flow",
] as const;

const MIN_SELECTED = 2;
const MAX_SELECTED = 3;

export default function CompareTool() {
  const companies = getAllCompanies();
  // Default to a working comparison so the page is useful on arrival.
  const [selected, setSelected] = useState<string[]>(
    companies.slice(0, 2).map((c) => c.ticker)
  );

  function toggle(ticker: string) {
    setSelected((current) => {
      if (current.includes(ticker)) {
        // Never drop below two — the table would stop being a comparison.
        return current.length > MIN_SELECTED
          ? current.filter((t) => t !== ticker)
          : current;
      }
      if (current.length >= MAX_SELECTED) return current;
      return [...current, ticker];
    });
  }

  const chosen = companies.filter((c) => selected.includes(c.ticker));
  const anyFlagged = chosen.some((c) =>
    COMPARE_METRIC_IDS.some((id) => getCompanyMetric(c, id)?.comparable === false)
  );

  return (
    <div className="space-y-6">
      {/* Selection */}
      <section className="rounded-lg border border-gray-200 bg-white p-5">
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400">
            Choose companies
          </h2>
          <p className="text-xs text-gray-400">
            Select {MIN_SELECTED} or {MAX_SELECTED} · {selected.length} selected
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {companies.map((company) => {
            const isOn = selected.includes(company.ticker);
            const atMax = !isOn && selected.length >= MAX_SELECTED;
            const atMin = isOn && selected.length <= MIN_SELECTED;
            return (
              <button
                key={company.ticker}
                type="button"
                aria-pressed={isOn}
                disabled={atMax}
                onClick={() => toggle(company.ticker)}
                title={
                  atMax
                    ? `Deselect one first — at most ${MAX_SELECTED} companies`
                    : atMin
                      ? `At least ${MIN_SELECTED} companies are needed`
                      : company.name
                }
                className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
                  isOn
                    ? "border-blue-500 bg-blue-50 font-medium text-blue-700"
                    : atMax
                      ? "cursor-not-allowed border-gray-200 bg-gray-50 text-gray-300"
                      : "border-gray-200 bg-white text-gray-700 hover:border-blue-300"
                }`}
              >
                <span className="font-mono text-xs">{company.ticker}</span>
                <span className="ml-2 text-xs text-gray-500">
                  {company.name}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Comparison table */}
      <section className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <caption className="sr-only">
            Selected financial indicators for the chosen companies
          </caption>
          <thead>
            <tr className="border-b border-gray-200">
              <th
                scope="col"
                className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400"
              >
                Metric
              </th>
              {chosen.map((company) => (
                <th
                  key={company.ticker}
                  scope="col"
                  className="px-5 py-3 text-right"
                >
                  <Link
                    href={`/companies/${company.ticker}`}
                    className="font-semibold text-gray-900 hover:text-blue-600 hover:underline"
                  >
                    {company.ticker}
                  </Link>
                  <span className="block text-xs font-normal text-gray-400">
                    {company.name}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARE_METRIC_IDS.map((metricId) => {
              // Any selected company supplies the shared labelling.
              const sample = chosen
                .map((c) => getCompanyMetric(c, metricId))
                .find(Boolean);
              if (!sample) return null;

              return (
                <tr
                  key={metricId}
                  className="border-b border-gray-100 last:border-b-0"
                >
                  <th
                    scope="row"
                    className="px-5 py-3 text-left align-top font-medium text-gray-800"
                  >
                    {METRIC_NAME_TERMS[metricId] ? (
                      <TermTooltip termKey={METRIC_NAME_TERMS[metricId]}>
                        {sample.name}
                      </TermTooltip>
                    ) : (
                      sample.name
                    )}
                    {sample.basis && (
                      <span className="mt-0.5 block text-xs font-normal text-gray-400">
                        <BasisWithTerms basis={sample.basis} />
                      </span>
                    )}
                  </th>

                  {chosen.map((company) => {
                    const metric = getCompanyMetric(company, metricId);
                    const display = metric
                      ? formatMetricValue(metric)
                      : null;
                    const status = metric
                      ? metricStatusLabel(metric.status)
                      : "N/A";

                    return (
                      <td
                        key={company.ticker}
                        className="px-5 py-3 text-right align-top"
                      >
                        {display !== null ? (
                          <>
                            <span className="font-semibold text-gray-900">
                              {display}
                            </span>
                            {metric?.comparable === false && (
                              <span
                                className="ml-1 text-amber-500"
                                title="The audit flags this figure as distorted — not safely comparable against other companies."
                                aria-label="flagged as not safely comparable"
                              >
                                ⚠
                              </span>
                            )}
                          </>
                        ) : (
                          // Missing data keeps its own meaning — never a zero.
                          <span
                            className="text-xs text-gray-400"
                            title={metric?.statusNote ?? undefined}
                          >
                            {status}
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      {anyFlagged && (
        <p className="rounded-md border border-amber-100 bg-amber-50 px-4 py-3 text-xs text-amber-800">
          <span className="mr-1">⚠</span>
          A marked figure is one the source workbook&rsquo;s audit flags as
          distorted for that company — by a one-off item, an acquisition, a
          reporting basis or a cyclical peak. Those numbers are still shown
          exactly as recorded, but they are not safely comparable across
          companies.
        </p>
      )}

      <p className="text-xs text-gray-500">
        A blank cell shows why it is blank rather than a number:{" "}
        <span className="font-medium">n/m</span> not meaningful,{" "}
        <span className="font-medium">n/a</span> not available,{" "}
        <span className="font-medium">Pending</span> not yet reported. Missing
        data is never shown as zero.
      </p>
    </div>
  );
}
