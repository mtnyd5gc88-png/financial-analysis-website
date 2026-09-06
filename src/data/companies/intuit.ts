import { buildCompany } from "@/data/companies/buildCompany";

// Intuit (INTU) — transcribed from "finance record.xlsx".
//
// ACCOUNTING BASIS — audited against Intuit's OWN row in "Audit & Flags".
// Two figures are labelled directly, and they disagree with each other:
//   • P/E 21.0        -> "P/E ~21 (GAAP)"
//   • EPS growth 0.18 -> "non-GAAP EPS growth stays ~18%"
// The same company therefore carries a GAAP multiple and a non-GAAP growth
// rate in the same record. This is exactly why basis is never assumed here.
//
// EV/EBITDA IS "n/a" IN THE WORKBOOK — the workbook simply holds no value for
// it. That is a different state from "n/m" (not meaningful): the source does
// not say the ratio would be meaningless, only that it is not recorded. It is
// kept null with status "not-available".

const intuit = buildCompany({
  ticker: "INTU",
  name: "Intuit",
  description:
    "Intuit develops financial and tax software for consumers, the self-employed and small businesses, including TurboTax and QuickBooks. The source workbook records it under Software/Fintech.",
  sector: "Software/Fintech",

  meta: {
    fiscalYear: "Aug–Jul",
    lastEarnings: "2026-05-20 (Q3 FY26)",
    nextEarnings: "2026-08-25 (confirmed)",
    price: 364,
    priceAsOf: "~2026-08-21",
    priceNote:
      "Approximate closing price, used for context only — the source states it is not used to derive any of the ratios.",
  },

  audit: {
    confidence: "Med",
    confidenceQualifier: null,
    note: "Stock fell ~47% over 52 weeks after cutting TurboTax FY26 revenue guidance (IRS filings decline) and announcing a 17% workforce cut with $300-340M restructuring charges. So GAAP EPS carries one-off restructuring drag while non-GAAP EPS growth stays ~18%; P/E ~21 (GAAP) vs low-teens forward. Clean SaaS profitability underneath (net margin ~22%, ROE ~22%). Earnings Surprise pending (Q4 reports 2026-08-25); last 4 quarters beat EPS by ~4.5% avg. Some TTM ratios estimated pending final source confirmation.",
  },

  metrics: {
    // ── Profitability ─────────────────────────────────────────────────────
    "gross-margin": { value: 0.8, status: "reported" },
    "operating-margin": { value: 0.27, status: "reported" },
    "net-profit-margin": {
      value: 0.2191,
      status: "reported",
      comparable: false,
      context:
        "The audit describes clean SaaS profitability underneath at a net margin of about 22%, but the workbook's distortion-handling rule still flags net margin for Intuit under restructuring charges.",
    },
    "revenue-growth": { value: 0.135, status: "reported" },

    // ── Valuation ─────────────────────────────────────────────────────────
    "eps-growth": {
      value: 0.18,
      status: "reported",
      accountingBasis: "non-GAAP",
      context:
        "The audit labels this figure directly: GAAP EPS carries a one-off restructuring drag while non-GAAP EPS growth stays at about 18%. The number recorded here is the non-GAAP one, even though the P/E in the same record is GAAP.",
    },
    "pe-ratio": {
      value: 21,
      status: "reported",
      accountingBasis: "GAAP",
      comparable: false,
      context:
        "The audit labels this figure directly as GAAP, and records a forward P/E in the low teens. The GAAP earnings behind it carry $300-340M of restructuring charges from a 17% workforce reduction.",
    },
    "earnings-yield": {
      value: 0.047619047619047616,
      status: "reported",
      context:
        "The workbook records earnings yield as 1 / P/E; this value matches the GAAP P/E above.",
    },
    "ev-ebitda": {
      value: null,
      status: "not-available",
      statusNote:
        "The workbook records EV/EBITDA as \"n/a\" for Intuit — it simply holds no value for this ratio. That is a different state from \"not meaningful\": the source does not say the ratio would be meaningless if computed, only that it is not recorded here.",
      comparable: false,
    },

    // ── Returns on Capital ────────────────────────────────────────────────
    roe: {
      value: 0.222,
      status: "reported",
      comparable: false,
      context:
        "The audit records ROE of about 22% as part of clean SaaS profitability underneath, but notes some TTM ratios are estimated pending final source confirmation.",
    },
    "asset-turnover": { value: 0.5, status: "reported" },

    // ── Financial Health (also renders under Returns on Capital) ──────────
    "debt-to-equity": { value: 0.35, status: "reported" },
    "current-ratio": { value: 1.3, status: "reported" },

    // ── Cash Generation ───────────────────────────────────────────────────
    "free-cash-flow": { value: 5.6, status: "reported" },

    // ── Market Reaction & Risk ────────────────────────────────────────────
    "earnings-surprise": {
      value: null,
      status: "pending",
      statusNote:
        "Intuit's Q4 had not been reported as of the 2026-08-23 data cutoff. Scheduled to report 2026-08-25 (confirmed). The audit notes Q3 was done but Q4 was still outstanding.",
      accountingBasis: "non-GAAP",
      context:
        "The audit records that the last four quarters beat EPS by about 4.5% on average. That is history, not a figure for this quarter — no surprise is recorded until the quarter reports.",
    },
  },
});

export default intuit;
