import Link from "next/link";

interface Props {
  label: string;
  slug: string;
  shortDescription: string;
  conceptCount: number;
}

export default function CategoryCard({
  label,
  slug,
  shortDescription,
  conceptCount,
}: Props) {
  return (
    <Link
      href={`/learn/${slug}`}
      className="block rounded-lg border border-gray-200 bg-white p-5 hover:border-blue-300 hover:shadow-sm transition-all"
    >
      <h3 className="font-semibold text-gray-900 mb-1">{label}</h3>
      <p className="text-sm text-gray-500 mb-3">{shortDescription}</p>
      <span className="text-xs text-gray-400">{conceptCount} {conceptCount === 1 ? "concept" : "concepts"}</span>
    </Link>
  );
}
