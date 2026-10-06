import { buildCompany } from "@/data/companies/buildCompany";

// Amazon (AMZN) — transcribed from "AIF_nasdaq10_clean_2026-09-18.xlsx".
// Percentages are DECIMALS exactly as the workbook stores them. Company notes
// are sourced from this company's own "Audit & Flags" row and the Change Log.
//
// COMPARABILITY. The audit rates Amazon Low (caution): a $53.4B Anthropic gain
// in Q2 GAAP EPS makes the Earnings Surprise a one-off, inverts net margin
// above operating margin, and inflates ROE and EPS growth. All four are flagged.

const amazon = buildCompany({
  ticker: "AMZN",
  name: "Amazon",
  description:
    "Amazon operates online retail and marketplace businesses alongside Amazon Web Services, its cloud computing platform. The source workbook records it under E-commerce+Cloud.",
  sector: "E-commerce+Cloud",

  meta: {
    fiscalYear: "Jan–Dec",
    lastEarnings: "2026-07-30 (Q2 CY26)",
    nextEarnings: "2026-10-29 (est)",
    price: 253.71,
    priceAsOf: "2026-09-18 close",
    priceNote:
      "Closing price on 2026-09-18. In this snapshot P/E is price ÷ TTM diluted EPS, so P/E and the earnings yield built from it move with this price, while the fundamentals are as of the company's latest reported quarter.",
  },

  audit: {
    confidence: "Low",
    confidenceQualifier: "caution",
    note: "Severe. Q2 GAAP EPS $5.75 includes a $53.4B Anthropic gain, so the +214% surprise is a one-off, not operating (real operating surprise ~flat). Net margin 17.4% > operating margin 12.1% (inversion). ROE and EPS growth also inflated. FCF -$11.6B (AI capex $173B > OCF $161B).",
  },

  metrics: {
    // ── Profitability ──
    "gross-margin": { value: 0.5077, status: "reported" },
    "operating-margin": { value: 0.1208, status: "reported" },
    "net-profit-margin": {
      value: 0.1744,
      status: "reported",
      comparable: false,
      context:
        "The audit records net margin 17.4% > operating margin 12.1% (inversion), in a period whose GAAP earnings include a $53.4B Anthropic gain.",
    },
    "revenue-growth": { value: 0.1577, status: "reported" },

    // ── Valuation ──
    "eps-growth": {
      value: 0.8992,
      status: "reported",
      comparable: false,
      context:
        "The audit records EPS growth as inflated by the one-off Anthropic gain.",
    },
    "pe-ratio": { value: 20.41, status: "reported" },
    "earnings-yield": {
      value: 0.04899559039686428,
      status: "reported",
      context:
        "Held in the source as a live 1 / P/E formula, so it self-checks against the P/E above.",
    },
    "ev-ebitda": {
      value: 17.02,
      status: "reported",
      context:
        "The workbook lists EV/EBITDA as its known weak row: derived rather than read, so the second decimal is noise.",
    },

    // ── Returns on Capital ──
    roe: {
      value: 0.3056,
      status: "reported",
      comparable: false,
      context:
        "The audit records ROE as inflated by the one-off Anthropic gain.",
    },
    "asset-turnover": { value: 0.87, status: "reported" },

    // ── Financial Health (Debt-to-Equity also renders under Returns on Capital) ──
    "debt-to-equity": { value: 0.46, status: "reported" },
    "current-ratio": { value: 1.03, status: "reported" },

    // ── Cash Generation ──
    "free-cash-flow": {
      value: -11.63,
      status: "reported",
      context:
        "The audit records FCF of -$11.6B: AI capex $173B exceeded operating cash flow $161B.",
    },

    // ── Market Reaction & Risk ──
    "earnings-surprise": {
      value: 2.14,
      status: "reported",
      accountingBasis: "GAAP",
      comparable: false,
      context:
        "The audit records Q2 GAAP EPS $5.75 as including a $53.4B Anthropic gain, so the +214% surprise is a one-off, not operating (real operating surprise ~flat).",
    },
  },
});

export default amazon;
