import { buildCompany } from "@/data/companies/buildCompany";

// PepsiCo (PEP) — transcribed from "AIF_nasdaq10_clean_2026-09-18.xlsx".
// Percentages are DECIMALS exactly as the workbook stores them. Company notes
// are sourced from this company's own "Audit & Flags" row and the Change Log.
//
// COMPARABILITY. The audit rates PepsiCo Med: TTM EPS growth is inflated by a
// depressed FY2025 base, and ROE is raised by buyback-shrunk equity. Both are
// flagged.

const pepsico = buildCompany({
  ticker: "PEP",
  name: "PepsiCo",
  description:
    "PepsiCo produces and sells beverages and packaged snacks, with brands including Pepsi, Gatorade, Lay's and Quaker. The source workbook records it under Consumer Staples/Beverage.",
  sector: "Consumer Staples/Beverage",

  meta: {
    fiscalYear: "Jan–Dec",
    lastEarnings: "2026-07-09 (Q2 CY26)",
    nextEarnings: "2026-10-08 (est)",
    price: 129.75,
    priceAsOf: "2026-09-18 close",
    priceNote:
      "Closing price on 2026-09-18. In this snapshot P/E is price ÷ TTM diluted EPS, so P/E and the earnings yield built from it move with this price, while the fundamentals are as of the company's latest reported quarter.",
  },

  audit: {
    confidence: "Med",
    confidenceQualifier: null,
    note: "EPS growth (TTM) +39% inflated by a depressed FY2025 base (impairments); underlying adjusted growth ~mid-single-digit. High leverage (D/E 2.39, net debt -$42.5B). ROE 51.5% raised by buyback-shrunk equity. Q2 -0.45% (slight miss, adjusted).",
  },

  metrics: {
    // ── Profitability ──
    "gross-margin": { value: 0.5417, status: "reported" },
    "operating-margin": { value: 0.1604, status: "reported" },
    "net-profit-margin": { value: 0.1078, status: "reported" },
    "revenue-growth": { value: 0.0562, status: "reported" },

    // ── Valuation ──
    "eps-growth": {
      value: 0.3898,
      status: "reported",
      comparable: false,
      context:
        "The audit records TTM EPS growth of +39% as inflated by a depressed FY2025 base (impairments); underlying adjusted growth is ~mid-single-digit.",
    },
    "pe-ratio": { value: 17.01, status: "reported" },
    "earnings-yield": {
      value: 0.05878894767783656,
      status: "reported",
      context:
        "Held in the source as a live 1 / P/E formula, so it self-checks against the P/E above.",
    },
    "ev-ebitda": {
      value: 11.73,
      status: "reported",
      context:
        "The workbook lists EV/EBITDA as its known weak row: derived rather than read, so the second decimal is noise.",
    },

    // ── Returns on Capital ──
    roe: {
      value: 0.5151,
      status: "reported",
      comparable: false,
      context:
        "The audit records ROE 51.5% as raised by buyback-shrunk equity.",
    },
    "asset-turnover": { value: 0.89, status: "reported" },

    // ── Financial Health (Debt-to-Equity also renders under Returns on Capital) ──
    "debt-to-equity": {
      value: 2.39,
      status: "reported",
      context:
        "The audit records high leverage (D/E 2.39, net debt -$42.5B).",
    },
    "current-ratio": { value: 0.93, status: "reported" },

    // ── Cash Generation ──
    "free-cash-flow": { value: 9.28, status: "reported" },

    // ── Market Reaction & Risk ──
    "earnings-surprise": {
      value: -0.0045,
      status: "reported",
      accountingBasis: "non-GAAP",
      context:
        "The audit records Q2 as -0.45%: a slight miss, on an adjusted basis.",
    },
  },
});

export default pepsico;
