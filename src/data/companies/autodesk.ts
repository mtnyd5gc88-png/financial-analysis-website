import { buildCompany } from "@/data/companies/buildCompany";

// Autodesk (ADSK) — transcribed from "finance record.xlsx".
//
// ACCOUNTING BASIS — audited against Autodesk's OWN row in "Audit & Flags".
// The row never uses the words GAAP or non-GAAP, so every accountingBasis is
// null except Earnings Surprise, which the workbook-wide rule governs.
//
// NOTE ON THE CURRENT RATIO. At 0.83 it is below 1, which normally reads as a
// warning. The audit explicitly says the opposite for Autodesk: it is "normal
// for a subscription business carrying large deferred revenue, not a liquidity
// problem". That wording is carried through so the figure is not misread.

const autodesk = buildCompany({
  ticker: "ADSK",
  name: "Autodesk",
  description:
    "Autodesk develops design, engineering and construction software, sold largely by subscription. The source workbook records it under Software/Design.",
  sector: "Software/Design",

  meta: {
    fiscalYear: "Feb–Jan",
    lastEarnings: "2026-05-28 (Q1 FY27)",
    nextEarnings: "2026-08-27 (confirmed)",
    price: 209.75,
    priceAsOf: "~2026-08-21",
    priceNote:
      "Approximate closing price, used for context only — the source states it is not used to derive any of the ratios.",
  },

  audit: {
    confidence: "High",
    confidenceQualifier: null,
    note: "Clean SaaS profile: very high gross margin 91%, net margin 19.5%, strong FCF. Current ratio 0.83 (<1) is normal for a subscription business carrying large deferred revenue, not a liquidity problem. ROE 50% is elevated by buyback-shrunk equity and the debt-funded $3.6B MaintainX acquisition (D/E rose to 0.85). Earnings Surprise pending (reports 2026-08-27).",
  },

  metrics: {
    // ── Profitability ─────────────────────────────────────────────────────
    "gross-margin": {
      value: 0.9114,
      status: "reported",
      context:
        "The audit describes a clean SaaS profile with a very high gross margin around 91%.",
    },
    "operating-margin": { value: 0.2509, status: "reported" },
    "net-profit-margin": {
      value: 0.1949,
      status: "reported",
      comparable: false,
      context:
        "The audit describes the profile as clean at a net margin of 19.5%, but the workbook's distortion-handling rule still flags net margin for Autodesk under acquisition integration (MaintainX).",
    },
    "revenue-growth": { value: 0.042, status: "reported" },

    // ── Valuation ─────────────────────────────────────────────────────────
    "eps-growth": { value: 0.0108, status: "reported" },
    "pe-ratio": {
      value: 36.25,
      status: "reported",
      comparable: false,
      context:
        "The workbook's distortion-handling rule flags P/E for Autodesk under acquisition integration (MaintainX).",
    },
    "earnings-yield": {
      value: 0.027586206896551724,
      status: "reported",
      context:
        "The workbook records earnings yield as 1 / P/E; this value matches the P/E above.",
    },
    "ev-ebitda": {
      value: 24.21,
      status: "reported",
      comparable: false,
      context:
        "The workbook's distortion-handling rule flags EV/EBITDA for Autodesk under acquisition integration (MaintainX).",
    },

    // ── Returns on Capital ────────────────────────────────────────────────
    roe: {
      value: 0.504,
      status: "reported",
      comparable: false,
      context:
        "The audit records this 50% as elevated by buyback-shrunk equity and by the debt-funded $3.6B MaintainX acquisition, rather than by an operating improvement.",
    },
    "asset-turnover": { value: 0.62, status: "reported" },

    // ── Financial Health (also renders under Returns on Capital) ──────────
    "debt-to-equity": {
      value: 0.85,
      status: "reported",
      context:
        "The audit records that debt-to-equity rose to 0.85 on the debt-funded $3.6B MaintainX acquisition.",
    },
    "current-ratio": {
      value: 0.83,
      status: "reported",
      context:
        "Below 1, but the audit records this as normal for a subscription business carrying large deferred revenue — not a liquidity problem.",
    },

    // ── Cash Generation ───────────────────────────────────────────────────
    "free-cash-flow": {
      value: 2.32,
      status: "reported",
      context: "The audit records free cash flow as strong.",
    },

    // ── Market Reaction & Risk ────────────────────────────────────────────
    "earnings-surprise": {
      value: null,
      status: "pending",
      statusNote:
        "Autodesk had not reported its Jul/Aug 2026 quarter as of the 2026-08-23 data cutoff. Scheduled to report 2026-08-27 (confirmed).",
      accountingBasis: "non-GAAP",
      context:
        "The workbook computes surprise on the non-GAAP/adjusted basis where a company guides non-GAAP. Autodesk has not yet reported, so this states the basis the figure will use rather than one already observed.",
    },
  },
});

export default autodesk;
