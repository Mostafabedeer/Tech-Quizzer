function Progress({ numQuestions, index, points, totalPoints, answer }) {
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
