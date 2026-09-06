import CompareTool from "@/components/compare/CompareTool";
import MethodologyNote from "@/components/shared/MethodologyNote";

// Compare reads the same COMPANIES registry as every other page — there is no
// second source of financial data here, and nothing is recalculated: each cell
// is a value the company record already holds.

export default function ComparePage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Compare</h1>
        <p className="max-w-3xl text-gray-500">
          Compare selected financial indicators across companies. Differences do
          not automatically mean one company is better — a figure only makes
          sense alongside the business behind it, and some are not comparable at
          all. There is no score and no ranking here; the reading is yours.
        </p>
      </header>

      <CompareTool />

      <MethodologyNote />
    </div>
  );
}
