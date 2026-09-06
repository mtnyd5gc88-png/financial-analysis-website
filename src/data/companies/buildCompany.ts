import type {
  AuditFlag,
  Company,
  CompanyMeta,
  Metric,
  MetricGroup,
  MetricStatus,
  CategoryId,
} from "@/data/types";
import { getConceptById } from "@/data/concepts";
import {
  COLLECTED_METRIC_IDS,
  METRIC_PLACEMENTS,
  type MetricPlacement,
} from "@/data/metricDescriptors";
import {
  EXCLUDED_METRIC_REASON,
  NOT_COLLECTED_REASON,
} from "@/data/methodology";

// Shared provenance for every figure read off the workbook's Metrics sheet.
export const SOURCE = "stockanalysis.com (S&P Global Market Intelligence)";
export const AS_OF = "Aug 2026 snapshot — data cutoff 2026-08-23";

// What a company file supplies for ONE of the 14 collected indicators.
// Everything else about the metric comes from the central registry, so no
// concept content is ever repeated in a company file.
export interface CompanyMetricFact {
  // Exactly as the workbook stores it. Percentages are DECIMALS.
  // null whenever `status` is not "reported".
  value: number | null;
  status: MetricStatus;
  // Required whenever status is not "reported" — the reader is always told why.
  statusNote?: string | null;
  // Company-specific note, sourced from this company's own audit row.
  context?: string | null;
  // Only set where the workbook explicitly attaches a basis to THIS figure.
  accountingBasis?: "GAAP" | "non-GAAP" | null;
  // false where the workbook flags the figure as distorted or non-comparable.
  comparable?: boolean;
  // Overrides the registry's period basis, if this company differs.
  basis?: string | null;
}

export type MetricFacts = Record<string, CompanyMetricFact>;

export interface CompanyInput {
  ticker: string;
  name: string;
  description: string;
  sector: string;
  meta: CompanyMeta;
  audit: AuditFlag;
  // Keyed by metric id — exactly the 14 collected indicators, no more, no less.
  metrics: MetricFacts;
}

// The six category groups on a Company, in render order.
type GroupKey =
  | "profitability"
  | "valuation"
  | "returnsOnCapital"
  | "financialHealth"
  | "cashGeneration"
  | "marketReactionAndRisk";

const GROUP_KEYS: { key: GroupKey; categoryId: CategoryId }[] = [
  { key: "profitability", categoryId: "profitability" },
  { key: "valuation", categoryId: "valuation" },
  { key: "returnsOnCapital", categoryId: "returns-on-capital" },
  { key: "financialHealth", categoryId: "financial-health" },
  { key: "cashGeneration", categoryId: "cash-generation" },
  { key: "marketReactionAndRisk", categoryId: "market-reaction-and-risk" },
];

// Fails the build rather than rendering something wrong or invented.
function assertFacts(ticker: string, facts: MetricFacts): void {
  for (const id of COLLECTED_METRIC_IDS) {
    if (!(id in facts)) {
      throw new Error(`[${ticker}] missing workbook metric "${id}".`);
    }
  }
  for (const [id, fact] of Object.entries(facts)) {
    if (!COLLECTED_METRIC_IDS.includes(id)) {
      throw new Error(
        `[${ticker}] "${id}" is not one of the workbook's collected indicators.`
      );
    }
    if (fact.status === "reported" && fact.value === null) {
      throw new Error(`[${ticker}] "${id}" is "reported" but has no value.`);
    }
    if (fact.status !== "reported" && fact.value !== null) {
      throw new Error(
        `[${ticker}] "${id}" is "${fact.status}" but carries a value — a missing figure must never be represented by a number.`
      );
    }
    if (fact.status !== "reported" && !fact.statusNote) {
      throw new Error(
        `[${ticker}] "${id}" is "${fact.status}" but has no statusNote explaining why.`
      );
    }
  }
}

function buildMetric(
  placement: MetricPlacement,
  facts: MetricFacts
): Metric {
  // Name and formula come from the terminology document via the concept
  // registry — never restated in a company file.
  const concept = getConceptById(placement.conceptId);
  if (!concept) {
    throw new Error(
      `Metric "${placement.key}" points at unknown concept "${placement.conceptId}".`
    );
  }

  const collected = placement.availability === "collected";
  const fact = collected ? facts[placement.id] : undefined;

  const contextParts = [placement.placementNote, fact?.context].filter(
    (part): part is string => Boolean(part)
  );

  const status: MetricStatus = collected
    ? fact!.status
    : placement.availability === "excluded"
      ? "excluded"
      : "not-available";

  const statusNote = collected
    ? (fact!.statusNote ?? null)
    : placement.availability === "excluded"
      ? EXCLUDED_METRIC_REASON
      : NOT_COLLECTED_REASON;

  return {
    id: placement.id,
    name: concept.name,
    value: collected ? fact!.value : null,
    status,
    statusNote,
    format: placement.format,
    unit: placement.unit,
    basis: collected ? (fact!.basis ?? placement.basis) : null,
    tier: collected ? placement.tier : null,
    explanation: placement.explanation,
    formula: concept.formula,
    context: contextParts.length > 0 ? contextParts.join(" ") : null,
    limitation: placement.limitation,
    accountingBasis: collected ? (fact!.accountingBasis ?? null) : null,
    comparable: collected ? (fact!.comparable ?? true) : true,
    source: collected ? SOURCE : null,
    asOf: collected ? AS_OF : null,
    conceptId: placement.conceptId,
    ...(placement.sharedWithCategories
      ? { sharedWithCategories: placement.sharedWithCategories }
      : {}),
  };
}

// Assembles one company from the central registry plus the workbook facts for
// that company. Debt-to-Equity renders in two categories from the SAME single
// fact — there is never a second D/E data definition.
export function buildCompany(input: CompanyInput): Company {
  assertFacts(input.ticker, input.metrics);

  const group = (categoryId: CategoryId): MetricGroup => ({
    categoryId,
    metrics: METRIC_PLACEMENTS.filter((p) => p.categoryId === categoryId).map(
      (p) => buildMetric(p, input.metrics)
    ),
  });

  const groups = Object.fromEntries(
    GROUP_KEYS.map(({ key, categoryId }) => [key, group(categoryId)])
  ) as Record<GroupKey, MetricGroup>;

  return {
    ticker: input.ticker,
    name: input.name,
    description: input.description,
    sector: input.sector,
    meta: input.meta,
    audit: input.audit,
    profitability: groups.profitability,
    valuation: groups.valuation,
    returnsOnCapital: groups.returnsOnCapital,
    financialHealth: groups.financialHealth,
    cashGeneration: groups.cashGeneration,
    marketReactionAndRisk: groups.marketReactionAndRisk,
  };
}
