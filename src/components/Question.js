import Options from "./Options";

function Question({ question, dispatch, answer }) {
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
