import { buildCompany } from "@/data/companies/buildCompany";

// Apple (AAPL) — transcribed from "AIF_nasdaq10_clean_2026-09-18.xlsx".
// Percentages are DECIMALS exactly as the workbook stores them. Company notes
// are sourced from this company's own "Audit & Flags" row and the Change Log.
//
// COMPARABILITY. The audit records ROE 148.75% as inflated by buyback-shrunk
// equity, so ROE is flagged. Earnings Surprise is recorded on a GAAP basis with
// a one-off included.

const apple = buildCompany({
  ticker: "AAPL",
  name: "Apple",
  description:
    "Apple designs and sells consumer hardware — iPhone, Mac, iPad and wearables — alongside a services business. The source workbook records it under Hardware/Electronics.",
  sector: "Hardware/Electronics",

  meta: {
    fiscalYear: "Oct–Sep",
    lastEarnings: "2026-07-30 (Q3 FY26)",
    nextEarnings: "2026-10-29 (est)",
    price: 336.13,
    priceAsOf: "2026-09-18 close",
    priceNote:
      "Closing price on 2026-09-18. In this snapshot P/E is price ÷ TTM diluted EPS, so P/E and the earnings yield built from it move with this price, while the fundamentals are as of the company's latest reported quarter.",
  },

  audit: {
    confidence: "Med-High",
    confidenceQualifier: null,
    note: "Q3 FY26 EPS included ~$0.11 one-off tariff refund (adj EPS $1.91 vs reported $2.02). ROE 148.75% inflated by buyback-shrunk equity.",
  },

  metrics: {
    // ── Profitability ──
    "gross-margin": { value: 0.4865, status: "reported" },
    "operating-margin": { value: 0.3317, status: "reported" },
    "net-profit-margin": { value: 0.2762, status: "reported" },
    "revenue-growth": { value: 0.1424, status: "reported" },

    // ── Valuation ──
    "eps-growth": { value: 0.3232, status: "reported" },
    "pe-ratio": { value: 38.55, status: "reported" },
    "earnings-yield": {
      value: 0.02594033722438392,
      status: "reported",
      context:
        "Held in the source as a live 1 / P/E formula, so it self-checks against the P/E above.",
    },
    "ev-ebitda": {
      value: 28.84,
      status: "reported",
      context:
        "The workbook lists EV/EBITDA as its known weak row: derived rather than read, so the second decimal is noise.",
    },

    // ── Returns on Capital ──
    roe: {
      value: 1.4875,
      status: "reported",
      comparable: false,
      context:
        "The audit records ROE 148.75% as inflated by buyback-shrunk equity.",
    },
    "asset-turnover": { value: 1.31, status: "reported" },

    // ── Financial Health (Debt-to-Equity also renders under Returns on Capital) ──
    "debt-to-equity": { value: 0.78, status: "reported" },
    "current-ratio": { value: 1, status: "reported" },

    // ── Cash Generation ──
    "free-cash-flow": { value: 136.68, status: "reported" },

    // ── Market Reaction & Risk ──
    "earnings-surprise": {
      value: 0.069,
      status: "reported",
      accountingBasis: "GAAP",
      context:
        "Recorded on a GAAP basis with one-offs included: the audit notes Q3 FY26 EPS included a ~$0.11 one-off tariff refund (adj EPS $1.91 vs reported $2.02).",
    },
  },
});

export default apple;
