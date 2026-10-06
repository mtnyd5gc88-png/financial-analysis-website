import { buildCompany } from "@/data/companies/buildCompany";

// Costco (COST) — transcribed from "AIF_nasdaq10_clean_2026-09-18.xlsx".
// Percentages are DECIMALS exactly as the workbook stores them. Company notes
// are sourced from this company's own "Audit & Flags" row and the Change Log.
//
// The audit rates Costco High and clean. Its D/E is recorded excluding
// operating leases (0.25, against ~0.60 lease-inclusive).

const costco = buildCompany({
  ticker: "COST",
  name: "Costco",
  description:
    "Costco operates membership-only warehouse clubs selling groceries and general merchandise. The source workbook records it under Consumer Staples/Retail.",
  sector: "Consumer Staples/Retail",

  meta: {
    fiscalYear: "Sep–Aug",
    lastEarnings: "2026-05-28 (Q3 FY26)",
    nextEarnings: "2026-09-24 (confirmed)",
    price: 895.31,
    priceAsOf: "2026-09-18 close",
    priceNote:
      "Closing price on 2026-09-18. In this snapshot P/E is price ÷ TTM diluted EPS, so P/E and the earnings yield built from it move with this price, while the fundamentals are as of the company's latest reported quarter.",
  },

  audit: {
    confidence: "High",
    confidenceQualifier: null,
    note: "Clean. Low margins (GM 12.9%, NM 3.0%) offset by high asset turnover (3.63) - opposite DuPont profile to the tech names. Earnings Surprise ~0% (in-line, GAAP $4.93 vs $4.93). D/E ex-leases 0.25; lease-inclusive ~0.60.",
  },

  metrics: {
    // ── Profitability ──
    "gross-margin": { value: 0.1288, status: "reported" },
    "operating-margin": { value: 0.0382, status: "reported" },
    "net-profit-margin": { value: 0.0301, status: "reported" },
    "revenue-growth": { value: 0.0923, status: "reported" },

    // ── Valuation ──
    "eps-growth": { value: 0.1276, status: "reported" },
    "pe-ratio": { value: 45.04, status: "reported" },
    "earnings-yield": {
      value: 0.022202486678507993,
      status: "reported",
      context:
        "Held in the source as a live 1 / P/E formula, so it self-checks against the P/E above.",
    },
    "ev-ebitda": {
      value: 27.94,
      status: "reported",
      context:
        "The workbook lists EV/EBITDA as its known weak row: derived rather than read, so the second decimal is noise.",
    },

    // ── Returns on Capital ──
    roe: { value: 0.2915, status: "reported" },
    "asset-turnover": {
      value: 3.63,
      status: "reported",
      context:
        "The audit notes low margins (GM 12.9%, NM 3.0%) offset by high asset turnover (3.63) - the opposite DuPont profile to the tech names.",
    },

    // ── Financial Health (Debt-to-Equity also renders under Returns on Capital) ──
    "debt-to-equity": {
      value: 0.25,
      status: "reported",
      context:
        "Recorded on financial debt only: the audit gives D/E ex-leases 0.25, against ~0.60 lease-inclusive.",
    },
    "current-ratio": { value: 1.07, status: "reported" },

    // ── Cash Generation ──
    "free-cash-flow": { value: 8.81, status: "reported" },

    // ── Market Reaction & Risk ──
    "earnings-surprise": {
      value: 0,
      status: "reported",
      accountingBasis: "GAAP",
      context:
        "The audit records the quarter as in-line: GAAP $4.93 vs $4.93, an Earnings Surprise of ~0%.",
    },
  },
});

export default costco;
