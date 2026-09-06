import { buildCompany } from "@/data/companies/buildCompany";

// CrowdStrike (CRWD) — transcribed from "finance record.xlsx".
//
// ACCOUNTING BASIS — audited against CrowdStrike's OWN row in "Audit & Flags".
// This is the one company whose row labels ratios directly: "GAAP unprofitable:
// TTM net loss, so P/E, ROE, EV/EBITDA are negative or meaningless" and "GAAP
// ratios distorted". Those three named ratios therefore carry accountingBasis
// "GAAP". Net margin is NOT named in that sentence, so it stays null rather
// than being inferred. Earnings Surprise is non-GAAP: "Use non-GAAP for
// surprise", and the company "guides non-GAAP".
//
// THREE METRICS HAVE NO VALUE. P/E, EV/EBITDA and Earnings Yield are recorded
// "n/m" in the workbook — computable but meaningless on a TTM net loss. They
// are kept null with status "not-meaningful"; a missing figure is never shown
// as a number.

const crowdstrike = buildCompany({
  ticker: "CRWD",
  name: "CrowdStrike",
  description:
    "CrowdStrike provides cloud-delivered endpoint and cloud workload security software on a subscription basis. The source workbook records it under Cybersecurity/Software.",
  sector: "Cybersecurity/Software",

  meta: {
    fiscalYear: "Feb–Jan",
    lastEarnings: "2026-06-03 (Q1 FY27)",
    nextEarnings: "2026-08-26 (confirmed)",
    price: 180,
    priceAsOf: "~2026-08-21",
    priceNote:
      "Approximate closing price, used for context only — the source states it is not used to derive any of the ratios.",
  },

  audit: {
    confidence: "Low",
    confidenceQualifier: "caution",
    note: "GAAP unprofitable: TTM net loss, so P/E, ROE, EV/EBITDA are negative or meaningless (P/E ~ -1000s, EV/EBITDA ~3267 on 1.2% EBITDA margin). Company guides non-GAAP (non-GAAP EPS positive). High gross margin 75% (SaaS) and positive FCF $1.51B. The 4-for-1 split (Jul 2) makes pre-split per-share figures non-comparable. Earnings Surprise pending (reports 2026-08-26). Use non-GAAP for surprise; GAAP ratios distorted.",
  },

  metrics: {
    // ── Profitability ─────────────────────────────────────────────────────
    "gross-margin": {
      value: 0.7514,
      status: "reported",
      context:
        "The audit records this 75% gross margin as a SaaS characteristic, and does not flag it as distorted.",
    },
    "operating-margin": { value: -0.0315, status: "reported" },
    "net-profit-margin": {
      value: -0.006,
      status: "reported",
      comparable: false,
      context:
        "Negative because the audit records CrowdStrike as GAAP-unprofitable on a TTM net loss. The workbook's distortion-handling rule flags net margin for CrowdStrike under GAAP losses.",
    },
    "revenue-growth": { value: 0.2317, status: "reported" },

    // ── Valuation ─────────────────────────────────────────────────────────
    "eps-growth": {
      value: 0.8154,
      status: "reported",
      comparable: false,
      context:
        "The audit notes the 4-for-1 share split on 2 July makes pre-split per-share figures non-comparable, which affects this per-share growth rate.",
    },
    "pe-ratio": {
      value: null,
      status: "not-meaningful",
      statusNote:
        "The workbook records P/E as \"n/m\" for CrowdStrike. On a TTM net loss the ratio is negative and meaningless — the audit puts it around minus one thousands.",
      accountingBasis: "GAAP",
      comparable: false,
    },
    "earnings-yield": {
      value: null,
      status: "not-meaningful",
      statusNote:
        "The workbook records earnings yield as \"n/m\". It is held as 1 / P/E, and the method note marks it n/m wherever P/E is negative or meaningless — which it is here.",
      comparable: false,
    },
    "ev-ebitda": {
      value: null,
      status: "not-meaningful",
      statusNote:
        "The workbook records EV/EBITDA as \"n/m\" for CrowdStrike. The audit puts it around 3267 on a 1.2% EBITDA margin, which it treats as meaningless rather than high.",
      accountingBasis: "GAAP",
      comparable: false,
    },

    // ── Returns on Capital ────────────────────────────────────────────────
    roe: {
      value: -0.0025,
      status: "reported",
      accountingBasis: "GAAP",
      comparable: false,
      context:
        "Negative on a TTM net loss. The audit states GAAP ratios are distorted for CrowdStrike and names ROE among them.",
    },
    "asset-turnover": { value: 0.49, status: "reported" },

    // ── Financial Health (also renders under Returns on Capital) ──────────
    "debt-to-equity": { value: 0.18, status: "reported" },
    "current-ratio": { value: 1.53, status: "reported" },

    // ── Cash Generation ───────────────────────────────────────────────────
    "free-cash-flow": {
      value: 1.51,
      status: "reported",
      context:
        "The audit records positive free cash flow of $1.51B alongside the GAAP net loss, and does not flag it as distorted.",
    },

    // ── Market Reaction & Risk ────────────────────────────────────────────
    "earnings-surprise": {
      value: null,
      status: "pending",
      statusNote:
        "CrowdStrike had not reported its Jul/Aug 2026 quarter as of the 2026-08-23 data cutoff. Scheduled to report 2026-08-26 (confirmed).",
      accountingBasis: "non-GAAP",
      context:
        "The audit instructs using non-GAAP for the surprise: the company guides non-GAAP and its non-GAAP EPS is positive, unlike its GAAP result.",
    },
  },
});

export default crowdstrike;
