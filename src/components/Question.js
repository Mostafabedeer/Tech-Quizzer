import { useQuiz } from "../contexts/QuizContext";
import Options from "./Options";

function Question() {
  const { questions, dispatch, answer, index } = useQuiz();
  const question = questions[index];
  return (
    <div>
      <span
        className={`difficulty ${
          question.difficulty === "Easy"
            ? "easy"
            : question.difficulty === "Medium"
            ? "medium"
            : "hard"
        }`}
      >
        {question.difficulty}
      </span>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
