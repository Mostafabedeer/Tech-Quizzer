function FinishScreen({ dispatch, points, totalPoints, highScore }) {
  const scorePercentage = (points / totalPoints) * 100;

  let emoji;
  if (scorePercentage === 100)
    emoji = <img src='excellentEmoji.webp' alt='excellent emoji' />;
  if (scorePercentage >= 80 && scorePercentage < 100)
    emoji = <img src='verygoodEmoji.webp' alt='very good emoji' />;
  if (scorePercentage >= 70 && scorePercentage < 80)
    emoji = <img src='goodEmoji.webp' alt='good emoji' />;
  if (scorePercentage >= 50 && scorePercentage < 70)
    emoji = <img src='badEmoji.webp' alt='bad emoji' />;
  if (scorePercentage > 0 && scorePercentage < 50)
    emoji = <img src='dizyEmoji.webp' alt='very bad emoji' />;
  if (points === 0) emoji = <img src='cryEmoji.webp' alt='sad emoji' />;

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
