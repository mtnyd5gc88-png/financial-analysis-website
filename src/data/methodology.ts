import type { Methodology } from "@/data/types";

// Transcribed from the "Sources & Method" and "Audit & Flags" sheets of
// "finance record.xlsx", which is the source of truth for how the company
// figures were collected and what may and may not be compared across them.
export const METHODOLOGY: Methodology = {
  datasetTitle:
    "Nasdaq-listed — 14 metrics × 10 companies — Jul/Aug 2026 earnings cohort",
  cohort: "Jul/Aug 2026 earnings cohort",
  dataCutoff: "2026-08-23",

  entries: [
    {
      label: "Primary source",
      body: "stockanalysis.com (fundamentals from S&P Global Market Intelligence), matching the original workbook.",
    },
    {
      label: "Verification",
      body: "Every value cross-checked across Yahoo Finance, GuruFocus, TipRanks, SimplyWallSt and company 8-K/press releases (Aug 2026 snapshots). Divergences flagged in Audit & Flags.",
    },
    {
      label: "Company selection",
      body: "Nasdaq-listed companies reporting in the Jul–Aug 2026 earnings window. NVDA and TSLA retained by request. MU included as a deliberate exception (fiscal year ends Aug → reports late Sep).",
    },
    {
      label: "Growth basis",
      body: "Revenue growth and EPS growth = TTM YoY (or latest reported quarter YoY where noted).",
    },
    {
      label: "Earnings Surprise basis",
      body: "Latest reported quarter: (Actual EPS − consensus EPS)/|consensus|, non-GAAP/adjusted where the company guides non-GAAP. Left blank with scheduled date for quarters not yet reported as of 2026-08-23.",
    },
    {
      label: "Unreported quarters",
      body: "NVDA (8/26), CRWD (8/26), SNPS (8/26), MRVL (8/27), ADSK (8/27), WDAY (~8/26), INTU (8/25) had not reported as of 2026-08-23 → Earnings Surprise blank. ADI (8/19), TSLA (7/22) and MU Q3 (6/24) reported → actual surprise recorded.",
    },
    {
      label: "Earnings yield",
      body: "1/PE, entered as a live formula so it self-checks. Marked n/m where PE is negative or meaningless.",
    },
    {
      label: "Distortion handling",
      body: "P/E, EV/EBITDA, ROE, net margin flagged where distorted by: GAAP losses (CRWD), one-off tax benefits (MRVL), acquisition integration (SNPS/Ansys, ADSK/MaintainX, ADI/Empower), restructuring charges (INTU), collapsed earnings (TSLA), or cyclical peaks (MU).",
    },
    {
      label: "Prices",
      body: "Approximate closing prices ~2026-08-21; used only for context, not for the ratios (ratios come from the sources above).",
    },
    {
      label: "Audit",
      body: "Two checks. (A) Transcription: every value re-checked against its source. (B) External validity: cross-checked across stockanalysis.com (S&P Global Market Intelligence), Yahoo Finance, GuruFocus, TipRanks and company filings, Aug 2026 snapshots. Where sources diverge (e.g. P/E, EV/EBITDA on low/negative-earnings names), the stockanalysis value is used and the divergence is flagged.",
    },
  ],

  // The source collects 14 directly-readable metrics. These six were
  // deliberately left out of this round — they are not missing data.
  excludedMetrics: [
    { name: "Abnormal Return", conceptId: "abnormal-return", reason: "Requires a raw price series or separate calculation." },
    { name: "Post-Earnings Volatility", conceptId: "post-earnings-volatility", reason: "Requires a raw price series or separate calculation." },
    { name: "ROIC", conceptId: "roic", reason: "Requires a raw price series or separate calculation." },
    { name: "Interest Coverage", conceptId: "interest-coverage", reason: "Requires a raw price series or separate calculation." },
    { name: "Beta (vs QQQ)", conceptId: "beta", reason: "Requires a raw price series or separate calculation." },
    { name: "PEG Ratio", conceptId: "peg-ratio", reason: "Requires a raw price series or separate calculation." },
  ],

  crossSectionalCaveat:
    "This cohort spans clean high-margin names (NVDA, ADSK, ADI), GAAP-unprofitable SaaS (CRWD), one-off-distorted earnings (MRVL tax benefit; SNPS Ansys integration), a cyclical peak (MU memory upcycle), and a collapsed-margin case (TSLA). For surprise-vs-abnormal-return work, use non-GAAP/adjusted EPS for the surprise and treat P/E, EV/EBITDA and ROE on the flagged names as non-comparable. n = 10 observed tendencies with causal hypotheses, not statistical conclusions.",
};

export const EXCLUDED_METRIC_REASON =
  "Excluded from this collection round — requires a raw price series or a separate calculation.";

// The source workbook records ratios and margins rather than absolute
// income-statement and cash-flow lines, so these inputs have no value to show.
export const NOT_COLLECTED_REASON =
  "Not recorded in the source workbook, which collects ratios and margins rather than absolute income-statement or cash-flow figures.";
