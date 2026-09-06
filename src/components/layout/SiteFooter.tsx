import { DATA_AS_OF, METHODOLOGY } from "@/data/methodology";

// Global data-date statement. The site is a fixed snapshot of the source
// workbook, and says so on every page — it is not a live market-data terminal.
export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-6">
        <p className="text-sm font-medium text-gray-700">
          Data as of {DATA_AS_OF}
        </p>
        <p className="mt-1 max-w-3xl text-xs leading-relaxed text-gray-500">
          A fixed financial-analysis snapshot taken from the source workbook
          ({METHODOLOGY.cohort}), not live market data. Figures are not updated
          in real time and will not reflect anything reported after this date.
          Nothing here is a buy or sell recommendation.
        </p>
      </div>
    </footer>
  );
}
