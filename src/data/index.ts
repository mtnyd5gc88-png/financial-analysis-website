import type { Company, Metric, MetricGroup } from "@/data/types";
import nvidia from "@/data/companies/nvidia";
import tesla from "@/data/companies/tesla";
import crowdstrike from "@/data/companies/crowdstrike";
import marvell from "@/data/companies/marvell";
import autodesk from "@/data/companies/autodesk";
import workday from "@/data/companies/workday";
import synopsys from "@/data/companies/synopsys";
import analogDevices from "@/data/companies/analog-devices";
import intuit from "@/data/companies/intuit";
import micron from "@/data/companies/micron";

// Keyed by ticker — the Compare page and company index both rely on this map.
// Adding a new company is: import + add one entry here.
export const COMPANIES: Record<string, Company> = {
  NVDA: nvidia,
  TSLA: tesla,
  CRWD: crowdstrike,
  MRVL: marvell,
  ADSK: autodesk,
  WDAY: workday,
  SNPS: synopsys,
  ADI: analogDevices,
  INTU: intuit,
  MU: micron,
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
