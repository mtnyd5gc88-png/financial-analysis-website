import type { Methodology } from "@/data/types";
import { formatSnapshotDate } from "@/lib/format";

// Transcribed from the "Sources & Method" and "Audit & Flags" sheets of
// "AIF_nasdaq10_clean_2026-09-18.xlsx", which is the source of truth for how
// the company figures were collected and what may and may not be compared
// across them.
export const METHODOLOGY: Methodology = {
  datasetTitle:
    "NASDAQ-100 — 14 metrics × 10 companies — re-snapshot: 2026-09-18 close; fundamentals to latest reported quarter",
  cohort: "2026-09-18 re-snapshot",
  // The workbook's price date. Fundamentals are as of each company's latest
  // reported quarter — see the "Snapshot date" and "Mixed dates" entries.
  dataCutoff: "2026-09-18",

  entries: [
    {
      label: "Primary source",
      body: "stockanalysis.com. Fundamentals from S&P Global Market Intelligence; growth/statements from Fiscal.ai.",
    },
    {
      label: "Verification",
      body: "Two-vendor rule. Every value cross-checked against a second source (Yahoo Finance / CNBC / Morningstar / GuruFocus) on 2026-09-21. Prices agreed to the cent across all ten. Differences remain only in: EV/EBITDA (EBITDA definition), FCF (levered vs OCF−CapEx), COST D/E (lease treatment), TSLA P/E (share-count convention).",
    },
    {
      label: "Growth basis",
      body: "Revenue growth and EPS growth = TTM YoY (trailing 12 months vs prior 12 months).",
    },
    {
      label: "Earnings Surprise basis",
      body: "Latest reported quarter: (Actual EPS − consensus EPS)/|consensus|. Non-GAAP where the company guides non-GAAP (NVDA/MSFT/AMGN/TSLA/ADBE); GAAP for AAPL/AMZN/GOOGL (one-offs included, flagged); COST GAAP, in-line.",
    },
    {
      label: "Snapshot date",
      body: "Prices: 2026-09-18 close (last US session before 2026-09-21). Fundamentals: each company's latest reported quarter. All ten have reported at least once; no cell is left blank this round. COST reports 2026-09-24, which will make this snapshot stale again within days.",
    },
    {
      label: "Mixed dates",
      body: "Prices are 2026-09-18; fundamentals are as of each company's latest reported quarter (Jul 2026 for NVDA, Aug 2026 for ADBE, Jun 2026 for the other eight). That is the standard convention for a TTM table, but it must be stated, or P/E reads as internally inconsistent.",
    },
    {
      label: "Earnings yield",
      body: "1/PE, entered as a live formula so it self-checks.",
    },
    {
      label: "Known weak row",
      body: "EV/EBITDA is derived, not read: it was re-based by moving market cap with the verified price change and holding EBITDA constant except for NVDA and ADBE. Directionally right, second decimal is noise.",
    },
    {
      label: "Audit",
      body: "Three checks. (A) Transcription: every value re-checked cell-by-cell against its source page. (B) External validity: cross-checked against a second vendor (Yahoo / CNBC / Morningstar). (C) Staleness: every cell re-checked on 2026-09-21 against live sources.",
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
    "Several mega-caps booked Anthropic/SpaceX mark-to-market gains in 2026 Q2, producing one-off Earnings Surprises and inflated EPS growth / net margin / ROE. For surprise-vs-abnormal-return work, compute an operating (adjusted-EPS) surprise separately. Table values are as-reported; distorted names are flagged in each company's data-quality note.",
};

export const EXCLUDED_METRIC_REASON =
  "Excluded from this collection round — requires a raw price series or a separate calculation.";

// The source workbook records ratios and margins rather than absolute
// income-statement and cash-flow lines, so these inputs have no value to show.
export const NOT_COLLECTED_REASON =
  "Not recorded in the source workbook, which collects ratios and margins rather than absolute income-statement or cash-flow figures.";

// "18 September 2026" — derived from the workbook date above, never retyped.
export const DATA_AS_OF = formatSnapshotDate(METHODOLOGY.dataCutoff);

// One sentence, used wherever the site needs to say what the data is.
export const SNAPSHOT_STATEMENT = `Data as of ${DATA_AS_OF}. This site presents a fixed financial-analysis snapshot from the source workbook — it is not live market data.`;
