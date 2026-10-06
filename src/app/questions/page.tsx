import Quiz from "@/components/questions/Quiz";

export default function QuestionsPage() {
  return (
    <div className="max-w-3xl space-y-8">
      <header>
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Questions</h1>
        <p className="max-w-2xl text-gray-500">
          Test your understanding of the financial concepts with ten questions.
          Answer each one, submit it, and you will see the correct answer and an
          explanation before moving on. Your score is shown at the end.
        </p>
      </header>

      <Quiz />
    </div>
  );
}
