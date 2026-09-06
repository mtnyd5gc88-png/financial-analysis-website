"""Verify every company record in the app against reference/finance record.xlsx.

The workbook is the source of truth for company financial values. This script
re-reads it directly and compares, cell by cell, against what the site will
render. It exits non-zero on any mismatch.

    npx tsx scripts/dump-companies.ts > /tmp/companies.json
    python3 scripts/verify_companies.py /tmp/companies.json
"""
import json, re, sys, zipfile, datetime
import xml.etree.ElementTree as ET

NS = '{http://schemas.openxmlformats.org/spreadsheetml/2006/main}'
WORKBOOK = "reference/finance record.xlsx"

# metric id in the app  ->  Indicator label in the workbook's Metrics sheet
METRIC_TO_INDICATOR = {
    "earnings-surprise":  "Earnings Surprise",
    "eps-growth":         "EPS growth (YoY)",
    "pe-ratio":           "P/E ratio",
    "gross-margin":       "Gross margin",
    "operating-margin":   "Operating margin",
    "net-profit-margin":  "Net profit margin",
    "roe":                "ROE",
    "asset-turnover":     "Asset turnover",
    "free-cash-flow":     "Free Cash Flow",
    "ev-ebitda":          "EV/EBITDA",
    "debt-to-equity":     "Debt-to-Equity",
    "current-ratio":      "Current ratio",
    "earnings-yield":     "Earnings yield",
    "revenue-growth":     "Revenue growth (YoY)",
}


def col_number(ref):
    letters = re.match(r'([A-Z]+)', ref).group(1)
    n = 0
    for ch in letters:
        n = n * 26 + ord(ch) - 64
    return n


def read_sheet(z, path, shared):
    ws = ET.fromstring(z.read(path))
    rows = {}
    for row in ws.iter(NS + 'row'):
        cells = {}
        for c in row.findall(NS + 'c'):
            t, v = c.get('t'), c.find(NS + 'v')
            if t == 's' and v is not None:
                val = shared[int(v.text)]
            elif v is not None:
                try:
                    val = float(v.text)
                except ValueError:
                    val = v.text
            else:
                val = None
            cells[col_number(c.get('r'))] = val
        rows[int(row.get('r'))] = cells
    return rows


def load_workbook():
    z = zipfile.ZipFile(WORKBOOK)
    shared = ["".join(t.text or '' for t in si.iter(NS + 't'))
              for si in ET.fromstring(z.read('xl/sharedStrings.xml')).findall(NS + 'si')]
    metrics = read_sheet(z, 'xl/worksheets/sheet1.xml', shared)
    audit = read_sheet(z, 'xl/worksheets/sheet2.xml', shared)

    ticker_col = {v: c for c, v in metrics[4].items() if c >= 6 and isinstance(v, str)}

    by_indicator = {}
    for cells in metrics.values():
        name = cells.get(3)
        if isinstance(name, str) and name.strip() and name != "Indicator":
            by_indicator[name.strip()] = {t: cells.get(c) for t, c in ticker_col.items()}

    audit_rows = {}
    for cells in audit.values():
        t = cells.get(1)
        if isinstance(t, str) and t.strip() in ticker_col:
            audit_rows[t.strip()] = {"confidence": cells.get(2), "flag": cells.get(3)}

    return by_indicator, audit_rows, list(ticker_col.keys())


def expected_state(cell):
    """What the app must show for this workbook cell."""
    if isinstance(cell, (int, float)):
        return "reported", float(cell)
    text = str(cell).strip().lower()
    if text.startswith("pending"):
        return "pending", None
    if text.startswith("n/m"):
        return "not-meaningful", None
    if text.startswith("n/a"):
        return "not-available", None
    return "UNRECOGNISED", None


def main():
    companies = json.load(open(sys.argv[1]))
    by_indicator, audit_rows, tickers = load_workbook()

    problems, checks = [], 0

    for ticker, company in companies.items():
        if ticker not in tickers:
            problems.append(f"[{ticker}] not present in the workbook")
            continue

        groups = ["profitability", "valuation", "returnsOnCapital",
                  "financialHealth", "cashGeneration", "marketReactionAndRisk"]
        seen = {}
        for g in groups:
            for m in company[g]["metrics"]:
                seen.setdefault(m["id"], []).append(m)

        # --- the 14 collected indicators -------------------------------------
        for metric_id, indicator in METRIC_TO_INDICATOR.items():
            cell = by_indicator[indicator][ticker]
            want_status, want_value = expected_state(cell)
            if want_status == "UNRECOGNISED":
                problems.append(f"[{ticker}] {metric_id}: cannot interpret workbook cell {cell!r}")
                continue
            if metric_id not in seen:
                problems.append(f"[{ticker}] {metric_id}: missing from the company record")
                continue
            for m in seen[metric_id]:
                checks += 1
                if m["status"] != want_status:
                    problems.append(
                        f"[{ticker}] {metric_id}: status {m['status']!r}, workbook implies {want_status!r} (cell {cell!r})")
                if want_value is None:
                    if m["value"] is not None:
                        problems.append(f"[{ticker}] {metric_id}: value {m['value']!r} but the workbook has no number ({cell!r})")
                    if not m["statusNote"]:
                        problems.append(f"[{ticker}] {metric_id}: no statusNote explaining the missing value")
                elif m["value"] != want_value:
                    problems.append(f"[{ticker}] {metric_id}: value {m['value']!r} != workbook {want_value!r}")

        # --- company metadata -------------------------------------------------
        checks += 1
        want_sector = by_indicator["Sector"][ticker]
        if company["sector"] != want_sector:
            problems.append(f"[{ticker}] sector {company['sector']!r} != workbook {want_sector!r}")

        checks += 1
        want_price = by_indicator["Price (approx, ~2026-08-21, $)"][ticker]
        if company["meta"]["price"] != want_price:
            problems.append(f"[{ticker}] price {company['meta']['price']!r} != workbook {want_price!r}")

        checks += 1
        want_fy = str(by_indicator["Fiscal year"][ticker]).replace("-", "–")
        if company["meta"]["fiscalYear"] != want_fy:
            problems.append(f"[{ticker}] fiscalYear {company['meta']['fiscalYear']!r} != workbook {want_fy!r}")

        checks += 1
        want_next = by_indicator["Next earnings"][ticker]
        if company["meta"]["nextEarnings"] != want_next:
            problems.append(f"[{ticker}] nextEarnings {company['meta']['nextEarnings']!r} != workbook {want_next!r}")

        # Last earnings: MU is stored as a raw Excel date serial in the source.
        checks += 1
        want_last = by_indicator["Last earnings (reported)"][ticker]
        if isinstance(want_last, (int, float)):
            iso = (datetime.date(1899, 12, 30) + datetime.timedelta(days=int(want_last))).isoformat()
            if not company["meta"]["lastEarnings"].startswith(iso):
                problems.append(f"[{ticker}] lastEarnings {company['meta']['lastEarnings']!r} does not start with serial date {iso}")
        elif company["meta"]["lastEarnings"] != want_last:
            problems.append(f"[{ticker}] lastEarnings {company['meta']['lastEarnings']!r} != workbook {want_last!r}")

        # --- audit ------------------------------------------------------------
        checks += 1
        if company["audit"]["note"] != audit_rows[ticker]["flag"]:
            problems.append(f"[{ticker}] audit note does not match the workbook flag verbatim")

        checks += 1
        raw = str(audit_rows[ticker]["confidence"])
        m = re.match(r'^([A-Za-z\-]+)(?:\s*\((.+)\))?$', raw.strip())
        want_conf, want_qual = m.group(1), m.group(2)
        if company["audit"]["confidence"] != want_conf:
            problems.append(f"[{ticker}] confidence {company['audit']['confidence']!r} != workbook {want_conf!r}")
        if (company["audit"]["confidenceQualifier"] or None) != want_qual:
            problems.append(f"[{ticker}] confidenceQualifier {company['audit']['confidenceQualifier']!r} != workbook {want_qual!r}")

        # --- invariants that must hold everywhere ------------------------------
        for metric_id, entries in seen.items():
            values = {(e["value"], e["status"]) for e in entries}
            if len(values) > 1:
                problems.append(f"[{ticker}] {metric_id}: placements disagree {values!r} — must be one source of truth")
            for e in entries:
                if e["status"] == "reported" and e["value"] is None:
                    problems.append(f"[{ticker}] {metric_id}: reported but null")
                if e["status"] != "reported" and e["value"] is not None:
                    problems.append(f"[{ticker}] {metric_id}: {e['status']} but carries a value")
                if e["accountingBasis"] not in (None, "GAAP", "non-GAAP"):
                    problems.append(f"[{ticker}] {metric_id}: bad accountingBasis {e['accountingBasis']!r}")

    print(f"companies checked : {len(companies)}")
    print(f"assertions run    : {checks}")
    if problems:
        print(f"\nPROBLEMS ({len(problems)}):")
        for p in problems:
            print("  -", p)
        sys.exit(1)
    print("\nAll company records match the workbook.")


if __name__ == "__main__":
    main()
