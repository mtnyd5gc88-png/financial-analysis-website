import type { Company, Metric, MetricGroup } from "@/data/types";
import nvidia from "@/data/companies/nvidia";
import microsoft from "@/data/companies/microsoft";
import apple from "@/data/companies/apple";
import amazon from "@/data/companies/amazon";
import alphabet from "@/data/companies/alphabet";
import costco from "@/data/companies/costco";
import pepsico from "@/data/companies/pepsico";
import amgen from "@/data/companies/amgen";
import tesla from "@/data/companies/tesla";
import adobe from "@/data/companies/adobe";

// Keyed by ticker — the Compare page and company index both rely on this map.
// Adding a new company is: import + add one entry here.
export const COMPANIES: Record<string, Company> = {
  NVDA: nvidia,
  MSFT: microsoft,
  AAPL: apple,
  AMZN: amazon,
  GOOGL: alphabet,
  COST: costco,
  PEP: pepsico,
  AMGN: amgen,
  TSLA: tesla,
  ADBE: adobe,
};

export function getCompany(ticker: string): Company | null {
  return COMPANIES[ticker.toUpperCase()] ?? null;
}

export function getAllCompanies(): Company[] {
  return Object.values(COMPANIES);
}

// The six category groups of a company, in display order. Single accessor so
// nothing re-lists them — Compare, the concept pages and the audits all use it.
export function metricGroups(company: Company): MetricGroup[] {
  return [
    company.profitability,
    company.valuation,
    company.returnsOnCapital,
    company.financialHealth,
    company.cashGeneration,
    company.marketReactionAndRisk,
  ];
}

// One metric by id. Debt-to-Equity has two placements built from a single
// value, so the first match is the same data either way.
export function getCompanyMetric(
  company: Company,
  metricId: string
): Metric | undefined {
  return metricGroups(company)
    .flatMap((g) => g.metrics)
    .find((m) => m.id === metricId);
}

// Where a concept shows up as a real company metric — powers the
// concept → application ("see it on NVIDIA") return path.
export function companiesWithConcept(
  conceptId: string
): { company: Company; metric: Metric }[] {
  const groups = metricGroups;

  return getAllCompanies().flatMap((company) => {
    const metric = groups(company)
      .flatMap((g) => g.metrics)
      .find((m) => m.conceptId === conceptId);
    return metric ? [{ company, metric }] : [];
  });
}
