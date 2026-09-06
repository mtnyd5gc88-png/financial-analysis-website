import { getAllCompanies } from "@/data";

// Compare page — structural placeholder.
// The full comparison UI will be built once more companies are added.
// The data architecture (COMPANIES map in data/index.ts) already supports
// multiple companies, so this page can be filled in without architectural changes.

export default function ComparePage() {
  const companies = getAllCompanies();

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Compare</h1>
        <p className="text-gray-500 max-w-2xl">
          Compare financial metrics across companies side by side. Select two or
          more companies to begin.
        </p>
      </header>

      {companies.length < 2 ? (
        <div className="rounded-lg border border-dashed border-gray-300 bg-white p-12 text-center">
          <p className="text-gray-400 text-sm">
            At least two companies are required to use the comparison tool.
          </p>
          <p className="text-gray-300 text-xs mt-1">
            More companies will be added in a future update.
          </p>
        </div>
      ) : (
        // Full comparison UI — to be built when multiple companies are available
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
          <p className="text-gray-400 text-sm">Comparison UI coming soon.</p>
        </div>
      )}
    </div>
  );
}
