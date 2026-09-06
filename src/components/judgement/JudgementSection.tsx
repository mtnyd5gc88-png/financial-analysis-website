// The "Your Judgement" section. Deliberately a set of prompts rather than a
// scored output: the learner interprets the evidence, and the site never
// resolves the data into a verdict, rating, or buy/sell view.
//
// The interaction model (free text, structured prompts, or guided questions)
// is still to be decided; the prompts below are the educational contract.

interface Props {
  companyName: string;
}

const JUDGEMENT_PROMPTS: { question: string; hint: string }[] = [
  {
    question: "What does this number tell you?",
    hint: "Pick one metric above and say, in your own words, what it measures — before deciding whether you think it is high or low.",
  },
  {
    question: "What evidence supports your judgement?",
    hint: "Point to the specific figures you are relying on, and the category each comes from.",
  },
  {
    question: "What other metrics should you consider?",
    hint: "A figure in one category rarely settles a question on its own. Which other categories would test the same idea?",
  },
  {
    question: "What information is still missing?",
    hint: "Some metrics here are pending, not collected this round, or not meaningful. What would you need before you were confident?",
  },
  {
    question: "How does the market's reaction compare with the results themselves?",
    hint: "Market Reaction & Risk measures investor behaviour, not company performance. Strong results do not automatically mean a rising price.",
  },
];

export default function JudgementSection({ companyName }: Props) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6">
      <h2 className="mb-1 text-lg font-bold text-gray-900">Your Judgement</h2>
      <p className="mb-6 text-sm text-gray-500">
        Use the data above to form your own view on {companyName}. There is no
        correct answer — the goal is to practise interpreting financial
        information and to be explicit about the evidence behind your reading.
      </p>

      <ul className="space-y-3">
        {JUDGEMENT_PROMPTS.map((prompt) => (
          <li
            key={prompt.question}
            className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3"
          >
            <p className="text-sm font-medium text-gray-800">
              {prompt.question}
            </p>
            <p className="mt-1 text-xs text-gray-500">{prompt.hint}</p>
            {/* Response input will be added when the interaction model is decided */}
          </li>
        ))}
      </ul>

      <p className="mt-4 text-xs text-gray-400">
        This tool does not provide buy or sell recommendations, ratings, or
        scores. All judgements are your own.
      </p>
    </section>
  );
}
