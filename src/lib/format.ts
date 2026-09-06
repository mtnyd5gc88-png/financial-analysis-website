import type { Metric, MetricStatus } from "@/data/types";

// Percentages are stored exactly as the source workbook records them — as
// decimals. Everything a reader sees goes through here, so 0.7415 renders as
// 74.15% and 1.1429 as 114.29% rather than as raw decimals.

const DECIMALS = 2;

export function formatPercent(value: number): string {
  return `${(value * 100).toFixed(DECIMALS)}%`;
}

export function formatMultiple(value: number): string {
  return `${value.toFixed(DECIMALS)}×`;
}

export function formatUsd(value: number): string {
  const sign = value < 0 ? "−" : "";
  return `${sign}$${Math.abs(value).toFixed(DECIMALS)}`;
}

export function formatUsdBillions(value: number): string {
  return `${formatUsd(value)}B`;
}

// Returns null when the metric has no value — callers should then fall back to
// the status label so a reader is told why, not just shown a dash.
export function formatMetricValue(metric: Metric): string | null {
  if (metric.value === null) return null;

  switch (metric.format) {
    case "percent-decimal":
      return formatPercent(metric.value);
    case "multiple":
      return formatMultiple(metric.value);
    case "usd-billions":
      return formatUsdBillions(metric.value);
    case "usd":
      return formatUsd(metric.value);
  }
}

// Short badge text for a metric with no value.
export function metricStatusLabel(status: MetricStatus): string | null {
  switch (status) {
    case "reported":
      return null;
    case "pending":
      return "Pending";
    case "not-meaningful":
      return "n/m";
    case "not-available":
      return "n/a";
    case "excluded":
      return "Not collected";
  }
}

// Longer, plain-language version of the same thing.
export function metricStatusHeading(status: MetricStatus): string | null {
  switch (status) {
    case "reported":
      return null;
    case "pending":
      return "Not yet reported";
    case "not-meaningful":
      return "Not meaningful";
    case "not-available":
      return "Not available";
    case "excluded":
      return "Not collected this round";
  }
}
