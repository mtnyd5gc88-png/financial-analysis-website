import { buildCompany } from "@/data/companies/buildCompany";

// Micron Technology (MU) — transcribed from "finance record.xlsx".
//
// TIMING EXCEPTION. Micron's fiscal year ends in August, so it reports Q4 in
// late September — outside the Jul-Aug window the other nine companies share.
// The workbook therefore uses Micron's last REPORTED quarter, Q3 FY26.
//
// DATE RESOLVED FROM THE SOURCE. The "Last earnings" cell for Micron is stored
// as the raw Excel date serial 46197 rather than as text, because the cell lost
// its formatting. 46197 decodes to 2026-06-24, and the Audit & Flags row names
// that same quarter as "Q3 FY26, Jun 24". The label below therefore comes from
// the workbook itself, not from an assumption.
//
// ACCOUNTING BASIS — audited against Micron's OWN row.
// Only Earnings Surprise is labelled: "+22.55% (non-GAAP EPS $25.11 vs
// $20.28)", matching the recorded 0.2255. The row also mentions a "GAAP gross
// margin hit 84.6% in Q3", but that is a QUARTERLY figure and is not the
// recorded TTM gross margin of 72.57% — so gross margin is left unlabelled
// rather than tied to a number it does not describe.
//
// COMPARABILITY. The row ends "Treat as a cyclical outlier in cross-sectional
// comparison", so the operating figures it names as cyclical peaks are flagged
// in addition to the four the distortion-handling rule lists.

const micron = buildCompany({
  ticker: "MU",
  name: "Micron Technology",
  description:
    "Micron Technology manufactures memory and storage products, including DRAM and NAND flash. The source workbook records it under Semiconductors (Memory).",
  sector: "Semiconductors (Memory)",

  meta: {
    fiscalYear: "Sep–Aug",
    lastEarnings: "2026-06-24 (Q3 FY26)",
    nextEarnings: "2026-09-22 (Q4 FY26, est)",
    price: 964,
    priceAsOf: "~2026-08-21",
    priceNote:
      "Approximate closing price, used for context only — the source states it is not used to derive any of the ratios.",
  },

  audit: {
    confidence: "Med",
    confidenceQualifier: "timing exception + cyclical",
    note: "TIMING EXCEPTION: Micron fiscal year ends August, so it reports Q4 in late September - outside the Jul-Aug earnings window shared by the other 9 companies. Data here uses the last REPORTED quarter (Q3 FY26, Jun 24), which beat by +22.55% (non-GAAP EPS $25.11 vs $20.28). Extreme memory upcycle: TTM EPS +1381% YoY, GAAP gross margin hit 84.6% in Q3, stock +673% in 52 weeks. These figures are cyclical peaks, not a stable baseline - memory pricing is highly volatile, so current margins/ROE (56%/67%) and growth (+1381%) will likely normalize. Treat as a cyclical outlier in cross-sectional comparison.",
  },

  metrics: {
    // ── Profitability ─────────────────────────────────────────────────────
    "gross-margin": {
      value: 0.7257,
      status: "reported",
      comparable: false,
      context:
        "A cyclical peak rather than a stable baseline, on the audit's reading of an extreme memory upcycle. The audit separately quotes a GAAP gross margin of 84.6% for Q3 alone — a quarterly figure, not this TTM one.",
    },
    "operating-margin": {
      value: 0.6567,
      status: "reported",
      comparable: false,
      context:
        "The audit records current margins as cyclical peaks that will likely normalise, since memory pricing is highly volatile.",
    },
    "net-profit-margin": {
      value: 0.5591,
      status: "reported",
      comparable: false,
      context:
        "Matches the audit's record of current margins at about 56%, which it describes as a cyclical peak rather than a stable baseline.",
    },
    "revenue-growth": {
      value: 1,
      status: "reported",
      comparable: false,
      context:
        "Growth recorded during what the audit calls an extreme memory upcycle, and which it expects to normalise.",
    },

    // ── Valuation ─────────────────────────────────────────────────────────
    "eps-growth": {
      value: 13.811,
      status: "reported",
      comparable: false,
      context:
        "Matches the audit's record of TTM EPS up 1381% year on year. It states plainly that this will likely normalise and is not a stable baseline.",
    },
    "pe-ratio": {
      value: 21.43,
      status: "reported",
      comparable: false,
      context:
        "A low multiple against peak-cycle earnings. The workbook's distortion-handling rule flags P/E for Micron under cyclical peaks.",
    },
    "earnings-yield": {
      value: 0.04666355576294914,
      status: "reported",
      context:
        "The workbook records earnings yield as 1 / P/E; this value matches the P/E above, which rests on peak-cycle earnings.",
    },
    "ev-ebitda": {
      value: 15.37,
      status: "reported",
      comparable: false,
      context:
        "The workbook's distortion-handling rule flags EV/EBITDA for Micron under cyclical peaks.",
    },

    // ── Returns on Capital ────────────────────────────────────────────────
    roe: {
      value: 0.6664,
      status: "reported",
      comparable: false,
      context:
        "Matches the audit's record of ROE at about 67%, which it describes as a cyclical peak that will likely normalise.",
    },
    "asset-turnover": { value: 0.7, status: "reported" },

    // ── Financial Health (also renders under Returns on Capital) ──────────
    "debt-to-equity": { value: 0.06, status: "reported" },
    "current-ratio": { value: 3.42, status: "reported" },

    // ── Cash Generation ───────────────────────────────────────────────────
    "free-cash-flow": { value: 26.17, status: "reported" },

    // ── Market Reaction & Risk ────────────────────────────────────────────
    "earnings-surprise": {
      value: 0.2255,
      status: "reported",
      accountingBasis: "non-GAAP",
      basis: "Q3 FY26, the last reported quarter",
      context:
        "The audit records this as a +22.55% beat on non-GAAP EPS of $25.11 against $20.28. Note the timing exception: this is Q3 FY26 reported on 24 June, not a Jul/Aug quarter like the rest of the cohort.",
    },
  },
});

export default micron;
