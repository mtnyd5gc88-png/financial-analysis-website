import { buildCompany } from "@/data/companies/buildCompany";

// Workday (WDAY) — transcribed from "finance record.xlsx".
//
// ACCOUNTING BASIS — audited against Workday's OWN row in "Audit & Flags".
// This row ties a basis directly to two recorded figures, so both are labelled:
//   • "modest GAAP net margin 8.6%"        -> matches the recorded 0.086
//   • "GAAP EPS volatile ... so TTM P/E ~49" -> matches the recorded 49.02
// EPS growth is described as "off an SBC-depressed base", which implies GAAP
// but never says so; it is therefore left null rather than inferred.
//
// COMPARABILITY. Workday is NOT one of the companies named in the workbook's
// distortion-handling rule, so nothing is flagged on that basis. The two flags
// below come from its own row: the P/E is called "unstable" and EPS growth is
// measured off a depressed base.

const workday = buildCompany({
  ticker: "WDAY",
  name: "Workday",
  description:
    "Workday provides cloud applications for human resources and finance, sold by subscription. The source workbook records it under Software/HR-Finance Cloud.",
  sector: "Software/HR-Finance Cloud",

  meta: {
    fiscalYear: "Feb–Jan",
    lastEarnings: "2026-05-22 (Q1 FY27)",
    nextEarnings: "2026-08-26 (est)",
    price: 200,
    priceAsOf: "~2026-08-21",
    priceNote:
      "Approximate closing price, used for context only — the source states it is not used to derive any of the ratios.",
  },

  audit: {
    confidence: "Med-High",
    confidenceQualifier: null,
    note: "Clean SaaS with modest GAAP net margin 8.6% (high SBC compresses GAAP). Gross margin 75.8%, positive FCF ~$2.8B. GAAP EPS volatile quarter to quarter due to SBC and tax items (prior quarters swung widely), so TTM P/E ~49 is unstable; forward P/E ~12-18. EPS growth +78% is off an SBC-depressed base. Subject of PE-buyout speculation (Silver Lake) in 2026. Earnings Surprise pending (Aug report).",
  },

  metrics: {
    // ── Profitability ─────────────────────────────────────────────────────
    "gross-margin": { value: 0.7577, status: "reported" },
    "operating-margin": { value: 0.1035, status: "reported" },
    "net-profit-margin": {
      value: 0.086,
      status: "reported",
      accountingBasis: "GAAP",
      context:
        "The audit labels this figure directly as a GAAP net margin of 8.6%, and records it as modest because high stock-based compensation compresses GAAP results. The company is otherwise described as clean SaaS.",
    },
    "revenue-growth": { value: 0.1332, status: "reported" },

    // ── Valuation ─────────────────────────────────────────────────────────
    "eps-growth": {
      value: 0.7833,
      status: "reported",
      comparable: false,
      context:
        "The audit records this +78% as measured off a base depressed by stock-based compensation, so the growth rate reflects the starting point as much as the improvement.",
    },
    "pe-ratio": {
      value: 49.02,
      status: "reported",
      accountingBasis: "GAAP",
      comparable: false,
      context:
        "Built on GAAP EPS, which the audit records as volatile quarter to quarter because of stock-based compensation and tax items. It calls this TTM P/E unstable and notes a forward P/E of roughly 12-18.",
    },
    "earnings-yield": {
      value: 0.02039983680130559,
      status: "reported",
      context:
        "The workbook records earnings yield as 1 / P/E; this value matches the P/E above, which the audit calls unstable.",
    },
    "ev-ebitda": { value: 22.84, status: "reported" },

    // ── Returns on Capital ────────────────────────────────────────────────
    roe: { value: 0.0823, status: "reported" },
    "asset-turnover": { value: 0.37, status: "reported" },

    // ── Financial Health (also renders under Returns on Capital) ──────────
    "debt-to-equity": { value: 0.49, status: "reported" },
    "current-ratio": { value: 1.32, status: "reported" },

    // ── Cash Generation ───────────────────────────────────────────────────
    "free-cash-flow": {
      value: 2.78,
      status: "reported",
      context: "The audit records free cash flow as positive at around $2.8B.",
    },

    // ── Market Reaction & Risk ────────────────────────────────────────────
    "earnings-surprise": {
      value: null,
      status: "pending",
      statusNote:
        "Workday had not reported its Jul/Aug 2026 quarter as of the 2026-08-23 data cutoff. The workbook records the scheduled date as 2026-08-26 (estimated).",
      accountingBasis: "non-GAAP",
      context:
        "The workbook computes surprise on the non-GAAP/adjusted basis where a company guides non-GAAP. Workday has not yet reported, so this states the basis the figure will use rather than one already observed.",
    },
  },
});

export default workday;
