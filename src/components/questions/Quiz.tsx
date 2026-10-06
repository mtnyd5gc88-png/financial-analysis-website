"use client";

import { useState } from "react";
import Link from "next/link";
import { QUESTIONS } from "@/data/questions";
import QuestionCard from "./QuestionCard";

const TOTAL = QUESTIONS.length;

// One mark per question, nothing weighted.
function performanceSummary(percentage: number): string {
  if (percentage >= 90) {
    return "Excellent — you have a strong grasp of these concepts.";
  }
  if (percentage >= 70) {
    return "Good work — most of these concepts are secure. Review the ones you missed.";
  }
  if (percentage >= 50) {
    return "A solid start — revisit the questions you missed, then try again.";
  }
  return "Worth another pass — work through the concepts again, then retake the quiz.";
}

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  // results[i] is undefined until question i has been answered.
  const [results, setResults] = useState<boolean[]>([]);
  // Bumped on restart so every question remounts with a blank answer.
  const [attempt, setAttempt] = useState(0);

  function recordResult(correct: boolean) {
    setResults((previous) => {
      const next = [...previous];
      next[current] = correct;
      return next;
    });
  }

  function restart() {
    setCurrent(0);
    setResults([]);
    setAttempt((n) => n + 1);
  }

  if (current >= TOTAL) {
    return <Results results={results} onRestart={restart} />;
  }

  const question = QUESTIONS[current];
  const answered = results.filter((r) => r !== undefined).length;

  return (
    <div className="space-y-4">
      <div>
        <div className="mb-2 flex items-baseline justify-between gap-4">
          <p className="text-sm font-medium text-gray-700">
            Question {current + 1} of {TOTAL}
          </p>
          <p className="text-xs text-gray-400">
            {answered} of {TOTAL} answered
          </p>
        </div>
        <div
          role="progressbar"
          aria-label="Quiz progress"
          aria-valuemin={0}
          aria-valuemax={TOTAL}
          aria-valuenow={answered}
          className="h-2 overflow-hidden rounded-full bg-gray-200"
        >
          <div
            className="h-full rounded-full bg-blue-600 transition-all"
            style={{ width: `${(answered / TOTAL) * 100}%` }}
          />
        </div>
      </div>

      <QuestionCard
        key={`${attempt}-${question.id}`}
        question={question}
        onAnswered={recordResult}
        onNext={() => setCurrent((n) => n + 1)}
        isLast={current === TOTAL - 1}
        autoFocus={current > 0}
      />
    </div>
  );
}

function Results({
  results,
  onRestart,
}: {
  results: boolean[];
  onRestart: () => void;
}) {
  const score = results.filter(Boolean).length;
  const percentage = Math.round((score / TOTAL) * 100);

  return (
    <section className="rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gray-400">
        Your result
      </h2>

      <p className="text-4xl font-bold text-gray-900">
        {score} / {TOTAL}
      </p>
      <p className="mt-1 text-lg font-semibold text-blue-600">{percentage}%</p>
      <p className="mt-3 max-w-2xl text-gray-700">
        {performanceSummary(percentage)}
      </p>

      <ol className="mt-6 space-y-2">
        {QUESTIONS.map((question, i) => {
          const correct = results[i] === true;
          return (
            <li
              key={question.id}
              className="flex items-center justify-between gap-4 rounded-md border border-gray-200 bg-white px-4 py-3 text-sm"
            >
              <span className="text-gray-800">
                <span className="mr-2 font-mono text-xs text-gray-400">
                  {i + 1}
                </span>
                {question.topic}
              </span>
              <span
                className={`shrink-0 text-xs font-medium ${
                  correct ? "text-emerald-700" : "text-red-700"
                }`}
              >
                {question.kind === "self-assessed"
                  ? correct
                    ? "✓ Self-marked: got it right"
                    : "✗ Self-marked: needs review"
                  : correct
                    ? "✓ Correct"
                    : "✗ Incorrect"}
              </span>
            </li>
          );
        })}
      </ol>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={onRestart}
          className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          Restart Quiz
        </button>
        <Link
          href="/learn"
          className="rounded-lg border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Review concepts in Learn
        </Link>
      </div>
    </section>
  );
}
