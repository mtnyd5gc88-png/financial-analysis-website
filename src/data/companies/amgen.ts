import { buildCompany } from "@/data/companies/buildCompany";

// Amgen (AMGN) — transcribed from "AIF_nasdaq10_clean_2026-09-18.xlsx".
// Percentages are DECIMALS exactly as the workbook stores them. Company notes
// are sourced from this company's own "Audit & Flags" row and the Change Log.
//
// COMPARABILITY. The audit rates Amgen Med: GAAP TTM EPS growth is inflated by
// a weak 2024 base, and thin equity raises ROE. Both are flagged.

const amgen = buildCompany({
  ticker: "AMGN",
  name: "Amgen",
  description:
    "Amgen is a biotechnology company that develops and manufactures medicines for serious illnesses. The source workbook records it under Biotechnology/Pharma.",
  sector: "Biotechnology/Pharma",

  meta: {
    fiscalYear: "Jan–Dec",
    lastEarnings: "2026-08-04 (Q2 CY26)",
    nextEarnings: "2026-11-02 (est)",
    price: 385.65,
    priceAsOf: "2026-09-18 close",
    priceNote:
      "Closing price on 2026-09-18. In this snapshot P/E is price ÷ TTM diluted EPS, so P/E and the earnings yield built from it move with this price, while the fundamentals are as of the company's latest reported quarter.",
  },

  audit: {
    confidence: "Med",
    confidenceQualifier: null,
    note: "EPS growth (TTM) +32% GAAP inflated by a weak 2024 base (Horizon amortization); non-GAAP underlying ~+4%. High leverage (D/E 4.90) from the Horizon acquisition; thin equity ($11.7B) raises ROE to 91%. Q2 beat +12.3%.",
  },

  metrics: {
    // ── Profitability ──
    "gross-margin": { value: 0.7189, status: "reported" },
    "operating-margin": { value: 0.334, status: "reported" },
    "net-profit-margin": { value: 0.2295, status: "reported" },
    "revenue-growth": { value: 0.091, status: "reported" },

    // ── Valuation ──
    "eps-growth": {
      value: 0.3156,
      status: "reported",
      accountingBasis: "GAAP",
      comparable: false,
      context:
        "The audit records TTM EPS growth of +32% (GAAP) as inflated by a weak 2024 base (Horizon amortization); non-GAAP underlying growth is ~+4%.",
    },
    "pe-ratio": { value: 23.97, status: "reported" },
    "earnings-yield": {
      value: 0.04171881518564873,
      status: "reported",
      context:
        "Held in the source as a live 1 / P/E formula, so it self-checks against the P/E above.",
    },
    "ev-ebitda": {
      value: 15.65,
      status: "reported",
      context:
        "The workbook lists EV/EBITDA as its known weak row: derived rather than read, so the second decimal is noise.",
    },

    // ── Returns on Capital ──
    roe: {
      value: 0.9147,
      status: "reported",
      comparable: false,
      context:
        "The audit records thin equity ($11.7B) raising ROE to 91%.",
    },
    "asset-turnover": { value: 0.42, status: "reported" },

    // ── Financial Health (Debt-to-Equity also renders under Returns on Capital) ──
    "debt-to-equity": {
      value: 4.9,
      status: "reported",
      context:
        "The audit records high leverage (D/E 4.90) from the Horizon acquisition.",
    },
    "current-ratio": { value: 1.37, status: "reported" },

    // ── Cash Generation ──
    "free-cash-flow": { value: 10.18, status: "reported" },

    // ── Market Reaction & Risk ──
    "earnings-surprise": {
      value: 0.123,
      status: "reported",
      accountingBasis: "non-GAAP",
      context:
        "The audit records a Q2 beat of +12.3%.",
    },
  },
});

export default amgen;
