import type { CompanyMeta } from "@/data/types";
import { formatUsd } from "@/lib/format";

interface Props {
  meta: CompanyMeta;
}

// The reporting calendar the figures sit on. A TTM ratio means little without
// knowing which quarter it ends in, so this is shown before the metrics.
export default function CompanyMetaBar({ meta }: Props) {
  const items: { label: string; value: string }[] = [
    { label: "Fiscal year", value: meta.fiscalYear },
    { label: "Last reported", value: meta.lastEarnings },
    { label: "Next earnings", value: meta.nextEarnings },
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

      {meta.priceNote && (
        <p className="text-xs text-gray-400 mt-4 pt-4 border-t border-gray-100">
          {meta.priceNote}
        </p>
      )}
    </section>
  );
}
