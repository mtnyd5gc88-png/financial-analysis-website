import { buildCompany } from "@/data/companies/buildCompany";

// NVIDIA Corporation (NVDA) — transcribed from "AIF_nasdaq10_clean_2026-09-18.xlsx".
// Percentages are DECIMALS exactly as the workbook stores them. Company notes
// are sourced from this company's own "Audit & Flags" row and the Change Log.
//
// The audit rates NVIDIA High and records two real changes since the prior
// snapshot (D/E 0.07 -> 0.17; asset turnover ~1.32 -> ~0.84) rather than data
// refreshes. No figure is flagged as distorted.

const nvidia = buildCompany({
  ticker: "NVDA",
  name: "NVIDIA Corporation",
  description:
    "NVIDIA designs and manufactures graphics processing units (GPUs) and system-on-chip units. It is a dominant supplier of AI accelerator hardware.",
  sector: "Semiconductors",

  meta: {
    fiscalYear: "Feb–Jan",
    lastEarnings: "2026-08-26 (Q2 FY27)",
    nextEarnings: "2026-11 (est, unconfirmed)",
    price: 222.27,
    priceAsOf: "2026-09-18 close",
    priceNote:
      "Closing price on 2026-09-18. In this snapshot P/E is price ÷ TTM diluted EPS, so P/E and the earnings yield built from it move with this price, while the fundamentals are as of the company's latest reported quarter.",
  },

  audit: {
    confidence: "High",
    confidenceQualifier: null,
    note: "Surprise no longer pending: Q2 FY27 beat +6.2% (non-GAAP $2.22 vs $2.09) and revenue +4.5%. TWO REAL CHANGES, not data refreshes: (1) D/E rose 0.07 -> 0.17, total debt now $38.86B - NVIDIA levered up. (2) Total assets roughly doubled, so asset turnover fell ~1.32 -> ~0.84. P/E fell 34.3 -> 28.1 while every fundamental improved: earnings outran the price. Best single teaching case in the table.",
  },

  metrics: {
    // ── Profitability ──
    "gross-margin": { value: 0.7467, status: "reported" },
    "operating-margin": { value: 0.6521, status: "reported" },
    "net-profit-margin": { value: 0.6366, status: "reported" },
    "revenue-growth": { value: 0.8338, status: "reported" },

    // ── Valuation ──
    "eps-growth": { value: 1.2528, status: "reported" },
    "pe-ratio": {
      value: 28.1,
      status: "reported",
      context:
        "The audit records P/E falling 34.3 -> 28.1 while every fundamental improved: earnings outran the price.",
    },
    "earnings-yield": {
      value: 0.03558718861209964,
      status: "reported",
      context:
        "Held in the source as a live 1 / P/E formula, so it self-checks against the P/E above.",
    },
    "ev-ebitda": {
      value: 26,
      status: "reported",
      context:
        "The workbook lists EV/EBITDA as its known weak row: derived rather than read, so the second decimal is noise.",
    },

    // ── Returns on Capital ──
    roe: { value: 1.1721, status: "reported" },
    "asset-turnover": {
      value: 0.84,
      status: "reported",
      context:
        "The workbook's Change Log marks this figure DERIVED - VERIFY: back-solved from ROA 53.57% / net margin 63.66%. The audit records total assets roughly doubling, so asset turnover fell ~1.32 -> ~0.84.",
    },

    // ── Financial Health (Debt-to-Equity also renders under Returns on Capital) ──
    "debt-to-equity": {
      value: 0.17,
      status: "reported",
      context:
        "The audit records D/E rising 0.07 -> 0.17, with total debt now $38.86B - NVIDIA levered up.",
    },
    "current-ratio": { value: 4.59, status: "reported" },

    // ── Cash Generation ──
    "free-cash-flow": { value: 127.01, status: "reported" },

    // ── Market Reaction & Risk ──
    "earnings-surprise": {
      value: 0.0622,
      status: "reported",
      accountingBasis: "non-GAAP",
      context:
        "The audit records the Q2 FY27 beat as +6.2% (non-GAAP $2.22 vs $2.09).",
    },
  },
});

export default nvidia;
