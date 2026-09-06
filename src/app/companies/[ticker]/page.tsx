import { notFound } from "next/navigation";
import Link from "next/link";
import { getCompany, getAllCompanies } from "@/data";
import MetricCategorySection from "@/components/company/MetricCategorySection";
import CompanyMetaBar from "@/components/company/CompanyMetaBar";
import AuditNote from "@/components/company/AuditNote";
import MethodologyNote from "@/components/shared/MethodologyNote";
import JudgementSection from "@/components/judgement/JudgementSection";

export default async function CompanyPage(
  props: PageProps<"/companies/[ticker]">
) {
  const { ticker } = await props.params;
  const company = getCompany(ticker);
  if (!company) notFound();

  const categoryGroups = [
    company.profitability,
    company.valuation,
    company.returnsOnCapital,
    company.financialHealth,
    company.cashGeneration,
    company.marketReactionAndRisk,
  ];

  return (
    <div className="space-y-12">
      {/* Company header */}
      <header>
        <p className="text-sm text-gray-400 mb-1">
          <Link href="/companies" className="hover:underline">
            Companies
          </Link>{" "}
          /
        </p>
        <div className="flex items-baseline gap-3 mb-2">
          <h1 className="text-3xl font-bold text-gray-900">{company.name}</h1>
          <span className="font-mono text-sm font-semibold bg-gray-100 text-gray-500 px-2 py-1 rounded">
            {company.ticker}
          </span>
        </div>
        <p className="text-gray-500 max-w-2xl">{company.description}</p>
        <p className="text-xs text-gray-400 mt-1">Sector: {company.sector}</p>
      </header>

      {/* Reporting calendar and audit confidence, before any figures */}
      <CompanyMetaBar meta={company.meta} />
      <AuditNote audit={company.audit} />

      {/* Financial data — six categories */}
      <div className="space-y-10">
        {categoryGroups.map((group) => (
          <MetricCategorySection
            key={group.categoryId}
            group={group}
            companyName={company.name}
          />
        ))}
      </div>

      {/* Your Judgement — always rendered last */}
      <JudgementSection companyName={company.name} />

      <MethodologyNote />
    </div>
  );
}

export async function generateStaticParams() {
  return getAllCompanies().map((c) => ({ ticker: c.ticker }));
}
