import type { MetricGroup } from "@/data/types";
import { CATEGORIES } from "@/lib/constants";
import MetricCard from "./MetricCard";

interface Props {
  group: MetricGroup;
  companyName: string;
}

export default function MetricCategorySection({ group, companyName }: Props) {
  const category = CATEGORIES.find((c) => c.id === group.categoryId);

  return (
    <section>
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-900">
          {category?.label ?? group.categoryId}
        </h2>
        {category?.shortDescription && (
          <p className="text-sm text-gray-500 mt-0.5">
            {category.shortDescription}
          </p>
        )}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {group.metrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} companyName={companyName} />
        ))}
      </div>
    </section>
  );
}
