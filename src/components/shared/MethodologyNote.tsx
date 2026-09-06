import { DATA_AS_OF, METHODOLOGY } from "@/data/methodology";

// The source workbook's "Sources & Method" sheet, shown alongside the figures
// so the caveats travel with the numbers rather than being lost.
export default function MethodologyNote() {
  return (
    <section className="rounded-xl border border-gray-200 bg-gray-50 p-6">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-1">
        Sources &amp; method
      </h2>
      <p className="text-sm text-gray-500 mb-2">
        {METHODOLOGY.datasetTitle}
      </p>
      <p className="mb-5 text-sm font-medium text-gray-700">
        Data as of {DATA_AS_OF} — a fixed snapshot, not live market data.
      </p>

      <dl className="space-y-3">
        {METHODOLOGY.entries.map((entry) => (
          <div key={entry.label} className="sm:flex sm:gap-4">
            <dt className="text-xs font-semibold text-gray-600 sm:w-44 sm:shrink-0">
              {entry.label}
            </dt>
            <dd className="text-xs text-gray-500 leading-relaxed">
              {entry.body}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 pt-5 border-t border-gray-200">
        <h3 className="text-xs font-semibold text-gray-600 mb-2">
          Not collected this round
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          {METHODOLOGY.excludedMetrics.map((m) => m.name).join(", ")} — each
          requires a raw price series or a separate calculation, so they are
          deliberately absent rather than missing.
        </p>
      </div>

      <div className="mt-5 pt-5 border-t border-gray-200">
        <h3 className="text-xs font-semibold text-gray-600 mb-2">
          Reading the cohort
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          {METHODOLOGY.crossSectionalCaveat}
        </p>
      </div>
    </section>
  );
}
