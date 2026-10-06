import { buildCompany } from "@/data/companies/buildCompany";

// Tesla (TSLA) — transcribed from "AIF_nasdaq10_clean_2026-09-18.xlsx".
// Percentages are DECIMALS exactly as the workbook stores them. Company notes
// are sourced from this company's own "Audit & Flags" row and the Change Log.
//
// COMPARABILITY. The audit rates Tesla Low (caution): earnings collapsed, so
// P/E is near-meaningless and EV/EBITDA similarly distorted. Both are flagged.
// The workbook calls Tesla the case where P/E breaks down.

const tesla = buildCompany({
  ticker: "TSLA",
  name: "Tesla",
  description:
    "Tesla designs and manufactures electric vehicles, battery energy storage systems and solar products. The source workbook records it under Automotive/Clean Energy.",
  sector: "Automotive/Clean Energy",

  meta: {
    fiscalYear: "Jan–Dec",
    lastEarnings: "2026-07-22 (Q2 CY26)",
    nextEarnings: "2026-10-21 or 10-28 (est)",
    price: 364.27,
    priceAsOf: "2026-09-18 close",
    priceNote:
      "Closing price on 2026-09-18. In this snapshot P/E is price ÷ TTM diluted EPS, so P/E and the earnings yield built from it move with this price, while the fundamentals are as of the company's latest reported quarter.",
  },

  audit: {
    confidence: "Low",
    confidenceQualifier: "caution",
    note: "P/E near-meaningless: earnings collapsed (TTM EPS $1.08, net margin 3.7%), so P/E ~300+ and ranges 270-340 across sources by share-count/date convention. EV/EBITDA ~117 similarly distorted. Q2 EPS miss -35%. The case where P/E breaks down.",
  },

  metrics: {
    // ── Profitability ──
    "gross-margin": { value: 0.1885, status: "reported" },
    "operating-margin": { value: 0.0413, status: "reported" },
    "net-profit-margin": { value: 0.0367, status: "reported" },
    "revenue-growth": { value: 0.1176, status: "reported" },

    // ── Valuation ──
    "eps-growth": { value: -0.3533, status: "reported" },
    "pe-ratio": {
      value: 337.29,
      status: "reported",
      comparable: false,
      context:
        "The audit calls this near-meaningless: earnings collapsed (TTM EPS $1.08, net margin 3.7%), so P/E is ~300+ and ranges 270-340 across sources by share-count/date convention. The workbook describes Tesla as the case where P/E breaks down.",
    },
    "earnings-yield": {
      value: 0.0029648077322185656,
      status: "reported",
      context:
        "Held in the source as a live 1 / P/E formula, so it self-checks against the P/E above. The audit flags that P/E as near-meaningless for Tesla.",
    },
    "ev-ebitda": {
      value: 130.2,
      status: "reported",
      comparable: false,
      context:
        "The audit records Tesla's EV/EBITDA as similarly distorted. The workbook lists EV/EBITDA as its known weak row: derived rather than read, so the second decimal is noise.",
    },

    // ── Returns on Capital ──
    roe: { value: 0.0467, status: "reported" },
    "asset-turnover": { value: 0.75, status: "reported" },

    // ── Financial Health (Debt-to-Equity also renders under Returns on Capital) ──
    "debt-to-equity": { value: 0.18, status: "reported" },
    "current-ratio": { value: 1.94, status: "reported" },

    // ── Cash Generation ──
    "free-cash-flow": { value: 5.76, status: "reported" },

    // ── Market Reaction & Risk ──
    "earnings-surprise": {
      value: -0.353,
      status: "reported",
      accountingBasis: "non-GAAP",
      context:
        "The audit records a Q2 EPS miss of -35%.",
    },
  },
});

export default tesla;
