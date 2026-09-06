import { buildCompany } from "@/data/companies/buildCompany";

// Synopsys (SNPS) — transcribed from "finance record.xlsx".
//
// ACCOUNTING BASIS — audited against Synopsys' OWN row in "Audit & Flags".
// Every accountingBasis is null, and for EV/EBITDA that is a positive finding
// rather than an absence of evidence: the row states the multiple runs "33-68
// depending on EBITDA basis", so the workbook explicitly declines to fix one
// basis. Labelling it would assert a precision the source disclaims. Earnings
// Surprise follows the workbook-wide non-GAAP rule, reinforced here by
// "Compare on adjusted/non-GAAP for like-for-like".
//
// The 2026 Ansys acquisition distorts most of this record: revenue rose on
// consolidation while earnings fell on integration costs and a larger share
// count, so growth and multiples are flagged.

const synopsys = buildCompany({
  ticker: "SNPS",
  name: "Synopsys",
  description:
    "Synopsys supplies electronic design automation software, semiconductor IP and verification tools used to design chips. The source workbook records it under Software/EDA Semiconductors.",
  sector: "Software/EDA Semiconductors",

  meta: {
    fiscalYear: "Nov–Oct",
    lastEarnings: "2026-05-27 (Q2 FY26)",
    nextEarnings: "2026-08-26 (confirmed)",
    price: 500,
    priceAsOf: "~2026-08-21",
    priceNote:
      "Approximate closing price, used for context only — the source states it is not used to derive any of the ratios.",
  },

  audit: {
    confidence: "Med",
    confidenceQualifier: "caution",
    note: "Financials distorted by the 2026 Ansys acquisition: revenue jumped ~40% YoY from consolidation, but net income fell -41% and EPS -68% on integration/amortization costs and a larger share count (+11.6%). So TTM P/E ~83 and EV/EBITDA (33-68 depending on EBITDA basis) overstate the multiple versus a normalized year; forward P/E ~35. Debt rose materially (net debt ~-$8.7B). Gross margin 73-82% depending on cost allocation. Earnings Surprise pending (reports 2026-08-26). Compare on adjusted/non-GAAP for like-for-like.",
  },

  metrics: {
    // ── Profitability ─────────────────────────────────────────────────────
    "gross-margin": {
      value: 0.8202,
      status: "reported",
      comparable: false,
      context:
        "The audit records gross margin as 73-82% depending on cost allocation. The figure recorded here sits at the top of that range, so it is not a single settled number.",
    },
    "operating-margin": { value: 0.1229, status: "reported" },
    "net-profit-margin": {
      value: 0.1376,
      status: "reported",
      comparable: false,
      context:
        "The audit records net income as down 41% on integration and amortisation costs from the 2026 Ansys acquisition, so this margin reflects acquisition accounting rather than a normalised year.",
    },
    "revenue-growth": {
      value: 0.4,
      status: "reported",
      comparable: false,
      context:
        "The audit records that revenue jumped around 40% year on year from consolidating Ansys, so this growth is acquisition-driven rather than organic.",
    },

    // ── Valuation ─────────────────────────────────────────────────────────
    "eps-growth": {
      value: -0.6842,
      status: "reported",
      comparable: false,
      context:
        "The audit records EPS down 68% on integration and amortisation costs and a share count up 11.6% after the Ansys acquisition.",
    },
    "pe-ratio": {
      value: 82.66,
      status: "reported",
      comparable: false,
      context:
        "The audit records that this TTM P/E overstates the multiple versus a normalised year because of the Ansys acquisition, and notes a forward P/E of roughly 35.",
    },
    "earnings-yield": {
      value: 0.012097749818533753,
      status: "reported",
      context:
        "The workbook records earnings yield as 1 / P/E; this value matches the P/E above, which the audit records as overstated versus a normalised year.",
    },
    "ev-ebitda": {
      value: 67.6,
      status: "reported",
      comparable: false,
      context:
        "The audit records this multiple as running anywhere from 33 to 68 depending on which EBITDA basis is used, and as overstating the multiple versus a normalised year. No single accounting basis is established for it.",
    },

    // ── Returns on Capital ────────────────────────────────────────────────
    roe: {
      value: 0.0554,
      status: "reported",
      comparable: false,
      context:
        "The workbook's distortion-handling rule flags ROE for Synopsys under acquisition integration (Ansys).",
    },
    "asset-turnover": { value: 0.17, status: "reported" },

    // ── Financial Health (also renders under Returns on Capital) ──────────
    "debt-to-equity": {
      value: 0.36,
      status: "reported",
      context:
        "The audit records that debt rose materially around the Ansys acquisition, putting net debt at roughly -$8.7B.",
    },
    "current-ratio": { value: 1.36, status: "reported" },

    // ── Cash Generation ───────────────────────────────────────────────────
    "free-cash-flow": { value: 2.28, status: "reported" },

    // ── Market Reaction & Risk ────────────────────────────────────────────
    "earnings-surprise": {
      value: null,
      status: "pending",
      statusNote:
        "Synopsys had not reported its Jul/Aug 2026 quarter as of the 2026-08-23 data cutoff. Scheduled to report 2026-08-26 (confirmed).",
      accountingBasis: "non-GAAP",
      context:
        "The audit instructs comparing Synopsys on an adjusted/non-GAAP basis for like-for-like, which is also how the workbook computes the surprise.",
    },
  },
});

export default synopsys;
