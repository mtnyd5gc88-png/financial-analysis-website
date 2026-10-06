import type { NumericQuestion } from "@/data/types";

// Marking for numerical questions. A learner can write the same number several
// reasonable ways — "20", "20%", "20.0 %", "$350m", "350 million" — so the
// symbols and unit words are stripped before comparing, and none is required.

// Rounding slack, in the question's own unit (percentage points, ×, or $m).
const TOLERANCE = 0.05;

interface ParsedNumber {
  value: number;
  hasPercent: boolean;
  hasMillions: boolean;
}

const NUMBER_PATTERN =
  /^([+-]?(?:\d+\.?\d*|\.\d+))\s*(%|percent|x|×|times|m|mn|million|millions)?$/;

// Returns null when the text is not a single number, so the form can ask for
// one instead of marking a typo as a wrong answer.
export function parseNumericAnswer(raw: string): ParsedNumber | null {
  const cleaned = raw
    .toLowerCase()
    .replace(/−/g, "-")
    .replace(/[$,]/g, "")
    .trim();
  const match = cleaned.match(NUMBER_PATTERN);
  if (!match) return null;

  const suffix = match[2] ?? "";
  return {
    value: Number(match[1]),
    hasPercent: suffix === "%" || suffix === "percent",
    hasMillions: ["m", "mn", "million", "millions"].includes(suffix),
  };
}

function close(a: number, b: number, tolerance: number): boolean {
  return Math.abs(a - b) <= tolerance;
}

export function isNumericAnswerCorrect(
  question: NumericQuestion,
  raw: string
): boolean {
  const parsed = parseNumericAnswer(raw);
  if (!parsed) return false;

  if (close(parsed.value, question.answer, TOLERANCE)) return true;

  // The same answer written in another scale: 0.2 for 20%, or 350,000,000 for
  // $350 million. Only when the learner did not state the unit themselves.
  if (question.unit === "percent" && !parsed.hasPercent) {
    return close(parsed.value * 100, question.answer, TOLERANCE);
  }
  if (question.unit === "usd-millions" && !parsed.hasMillions) {
    return close(parsed.value / 1_000_000, question.answer, TOLERANCE);
  }
  return false;
}

// Hint beside the input. Says what unit is wanted without giving the answer.
export function numericInputHint(question: NumericQuestion): string {
  switch (question.unit) {
    case "percent":
      return "Enter a percentage. The % sign is optional.";
    case "multiple":
      return "Enter a number.";
    case "usd-millions":
      return "Enter an amount in $ millions. The $ sign is optional.";
  }
}
