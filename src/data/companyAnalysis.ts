// ─── 4-Step Company Analysis (worked example) ──────────────────────────────
//
// The author's own analysis of the ten-company dataset, reproduced exactly.
// Every figure, conclusion and judgement below is transcribed as written (ADBE's
// Step 3 was revised to agree with the workbook's +0.7% beat) and is held as
// display text — nothing here is recalculated from the company records,
// so the worked example cannot drift from the analysis it reports.
//
// Forward P/E and approximate PEG are the analysis's own inputs: the source
// workbook does not collect either (PEG is one of its six excluded metrics).

export interface AnalysisStep {
  number: number;
  title: string;
  description: string;
}

export const ANALYSIS_STEPS: AnalysisStep[] = [
  {
    number: 1,
    title: "Profitability",
    description: "Make a judgement based on the earnings data provided.",
  },
  {
    number: 2,
    title: "Valuation",
    description:
      "Assess expectations and the probability of future success.",
  },
  {
    number: 3,
    title: "Interpretation",
    description: "Explain the reasons for the data interpretation.",
  },
  {
    number: 4,
    title: "Final Judgement",
    description: "Distinguish a good company from a good investment.",
  },
];

export const ANALYSIS_CENTRAL_IDEA = {
  headline: "Good company ≠ good investment",
  paragraphs: [
    "A company can have excellent business performance but still be an unattractive investment if too much optimism is already reflected in the stock price.",
    "Likewise, a company with weaker recent performance can potentially become interesting if valuation is sufficiently attractive, although that requires additional consideration of business durability and future prospects.",
  ],
};

export interface AnalysisFigure {
  label: string;
  value: string;
}

export interface CompanyAnalysis {
  ticker: string;
  profitability: {
    conclusion: string;
    figures: AnalysisFigure[];
    interpretation: string | null;
  };
  valuation: {
    figures: AnalysisFigure[];
    conclusion: string;
  };
  // One entry per paragraph.
  interpretation: string[];
  finalJudgement: {
    businessQuality: string;
    expectationPricedIn: string;
    conclusion: string;
    reason: string;
  };
}

// The three companies the ten-company analysis selected, in the order given.
export const SELECTED_COMPANY_ANALYSES: CompanyAnalysis[] = [
  {
    ticker: "NVDA",
    profitability: {
      conclusion:
        "NVDA had the strongest profitability/growth profile among the selected companies.",
      figures: [
        { label: "EPS growth", value: "+125.3%" },
        { label: "Earnings yield", value: "3.6%" },
      ],
      interpretation:
        "NVDA's earnings growth was exceptionally strong, making it the strongest profitability candidate in this analysis.",
    },
    valuation: {
      figures: [
        { label: "P/E", value: "28.1" },
        { label: "Forward P/E", value: "18.5" },
        { label: "EV/EBITDA", value: "26.0" },
        { label: "Approx. PEG", value: "0.22" },
      ],
      conclusion:
        "The valuation is relatively attractive when compared with the company's very high earnings growth.",
    },
    interpretation: [
      "NVDA combines very strong earnings growth with a substantially lower forward P/E than its current P/E.",
      "The PEG ratio of approximately 0.22 is particularly low relative to the other selected companies, suggesting that the valuation is relatively low compared with the current growth rate.",
      "However, this does not mean the stock is risk-free. The valuation still depends heavily on the market continuing to expect strong future growth.",
    ],
    finalJudgement: {
      businessQuality: "Very High",
      expectationPricedIn: "Low relative to growth",
      conclusion: "Passes both criteria (conditionally).",
      reason:
        "NVDA has the strongest profitability/growth profile and an attractive PEG relative to growth, but the conclusion remains conditional because future valuation depends on continued high growth.",
    },
  },
  {
    ticker: "MSFT",
    profitability: {
      conclusion:
        "MSFT demonstrated high business quality and solid earnings performance.",
      figures: [
        { label: "EPS growth", value: "+31.6%" },
        { label: "Earnings yield", value: "3.6%" },
      ],
      interpretation: null,
    },
    valuation: {
      figures: [
        { label: "P/E", value: "27.5" },
        { label: "Forward P/E", value: "25.0" },
        { label: "EV/EBITDA", value: "19.2" },
        { label: "Approx. PEG", value: "0.87" },
      ],
      conclusion:
        "The valuation is more moderate relative to its growth than the most highly valued companies in the dataset.",
    },
    interpretation: [
      "The stock price changed by approximately -1.2%, while the P/E changed from approximately 27.85 to 27.51.",
      "This suggests that market expectations did not materially change before and after the earnings statement.",
      "The company therefore showed a combination of strong business quality and relatively stable market expectations.",
    ],
    finalJudgement: {
      businessQuality: "High",
      expectationPricedIn: "Moderate",
      conclusion: "Passes both criteria.",
      reason:
        "MSFT combines high business quality, solid earnings growth and comparatively reasonable valuation without evidence in this analysis that expectations became significantly more excessive after the earnings statement.",
    },
  },
  {
    ticker: "ADBE",
    profitability: {
      conclusion:
        "ADBE showed decent earnings performance, but its growth was less impressive than NVDA or MSFT.",
      figures: [
        { label: "EPS growth", value: "+11.6%" },
        { label: "Earnings yield", value: "7.2%" },
      ],
      interpretation: null,
    },
    valuation: {
      figures: [
        { label: "P/E", value: "13.9" },
        { label: "Forward P/E", value: "9.4" },
        { label: "EV/EBITDA", value: "10.1" },
        { label: "Approx. PEG", value: "1.20" },
      ],
      conclusion: "The valuation appears relatively attractive.",
    },
    interpretation: [
      "ADBE's performance was decent: it reported a small earnings beat (+0.7%) and raised its guidance, yet the stock price still decreased.",
      "This suggests the results were not enough to improve what the market already expected, and that investors were focused on other concerns. In particular, there are market concerns about whether AI could replace or reduce the value of some of the company's products.",
      "Therefore, the low valuation does not automatically mean the company is a strong investment. The market may be pricing in uncertainty about the long-term durability of the business.",
    ],
    finalJudgement: {
      businessQuality: "High",
      expectationPricedIn: "Very Low",
      conclusion: "Price passes; business durability unproven.",
      reason:
        "ADBE's valuation looks attractive, but the long-term durability of its business model is less certain because of competitive and AI-related concerns.",
    },
  },
];
