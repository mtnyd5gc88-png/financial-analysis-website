"use client";

import { useState } from "react";
import type {
  ChoiceQuestion,
  NumericQuestion,
  QuizQuestion,
  SelfAssessedQuestion,
} from "@/data/types";
import {
  isNumericAnswerCorrect,
  numericInputHint,
  parseNumericAnswer,
} from "@/lib/quiz";

interface Props {
  question: QuizQuestion;
  // Records the outcome for this question. Called once on submission — or, for
  // a self-assessed question, each time the learner marks their own answer.
  onAnswered: (correct: boolean) => void;
  onNext: () => void;
  isLast: boolean;
  // Skipped on the first question so the page does not jump on arrival.
  autoFocus: boolean;
}

const PRIMARY_BUTTON =
  "rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 transition-colors";
const FIELD =
  "w-full rounded border border-gray-200 bg-white px-4 py-2 text-sm text-gray-900 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-50 disabled:text-gray-500";

// One question, from blank to marked. The correct answer, calculation and
// explanation are only rendered once `submitted` is true.
export default function QuestionCard({
  question,
  onAnswered,
  onNext,
  isLast,
  autoFocus,
}: Props) {
  const [draft, setDraft] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // null until an outcome exists; a self-assessed question stays null after
  // submission until the learner marks it.
  const [correct, setCorrect] = useState<boolean | null>(null);

  function record(result: boolean) {
    setCorrect(result);
    onAnswered(result);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitted) return;

    if (question.kind === "numeric") {
      if (!parseNumericAnswer(draft)) {
        setError("Enter your answer as a number, for example 12.5.");
        return;
      }
      record(isNumericAnswerCorrect(question, draft));
    } else if (question.kind === "choice") {
      if (!draft) {
        setError("Choose one of the options.");
        return;
      }
      // Exact option match.
      record(draft === question.correctOptionId);
    } else if (!draft.trim()) {
      setError("Write a short answer before submitting.");
      return;
    }

    setError(null);
    setSubmitted(true);
  }

  function change(value: string) {
    setDraft(value);
    setError(null);
  }

  return (
    <article className="rounded-lg border border-gray-200 bg-white p-6">
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-500">
        {question.topic}
      </p>
      <h2 className="mb-5 whitespace-pre-line text-lg font-semibold text-gray-900">
        {question.prompt}
      </h2>

      <form onSubmit={handleSubmit} noValidate>
        {question.kind === "numeric" && (
          <NumericInput
            question={question}
            value={draft}
            onChange={change}
            disabled={submitted}
            autoFocus={autoFocus}
          />
        )}
        {question.kind === "choice" && (
          <ChoiceInput
            question={question}
            value={draft}
            onChange={change}
            disabled={submitted}
          />
        )}
        {question.kind === "self-assessed" && (
          <div>
            <label
              htmlFor={`answer-${question.id}`}
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Your answer
            </label>
            <textarea
              id={`answer-${question.id}`}
              rows={4}
              value={draft}
              onChange={(e) => change(e.target.value)}
              disabled={submitted}
              autoFocus={autoFocus}
              className={FIELD}
            />
            <p className="mt-1 text-xs text-gray-400">
              Write a sentence or two in your own words. You will compare it
              with a model answer and mark it yourself.
            </p>
          </div>
        )}

        {error && (
          <p role="alert" className="mt-3 text-sm text-red-700">
            {error}
          </p>
        )}

        {!submitted && (
          <button type="submit" className={`mt-5 ${PRIMARY_BUTTON}`}>
            Submit Answer
          </button>
        )}
      </form>

      <div aria-live="polite">
        {submitted && question.kind === "numeric" && (
          <Feedback correct={correct === true}>
            <AnswerLine label="Correct answer" value={question.answerLabel} />
            <Calculation lines={[question.calculation]} />
            <p className="text-sm text-gray-700">{question.explanation}</p>
          </Feedback>
        )}

        {submitted && question.kind === "choice" && (
          <Feedback correct={correct === true}>
            <AnswerLine
              label="Correct answer"
              value={optionLabel(question, question.correctOptionId)}
            />
            {question.calculation && (
              <Calculation lines={question.calculation} />
            )}
            <p className="text-sm text-gray-700">{question.explanation}</p>
          </Feedback>
        )}

        {submitted && question.kind === "self-assessed" && (
          <SelfAssessment
            question={question}
            mark={correct}
            onMark={record}
          />
        )}
      </div>

      {submitted && correct !== null && (
        <button
          type="button"
          onClick={onNext}
          className={`mt-5 ${PRIMARY_BUTTON}`}
        >
          {isLast ? "See Results" : "Next Question"}
        </button>
      )}
    </article>
  );
}

function optionLabel(question: ChoiceQuestion, id: string): string {
  const option = question.options.find((o) => o.id === id);
  return option ? `${option.id}. ${option.text}` : id;
}

function NumericInput({
  question,
  value,
  onChange,
  disabled,
  autoFocus,
}: {
  question: NumericQuestion;
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
  autoFocus: boolean;
}) {
  const id = `answer-${question.id}`;
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1 block text-sm font-medium text-gray-700"
      >
        Your answer
      </label>
      <input
        id={id}
        type="text"
        inputMode="decimal"
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        autoFocus={autoFocus}
        aria-describedby={`${id}-hint`}
        className={`${FIELD} max-w-xs`}
      />
      <p id={`${id}-hint`} className="mt-1 text-xs text-gray-400">
        {numericInputHint(question)}
      </p>
    </div>
  );
}

function ChoiceInput({
  question,
  value,
  onChange,
  disabled,
}: {
  question: ChoiceQuestion;
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}) {
  return (
    <fieldset disabled={disabled}>
      <legend className="sr-only">Choose one answer</legend>
      <div className="space-y-2">
        {question.options.map((option) => {
          const selected = value === option.id;
          return (
            <label
              key={option.id}
              className={`flex items-center gap-3 rounded border px-4 py-2 text-sm transition-colors ${
                selected
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 bg-white text-gray-700"
              } ${disabled ? "" : "cursor-pointer hover:border-blue-300"}`}
            >
              <input
                type="radio"
                name={`answer-${question.id}`}
                value={option.id}
                checked={selected}
                onChange={() => onChange(option.id)}
                className="accent-blue-600"
              />
              <span>
                <span className="font-semibold">{option.id}.</span>{" "}
                {option.text}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function Feedback({
  correct,
  children,
}: {
  correct: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`mt-5 space-y-3 rounded-lg border p-5 ${
        correct
          ? "border-emerald-200 bg-emerald-50"
          : "border-red-200 bg-red-50"
      }`}
    >
      <p
        className={`text-sm font-semibold ${
          correct ? "text-emerald-700" : "text-red-700"
        }`}
      >
        {correct ? "✓ Correct" : "✗ Incorrect"}
      </p>
      {children}
    </div>
  );
}

function AnswerLine({ label, value }: { label: string; value: string }) {
  return (
    <p className="text-sm text-gray-700">
      <span className="text-xs uppercase tracking-wide text-gray-500">
        {label}
      </span>
      <span className="ml-2 font-bold text-gray-900">{value}</span>
    </p>
  );
}

function Calculation({ lines }: { lines: string[] }) {
  return (
    <div className="rounded border border-gray-200 bg-white px-3 py-2 font-mono text-xs text-gray-700">
      {lines.map((line) => (
        <p key={line}>{line}</p>
      ))}
    </div>
  );
}

// Never marked automatically — the learner compares and decides.
function SelfAssessment({
  question,
  mark,
  onMark,
}: {
  question: SelfAssessedQuestion;
  mark: boolean | null;
  onMark: (correct: boolean) => void;
}) {
  const choices = [
    { value: true, label: "I got it right" },
    { value: false, label: "I need to review it" },
  ];

  return (
    <div className="mt-5 space-y-4 rounded-lg border border-blue-100 bg-blue-50 p-5">
      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-500">
          Model answer
        </h3>
        <p className="text-sm text-gray-800">{question.modelAnswer}</p>
      </div>

      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-500">
          Key ideas
        </h3>
        <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
          {question.keyIdeas.map((idea) => (
            <li key={idea}>{idea}</li>
          ))}
        </ul>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-gray-800">
          Compare your answer with the model answer. How did you do?
        </p>
        <div className="flex flex-wrap gap-2">
          {choices.map((choice) => (
            <button
              key={choice.label}
              type="button"
              aria-pressed={mark === choice.value}
              onClick={() => onMark(choice.value)}
              className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
                mark === choice.value
                  ? "border-blue-500 bg-white font-medium text-blue-700"
                  : "border-gray-200 bg-white text-gray-700 hover:border-blue-300"
              }`}
            >
              {choice.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
