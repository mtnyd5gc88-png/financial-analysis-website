import type { CategoryId, CategoryMeta } from "@/data/types";

// Single source of truth for the six analytical categories.
// `subtitle`, `question` and `connectingIdea` are transcribed from the
// terminology document; data/concepts joins this with the concept lists so the
// same wording is never maintained in two places.
export const CATEGORIES: CategoryMeta[] = [
  {
    id: "profitability",
    label: "Profitability",
    slug: "profitability",
    subtitle: "the income-statement waterfall",
    question:
      "Of every dollar of revenue, how much survives each layer of cost?",
    shortDescription:
      "How effectively a company turns revenue into profit at different stages.",
    connectingIdea:
      "Revenue flows down the solid spine, losing a cost layer at each step; each margin (dashed) is that level divided by revenue.",
  },
  {
    id: "valuation",
    label: "Valuation",
    slug: "valuation",
    subtitle: "turning earnings into a price",
    question:
      "What is an investor paying for each unit of earnings, and is that reasonable given growth?",
    shortDescription:
      "How the market prices a company relative to its earnings and growth.",
    connectingIdea:
      "Net income becomes EPS, which anchors the whole valuation web. P/E and Earnings Yield are algebraic inverses; PEG puts P/E in the context of growth; EV/EBITDA is the leverage-neutral alternative.",
  },
  {
    id: "returns-on-capital",
    label: "Returns on Capital",
    slug: "returns-on-capital",
    subtitle: "how efficiently profit is generated",
    question:
      "For every dollar of capital put to work, how much profit comes back?",
    shortDescription:
      "How efficiently a company uses its assets and equity to generate profit.",
    connectingIdea:
      "The key relationship here is the DuPont identity, which decomposes ROE into three terms you already know: ROE = Net Profit Margin × Asset Turnover × Equity Multiplier. So ROE is not one idea but three: profitability, efficiency, and leverage. Two firms can reach the same ROE by different routes — the decomposition tells you which.",
  },
  {
    id: "financial-health",
    label: "Financial Health",
    slug: "financial-health",
    subtitle: "leverage, coverage, liquidity",
    question:
      "How much debt is the firm carrying, can it service it, and can it pay its near-term bills?",
    shortDescription:
      "A company's ability to meet its obligations and manage debt.",
    connectingIdea:
      "A risk ladder: leverage (D/E) drives interest obligations; interest coverage tests whether operating profit can meet them; the current ratio checks short-term survival. D/E is the same leverage that amplifies ROE in Returns on Capital.",
  },
  {
    id: "cash-generation",
    label: "Cash Generation",
    slug: "cash-generation",
    subtitle: "free cash flow",
    question:
      "After keeping the business running, how much cash is genuinely left for investors?",
    shortDescription:
      "How much real cash a company produces from its operations.",
    connectingIdea:
      "Profit is an accounting figure; FCF is the cash that actually accumulates — what funds dividends, buybacks, debt repayment and reinvestment, and underpins both valuation and ROIC.",
  },
  {
    id: "market-reaction-and-risk",
    label: "Market Reaction & Risk",
    slug: "market-reaction-and-risk",
    subtitle: "",
    question:
      "When results land, how does the price move — and how much of that is the stock versus the market?",
    shortDescription:
      "How markets and investors respond to a company's financial results.",
    connectingIdea:
      "An earnings surprise (solid) drives a price move; from that move we isolate the abnormal return by removing the market's own move (dashed) and observe elevated post-earnings volatility. Beta measures exactly the market component that abnormal return strips out.",
  },
];

// How the terminology document describes the map as a whole.
export const CONCEPT_MAP_OVERVIEW =
  "Profitability is the engine: it produces the earnings that valuation multiples price, that returns-on-capital divide by the capital base, and that the market reacts to. Leverage amplifies returns; cash generation underpins both value and returns.";

// The document's legend for the arrows between concepts.
export const RELATIONSHIP_LEGEND = [
  {
    kind: "flow",
    description:
      "a solid arrow means an accounting or economic flow (one thing becomes, drives, or causes another)",
  },
  {
    kind: "definitional",
    description:
      "a dashed arrow means a mathematical or definitional relationship (one is calculated from another)",
  },
] as const;

export function getCategory(id: CategoryId): CategoryMeta | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

// Convert a category id to a URL-safe slug (single source of truth)
export function categorySlug(id: CategoryId): string {
  return CATEGORIES.find((c) => c.id === id)?.slug ?? id;
}

// Convert a concept name to a URL-safe slug.
// Slashes are replaced first so "EV/EBITDA" → "ev-ebitda" rather than "evebitda".
export function conceptSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\//g, "-")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Learn", href: "/learn" },
  { label: "Companies", href: "/companies" },
  { label: "Compare", href: "/compare" },
] as const;
