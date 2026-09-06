import { buildCompany } from "@/data/companies/buildCompany";

// NVIDIA — the validated prototype record.
//
// Values are transcribed from the "Metrics" sheet of "finance record.xlsx" and
// left exactly as the source stores them: percentages are DECIMALS (0.7415 =
// 74.15%). Nothing is derived, estimated or rounded. Concept content (name,
// formula) is NOT repeated here — it is read from the concept registry through
// each metric's id, so the terminology document stays the single source.
//
// ACCOUNTING BASIS — read before adding another company.
// NVIDIA's own row in "Audit & Flags" states no accounting basis: it says
// "No distortion... ROE 114% reflects capital-light model, not distortion" and
// never uses the words GAAP or non-GAAP. So `accountingBasis` is null on every
// NVIDIA figure. A metric being one that is *usually* computed from GAAP
// statements is not evidence about this record, and the workbook shows the
// basis genuinely varies by company. Later records are audited against their
// OWN rows and must not inherit NVIDIA's nulls as a finding about them.
//
// The single exception is Earnings Surprise, governed by the explicit
// workbook-wide rule in "Sources & Method".

const nvidia = buildCompany({
  ticker: "NVDA",
  name: "NVIDIA Corporation",
  description:
    "NVIDIA designs and manufactures graphics processing units (GPUs) and system-on-chip units. It is a dominant supplier of AI accelerator hardware.",
  sector: "Semiconductors",

  meta: {
    fiscalYear: "Feb–Jan",
    lastEarnings: "2026-05-28 (Q1 FY27)",
    nextEarnings: "2026-08-26 (confirmed)",
    price: 214.72,
    priceAsOf: "~2026-08-21",
    priceNote:
      "Approximate closing price, used for context only — the source states it is not used to derive any of the ratios.",
  },

  audit: {
    confidence: "High",
    confidenceQualifier: null,
    note: "No distortion. Very high margins (GM 74%, NM 63%). Earnings Surprise pending (reports 2026-08-26). ROE 114% reflects capital-light model, not distortion.",
  },

  metrics: {
    // ── Profitability ─────────────────────────────────────────────────────
    "gross-margin": { value: 0.7415, status: "reported" },
    "operating-margin": { value: 0.6402, status: "reported" },
    "net-profit-margin": { value: 0.6297, status: "reported" },
    "revenue-growth": { value: 0.7068, status: "reported" },

    // ── Valuation ─────────────────────────────────────────────────────────
    "eps-growth": { value: 1.1064, status: "reported" },
    "pe-ratio": { value: 33.65, status: "reported" },
    "earnings-yield": {
      // Held in the workbook as a live =1/P-E formula; the cached result is
      // kept at full precision and rounded only at render time.
      value: 0.029717682020802379,
      status: "reported",
      context:
        "Held in the source as a live 1 / P/E formula, so it self-checks against the P/E above.",
    },
    "ev-ebitda": { value: 31.79, status: "reported" },

    // ── Returns on Capital ────────────────────────────────────────────────
    roe: {
      value: 1.1429,
      status: "reported",
      context:
        "The audit records this 114% as reflecting NVIDIA's capital-light model, not a distortion.",
    },
    "asset-turnover": { value: 1.32, status: "reported" },

    // ── Financial Health (Debt-to-Equity also renders under Returns on
    //    Capital, from this same single value) ──────────────────────────────
    "debt-to-equity": { value: 0.07, status: "reported" },
    "current-ratio": { value: 3.44, status: "reported" },

    // ── Cash Generation ───────────────────────────────────────────────────
    "free-cash-flow": { value: 119.08, status: "reported" },

    // ── Market Reaction & Risk ────────────────────────────────────────────
    "earnings-surprise": {
      value: null,
      status: "pending",
      statusNote:
        "NVIDIA had not reported its Jul/Aug 2026 quarter as of the 2026-08-23 data cutoff. Scheduled to report 2026-08-26 (confirmed).",
      context:
        "The workbook computes surprise as (Actual EPS - consensus EPS)/|consensus|, non-GAAP/adjusted where the company guides non-GAAP. NVIDIA has not yet reported, so this states the basis the figure will use rather than one already observed.",
      accountingBasis: "non-GAAP",
    },
  },
});

export default nvidia;
