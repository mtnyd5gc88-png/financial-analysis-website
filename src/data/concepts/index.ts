import type { Category, CategoryId, Concept } from "@/data/types";
import { CATEGORIES, categorySlug, conceptSlug } from "@/lib/constants";

// Content below is transcribed from "AIF terminology final.docx", which is the
// source of truth for formulas, worked examples, why-it-matters text and the
// relationships between concepts. Formula / workedExample / whyItMatters /
// furtherNote are verbatim.
//
// The document has no separate definition field, so `definition` restates the
// concept's own formula and diagram position in beginner-friendly language and
// introduces no claim, example or threshold the document does not make. Only
// the 20 core concepts carry one; building blocks are deliberately left empty.
//
// Concepts are tiered:
//   "core"           — the 20 concepts the document formally defines.
//   "building-block" — intermediate nodes that appear inside the document's
//                      diagrams but are never given their own definition.

// ─── 1 · Profitability ─────────────────────────────────────────────────────

const profitability: Concept[] = [
  {
    id: "revenue-growth",
    name: "Revenue Growth",
    fullName: "Revenue Growth (YoY)",
    categoryId: "profitability",
    tier: "core",
    definition: "The percentage change in a company's revenue compared with the same period a year earlier. It is measured on revenue — the top of the income-statement waterfall, before any costs are taken out.",
    formula: "(Revenueₜ − Revenueₜ₋₁) / Revenueₜ₋₁",
    workedExample: "Revenue rises from $100m to $120m. → 20%",
    whyItMatters:
      "Sets the pace for everything below it — top-line growth is what lets profits, EPS and valuation expand over time.",
    furtherNote: null,
    quickQuestion: null,
  },
  {
    id: "gross-margin",
    name: "Gross Margin",
    fullName: null,
    categoryId: "profitability",
    tier: "core",
    definition: "The share of revenue left once the direct cost of goods sold is deducted. It is the first margin in the income-statement waterfall, measured before overheads.",
    formula: "Gross Profit / Revenue",
    workedExample: "$10m revenue, $4m gross profit. → 40%",
    whyItMatters:
      "Revenue left after the direct cost of goods sold — a first read on pricing power, before overheads.",
    furtherNote: null,
    quickQuestion: null,
  },
  {
    id: "operating-margin",
    name: "Operating Margin",
    fullName: null,
    categoryId: "profitability",
    tier: "core",
    definition: "The share of revenue left after operating expenses as well as direct costs. It measures the core business, before financing and tax are taken into account.",
    formula: "Operating Income / Revenue",
    workedExample: "$20m revenue, $5m operating income. → 25%",
    whyItMatters:
      "Revenue left after operating expenses — profitability of the core business, independent of financing and tax.",
    furtherNote: null,
    quickQuestion: null,
  },
  {
    id: "net-profit-margin",
    name: "Net Profit Margin",
    fullName: null,
    categoryId: "profitability",
    tier: "core",
    definition: "The share of revenue that survives every layer of cost — direct costs, operating expenses, interest and tax. It is the final step of the income-statement waterfall.",
    formula: "Net Income / Revenue",
    workedExample: "$2m net income, $20m revenue. → 10%",
    whyItMatters:
      "The bottom of the waterfall: what actually reaches shareholders. Also the profitability driver in the DuPont breakdown of ROE (Returns on Capital).",
    furtherNote: null,
    quickQuestion: null,
  },

  // Building blocks — the document's income-statement waterfall runs through
  // these, but it does not define them as concepts in their own right.
  {
    id: "revenue",
    name: "Revenue",
    fullName: null,
    categoryId: "profitability",
    tier: "building-block",
    definition: "",
    formula: null,
    workedExample: null,
    whyItMatters: "",
    furtherNote: null,
    quickQuestion: null,
  },
  {
    id: "gross-profit",
    name: "Gross Profit",
    fullName: null,
    categoryId: "profitability",
    tier: "building-block",
    definition: "",
    formula: "Revenue − COGS",
    workedExample: null,
    whyItMatters: "",
    furtherNote: null,
    quickQuestion: null,
  },
  {
    id: "operating-income",
    name: "Operating Income",
    fullName: null,
    categoryId: "profitability",
    tier: "building-block",
    definition: "",
    formula: "Gross Profit − Operating Expenses",
    workedExample: null,
    whyItMatters: "",
    furtherNote: null,
    quickQuestion: null,
  },
  {
    id: "net-income",
    name: "Net Income",
    fullName: null,
    categoryId: "profitability",
    tier: "building-block",
    definition: "",
    formula: "Operating Income − Interest, Tax",
    workedExample: null,
    whyItMatters: "",
    furtherNote: null,
    quickQuestion: null,
  },
];

// ─── 2 · Valuation ─────────────────────────────────────────────────────────

const valuation: Concept[] = [
  {
    id: "eps-growth",
    name: "EPS Growth",
    fullName: "EPS Growth (YoY)",
    categoryId: "valuation",
    tier: "core",
    definition: "The percentage change in earnings per share compared with a year earlier, measured against the absolute value of the earlier figure.",
    formula: "(EPSₜ − EPSₜ₋₁) / |EPSₜ₋₁|",
    workedExample: "EPS rises from $1.50 to $1.80. → 20%",
    whyItMatters:
      "How fast per-share earnings compound — the denominator that turns a raw P/E into a growth-adjusted PEG.",
    furtherNote: null,
    quickQuestion: null,
  },
  {
    id: "pe-ratio",
    name: "P/E Ratio",
    fullName: null,
    categoryId: "valuation",
    tier: "core",
    definition: "The share price divided by earnings per share — how many dollars the market is paying for one dollar of annual earnings.",
    formula: "Price / EPS",
    workedExample: "Price $120, EPS $6. → 20",
    whyItMatters:
      "Dollars paid for each dollar of annual earnings — the market's headline verdict on growth and quality.",
    furtherNote: null,
    quickQuestion: null,
  },
  {
    id: "peg-ratio",
    name: "PEG Ratio",
    fullName: null,
    categoryId: "valuation",
    tier: "core",
    definition: "The P/E ratio divided by the EPS growth rate, with growth entered as a percentage number. It places a company's multiple in the context of how fast its earnings are growing.",
    // EPS growth enters as the percentage number (15, not 0.15) — the worked
    // example below is what fixes that convention.
    formula: "P/E ÷ EPS Growth (%)",
    workedExample: "P/E 30, EPS growth 15%. → 2.0",
    whyItMatters:
      "Corrects P/E's main weakness: a high multiple is justified if growth is high. Below ~1 is conventionally 'cheap for the growth.'",
    furtherNote: null,
    quickQuestion: null,
  },
  {
    id: "earnings-yield",
    name: "Earnings Yield",
    fullName: null,
    categoryId: "valuation",
    tier: "core",
    definition: "Earnings per share divided by the share price — the inverse of the P/E ratio, expressed as a yield.",
    formula: "EPS / Price  ( = 1 / P/E )",
    workedExample: "P/E of 20. → 5%",
    whyItMatters:
      "Flips P/E into a yield, so equity earnings compare directly with bond yields — useful for 'is the market expensive?' questions.",
    furtherNote: null,
    quickQuestion: null,
  },
  {
    id: "ev-ebitda",
    name: "EV/EBITDA",
    fullName: null,
    categoryId: "valuation",
    tier: "core",
    definition: "Enterprise value — market capitalisation plus net debt — divided by EBITDA. The numerator includes debt and the denominator strips out interest, tax and depreciation.",
    formula: "(Market Cap + Net Debt) / EBITDA",
    workedExample: null,
    whyItMatters:
      "A capital-structure-neutral valuation: the numerator includes debt and the denominator strips out interest, tax and depreciation, so it compares firms with different leverage more fairly than P/E.",
    furtherNote:
      "Use over P/E when: firms carry very different debt loads, earnings are distorted by one-offs or non-cash items, or net income is negative while the business is cash-generative.",
    quickQuestion: null,
  },

  {
    id: "eps",
    name: "EPS",
    fullName: null,
    categoryId: "valuation",
    tier: "building-block",
    definition: "",
    formula: "Net Income ÷ Shares",
    workedExample: null,
    whyItMatters: "",
    furtherNote: null,
    quickQuestion: null,
  },
];

// ─── 4 · Financial Health ──────────────────────────────────────────────────
// Defined before Returns on Capital because Debt-to-Equity is defined here and
// referenced from there — the document shows it feeding the equity multiplier.

const debtToEquity: Concept = {
  id: "debt-to-equity",
  name: "Debt-to-Equity",
  fullName: null,
  categoryId: "financial-health",
  tier: "core",
  definition: "Total debt divided by equity — how much borrowed money a company uses relative to shareholders' capital. It is the headline measure of leverage.",
  formula: "Total Debt / Equity",
  workedExample: "Company A 2.5 vs B 0.5 — which is more levered? → A",
  whyItMatters:
    "The headline leverage gauge. Higher D/E magnifies gains and losses, and — via the equity multiplier (1 + D/E) — is the leverage term inside DuPont ROE.",
  furtherNote: null,
  quickQuestion: null,
  sharedWithCategories: ["returns-on-capital"],
};

const financialHealth: Concept[] = [
  debtToEquity,
  {
    id: "interest-coverage",
    name: "Interest Coverage",
    fullName: null,
    categoryId: "financial-health",
    tier: "core",
    definition: "EBIT divided by interest expense — how many times over a company's operating profit covers its interest bill.",
    formula: "EBIT / Interest Expense",
    workedExample: null,
    whyItMatters:
      "How many times over operating profit covers the interest bill — turns a balance-sheet fact (debt) into a solvency question (can we pay for it?).",
    furtherNote:
      "A low ratio signals thin cushion: an earnings dip or rate rise could leave the firm unable to service its debt — elevated default risk.",
    quickQuestion: null,
  },
  {
    id: "current-ratio",
    name: "Current Ratio",
    fullName: null,
    categoryId: "financial-health",
    tier: "core",
    definition: "Current assets divided by current liabilities — whether the assets due within a year cover the liabilities due within a year.",
    formula: "Current Assets / Current Liabilities",
    workedExample: "$10m current assets, $5m current liabilities. → 2.0",
    whyItMatters:
      "Short-term liquidity: can assets due within a year cover liabilities due within a year? Below 1.0 warns of a cash crunch regardless of long-run profitability.",
    furtherNote: null,
    quickQuestion: null,
  },
];

// ─── 3 · Returns on Capital ────────────────────────────────────────────────

const returnsOnCapital: Concept[] = [
  {
    id: "roe",
    name: "ROE",
    fullName: "ROE (Return on Equity)",
    categoryId: "returns-on-capital",
    tier: "core",
    definition: "Net income divided by shareholders' equity — the profit produced for each dollar of capital shareholders have put in.",
    formula: "Net Income / Shareholders' Equity",
    workedExample: "$10m net income, $50m equity. → 20%",
    whyItMatters:
      "Profit per dollar of shareholder capital. Powerful but flattered by leverage: adding debt raises the equity multiplier and lifts ROE with no operating improvement — which is why ROIC exists.",
    furtherNote: null,
    quickQuestion: null,
  },
  {
    id: "roic",
    name: "ROIC",
    fullName: "ROIC (Return on Invested Capital)",
    categoryId: "returns-on-capital",
    tier: "core",
    definition: "NOPAT divided by invested capital — the return on all the capital a business uses, debt and equity together.",
    formula: "NOPAT / Invested Capital",
    workedExample: null,
    whyItMatters:
      "Return on all capital — debt and equity together. Because it ignores capital structure, it isolates genuine operating quality, making it the cleaner tool for comparing two companies.",
    furtherNote:
      "Why it beats ROE for comparison: a highly-levered firm and a debt-free firm can be judged on operating merit alone, without leverage distorting the picture.",
    quickQuestion: null,
  },
  {
    id: "asset-turnover",
    name: "Asset Turnover",
    fullName: null,
    categoryId: "returns-on-capital",
    tier: "core",
    definition: "Revenue divided by total assets — how much revenue a company generates from each dollar of assets. It is the efficiency term in the DuPont breakdown of ROE.",
    formula: "Revenue / Total Assets",
    workedExample: "$100m revenue, $50m assets. → 2.0×",
    whyItMatters:
      "Revenue squeezed from each dollar of assets — the 'efficiency' leg of DuPont. Low-margin businesses often compete by driving this high.",
    furtherNote: null,
    quickQuestion: null,
  },
  // Shared reference — defined under Financial Health, shown here because the
  // document routes it into the equity multiplier inside DuPont ROE.
  debtToEquity,
];

// ─── 5 · Cash Generation ───────────────────────────────────────────────────

const cashGeneration: Concept[] = [
  {
    id: "free-cash-flow",
    name: "Free Cash Flow",
    fullName: null,
    categoryId: "cash-generation",
    tier: "core",
    definition: "Operating cash flow minus capital expenditure — the cash left once a company has paid for the capital spending needed to keep the business running.",
    formula: "Operating Cash Flow − Capex",
    workedExample: "$500m operating cash flow, $150m capex. → $350m",
    whyItMatters:
      "Cash produced after the capital spending needed to sustain the business. Unlike net income it is hard to manipulate with accounting choices, so it is a favourite of valuation and quality screens.",
    furtherNote: null,
    quickQuestion: null,
  },

  {
    id: "operating-cash-flow",
    name: "Operating Cash Flow",
    fullName: null,
    categoryId: "cash-generation",
    tier: "building-block",
    definition: "",
    formula: null,
    workedExample: null,
    whyItMatters: "",
    furtherNote: null,
    quickQuestion: null,
  },
  {
    id: "capex",
    name: "Capex",
    fullName: null,
    categoryId: "cash-generation",
    tier: "building-block",
    definition: "",
    formula: null,
    workedExample: null,
    whyItMatters: "",
    furtherNote: null,
    quickQuestion: null,
  },
];

// ─── 6 · Market Reaction & Risk ────────────────────────────────────────────

const marketReactionAndRisk: Concept[] = [
  {
    id: "earnings-surprise",
    name: "Earnings Surprise",
    fullName: null,
    categoryId: "market-reaction-and-risk",
    tier: "core",
    definition: "The gap between the earnings a company actually reports and what was expected, measured against the absolute value of the estimate.",
    formula: "(Actual EPS − Estimated EPS) / |Estimated EPS|",
    workedExample: "Expected $2.00, reported $2.40. → 20%",
    whyItMatters:
      "The gap between reported and expected earnings. Prices move on surprises, not on results themselves — the expectation was already priced in.",
    furtherNote: null,
    quickQuestion: null,
  },
  {
    id: "abnormal-return",
    name: "Abnormal Return",
    fullName: null,
    categoryId: "market-reaction-and-risk",
    tier: "core",
    definition: "A stock's return with the market's own move removed — the stock's return minus the return on the QQQ index over the same period.",
    formula: "Stock Return − Index (QQQ) Return",
    workedExample: "Stock +8% while QQQ +3%. → 5%",
    whyItMatters:
      "Performance attributable to the company alone, with broad-market movement removed — 'did this beat because of its news, or because everything rose?'",
    furtherNote: null,
    quickQuestion: null,
  },
  {
    id: "post-earnings-volatility",
    name: "Post-Earnings Volatility",
    fullName: null,
    categoryId: "market-reaction-and-risk",
    tier: "core",
    definition: "The standard deviation of a stock's daily returns around an earnings announcement — a measure of how turbulent the price becomes once results are released.",
    formula: "Std. deviation of daily returns around the announcement",
    workedExample: null,
    whyItMatters:
      "How turbulent a stock becomes once results hit. New information forces repricing, positioning unwinds, and disagreement widens daily swings.",
    furtherNote:
      "Why volatility rises: an announcement injects fresh information and resolves — or creates — uncertainty, triggering repricing and heavier trading until a new consensus forms.",
    quickQuestion: null,
  },
  {
    id: "beta",
    name: "Beta",
    fullName: null,
    categoryId: "market-reaction-and-risk",
    tier: "core",
    definition: "The covariance of a stock's returns with the index divided by the variance of the index — a measure of how sensitively a stock moves with the market.",
    formula: "Cov(Stock, QQQ) / Var(QQQ)",
    // The source's worked example is truncated mid-sentence; kept verbatim.
    workedExample: "A stock with beta 1.5 tends to move... → ~1.5× the market",
    whyItMatters:
      "Sensitivity of a stock's returns to the market — systematic (undiversifiable) risk, the very market component subtracted to compute abnormal return.",
    furtherNote: null,
    quickQuestion: null,
  },

  {
    id: "stock-price-movement",
    name: "Stock Price Movement",
    fullName: null,
    categoryId: "market-reaction-and-risk",
    tier: "building-block",
    definition: "",
    formula: null,
    workedExample: null,
    whyItMatters: "",
    furtherNote: null,
    quickQuestion: null,
  },
];

// ─── Assembly ──────────────────────────────────────────────────────────────

const CONCEPTS_BY_CATEGORY: Record<CategoryId, Concept[]> = {
  profitability,
  valuation,
  "returns-on-capital": returnsOnCapital,
  "financial-health": financialHealth,
  "cash-generation": cashGeneration,
  "market-reaction-and-risk": marketReactionAndRisk,
};

// Category metadata comes from lib/constants so the wording lives in one place.
export const CONCEPT_CATEGORIES: Category[] = CATEGORIES.map((meta) => ({
  ...meta,
  concepts: CONCEPTS_BY_CATEGORY[meta.id],
}));

// A concept is "owned" by the category the document defines it under; the same
// object may also be listed elsewhere as a shared reference.
export function isSharedReference(
  concept: Concept,
  categoryId: CategoryId
): boolean {
  return concept.categoryId !== categoryId;
}

// Counts only the concepts the document formally defines, and only in their
// defining category — so Debt-to-Equity is counted once, under Financial Health.
export function coreConceptCount(categoryId: CategoryId): number {
  return CONCEPTS_BY_CATEGORY[categoryId].filter(
    (c) => c.tier === "core" && c.categoryId === categoryId
  ).length;
}

export function getCategory(categoryId: string): Category | undefined {
  return CONCEPT_CATEGORIES.find((c) => c.id === categoryId);
}

// Flat lookup across every category. Debt-to-Equity is a single shared object,
// so it resolves once regardless of which category it was reached from.
export const ALL_CONCEPTS: Concept[] = Array.from(
  new Map(
    CONCEPT_CATEGORIES.flatMap((c) => c.concepts).map((c) => [c.id, c])
  ).values()
);

export function getConceptById(id: string | null): Concept | undefined {
  if (!id) return undefined;
  return ALL_CONCEPTS.find((c) => c.id === id);
}

export const CORE_CONCEPTS = ALL_CONCEPTS.filter((c) => c.tier === "core");
export const BUILDING_BLOCKS = ALL_CONCEPTS.filter(
  (c) => c.tier === "building-block"
);

// Canonical URL for a concept — always its defining category, so a metric or a
// relationship links to one page rather than a per-context copy.
export function conceptHref(concept: Concept): string {
  return `/learn/${categorySlug(concept.categoryId)}/${conceptSlug(concept.name)}`;
}
