import { useQuiz } from "../contexts/QuizContext";
import { useTotalPoints } from "../hooks/useTotalPoints";

function FinishScreen() {
  const { points, highScore, dispatch } = useQuiz();
  const totalPoints = useTotalPoints();
  const scorePercentage = (points / totalPoints) * 100;

  let emoji;
  if (scorePercentage === 100)
    emoji = <img src='excellent.webp' alt='excellent emoji' loading='lazy' />;
  if (scorePercentage >= 80 && scorePercentage < 100)
    emoji = <img src='verygood.webp' alt='very good emoji' loading='lazy' />;
  if (scorePercentage >= 70 && scorePercentage < 80)
    emoji = <img src='good.webp' alt='good emoji' loading='lazy' />;
  if (scorePercentage >= 50 && scorePercentage < 70)
    emoji = <img src='bad.webp' alt='bad emoji' loading='lazy' />;
  if (scorePercentage > 0 && scorePercentage < 50)
    emoji = <img src='dizy.webp' alt='very bad emoji' loading='lazy' />;
  if (points === 0)
    emoji = <img src='cry.webp' alt='sad emoji' loading='lazy' />;

  const percentage = (points / totalPoints) * 100;
  return (
    <div className='main__content'>
      <p className='result_container'>
        <span className='emoji'>{emoji}</span> You scored {points} out of{" "}
        {totalPoints} ({Math.ceil(percentage)})%
      </p>
      <p className='highscore'>
        (highscore: <span className='score_number'>{highScore}</span>)
      </p>
      <button
        className='btn-restart'
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </div>
  );
}

export default FinishScreen;
