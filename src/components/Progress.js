import { useQuiz } from "../contexts/QuizContext";
import { useTotalPoints } from "../hooks/useTotalPoints";

function Progress() {
  const { questions, index, answer, points } = useQuiz();
  const totalPoints = useTotalPoints();

  const numQuestions = questions.length;

  return (
    <header className='progress'>
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong> {index + 1}</strong> /{numQuestions}
      </p>
      <p>
        <strong>{points}</strong> /{totalPoints} Points
      </p>
    </header>
  );
}

export default Progress;
