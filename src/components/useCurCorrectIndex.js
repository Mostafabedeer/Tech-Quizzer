function useCurCorrectIndex(answers, correctAnswers) {
  const answerArray = Object.values(answers).filter((value) => value !== null);

  const correctKey = Object.keys(correctAnswers).find(
    (key) => correctAnswers[key] === "true"
  );

  if (!correctKey) return -1; // If no correct answer is found

  const correctValue = answers[correctKey.replace("_correct", "")];

  return answerArray.indexOf(correctValue);
}

export default useCurCorrectIndex;
