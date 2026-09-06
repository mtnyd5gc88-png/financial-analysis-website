import { buildCompany } from "@/data/companies/buildCompany";

// Analog Devices (ADI) — transcribed from "finance record.xlsx".
//
// ACCOUNTING BASIS — audited against ADI's OWN row in "Audit & Flags".
// Two figures are labelled directly, and both are non-GAAP:
//   • Earnings Surprise 0.033  -> "Adjusted EPS $3.45 vs $3.34 consensus (+3.3%)"
//   • EPS growth 0.68          -> "adjusted +68% is the cleaner figure",
//                                 explicitly NOT the GAAP +163%
// This is the clearest evidence in the workbook that EPS growth cannot be
// assumed GAAP across companies.
//
// The recorded gross and operating margins (65.8% and 40.1%) are NOT the
// adjusted figures the audit quotes (72.5% and 50%), so those are left
// unlabelled — the difference is surfaced as context instead.

const analogDevices = buildCompany({
  ticker: "ADI",
  name: "Analog Devices",
  description:
    "Analog Devices designs analog, mixed-signal and power management semiconductors for industrial, automotive, communications and consumer markets. The source workbook records it under Semiconductors (Analog/Mixed-signal).",
  sector: "Semiconductors (Analog/Mixed-signal)",

  meta: {
    fiscalYear: "Nov–Oct",
    lastEarnings: "2026-08-19 (Q3 FY26, REPORTED)",
    nextEarnings: "2026-11 (Q4 FY26, est)",
    price: 376.34,
    priceAsOf: "~2026-08-21",
    priceNote:
      "Approximate closing price, used for context only — the source states it is not used to derive any of the ratios.",
  },

  audit: {
    confidence: "High",
    confidenceQualifier: null,
    note: "REPORTED 2026-08-19: clean beat. Adjusted EPS $3.45 vs $3.34 consensus (+3.3%); GAAP EPS $2.74 vs ~$2.59 (+5.8%). Revenue $4.02B +40% YoY. High margins (adj GM 72.5%, adj OM 50%), FCF TTM $4.9B (36% of revenue). GAAP EPS +163% is amplified by a weak prior-year base and non-recurring items; adjusted +68% is the cleaner figure. Empower Semiconductor acq ($1.5B) closed Jul 7 - minor near-term impact. Note: had a cybersecurity incident June 2026 (no material financial impact reported). Some TTM ratios (P/E, ROE, EV/EBITDA) pending final confirmation.",
  },

  metrics: {
    // ── Profitability ─────────────────────────────────────────────────────
    "gross-margin": {
      value: 0.658,
      status: "reported",
      context:
        "The audit separately quotes an adjusted gross margin of 72.5%. The figure recorded here is not that adjusted number, so the two are not interchangeable.",
    },
    "operating-margin": {
      value: 0.401,
      status: "reported",
      context:
        "The audit separately quotes an adjusted operating margin of 50%. The figure recorded here is not that adjusted number, so the two are not interchangeable.",
    },
    "net-profit-margin": {
      value: 0.33,
      status: "reported",
      comparable: false,
      context:
        "The workbook's distortion-handling rule flags net margin for Analog Devices under acquisition integration (Empower).",
    },
    "revenue-growth": {
      value: 0.4,
      status: "reported",
      context:
        "Matches the audit's record of revenue at $4.02B, up 40% year on year.",
    },

    // ── Valuation ─────────────────────────────────────────────────────────
    "eps-growth": {
      value: 0.68,
      status: "reported",
      accountingBasis: "non-GAAP",
      context:
        "This is the adjusted figure. The audit records GAAP EPS growth of +163% as amplified by a weak prior-year base and non-recurring items, and calls adjusted +68% the cleaner figure — so the number recorded here is deliberately not the GAAP one.",
    },
    "pe-ratio": {
      value: 44.3,
      status: "reported",
      comparable: false,
      context:
        "The workbook's distortion-handling rule flags P/E for Analog Devices under acquisition integration (Empower), and the audit notes some TTM ratios including P/E are pending final confirmation.",
    },
    "earnings-yield": {
      value: 0.022573363431151242,
      status: "reported",
      context:
        "The workbook records earnings yield as 1 / P/E; this value matches the P/E above.",
    },
    "ev-ebitda": {
      value: 27.1,
      status: "reported",
      comparable: false,
      context:
        "The workbook's distortion-handling rule flags EV/EBITDA for Analog Devices under acquisition integration (Empower), and the audit notes it is pending final confirmation.",
    },

    // ── Returns on Capital ────────────────────────────────────────────────
    roe: {
      value: 0.1223,
      status: "reported",
      comparable: false,
      context:
        "The workbook's distortion-handling rule flags ROE for Analog Devices under acquisition integration (Empower), and the audit notes it is pending final confirmation.",
    },
    "asset-turnover": { value: 0.3, status: "reported" },

    // ── Financial Health (also renders under Returns on Capital) ──────────
    "debt-to-equity": { value: 0.27, status: "reported" },
    "current-ratio": { value: 1.25, status: "reported" },

    // ── Cash Generation ───────────────────────────────────────────────────
    "free-cash-flow": {
      value: 4.94,
      status: "reported",
      context:
        "Matches the audit's record of TTM free cash flow at $4.9B, around 36% of revenue.",
    },

    // ── Market Reaction & Risk ────────────────────────────────────────────
    "earnings-surprise": {
      value: 0.033,
      status: "reported",
      accountingBasis: "non-GAAP",
      context:
        "One of only three surprises actually reported in this cohort. The audit records it as adjusted EPS of $3.45 against a $3.34 consensus, a beat of 3.3%. On a GAAP basis the same quarter beat by 5.8% ($2.74 vs about $2.59), so the basis changes the answer.",
    },
  },
});

export default analogDevices;
