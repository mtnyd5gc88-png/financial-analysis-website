import { buildCompany } from "@/data/companies/buildCompany";

// Microsoft (MSFT) — transcribed from "AIF_nasdaq10_clean_2026-09-18.xlsx".
// Percentages are DECIMALS exactly as the workbook stores them. Company notes
// are sourced from this company's own "Audit & Flags" row and the Change Log.
//
// The audit rates Microsoft Med-High with a minor distortion only; no figure is
// flagged as non-comparable.

const microsoft = buildCompany({
  ticker: "MSFT",
  name: "Microsoft",
  description:
    "Microsoft develops software, cloud services and devices, including Windows, Microsoft 365 and the Azure cloud platform. The source workbook records it under Software/Cloud.",
  sector: "Software/Cloud",

  meta: {
    fiscalYear: "Jul–Jun",
    lastEarnings: "2026-07-29 (Q4 FY26)",
    nextEarnings: "2026-10-28 (est)",
    price: 493.78,
    priceAsOf: "2026-09-18 close",
    priceNote:
      "Closing price on 2026-09-18. In this snapshot P/E is price ÷ TTM diluted EPS, so P/E and the earnings yield built from it move with this price, while the fundamentals are as of the company's latest reported quarter.",
  },

  audit: {
    confidence: "Med-High",
    confidenceQualifier: null,
    note: "Q4 FY26 EPS partly aided by a $3.2B Anthropic gain and lower voluntary-retirement costs. Minor distortion.",
  },

  metrics: {
    // ── Profitability ──
    "gross-margin": { value: 0.6794, status: "reported" },
    "operating-margin": { value: 0.4678, status: "reported" },
    "net-profit-margin": { value: 0.4031, status: "reported" },
    "revenue-growth": { value: 0.1779, status: "reported" },

    // ── Valuation ──
    "eps-growth": { value: 0.316, status: "reported" },
    "pe-ratio": { value: 27.51, status: "reported" },
    "earnings-yield": {
      value: 0.03635041802980734,
      status: "reported",
      context:
        "Held in the source as a live 1 / P/E formula, so it self-checks against the P/E above.",
    },
    "ev-ebitda": {
      value: 19.19,
      status: "reported",
      context:
        "The workbook lists EV/EBITDA as its known weak row: derived rather than read, so the second decimal is noise.",
    },

    // ── Returns on Capital ──
    roe: { value: 0.3404, status: "reported" },
    "asset-turnover": { value: 0.48, status: "reported" },

    // ── Financial Health (Debt-to-Equity also renders under Returns on Capital) ──
    "debt-to-equity": { value: 0.29, status: "reported" },
    "current-ratio": { value: 1.23, status: "reported" },

    // ── Cash Generation ──
    "free-cash-flow": { value: 66.99, status: "reported" },

    // ── Market Reaction & Risk ──
    "earnings-surprise": {
      value: 0.118,
      status: "reported",
      accountingBasis: "non-GAAP",
      context:
        "The audit records Q4 FY26 EPS as partly aided by a $3.2B Anthropic gain and lower voluntary-retirement costs - a minor distortion.",
    },
  },
});

export default microsoft;
