import type { CategoryId, MetricFormat, MetricTier } from "@/data/types";

// ─── Central metric registry ───────────────────────────────────────────────
//
// Everything about a metric that is the SAME for every company lives here, once.
// Company files carry only what the workbook records per company: the value, its
// status, and the notes that company's own audit row supports.
//
// `name` and `formula` are deliberately absent: they are read from the concept
// registry via `conceptId`, so the terminology document remains the single
// source of truth for both. (Verified lossless — every metric name and formula
// in the original NVIDIA record matched its concept exactly.)
//
// A "placement" is one appearance of a metric in one category. Debt-to-Equity
// has two placements but only ever ONE value per company: the placements differ
// in wording, never in data.

// How the workbook treats this metric:
//   "collected"     — one of the 14 indicators on the Metrics sheet.
//   "not-collected" — a diagram input the workbook does not record at all.
//   "excluded"      — deliberately outside this collection round.
export type MetricAvailability = "collected" | "not-collected" | "excluded";

export interface MetricPlacement {
  // Unique key for this appearance, "<categoryId>:<metric id>".
  key: string;
  // Metric id — shared across placements, so one value serves both.
  id: string;
  conceptId: string;
  categoryId: CategoryId;
  availability: MetricAvailability;
  format: MetricFormat;
  unit: string;
  // Period basis from the workbook's Unit column, e.g. "TTM".
  basis: string | null;
  tier: MetricTier | null;
  // Plain-language gloss shown on the card. Generic — never a company verdict.
  explanation: string;
  // Concept-level caution that holds for every company. Company-specific
  // findings belong in the company file's `context`, not here.
  limitation: string | null;
  // A note about this PLACEMENT that is true for every company.
  placementNote: string | null;
  sharedWithCategories?: CategoryId[];
}

function placement(
  categoryId: CategoryId,
  id: string,
  rest: Omit<MetricPlacement, "key" | "id" | "categoryId" | "conceptId"> & {
    conceptId?: string;
  }
): MetricPlacement {
  return {
    key: `${categoryId}:${id}`,
    id,
    conceptId: rest.conceptId ?? id,
    categoryId,
    ...rest,
  };
}

// Order here is the order metrics render in, per category.
export const METRIC_PLACEMENTS: MetricPlacement[] = [
  // ── 1 · Profitability ───────────────────────────────────────────────────
  placement("profitability", "revenue", {
    availability: "not-collected",
    format: "usd-billions",
    unit: "$B",
    basis: null,
    tier: null,
    explanation: "Total income generated from sales of products and services.",
    limitation: null,
    placementNote: null,
  }),
  placement("profitability", "gross-profit", {
    availability: "not-collected",
    format: "usd-billions",
    unit: "$B",
    basis: null,
    tier: null,
    explanation:
      "Revenue remaining after deducting the direct cost of goods sold.",
    limitation: null,
    placementNote: null,
  }),
  placement("profitability", "gross-margin", {
    availability: "collected",
    format: "percent-decimal",
    unit: "%",
    basis: "TTM",
    tier: "cross-sectional",
    explanation:
      "Percentage of revenue remaining after direct production costs.",
    limitation:
      "A high gross margin does not guarantee overall profitability if operating costs are high.",
    placementNote: null,
  }),
  placement("profitability", "operating-income", {
    availability: "not-collected",
    format: "usd-billions",
    unit: "$B",
    basis: null,
    tier: null,
    explanation:
      "Profit after deducting operating expenses including R&D and SG&A.",
    limitation: null,
    placementNote: null,
  }),
  placement("profitability", "operating-margin", {
    availability: "collected",
    format: "percent-decimal",
    unit: "%",
    basis: "TTM",
    tier: "cross-sectional",
    explanation: "Percentage of revenue remaining after all operating costs.",
    limitation: null,
    placementNote: null,
  }),
  placement("profitability", "net-income", {
    availability: "not-collected",
    format: "usd-billions",
    unit: "$B",
    basis: null,
    tier: null,
    explanation:
      "The company's bottom-line profit after all expenses, interest, and taxes.",
    limitation: "Can be distorted by one-time items or tax adjustments.",
    placementNote: null,
  }),
  placement("profitability", "net-profit-margin", {
    availability: "collected",
    format: "percent-decimal",
    unit: "%",
    basis: "TTM",
    tier: "cross-sectional",
    explanation: "Percentage of revenue that becomes net profit.",
    limitation: null,
    placementNote: null,
  }),
  placement("profitability", "revenue-growth", {
    availability: "collected",
    format: "percent-decimal",
    unit: "%",
    basis: "TTM, year-over-year",
    tier: "context-anchor",
    explanation: "How much revenue has grown compared to the previous year.",
    limitation:
      "Very high growth rates may be unsustainable or reflect a low base period.",
    placementNote: null,
  }),

  // ── 2 · Valuation ───────────────────────────────────────────────────────
  placement("valuation", "eps", {
    availability: "not-collected",
    // Per-share dollars, not billions. (The original NVIDIA record used
    // "usd-billions" here, which never showed because the value is always
    // null; corrected so a future value cannot render as "$X.XXB".)
    format: "usd",
    unit: "$ per share",
    basis: null,
    tier: null,
    explanation: "Earnings allocated to each outstanding share.",
    limitation:
      "Share buybacks can increase EPS without improving underlying profitability.",
    placementNote: null,
  }),
  placement("valuation", "eps-growth", {
    availability: "collected",
    format: "percent-decimal",
    unit: "%",
    basis: "TTM, year-over-year",
    tier: "event-study",
    explanation:
      "How much earnings per share grew compared to the prior year.",
    limitation: null,
    placementNote: null,
  }),
  placement("valuation", "pe-ratio", {
    availability: "collected",
    format: "multiple",
    unit: "x",
    basis: "TTM, diluted",
    tier: "cross-sectional",
    explanation: "How much investors pay per dollar of earnings.",
    limitation:
      "A high P/E may reflect growth expectations, not overvaluation — or both.",
    placementNote: null,
  }),
  placement("valuation", "earnings-yield", {
    availability: "collected",
    format: "percent-decimal",
    unit: "%",
    basis: null,
    tier: "context-anchor",
    explanation:
      "The inverse of P/E — earnings as a percentage of share price.",
    limitation: null,
    placementNote: null,
  }),
  placement("valuation", "peg-ratio", {
    availability: "excluded",
    format: "multiple",
    unit: "x",
    basis: null,
    tier: null,
    explanation:
      "P/E adjusted for growth — attempts to account for expected earnings growth.",
    limitation: "Relies on growth estimates, which may prove inaccurate.",
    placementNote: null,
  }),
  placement("valuation", "ev-ebitda", {
    availability: "collected",
    format: "multiple",
    unit: "x",
    basis: "TTM",
    tier: "cross-sectional",
    explanation:
      "Enterprise value relative to earnings before interest, tax, depreciation, and amortisation.",
    limitation: null,
    placementNote: null,
  }),

  // ── 3 · Returns on Capital ──────────────────────────────────────────────
  placement("returns-on-capital", "roe", {
    availability: "collected",
    format: "percent-decimal",
    unit: "%",
    basis: "TTM",
    tier: "cross-sectional",
    explanation:
      "How much profit is generated for each dollar of shareholder equity.",
    limitation: "High debt can artificially inflate ROE.",
    placementNote: null,
  }),
  placement("returns-on-capital", "roic", {
    availability: "excluded",
    format: "percent-decimal",
    unit: "%",
    basis: null,
    tier: null,
    explanation:
      "How efficiently all invested capital (debt + equity) generates operating profit.",
    limitation: null,
    placementNote: null,
  }),
  placement("returns-on-capital", "asset-turnover", {
    availability: "collected",
    format: "multiple",
    unit: "x",
    basis: "TTM",
    tier: "cross-sectional",
    explanation: "How much revenue is generated per dollar of assets.",
    limitation:
      "Varies significantly across industries — compare within sector.",
    placementNote: null,
  }),
  // Second placement of the SAME metric — one value, two framings.
  placement("returns-on-capital", "debt-to-equity", {
    availability: "collected",
    format: "multiple",
    unit: "x",
    basis: null,
    tier: "context-anchor",
    explanation: "How much debt the company uses relative to equity.",
    limitation: null,
    placementNote:
      "Shown here because the terminology document routes it into the equity multiplier (1 + D/E) inside DuPont ROE.",
    sharedWithCategories: ["financial-health"],
  }),

  // ── 4 · Financial Health ────────────────────────────────────────────────
  placement("financial-health", "debt-to-equity", {
    availability: "collected",
    format: "multiple",
    unit: "x",
    basis: null,
    tier: "context-anchor",
    explanation:
      "How much the company relies on borrowed money relative to equity.",
    limitation: null,
    placementNote: null,
    sharedWithCategories: ["returns-on-capital"],
  }),
  placement("financial-health", "interest-coverage", {
    availability: "excluded",
    format: "multiple",
    unit: "x",
    basis: null,
    tier: null,
    explanation: "How many times operating income covers interest payments.",
    limitation: null,
    placementNote: null,
  }),
  placement("financial-health", "current-ratio", {
    availability: "collected",
    format: "multiple",
    unit: "x",
    basis: null,
    tier: "context-anchor",
    explanation:
      "Whether the company can cover short-term liabilities with short-term assets.",
    limitation: "A very high current ratio may indicate idle assets.",
    placementNote: null,
  }),

  // ── 5 · Cash Generation ─────────────────────────────────────────────────
  placement("cash-generation", "operating-cash-flow", {
    availability: "not-collected",
    format: "usd-billions",
    unit: "$B",
    basis: null,
    tier: null,
    explanation:
      "Cash generated from core business operations — before investing or financing.",
    limitation: null,
    placementNote: null,
  }),
  placement("cash-generation", "capex", {
    availability: "not-collected",
    format: "usd-billions",
    unit: "$B",
    basis: null,
    tier: null,
    explanation:
      "Cash spent on physical assets like equipment, data centres, or property.",
    limitation: null,
    placementNote: null,
  }),
  placement("cash-generation", "free-cash-flow", {
    availability: "collected",
    format: "usd-billions",
    unit: "$B",
    basis: "TTM",
    tier: "cross-sectional",
    explanation:
      "Cash remaining after capital expenditure — available to invest, repay debt, or return to shareholders.",
    limitation: "Does not account for the sustainability of capex levels.",
    // True of every company: the workbook records the FCF total but not the
    // operating cash flow and capex it is drawn from.
    placementNote:
      "The source records the free cash flow total only; the operating cash flow and capex it is drawn from are not in the workbook.",
  }),

  // ── 6 · Market Reaction & Risk ──────────────────────────────────────────
  placement("market-reaction-and-risk", "earnings-surprise", {
    availability: "collected",
    format: "percent-decimal",
    unit: "%",
    basis: "latest reported quarter",
    tier: "event-study",
    explanation: "How much actual EPS differed from analyst estimates.",
    limitation:
      "A positive surprise does not guarantee a stock price increase.",
    placementNote: null,
  }),
  placement("market-reaction-and-risk", "stock-price-movement", {
    availability: "not-collected",
    // A percentage, not billions. (Same latent mismatch as `eps` above,
    // corrected for the same reason.)
    format: "percent-decimal",
    unit: "%",
    basis: null,
    tier: null,
    explanation:
      "The percentage change in share price on the day results were announced.",
    limitation:
      "Reflects investor expectations and sentiment, not only company performance.",
    placementNote: null,
  }),
  placement("market-reaction-and-risk", "abnormal-return", {
    availability: "excluded",
    format: "percent-decimal",
    unit: "%",
    basis: null,
    tier: null,
    explanation:
      "Stock return minus the broad market's own move over the same window.",
    limitation: null,
    placementNote: null,
  }),
  placement("market-reaction-and-risk", "post-earnings-volatility", {
    availability: "excluded",
    format: "percent-decimal",
    unit: "%",
    basis: null,
    tier: null,
    explanation:
      "Price swings in the days following earnings — a measure of uncertainty.",
    limitation: null,
    placementNote: null,
  }),
  placement("market-reaction-and-risk", "beta", {
    availability: "excluded",
    format: "multiple",
    unit: "x",
    basis: null,
    tier: null,
    explanation: "How much the stock moves relative to the broader market.",
    limitation:
      "Beta is based on historical data and may not predict future volatility.",
    placementNote: null,
  }),
];

// The 14 indicators the workbook actually records — every company file must
// account for exactly these, and no others.
export const COLLECTED_METRIC_IDS: string[] = Array.from(
  new Set(
    METRIC_PLACEMENTS.filter((p) => p.availability === "collected").map(
      (p) => p.id
    )
  )
);
