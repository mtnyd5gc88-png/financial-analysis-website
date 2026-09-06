import type { AuditFlag } from "@/data/types";

interface Props {
  audit: AuditFlag;
}

// How much confidence the source workbook's independent audit places in these
// figures, and what — if anything — distorts them. This is a data-quality
// rating, not a view on the company.
const CONFIDENCE_STYLES: Record<AuditFlag["confidence"], string> = {
  High: "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Med-High": "bg-sky-50 text-sky-700 border-sky-200",
  Med: "bg-amber-50 text-amber-700 border-amber-200",
  Low: "bg-red-50 text-red-700 border-red-200",
};

export default function AuditNote({ audit }: Props) {
  return (
    <section className="rounded-lg border border-gray-200 bg-white p-5">
      <div className="flex items-center gap-3 mb-3">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400">
          Data quality
        </h2>
        <span
          className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${
            CONFIDENCE_STYLES[audit.confidence]
          }`}
        >
          {audit.confidence}
          {audit.confidenceQualifier && ` — ${audit.confidenceQualifier}`}
        </span>
      </div>

      <p className="text-sm text-gray-600">{audit.note}</p>

      <p className="text-xs text-gray-400 mt-3">
        A rating of how reliable and comparable these figures are — not an
        assessment of the company.
      </p>
    </section>
  );
}
