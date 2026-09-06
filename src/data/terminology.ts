import { getConceptById } from "@/data/concepts";

// ─── Beginner terminology for inline tooltips ──────────────────────────────
//
// These are the abbreviations that appear directly on company and metric pages.
// Where a term already has a canonical definition in the concept registry, the
// tooltip DERIVES its text from that definition through `conceptId` — it is
// never restated here, so a tooltip can never drift from the Learn pages.
//
// `gloss` is only used for terms the terminology document never defines as a
// concept (TTM, COGS, EBITDA, EBIT, NOPAT). Each of those is written to match
// how the document itself uses the term.

export interface TermEntry {
  // What the reader sees, e.g. "TTM".
  term: string;
  // What the letters stand for.
  expansion: string;
  // Pull the explanation from this concept's definition, if it has one.
  conceptId?: string;
  // Only for terms with no concept behind them.
  gloss?: string;
}

export const TERMS: Record<string, TermEntry> = {
  TTM: {
    term: "TTM",
    expansion: "Trailing Twelve Months",
    gloss:
      "Financial data covering the most recent twelve-month period, rather than a single quarter or a fiscal year.",
  },
  COGS: {
    term: "COGS",
    expansion: "Cost of Goods Sold",
    gloss:
      "The direct costs of producing the goods or services a company sells. Subtracting it from revenue gives gross profit.",
  },
  EBITDA: {
    term: "EBITDA",
    expansion: "Earnings Before Interest, Tax, Depreciation and Amortisation",
    gloss:
      "A profit measure taken before interest, tax, depreciation and amortisation are deducted.",
  },
  EBIT: {
    term: "EBIT",
    expansion: "Earnings Before Interest and Tax",
    gloss:
      "Operating profit, measured before interest and tax are deducted.",
  },
  NOPAT: {
    term: "NOPAT",
    expansion: "Net Operating Profit After Tax",
    gloss:
      "Operating profit after tax. It is the numerator of ROIC, which the terminology document states as NOPAT / Invested Capital.",
  },
  // Everything below derives its explanation from the concept registry.
  ROE: { term: "ROE", expansion: "Return on Equity", conceptId: "roe" },
  ROIC: {
    term: "ROIC",
    expansion: "Return on Invested Capital",
    conceptId: "roic",
  },
  "P/E": { term: "P/E", expansion: "Price-to-Earnings", conceptId: "pe-ratio" },
  "D/E": {
    term: "D/E",
    expansion: "Debt-to-Equity",
    conceptId: "debt-to-equity",
  },
  FCF: {
    term: "FCF",
    expansion: "Free Cash Flow",
    conceptId: "free-cash-flow",
  },
  EPS: {
    term: "EPS",
    expansion: "Earnings Per Share",
    // The document treats EPS as a diagram building block and gives it no
    // definition of its own, so this restates only its stated arrow label.
    gloss: "Net income divided by the number of shares outstanding.",
  },
};

export interface ResolvedTerm {
  term: string;
  expansion: string;
  body: string;
}

// Resolves a term to the text a tooltip should show. Concept-backed terms read
// straight from the concept registry, so Learn and the tooltip cannot disagree.
export function resolveTerm(key: string): ResolvedTerm | null {
  const entry = TERMS[key];
  if (!entry) return null;

  const fromConcept = entry.conceptId
    ? getConceptById(entry.conceptId)?.definition
    : undefined;

  const body = fromConcept && fromConcept.length > 0 ? fromConcept : entry.gloss;
  if (!body) return null;

  return { term: entry.term, expansion: entry.expansion, body };
}

// Metric ids whose displayed NAME is an abbreviation a beginner may not know.
// Spelled-out names (Free Cash Flow, Debt-to-Equity) are deliberately absent —
// tooltips are only added where they earn their place.
export const METRIC_NAME_TERMS: Record<string, string> = {
  roe: "ROE",
  roic: "ROIC",
  eps: "EPS",
  "pe-ratio": "P/E",
  "ev-ebitda": "EBITDA",
};

// Tokens auto-linked inside formula strings. Ordered longest-first so EBITDA is
// matched before EBIT.
export const FORMULA_TERMS = ["EBITDA", "NOPAT", "COGS", "EBIT"] as const;
