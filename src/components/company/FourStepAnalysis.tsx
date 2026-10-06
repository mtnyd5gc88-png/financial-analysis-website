import Link from "next/link";
import { getCompany } from "@/data";
import {
  ANALYSIS_CENTRAL_IDEA,
  ANALYSIS_STEPS,
  SELECTED_COMPANY_ANALYSES,
  type AnalysisFigure,
  type CompanyAnalysis,
} from "@/data/companyAnalysis";

// The 4-Step Company Analysis: a worked example of separating a good company
// from a good investment. It reports one analysis as written — it is not a
// rating the site computes, and it is labelled so it cannot be read as a
// recommendation.
export default function FourStepAnalysis() {
  return (
    <section
      id="four-step-analysis"
      aria-labelledby="four-step-analysis-heading"
      className="scroll-mt-24 space-y-6 border-t border-gray-200 pt-10"
    >
      <header>
        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-blue-500">
          Educational worked example
        </p>
        <h2
          id="four-step-analysis-heading"
          className="mb-1 text-2xl font-bold text-gray-900"
        >
          4-Step Company Analysis
        </h2>
        <p className="text-gray-500">
          Separating a good company from a good investment
        </p>
      </header>

      {/* The central idea */}
      <div className="rounded-lg border border-blue-100 bg-blue-50 p-5">
        <p className="mb-2 text-lg font-bold uppercase tracking-wide text-gray-900">
          {ANALYSIS_CENTRAL_IDEA.headline}
        </p>
        <div className="max-w-3xl space-y-2">
          {ANALYSIS_CENTRAL_IDEA.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-sm text-gray-700">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* The methodology */}
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ANALYSIS_STEPS.map((step) => (
          <li
            key={step.number}
            className="rounded-lg border border-gray-200 bg-white p-5"
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-500">
              Step {step.number}
            </p>
            <h3 className="mb-2 font-semibold text-gray-900">{step.title}</h3>
            <p className="text-sm text-gray-500">{step.description}</p>
          </li>
        ))}
      </ol>

      {/* The selected companies */}
      <div>
        <h3 className="mb-1 text-sm font-semibold uppercase tracking-widest text-gray-400">
          Selected companies
        </h3>
        <p className="mb-4 max-w-3xl text-sm text-gray-500">
          Applying the four steps to the ten companies resulted in three
          selected companies. They are shown here to demonstrate how the
          methodology was applied.
        </p>
        <div className="space-y-6">
          {SELECTED_COMPANY_ANALYSES.map((analysis) => (
            <CompanyAnalysisCard key={analysis.ticker} analysis={analysis} />
          ))}
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-xs text-gray-500">
          This analysis is an educational worked example. It is not a
          guaranteed stock-picking strategy, financial advice, a buy
          recommendation or a sell recommendation.
        </p>
        <p className="text-xs text-gray-400">
          Figures are shown as stated in the analysis. Forward P/E and
          approximate PEG are inputs of the analysis itself — the source
          workbook does not collect them.
        </p>
      </div>
    </section>
  );
}

function CompanyAnalysisCard({ analysis }: { analysis: CompanyAnalysis }) {
  const company = getCompany(analysis.ticker);
  const { profitability, valuation, interpretation, finalJudgement } =
    analysis;

  return (
    <article className="rounded-xl border border-gray-200 bg-white p-6">
      <header className="mb-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
        <div className="flex items-baseline gap-3">
          <span className="rounded bg-gray-100 px-2 py-1 font-mono text-xs font-semibold text-gray-600">
            {analysis.ticker}
          </span>
          <h4 className="text-xl font-bold text-gray-900">
            {company?.name ?? analysis.ticker}
          </h4>
        </div>
        {company && (
          <Link
            href={`/companies/${company.ticker}`}
            className="text-sm text-blue-600 hover:underline"
          >
            Full company data →
          </Link>
        )}
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        <StepBlock number={1} title="Profitability">
          <Figures figures={profitability.figures} />
          <Conclusion>{profitability.conclusion}</Conclusion>
          {profitability.interpretation && (
            <p className="text-sm text-gray-600">
              {profitability.interpretation}
            </p>
          )}
        </StepBlock>

        <StepBlock number={2} title="Valuation">
          <Figures figures={valuation.figures} />
          <Conclusion>{valuation.conclusion}</Conclusion>
        </StepBlock>

        <StepBlock number={3} title="Interpretation">
          {interpretation.map((paragraph) => (
            <p key={paragraph} className="text-sm text-gray-700">
              {paragraph}
            </p>
          ))}
        </StepBlock>

        <StepBlock number={4} title="Final Judgement" emphasised>
          <dl className="grid gap-3 sm:grid-cols-2">
            <Rating label="Business Quality" value={finalJudgement.businessQuality} />
            <Rating
              label="Expectation Priced In"
              value={finalJudgement.expectationPricedIn}
            />
          </dl>
          <div className="rounded-md border border-blue-200 bg-white px-4 py-3">
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Conclusion
            </p>
            <p className="mt-0.5 text-lg font-bold text-gray-900">
              {finalJudgement.conclusion}
            </p>
          </div>
          <p className="text-sm text-gray-700">
            <span className="font-semibold text-gray-800">Reason: </span>
            {finalJudgement.reason}
          </p>
        </StepBlock>
      </div>
    </article>
  );
}

function StepBlock({
  number,
  title,
  emphasised,
  children,
}: {
  number: number;
  title: string;
  emphasised?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      className={`space-y-3 rounded-lg border p-5 ${
        emphasised ? "border-blue-100 bg-blue-50" : "border-gray-100 bg-gray-50"
      }`}
    >
      <h5 className="text-sm font-semibold text-gray-900">
        <span className="mr-2 text-xs font-semibold uppercase tracking-widest text-blue-500">
          Step {number}
        </span>
        {title}
      </h5>
      {children}
    </section>
  );
}

function Figures({ figures }: { figures: AnalysisFigure[] }) {
  return (
    <dl className="grid grid-cols-2 gap-3">
      {figures.map((figure) => (
        <div
          key={figure.label}
          className="rounded border border-gray-200 bg-white px-3 py-2"
        >
          <dt className="text-xs uppercase tracking-wide text-gray-400">
            {figure.label}
          </dt>
          <dd className="mt-0.5 text-lg font-bold text-gray-900">
            {figure.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function Conclusion({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm text-gray-800">
      <span className="font-semibold">Conclusion: </span>
      {children}
    </p>
  );
}

function Rating({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-gray-400">{label}</dt>
      <dd className="mt-0.5 text-sm font-semibold text-gray-900">{value}</dd>
    </div>
  );
}
