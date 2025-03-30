import { useEffect, useState } from "react";
import { useQuiz } from "../contexts/QuizContext";

function Timer() {
  const { dispatch, secondesRemining } = useQuiz();
  const [tick, setTick] = useState(secondesRemining);
  const mins = Math.floor(tick / 60);
  const secs = tick % 60;

  useEffect(
    function () {
      const intervalId = setInterval(() => {
        if (tick <= 0) {
          dispatch({ type: "finish" });
          return;
        }
        setTick((prevTick) => prevTick - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    },
    [dispatch, tick]
  );

  return (
    <div className='timer'>
      {mins < 10 ? `0${mins}` : mins}: {secs < 10 ? `0${secs}` : secs}
    </div>
  );
}

export default Timer;
