import useCurCorrectIndex from "./useCurCorrectIndex";

function Options({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;

  const { answers, correct_answers } = question;

  const correctAnswerIndex = useCurCorrectIndex(answers, correct_answers);
  return (
    <ul className='options'>
      {Object.entries(answers)
        .filter(([key, value]) => value !== null) // Remove null values
        .map(([key, option], index) => (
          <li key={option}>
            <button
              disabled={hasAnswered}
              className={`btn btn-option btn-shine ${
                answer === index ? "answer" : ""
              } ${
                hasAnswered
                  ? index === correctAnswerIndex
                    ? "correct"
                    : "wrong"
                  : ""
              } `}
              onClick={() => {
                dispatch({ type: "newAnswer", payload: index });
              }}
            >
              <span>
                {hasAnswered
                  ? index === correctAnswerIndex
                    ? `✔️ ${option}`
                    : `❌ ${option}`
                  : option}
              </span>
            </button>
          </li>
        ))}
    </ul>
  );
}

export default Options;
