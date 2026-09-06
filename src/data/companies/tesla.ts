import { buildCompany } from "@/data/companies/buildCompany";

// Tesla (TSLA) — transcribed from "finance record.xlsx".
// Percentages are DECIMALS exactly as the workbook stores them.
//
// ACCOUNTING BASIS — audited against Tesla's OWN row in "Audit & Flags".
// The only basis the workbook attaches to a Tesla figure is on Earnings
// Surprise: "Q2 non-GAAP EPS miss -38%", which matches the recorded -0.3813.
// The row also says "GAAP net income included $1.0B unrealised SpaceX gain
// (excluded from non-GAAP)", but it never labels the recorded net margin, P/E
// or ROE as GAAP, so those stay null rather than being inferred.
//
// COMPARABILITY. The workbook's "Distortion handling" rule flags P/E,
// EV/EBITDA, ROE and net margin for Tesla under "collapsed earnings".

const tesla = buildCompany({
  ticker: "TSLA",
  name: "Tesla",
  description:
    "Tesla designs and manufactures electric vehicles, battery energy storage systems and solar products. The source workbook records it under Automotive/Clean Energy.",
  sector: "Automotive/Clean Energy",

  meta: {
    fiscalYear: "Jan–Dec",
    lastEarnings: "2026-07-22 (Q2 CY26)",
    nextEarnings: "2026-10-28 (est)",
    price: 333.76,
    priceAsOf: "~2026-08-21",
    priceNote:
      "Approximate closing price, used for context only — the source states it is not used to derive any of the ratios.",
  },

  audit: {
    confidence: "Low",
    confidenceQualifier: "caution",
    note: "P/E near-meaningless: TTM EPS $1.08, net margin 3.7%, so P/E ~350 and ranges 277-384 across sources by price/EPS date. EV/EBITDA ~121 similarly distorted. Q2 non-GAAP EPS miss -38%. GAAP net income included $1.0B unrealised SpaceX gain (excluded from non-GAAP). Regulatory credits collapsed to $146M (from $439M yr ago). The case where P/E breaks down.",
  },

  metrics: {
    // ── Profitability ─────────────────────────────────────────────────────
    "gross-margin": { value: 0.1885, status: "reported" },
    "operating-margin": { value: 0.0413, status: "reported" },
    "net-profit-margin": {
      value: 0.0367,
      status: "reported",
      comparable: false,
      context:
        "The audit records TTM EPS of $1.08 and net margin 3.7%, with regulatory credits collapsed to $146M from $439M a year earlier. The workbook's distortion-handling rule flags net margin for Tesla under collapsed earnings.",
    },
    "revenue-growth": { value: 0.1175, status: "reported" },

    // ── Valuation ─────────────────────────────────────────────────────────
    "eps-growth": { value: -0.056, status: "reported" },
    "pe-ratio": {
      value: 349.58,
      status: "reported",
      comparable: false,
      context:
        "The audit calls this near-meaningless: TTM EPS $1.08 and net margin 3.7% put P/E around 350, and it ranges 277-384 across sources depending on the price and EPS date. The workbook describes Tesla as the case where P/E breaks down.",
    },
    "earnings-yield": {
      value: 0.0028605755478002177,
      status: "reported",
      context:
        "Held in the source as a live 1 / P/E formula, so it self-checks against the P/E above — which the audit flags as near-meaningless for Tesla.",
    },
    "ev-ebitda": {
      value: 121.16,
      status: "reported",
      comparable: false,
      context: "The audit records EV/EBITDA ~121 as similarly distorted.",
    },

    // ── Returns on Capital ────────────────────────────────────────────────
    roe: {
      value: 0.0467,
      status: "reported",
      comparable: false,
      context:
        "The workbook's distortion-handling rule flags ROE for Tesla under collapsed earnings.",
    },
    "asset-turnover": { value: 0.73, status: "reported" },

    // ── Financial Health (also renders under Returns on Capital) ──────────
    "debt-to-equity": { value: 0.18, status: "reported" },
    "current-ratio": { value: 1.94, status: "reported" },

    // ── Cash Generation ───────────────────────────────────────────────────
    "free-cash-flow": { value: 5.76, status: "reported" },

    // ── Market Reaction & Risk ────────────────────────────────────────────
    "earnings-surprise": {
      value: -0.3813,
      status: "reported",
      accountingBasis: "non-GAAP",
      context:
        "The audit records this as the Q2 non-GAAP EPS miss of -38%. GAAP net income included a $1.0B unrealised SpaceX gain that is excluded from non-GAAP.",
    },
  },
});

export default tesla;
