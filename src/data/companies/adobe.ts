import { buildCompany } from "@/data/companies/buildCompany";

// Adobe (ADBE) — transcribed from "AIF_nasdaq10_clean_2026-09-18.xlsx".
// Percentages are DECIMALS exactly as the workbook stores them. Company notes
// are sourced from this company's own "Audit & Flags" row and the Change Log.
//
// The audit rates Adobe Med. No figure is flagged as distorted, but the Change
// Log marks gross margin and FCF as DERIVED and asset turnover as carried over,
// and the quoted Earnings Surprise depends on the consensus vendor used.

const adobe = buildCompany({
  ticker: "ADBE",
  name: "Adobe",
  description:
    "Adobe develops creative, document and digital-experience software, including Photoshop, Acrobat and Creative Cloud. The source workbook records it under Software/Creative.",
  sector: "Software/Creative",

  meta: {
    fiscalYear: "Dec–Nov",
    lastEarnings: "2026-09-10 (Q3 FY26)",
    nextEarnings: "2026-12-09 (est)",
    price: 248.92,
    priceAsOf: "2026-09-18 close",
    priceNote:
      "Closing price on 2026-09-18. In this snapshot P/E is price ÷ TTM diluted EPS, so P/E and the earnings yield built from it move with this price, while the fundamentals are as of the company's latest reported quarter.",
  },

  audit: {
    confidence: "Med",
    confidenceQualifier: null,
    note: "Q3 FY26 (10 Sep) beat and raised FY guidance, yet the stock fell. Surprise only +0.7% and vendor consensus ranges $5.94-$6.09, so the quoted surprise swings +0.7% to +3.2% - state which vendor you used. Operating margin fell 36.7% -> 34.8% TTM. De-rating continues: P/E 13.9 on 89% gross margin. Also in the window: announced Topaz Labs acquisition; press reported a leadership change. Neither is in the numbers yet.",
  },

  metrics: {
    // ── Profitability ──
    "gross-margin": {
      value: 0.8925,
      status: "reported",
      context:
        "The workbook's Change Log marks this figure DERIVED (~89.25%), pending a re-pull of the exact TTM figure.",
    },
    "operating-margin": {
      value: 0.3482,
      status: "reported",
      context:
        "The audit records operating margin falling 36.7% -> 34.8% TTM.",
    },
    "net-profit-margin": { value: 0.2805, status: "reported" },
    "revenue-growth": { value: 0.12, status: "reported" },

    // ── Valuation ──
    "eps-growth": { value: 0.116, status: "reported" },
    "pe-ratio": {
      value: 13.9,
      status: "reported",
      context:
        "The audit records the de-rating continuing: P/E 13.9 on 89% gross margin.",
    },
    "earnings-yield": {
      value: 0.07194244604316546,
      status: "reported",
      context:
        "Held in the source as a live 1 / P/E formula, so it self-checks against the P/E above.",
    },
    "ev-ebitda": {
      value: 10.12,
      status: "reported",
      context:
        "The workbook lists EV/EBITDA as its known weak row: derived rather than read, so the second decimal is noise.",
    },

    // ── Returns on Capital ──
    roe: { value: 0.619, status: "reported" },
    "asset-turnover": {
      value: 0.87,
      status: "reported",
      context:
        "The workbook's Change Log marks this figure as carried over (VERIFY): it was not re-pulled after the Q3 report.",
    },

    // ── Financial Health (Debt-to-Equity also renders under Returns on Capital) ──
    "debt-to-equity": { value: 0.57, status: "reported" },
    "current-ratio": { value: 0.77, status: "reported" },

    // ── Cash Generation ──
    "free-cash-flow": {
      value: 10.6,
      status: "reported",
      context:
        "The workbook's Change Log marks this figure DERIVED (~$10.60B).",
    },

    // ── Market Reaction & Risk ──
    "earnings-surprise": {
      value: 0.0066,
      status: "reported",
      accountingBasis: "non-GAAP",
      context:
        "The audit records the Q3 FY26 surprise as only +0.7%, and notes vendor consensus ranges $5.94-$6.09, so the quoted surprise swings +0.7% to +3.2% depending on the vendor.",
    },
  },
});

export default adobe;
