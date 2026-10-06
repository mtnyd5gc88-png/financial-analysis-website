import type { QuizQuestion } from "@/data/types";

// The ten self-test questions, in order. Wording, answers and explanations are
// the author's own and are reproduced exactly — nothing here is generated from
// the concept registry.
export const QUESTIONS: QuizQuestion[] = [
  {
    id: "earnings-surprise",
    kind: "numeric",
    topic: "Earnings Surprise",
    prompt:
      "A company was expected to report EPS of $2.00 but reported $2.40. Calculate the earnings surprise.",
    answer: 20,
    unit: "percent",
    answerLabel: "20%",
    calculation: "($2.40 − $2.00) / $2.00 × 100 = 20%",
    explanation:
      "The earnings surprise measures how much actual EPS differed from expected EPS, relative to the expected EPS.",
  },
  {
    id: "eps-growth",
    kind: "numeric",
    topic: "EPS Growth",
    prompt:
      "A company's EPS rose from $1.50 last year to $1.80 this year. What is the EPS growth rate?",
    answer: 20,
    unit: "percent",
    answerLabel: "20%",
    calculation: "($1.80 − $1.50) / $1.50 × 100 = 20%",
    explanation:
      "EPS growth measures the percentage increase in earnings per share compared with the previous period.",
  },
  {
    id: "pe-ratio",
    kind: "numeric",
    topic: "P/E Ratio",
    prompt:
      "A company's share price is $120 and its EPS is $6. What is its P/E ratio?",
    answer: 20,
    unit: "multiple",
    answerLabel: "20",
    calculation: "$120 / $6 = 20",
    explanation:
      "P/E is calculated by dividing the share price by earnings per share.",
  },
  {
    id: "gross-margin",
    kind: "numeric",
    topic: "Gross Margin",
    prompt:
      "A company has $10m revenue and $4m gross profit. What is its gross margin?",
    answer: 40,
    unit: "percent",
    answerLabel: "40%",
    calculation: "$4m / $10m × 100 = 40%",
    explanation:
      "Gross margin shows how much of the company's revenue remains after accounting for the cost of goods sold.",
  },
  {
    id: "peg-comparison",
    kind: "choice",
    topic: "Comparing Companies (PEG)",
    prompt:
      "Company A has a P/E of 20 and EPS growth of 5%.\nCompany B has a P/E of 30 and EPS growth of 15%.\nWhich company has the lower PEG ratio?",
    options: [
      { id: "A", text: "Company A" },
      { id: "B", text: "Company B" },
      { id: "C", text: "They have the same PEG" },
      { id: "D", text: "Cannot be determined" },
    ],
    correctOptionId: "B",
    calculation: [
      "Company A PEG = 20 / 5 = 4.0",
      "Company B PEG = 30 / 15 = 2.0",
    ],
    explanation:
      "PEG compares a company's P/E ratio with its earnings growth rate. Company B has the lower PEG ratio because its higher earnings growth is large enough to offset its higher P/E.",
  },
  {
    id: "free-cash-flow",
    kind: "numeric",
    topic: "Free Cash Flow",
    prompt:
      "A company has $500m operating cash flow and $150m capex. What is free cash flow?",
    answer: 350,
    unit: "usd-millions",
    answerLabel: "$350 million",
    calculation: "$500m − $150m = $350m",
    explanation:
      "Free cash flow is commonly calculated as operating cash flow minus capital expenditure.",
  },
  {
    id: "abnormal-return",
    kind: "numeric",
    topic: "Abnormal Return",
    prompt:
      "A stock rises 8% after earnings while QQQ rises 3%. What is the abnormal return?",
    answer: 5,
    unit: "percent",
    answerLabel: "5%",
    calculation: "8% − 3% = 5%",
    explanation:
      "Abnormal return measures the stock's return relative to the benchmark return over the same period.",
  },
  {
    id: "surprise-and-price",
    kind: "self-assessed",
    topic: "Understanding the Relationship",
    prompt:
      "Why might a large earnings surprise cause a large change in the stock price?",
    modelAnswer:
      "A large earnings surprise provides new information that differs significantly from what the market expected. Investors may therefore revise their expectations about the company's future earnings and value, causing the stock price to be repriced.",
    keyIdeas: [
      "market expectations",
      "new information",
      "actual earnings versus expected earnings",
      "repricing",
      "changes in expectations about future earnings",
    ],
  },
  {
    id: "financial-leverage",
    kind: "choice",
    topic: "Financial Health",
    prompt:
      "Company A has a D/E ratio of 2.5, while Company B has a D/E ratio of 0.5. Which company has lower financial leverage?",
    options: [
      { id: "A", text: "Company A" },
      { id: "B", text: "Company B" },
      { id: "C", text: "They have the same financial leverage" },
      { id: "D", text: "Cannot be determined" },
    ],
    correctOptionId: "B",
    calculation: null,
    explanation:
      "A lower D/E ratio generally indicates less debt relative to shareholders' equity. However, a lower D/E ratio does not automatically mean a company is better in every situation.",
  },
  {
    id: "roe",
    kind: "numeric",
    topic: "Return on Equity (ROE)",
    prompt:
      "A company has a net income of $20m and shareholders' equity of $100m. What is its ROE?",
    answer: 20,
    unit: "percent",
    answerLabel: "20%",
    calculation: "$20m / $100m × 100 = 20%",
    explanation:
      "ROE measures how much net income a company generates relative to shareholders' equity.",
  },
];
