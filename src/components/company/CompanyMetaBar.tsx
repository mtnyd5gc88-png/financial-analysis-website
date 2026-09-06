import type { CompanyMeta } from "@/data/types";
import { formatUsd } from "@/lib/format";
import { DATA_AS_OF } from "@/data/methodology";

interface Props {
  meta: CompanyMeta;
}

// The reporting calendar the figures sit on. A TTM ratio means little without
// knowing which quarter it ends in, so this is shown before the metrics.
//
// The scheduled-report date is kept, but labelled as what it actually is: the
// date the source recorded as upcoming ON the snapshot date. Every such date in
// the workbook falls after the snapshot, so each was genuinely still upcoming
// when the data was captured. It is not a live earnings calendar and is never
// refreshed, so the label and the note below say so rather than implying it
// tracks the real date.
export default function CompanyMetaBar({ meta }: Props) {
  const items: { label: string; value: string }[] = [
    { label: "Fiscal year", value: meta.fiscalYear },
    { label: "Last reported", value: meta.lastEarnings },
    { label: "Next scheduled report", value: meta.nextEarnings },
  ];

  if (meta.price !== null) {
    items.push({
      label: `Reference price${meta.priceAsOf ? ` (${meta.priceAsOf})` : ""}`,
      value: formatUsd(meta.price),
    });
  }

  return (
    <section className="rounded-lg border border-gray-200 bg-white p-5">
      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.label}>
            <dt className="text-xs uppercase tracking-wide text-gray-400">
              {item.label}
            </dt>
            <dd className="text-sm font-medium text-gray-900 mt-0.5">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-4 space-y-1 border-t border-gray-100 pt-4">
        <p className="text-xs text-gray-500">
          All dates and figures on this page are as recorded on {DATA_AS_OF}.
          &ldquo;Next scheduled report&rdquo; is the date the source listed as
          upcoming at that point — it is a snapshot, not a live earnings
          calendar, and is not updated.
        </p>
        {meta.priceNote && (
          <p className="text-xs text-gray-400">{meta.priceNote}</p>
        )}
      </div>
    </section>
  );
}
