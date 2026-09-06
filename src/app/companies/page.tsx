import Link from "next/link";
import { getAllCompanies } from "@/data";

export default function CompaniesPage() {
  const companies = getAllCompanies();

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Companies</h1>
        <p className="text-gray-500 max-w-2xl">
          Explore financial data for real companies, organised across six
          analytical categories. Use the data to form your own view — not to
          receive a buy or sell recommendation.
        </p>
      </header>

      <section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {companies.map((company) => (
            <Link
              key={company.ticker}
              href={`/companies/${company.ticker}`}
              className="block rounded-lg border border-gray-200 bg-white p-5 hover:border-blue-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-mono font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  {company.ticker}
                </span>
                <span className="text-xs text-gray-400">{company.sector}</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {company.name}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-2">
                {company.description}
              </p>
            </Link>
          ))}
        </div>

        {companies.length === 0 && (
          <p className="text-gray-400 text-sm">No companies added yet.</p>
        )}
      </section>
    </div>
  );
}
