import { useState } from "react";
import { useQuiz } from "../contexts/QuizContext";

function LimitInput() {
  const { dispatch } = useQuiz();
  const [limit, setLimit] = useState(1);

  function handleAddLimit() {
    dispatch({ type: "ready", payload: limit });
  }

  return (
    <div className='main__content'>
      <h3>Number of Questions</h3>
      <label>
        <select value={limit} onChange={(e) => setLimit(e.target.value)}>
          {Array.from({ length: 30 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
      </label>

      <button className='btn btn-shine' onClick={handleAddLimit}>
        <span>Next</span>
      </button>
    </div>
  );
}

export default LimitInput;
