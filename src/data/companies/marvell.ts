import { buildCompany } from "@/data/companies/buildCompany";

// Marvell Technology (MRVL) — transcribed from "finance record.xlsx".
//
// ACCOUNTING BASIS — audited against Marvell's OWN row in "Audit & Flags".
// The row never uses the words GAAP or non-GAAP about a recorded figure, so
// every accountingBasis is null. The one exception is Earnings Surprise, where
// the row says "use non-GAAP" and the workbook-wide rule applies.
//
// The headline teaching point here is an inversion the audit calls out
// directly: net margin (28.99%) EXCEEDS operating margin (16.41%), because a
// large one-off tax benefit sits in TTM net income.

const marvell = buildCompany({
  ticker: "MRVL",
  name: "Marvell Technology",
  description:
    "Marvell Technology designs data infrastructure semiconductors for data centre, carrier, enterprise networking and automotive markets. The source workbook records it under Semiconductors.",
  sector: "Semiconductors",

  meta: {
    fiscalYear: "Feb–Jan",
    lastEarnings: "2026-05-29 (Q1 FY27)",
    nextEarnings: "2026-08-27 (confirmed)",
    price: 187.56,
    priceAsOf: "~2026-08-21",
    priceNote:
      "Approximate closing price, used for context only — the source states it is not used to derive any of the ratios.",
  },

  audit: {
    confidence: "Med",
    confidenceQualifier: "caution",
    note: "Net margin 28.99% EXCEEDS operating margin 16.41% (inversion) - driven by a large one-off tax benefit in TTM net income, so P/E 60 and ROE 16% overstate underlying profitability. P/E ranges 60-101 across sources and turned negative in prior quarters, showing earnings instability. EPS growth +610% is off a weak/negative base. Gross margin 51.5% and FCF $1.67B are clean. Earnings Surprise pending (reports 2026-08-27); use non-GAAP.",
  },

  metrics: {
    // ── Profitability ─────────────────────────────────────────────────────
    "gross-margin": {
      value: 0.515,
      status: "reported",
      context:
        "The audit records gross margin of 51.5% as clean, and does not flag it as distorted.",
    },
    "operating-margin": {
      value: 0.1641,
      status: "reported",
      context:
        "Read this against net margin below: the audit records net margin (28.99%) as exceeding operating margin (16.41%), an inversion caused by a large one-off tax benefit in TTM net income.",
    },
    "net-profit-margin": {
      value: 0.2899,
      status: "reported",
      comparable: false,
      context:
        "The audit records this as exceeding the operating margin above — an inversion driven by a large one-off tax benefit in TTM net income, so it overstates underlying profitability.",
    },
    "revenue-growth": { value: 0.3407, status: "reported" },

    // ── Valuation ─────────────────────────────────────────────────────────
    "eps-growth": {
      value: 6.1053,
      status: "reported",
      comparable: false,
      context:
        "The audit records this +610% as measured off a weak or negative prior-year base, so the growth rate reflects the starting point as much as the improvement.",
    },
    "pe-ratio": {
      value: 60.45,
      status: "reported",
      comparable: false,
      context:
        "The audit records that the one-off tax benefit makes this P/E overstate underlying profitability. It ranges 60-101 across sources and turned negative in prior quarters, showing earnings instability.",
    },
    "earnings-yield": {
      value: 0.016542597187758478,
      status: "reported",
      context:
        "Held in the source as a live 1 / P/E formula, so it self-checks against the P/E above — which the audit records as overstating underlying profitability.",
    },
    "ev-ebitda": {
      value: 58.76,
      status: "reported",
      comparable: false,
      context:
        "The workbook's distortion-handling rule flags EV/EBITDA for Marvell under one-off tax benefits.",
    },

    // ── Returns on Capital ────────────────────────────────────────────────
    roe: {
      value: 0.1603,
      status: "reported",
      comparable: false,
      context:
        "The audit records that the one-off tax benefit in TTM net income makes this 16% ROE overstate underlying profitability.",
    },
    "asset-turnover": { value: 0.37, status: "reported" },

    // ── Financial Health (also renders under Returns on Capital) ──────────
    "debt-to-equity": { value: 0.29, status: "reported" },
    "current-ratio": { value: 3.28, status: "reported" },

    // ── Cash Generation ───────────────────────────────────────────────────
    "free-cash-flow": {
      value: 1.67,
      status: "reported",
      context:
        "The audit records free cash flow of $1.67B as clean, and does not flag it as distorted.",
    },

    // ── Market Reaction & Risk ────────────────────────────────────────────
    "earnings-surprise": {
      value: null,
      status: "pending",
      statusNote:
        "Marvell had not reported its Jul/Aug 2026 quarter as of the 2026-08-23 data cutoff. Scheduled to report 2026-08-27 (confirmed).",
      accountingBasis: "non-GAAP",
      context:
        "The audit instructs using non-GAAP for the surprise when this quarter is reported.",
    },
  },
});

export default marvell;
