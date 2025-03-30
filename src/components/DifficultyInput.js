import { useState } from "react";
import { useQuiz } from "../contexts/QuizContext";

function DifficultyInput() {
  const { dispatch } = useQuiz();
  const [difficulty, setDifficulty] = useState("any");

  function handleAddDifficulty(e) {
    dispatch({ type: "addDifficulty", payload: difficulty });
  }

  return (
    <div className='main__content'>
      <h3>Difficulty</h3>
      <label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(() => e.target.value)}
        >
          <option value='any'>any</option>
          <option value='easy'>easy</option>
          <option value='medium'>medium</option>
          <option value='hard'>hard</option>
        </select>
      </label>
      <button className='btn btn-shine' onClick={handleAddDifficulty}>
        <span>Next</span>
      </button>
    </div>
  );
}

export default DifficultyInput;
