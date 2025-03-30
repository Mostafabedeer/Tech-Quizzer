import { useQuiz } from "../contexts/QuizContext";

function useTotalPoints() {
  const { questions } = useQuiz();
  // Define point values for each difficulty
  const POINTS_MAP = {
    Easy: 5,
    Medium: 15,
    Hard: 30,
  };

  // Compute total points
  const totalPoints = questions.reduce((sum, question) => {
    return sum + (POINTS_MAP[question.difficulty] || 0);
  }, 0);
  return totalPoints;
}

export { useTotalPoints };
