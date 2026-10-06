import { buildCompany } from "@/data/companies/buildCompany";

// Alphabet (GOOGL) — transcribed from "AIF_nasdaq10_clean_2026-09-18.xlsx".
// Percentages are DECIMALS exactly as the workbook stores them. Company notes
// are sourced from this company's own "Audit & Flags" row and the Change Log.
//
// COMPARABILITY. The audit rates Alphabet Low (caution): a ~$99B
// equity-securities gain in Q2 GAAP EPS makes the Earnings Surprise a one-off
// and inflates net margin, ROE and EPS growth; P/E looks artificially low.

const alphabet = buildCompany({
  ticker: "GOOGL",
  name: "Alphabet",
  description:
    "Alphabet is the parent company of Google, with businesses in search and advertising, YouTube and Google Cloud. The source workbook records it under Advertising/Comms.",
  sector: "Advertising/Comms",

  meta: {
    fiscalYear: "Jan–Dec",
    lastEarnings: "2026-07-22 (Q2 CY26)",
    nextEarnings: "2026-10-28 (est)",
    price: 349.54,
    priceAsOf: "2026-09-18 close",
    priceNote:
      "Closing price on 2026-09-18. In this snapshot P/E is price ÷ TTM diluted EPS, so P/E and the earnings yield built from it move with this price, while the fundamentals are as of the company's latest reported quarter.",
  },

  audit: {
    confidence: "Low",
    confidenceQualifier: "caution",
    note: "Severe. Q2 GAAP EPS $9.11 includes a ~$99B equity-securities gain (Anthropic + SpaceX), so the +215% surprise is a one-off. Net margin 54.8%, ROE 48.7%, EPS growth +112% all inflated. P/E 17.78 looks artificially low.",
  },

  metrics: {
    // ── Profitability ──
    "gross-margin": { value: 0.609, status: "reported" },
    "operating-margin": { value: 0.3311, status: "reported" },
    "net-profit-margin": {
      value: 0.5477,
      status: "reported",
      comparable: false,
      context:
        "The audit records net margin 54.8% as inflated by the one-off equity-securities gain.",
    },
    "revenue-growth": { value: 0.2005, status: "reported" },

    // ── Valuation ──
    "eps-growth": {
      value: 1.1203,
      status: "reported",
      comparable: false,
      context:
        "The audit records EPS growth +112% as inflated by the one-off equity-securities gain.",
    },
    "pe-ratio": {
      value: 17.54,
      status: "reported",
      comparable: false,
      context:
        "The audit records this P/E as looking artificially low, because earnings include the one-off gain.",
    },
    "earnings-yield": {
      value: 0.05701254275940707,
      status: "reported",
      context:
        "Held in the source as a live 1 / P/E formula, so it self-checks against the P/E above. The audit flags that P/E as artificially low for Alphabet.",
    },
    "ev-ebitda": {
      value: 23.98,
      status: "reported",
      context:
        "The workbook lists EV/EBITDA as its known weak row: derived rather than read, so the second decimal is noise.",
    },

    // ── Returns on Capital ──
    roe: {
      value: 0.4868,
      status: "reported",
      comparable: false,
      context:
        "The audit records ROE 48.7% as inflated by the one-off equity-securities gain.",
    },
    "asset-turnover": { value: 0.63, status: "reported" },

    // ── Financial Health (Debt-to-Equity also renders under Returns on Capital) ──
    "debt-to-equity": { value: 0.19, status: "reported" },
    "current-ratio": { value: 2.72, status: "reported" },

    // ── Cash Generation ──
    "free-cash-flow": { value: 53.27, status: "reported" },

    // ── Market Reaction & Risk ──
    "earnings-surprise": {
      value: 2.15,
      status: "reported",
      accountingBasis: "GAAP",
      comparable: false,
      context:
        "The audit records Q2 GAAP EPS $9.11 as including a ~$99B equity-securities gain (Anthropic + SpaceX), so the +215% surprise is a one-off.",
    },
  },
});

export default alphabet;
