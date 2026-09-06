import type { CategoryId } from "@/data/types";

// Hand-placed positions mirroring the terminology document's own section
// diagrams. Explicit coordinates keep the map deterministic and readable —
// there is no need for a graph/layout library at this size.

export const NODE_W = 158;
export const NODE_H = 42;

export interface CategoryLayout {
  width: number;
  height: number;
  // Top-left corner of each node box, keyed by concept or diagram-node id.
  nodes: Record<string, { x: number; y: number }>;
}

export const CONCEPT_MAP_LAYOUT: Record<CategoryId, CategoryLayout> = {
  // Revenue runs down the spine; each margin sits to its right.
  profitability: {
    width: 480,
    height: 330,
    nodes: {
      revenue: { x: 20, y: 20 },
      "gross-profit": { x: 20, y: 100 },
      "operating-income": { x: 20, y: 180 },
      "net-income": { x: 20, y: 260 },
      "revenue-growth": { x: 300, y: 20 },
      "gross-margin": { x: 300, y: 100 },
      "operating-margin": { x: 300, y: 180 },
      "net-profit-margin": { x: 300, y: 260 },
    },
  },

  valuation: {
    width: 758,
    height: 425,
    nodes: {
      "net-income": { x: 20, y: 20 },
      eps: { x: 20, y: 100 },
      "eps-growth": { x: 20, y: 180 },
      "pe-ratio": { x: 300, y: 100 },
      "earnings-yield": { x: 580, y: 40 },
      "peg-ratio": { x: 580, y: 160 },
      "enterprise-value": { x: 20, y: 290 },
      ebitda: { x: 20, y: 360 },
      "ev-ebitda": { x: 300, y: 325 },
    },
  },

  "returns-on-capital": {
    width: 758,
    height: 415,
    nodes: {
      "net-profit-margin": { x: 20, y: 20 },
      "asset-turnover": { x: 20, y: 95 },
      "debt-to-equity": { x: 20, y: 170 },
      "equity-multiplier": { x: 300, y: 170 },
      roe: { x: 580, y: 95 },
      nopat: { x: 20, y: 275 },
      "invested-capital": { x: 20, y: 350 },
      // Far column so the "÷ Invested Capital" labels have room to sit clear.
      roic: { x: 580, y: 312 },
    },
  },

  "financial-health": {
    width: 758,
    height: 445,
    nodes: {
      "total-debt": { x: 20, y: 20 },
      equity: { x: 20, y: 95 },
      "debt-to-equity": { x: 300, y: 57 },
      "interest-expense": { x: 300, y: 150 },
      ebit: { x: 20, y: 215 },
      "interest-coverage": { x: 580, y: 182 },
      "current-assets": { x: 20, y: 305 },
      "current-liabilities": { x: 20, y: 380 },
      "current-ratio": { x: 300, y: 342 },
    },
  },

  "cash-generation": {
    width: 758,
    height: 260,
    nodes: {
      "operating-cash-flow": { x: 20, y: 45 },
      capex: { x: 20, y: 125 },
      "free-cash-flow": { x: 300, y: 85 },
      dividends: { x: 580, y: 10 },
      buybacks: { x: 580, y: 70 },
      "debt-paydown": { x: 580, y: 130 },
      reinvestment: { x: 580, y: 190 },
    },
  },

  "market-reaction-and-risk": {
    width: 758,
    height: 210,
    nodes: {
      "earnings-surprise": { x: 20, y: 30 },
      "stock-price-movement": { x: 300, y: 30 },
      "abnormal-return": { x: 580, y: 30 },
      "post-earnings-volatility": { x: 300, y: 140 },
      beta: { x: 580, y: 140 },
    },
  },
};
