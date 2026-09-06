import type {
  CategoryRelationship,
  ConceptRelationship,
  DiagramNode,
} from "@/data/types";

// Every edge below is taken from a diagram or a stated formula in
// "AIF terminology final.docx". Arrow labels are the document's own wording.
//
// The document's legend, applied literally:
//   flow (solid)         — an accounting or economic flow.
//   definitional (dashed) — a mathematical or definitional relationship.
//
// Nothing here asserts causation the document does not draw as a solid arrow.
// In particular, the only causal claim in Market Reaction & Risk is that an
// earnings SURPRISE drives a re-pricing — never that high earnings raise a
// price. The document is explicit: "Prices move on surprises, not on results
// themselves — the expectation was already priced in."

// Inputs the diagrams picture but never define as concepts. These stay
// non-navigable so the 20 core / 8 building-block split is preserved.
export const DIAGRAM_NODES: DiagramNode[] = [
  { id: "enterprise-value", label: "Enterprise Value" },
  { id: "ebitda", label: "EBITDA" },
  { id: "equity-multiplier", label: "Equity Multiplier" },
  { id: "nopat", label: "NOPAT" },
  { id: "invested-capital", label: "Invested Capital" },
  { id: "total-assets", label: "Total Assets" },
  { id: "shareholders-equity", label: "Shareholders' Equity" },
  { id: "total-debt", label: "Total Debt" },
  { id: "equity", label: "Equity" },
  { id: "ebit", label: "EBIT" },
  { id: "interest-expense", label: "Interest Expense" },
  { id: "current-assets", label: "Current Assets" },
  { id: "current-liabilities", label: "Current Liabilities" },
  { id: "dividends", label: "Dividends" },
  { id: "buybacks", label: "Buybacks" },
  { id: "debt-paydown", label: "Debt Paydown" },
  { id: "reinvestment", label: "Reinvestment" },
];

export const CONCEPT_RELATIONSHIPS: ConceptRelationship[] = [
  // ── 1 · Profitability — the income-statement waterfall ──────────────────
  // "Revenue flows down the solid spine, losing a cost layer at each step;
  //  each margin (dashed) is that level divided by revenue."
  { from: "revenue", to: "gross-profit", kind: "flow", label: "− COGS", basis: "diagram", categoryId: "profitability" },
  { from: "gross-profit", to: "operating-income", kind: "flow", label: "− Operating Exp.", basis: "diagram", categoryId: "profitability" },
  { from: "operating-income", to: "net-income", kind: "flow", label: "− Interest, Tax", basis: "diagram", categoryId: "profitability" },
  { from: "revenue", to: "revenue-growth", kind: "definitional", label: "YoY % change", basis: "diagram", categoryId: "profitability" },
  { from: "gross-profit", to: "gross-margin", kind: "definitional", label: "÷ Revenue", basis: "diagram", categoryId: "profitability" },
  { from: "operating-income", to: "operating-margin", kind: "definitional", label: "÷ Revenue", basis: "diagram", categoryId: "profitability" },
  { from: "net-income", to: "net-profit-margin", kind: "definitional", label: "÷ Revenue", basis: "diagram", categoryId: "profitability" },

  // ── 2 · Valuation — turning earnings into a price ───────────────────────
  // "Net income becomes EPS, which anchors the whole valuation web."
  { from: "net-income", to: "eps", kind: "flow", label: "÷ Shares", basis: "diagram", categoryId: "valuation" },
  { from: "eps", to: "pe-ratio", kind: "definitional", label: "Price ÷ EPS", basis: "diagram", categoryId: "valuation" },
  { from: "pe-ratio", to: "earnings-yield", kind: "definitional", label: "= 1 ÷ P/E", basis: "diagram", categoryId: "valuation" },
  { from: "eps", to: "eps-growth", kind: "definitional", label: "YoY %", basis: "diagram", categoryId: "valuation" },
  { from: "pe-ratio", to: "peg-ratio", kind: "definitional", label: "÷ EPS Growth", basis: "diagram", categoryId: "valuation" },
  { from: "eps-growth", to: "peg-ratio", kind: "definitional", label: "growth input", basis: "diagram", categoryId: "valuation" },
  { from: "enterprise-value", to: "ev-ebitda", kind: "definitional", label: "÷ EBITDA", basis: "diagram", categoryId: "valuation" },
  { from: "ebitda", to: "ev-ebitda", kind: "definitional", label: "÷ EBITDA", basis: "diagram", categoryId: "valuation" },

  // ── 3 · Returns on Capital — the DuPont identity ────────────────────────
  // "ROE = Net Profit Margin × Asset Turnover × Equity Multiplier"
  { from: "debt-to-equity", to: "equity-multiplier", kind: "definitional", label: "= 1 + D/E", basis: "diagram", categoryId: "returns-on-capital" },
  { from: "net-profit-margin", to: "roe", kind: "definitional", label: "×", basis: "diagram", categoryId: "returns-on-capital" },
  { from: "asset-turnover", to: "roe", kind: "definitional", label: "×", basis: "diagram", categoryId: "returns-on-capital" },
  { from: "equity-multiplier", to: "roe", kind: "definitional", label: "×", basis: "diagram", categoryId: "returns-on-capital" },
  { from: "nopat", to: "roic", kind: "definitional", label: "÷ Invested Capital", basis: "diagram", categoryId: "returns-on-capital" },
  { from: "invested-capital", to: "roic", kind: "definitional", label: "÷ Invested Capital", basis: "diagram", categoryId: "returns-on-capital" },
  // Read off the stated formulas rather than drawn in the section diagram.
  { from: "net-income", to: "roe", kind: "definitional", label: "÷ Shareholders' Equity", basis: "formula", categoryId: "returns-on-capital" },
  { from: "shareholders-equity", to: "roe", kind: "definitional", label: "÷ Shareholders' Equity", basis: "formula", categoryId: "returns-on-capital" },
  { from: "revenue", to: "asset-turnover", kind: "definitional", label: "÷ Total Assets", basis: "formula", categoryId: "returns-on-capital" },
  { from: "total-assets", to: "asset-turnover", kind: "definitional", label: "÷ Total Assets", basis: "formula", categoryId: "returns-on-capital" },

  // ── 4 · Financial Health — the risk ladder ──────────────────────────────
  // "leverage (D/E) drives interest obligations; interest coverage tests
  //  whether operating profit can meet them; the current ratio checks
  //  short-term survival."
  { from: "total-debt", to: "debt-to-equity", kind: "definitional", label: "÷ Equity", basis: "diagram", categoryId: "financial-health" },
  { from: "equity", to: "debt-to-equity", kind: "definitional", label: "÷ Equity", basis: "diagram", categoryId: "financial-health" },
  { from: "debt-to-equity", to: "interest-expense", kind: "flow", label: "more debt → interest", basis: "diagram", categoryId: "financial-health" },
  { from: "ebit", to: "interest-coverage", kind: "definitional", label: "÷ Interest Exp.", basis: "diagram", categoryId: "financial-health" },
  { from: "interest-expense", to: "interest-coverage", kind: "definitional", label: "÷ Interest Exp.", basis: "diagram", categoryId: "financial-health" },
  { from: "current-assets", to: "current-ratio", kind: "definitional", label: "÷ Curr. Liab.", basis: "diagram", categoryId: "financial-health" },
  { from: "current-liabilities", to: "current-ratio", kind: "definitional", label: "÷ Curr. Liab.", basis: "diagram", categoryId: "financial-health" },

  // ── 5 · Cash Generation — free cash flow and what it funds ──────────────
  // "what funds dividends, buybacks, debt repayment and reinvestment"
  { from: "operating-cash-flow", to: "free-cash-flow", kind: "flow", label: "− Capex", basis: "diagram", categoryId: "cash-generation" },
  { from: "capex", to: "free-cash-flow", kind: "flow", label: "(−)", basis: "diagram", categoryId: "cash-generation" },
  { from: "free-cash-flow", to: "dividends", kind: "flow", label: "funds", basis: "diagram", categoryId: "cash-generation" },
  { from: "free-cash-flow", to: "buybacks", kind: "flow", label: "funds", basis: "diagram", categoryId: "cash-generation" },
  { from: "free-cash-flow", to: "debt-paydown", kind: "flow", label: "funds", basis: "diagram", categoryId: "cash-generation" },
  { from: "free-cash-flow", to: "reinvestment", kind: "flow", label: "funds", basis: "diagram", categoryId: "cash-generation" },

  // ── 6 · Market Reaction & Risk ──────────────────────────────────────────
  // "An earnings surprise (solid) drives a price move; from that move we
  //  isolate the abnormal return by removing the market's own move (dashed)
  //  and observe elevated post-earnings volatility. Beta measures exactly the
  //  market component that abnormal return strips out."
  { from: "earnings-surprise", to: "stock-price-movement", kind: "flow", label: "beat/miss → re-pricing", basis: "diagram", categoryId: "market-reaction-and-risk" },
  { from: "stock-price-movement", to: "post-earnings-volatility", kind: "flow", label: "uncertainty → swings", basis: "diagram", categoryId: "market-reaction-and-risk" },
  { from: "stock-price-movement", to: "abnormal-return", kind: "definitional", label: "stock − market (QQQ)", basis: "diagram", categoryId: "market-reaction-and-risk" },
  { from: "beta", to: "abnormal-return", kind: "definitional", label: "market component", basis: "diagram", categoryId: "market-reaction-and-risk" },
];

// The master map's arrows between categories. No `kind`: the document
// describes these in prose and its arrow styling is not recoverable from text.
export const CATEGORY_RELATIONSHIPS: CategoryRelationship[] = [
  { from: "profitability", to: "market-reaction-and-risk", label: "earnings vs. expectations" },
  { from: "profitability", to: "valuation", label: "earnings → multiples" },
  { from: "profitability", to: "returns-on-capital", label: "profit / capital" },
  { from: "cash-generation", to: "valuation", label: "FCF underpins value" },
  { from: "cash-generation", to: "returns-on-capital", label: "cash on capital" },
  { from: "financial-health", to: "returns-on-capital", label: "leverage amplifies ROE" },
];

export function relationshipsForCategory(categoryId: string) {
  return CONCEPT_RELATIONSHIPS.filter((r) => r.categoryId === categoryId);
}

// Every edge touching a concept, in either direction.
export function relationshipsForConcept(conceptId: string) {
  return CONCEPT_RELATIONSHIPS.filter(
    (r) => r.from === conceptId || r.to === conceptId
  );
}

export function diagramNodeLabel(id: string): string | null {
  return DIAGRAM_NODES.find((n) => n.id === id)?.label ?? null;
}
