// ─── Financial Category ────────────────────────────────────────────────────

export type CategoryId =
  | "profitability"
  | "valuation"
  | "returns-on-capital"
  | "financial-health"
  | "cash-generation"
  | "market-reaction-and-risk";

// Category metadata lives in one place (lib/constants.ts) and is joined with
// the concept lists in data/concepts. Everything below is transcribed from the
// terminology document, which is the source of truth for concept content.
export interface CategoryMeta {
  id: CategoryId;
  label: string;
  slug: string;
  // The document's section subtitle, e.g. "the income-statement waterfall".
  subtitle: string;
  // The document's "What it answers:" line for this section.
  question: string;
  // Card-length summary used on the Learn index and company pages.
  shortDescription: string;
  // The document's paragraph explaining how this section's diagram flows.
  connectingIdea: string;
}

export interface Category extends CategoryMeta {
  concepts: Concept[];
}

// ─── Concept (Learn section) ───────────────────────────────────────────────

// "core"           — one of the 20 concepts formally defined in the terminology
//                    document (formula + why it matters + worked example).
// "building-block" — an intermediate node that appears inside the document's
//                    diagrams but is not given its own definition there.
export type ConceptTier = "core" | "building-block";

export interface Concept {
  id: string;
  // Canonical display name — also the source of the URL slug. Kept short and
  // stable; the document's longer heading, where it differs, goes in fullName.
  name: string;
  // The document heading verbatim, when it differs from `name`. Display only —
  // never used for slugs, so URLs stay fixed.
  fullName: string | null;
  // The category the document defines this concept under. A concept may be
  // listed in another category's array as a shared reference, in which case
  // this still points at the defining category.
  categoryId: CategoryId;
  tier: ConceptTier;
  definition: string;
  formula: string | null;
  workedExample: string | null;
  whyItMatters: string;
  // The document's extra explanatory paragraph, where it supplies one
  // (e.g. "Use over P/E when: …"). Transcribed verbatim, lead-in included.
  furtherNote: string | null;
  quickQuestion: QuickQuestion | null;
  // Categories this concept also appears in (e.g. Debt-to-Equity is defined in
  // Financial Health and referenced from Returns on Capital).
  sharedWithCategories?: CategoryId[];
}

export interface QuickQuestion {
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

// ─── Concept relationships (the document's diagrams) ───────────────────────

// The document's own legend:
//   "flow"         — a solid arrow: an accounting or economic flow
//                    (one thing becomes, drives, or causes another).
//   "definitional" — a dashed arrow: a mathematical or definitional
//                    relationship (one is calculated from another).
export type RelationshipKind = "flow" | "definitional";

// Where the edge comes from. "diagram" edges are drawn in the document's own
// section diagrams; "formula" edges are read off a concept's stated formula and
// are not pictured. Only diagram edges are rendered on the map, to keep it
// readable — formula edges surface as text in the concept detail view.
export type RelationshipBasis = "diagram" | "formula";

export interface ConceptRelationship {
  // Concept id, or the id of a DiagramNode for inputs the document pictures
  // but does not define as a concept (e.g. Total Assets, EBITDA).
  from: string;
  to: string;
  kind: RelationshipKind;
  // The document's own arrow label, verbatim where it has one.
  label: string;
  basis: RelationshipBasis;
  // The section whose diagram this edge belongs to.
  categoryId: CategoryId;
}

// A node the document's diagrams show as an input but never defines as a
// concept. Rendered as plain, non-navigable boxes so the 20-core / 8-building
// block distinction is not blurred.
export interface DiagramNode {
  id: string;
  label: string;
}

// The master map's arrows between whole categories. The document describes
// these in prose but its arrow styling is not recoverable from the text, so
// they deliberately carry no `kind`.
export interface CategoryRelationship {
  from: CategoryId;
  to: CategoryId;
  label: string;
}

// ─── Company & Metrics ─────────────────────────────────────────────────────

export interface Company {
  ticker: string;
  name: string;
  description: string;
  sector: string;
  meta: CompanyMeta;
  audit: AuditFlag;
  // Each key maps to one of the six analytical categories.
  // Keeping them separate enforces the conceptual distinction between
  // company performance, valuation, and market behaviour.
  profitability: MetricGroup;
  valuation: MetricGroup;
  returnsOnCapital: MetricGroup;
  financialHealth: MetricGroup;
  cashGeneration: MetricGroup;
  marketReactionAndRisk: MetricGroup;
}

// Reporting-calendar and price context recorded alongside every company in the
// source workbook. Needed to read the figures correctly — a TTM ratio means
// nothing without knowing which quarter it ends in.
export interface CompanyMeta {
  // Fiscal year convention, e.g. "Feb–Jan".
  fiscalYear: string;
  // Most recent reported quarter, e.g. "2026-05-28 (Q1 FY27)".
  lastEarnings: string;
  // Next scheduled report, including whether the date is confirmed or estimated.
  nextEarnings: string;
  // Reference share price. Context only — the source states it is not used to
  // derive any of the ratios.
  price: number | null;
  priceAsOf: string | null;
  priceNote: string | null;
}

export type ConfidenceLevel = "High" | "Med-High" | "Med" | "Low";

// The workbook's independent audit of each company's figures.
export interface AuditFlag {
  confidence: ConfidenceLevel;
  // Qualifier the source attaches to the rating, e.g. "caution".
  confidenceQualifier: string | null;
  // The audit note verbatim — what is or is not distorted, and why.
  note: string;
}

export interface MetricGroup {
  categoryId: CategoryId;
  metrics: Metric[];
}

// Why a metric has no value. Kept distinct because these mean different things
// to a reader: a pending quarter is not the same as a meaningless ratio.
export type MetricStatus =
  // A value from the source is present.
  | "reported"
  // The quarter had not been reported as of the data cutoff.
  | "pending"
  // Computable but analytically meaningless (the source marks these "n/m").
  | "not-meaningful"
  // The source workbook holds no value for this company (marked "n/a", or the
  // figure is simply not one of the indicators collected).
  | "not-available"
  // Deliberately outside this collection round — the source lists these as
  // requiring a raw price series or a separate calculation.
  | "excluded";

// How a stored value should be rendered. Percentages are stored exactly as the
// source records them — as decimals — so this is what turns 0.7415 into 74.15%.
export type MetricFormat =
  | "percent-decimal"
  | "multiple"
  | "usd-billions"
  | "usd";

// The workbook's analytical tiers. These cut across the six categories rather
// than replacing them: a tier says how a figure is used in the study design,
// a category says what it measures.
export type MetricTier = "event-study" | "cross-sectional" | "context-anchor";

export interface Metric {
  id: string;
  name: string;
  // Numeric value exactly as the source records it. Percentages are DECIMALS
  // (0.7415 = 74.15%, 1.1429 = 114.29%) — always render via lib/format.
  // null whenever status is not "reported".
  value: number | null;
  status: MetricStatus;
  // Why there is no value. Required reading whenever status is not "reported".
  statusNote: string | null;
  format: MetricFormat;
  // The source's unit token, e.g. "%", "x", "$B".
  unit: string;
  // The source's period basis, e.g. "TTM", "latest quarter".
  basis: string | null;
  tier: MetricTier | null;
  explanation: string;
  formula: string | null;
  context: string | null;
  // Limitations or warnings the user should be aware of
  limitation: string | null;
  // Set ONLY where the workbook explicitly attaches a basis to this figure for
  // this company. It is not assumed from the kind of metric: the workbook shows
  // the basis genuinely varies (Intuit records a GAAP P/E alongside a non-GAAP
  // EPS growth in the same row), and Synopsys states its EV/EBITDA basis is
  // itself indeterminate. null means "the source does not say", never "GAAP".
  accountingBasis: "GAAP" | "non-GAAP" | null;
  // False where the audit flags this figure as distorted and not safely
  // comparable across companies.
  comparable: boolean;
  source: string | null;
  asOf: string | null;
  // The Learn concept this metric corresponds to, where one exists.
  conceptId: string | null;
  // A metric can appear in more than one category (e.g. Debt-to-Equity)
  sharedWithCategories?: CategoryId[];
}

// ─── Methodology (workbook "Sources & Method") ─────────────────────────────

export interface MethodologyEntry {
  label: string;
  body: string;
}

export interface ExcludedMetric {
  name: string;
  conceptId: string;
  reason: string;
}

export interface Methodology {
  datasetTitle: string;
  cohort: string;
  dataCutoff: string;
  entries: MethodologyEntry[];
  excludedMetrics: ExcludedMetric[];
  // The workbook's closing caution on reading the cohort as a whole.
  crossSectionalCaveat: string;
}
