import { createContext, useContext, useReducer } from "react";

// 1) Create a context
const QuizContext = createContext();

const SEC_PER_SECOND = 30;
const initialState = {
  questions: [],
  //pending, loading, error, active, finished, restart
  status: "pendingForTag",
  tag: null,
  limit: 0,
  difficulty: null,
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondesRemining: null,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "addTag":
      return {
        ...state,
        status: "pendingForDifficulty",
        tag: action.payload,
      };
    case "addDifficulty":
      return {
        ...state,
        status: "pendingForLimit",
        difficulty: action.payload,
      };

    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        secondesRemining: action.payload.length * SEC_PER_SECOND,
        status: "ready",
      };
    case "ready":
      return {
        ...state,
        limit: action.payload,
        status: "ready",
      };
    case "active":
      return {
        ...state,
        status: "active",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
        error: action.payload,
      };

    case "restart":
      return {
        ...state,
        status: "pendingForTag",
        tag: null,
        difficulty: null,
        limit: 0,
        index: 0,
        answer: null,
        points: 0,
        secondesRemining: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "newAnswer":
      const curQuestion = state.questions.at(state.index);
      const { answers, correct_answers } = curQuestion;
      const answerArray = Object.values(answers).filter(
        (value) => value !== null
      );

      const correctKey = Object.keys(correct_answers).find(
        (key) => correct_answers[key] === "true"
      );

      const correctValue = answers[correctKey.replace("_correct", "")];

      const correctIndex = answerArray.indexOf(correctValue);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === correctIndex
            ? state.questions[state.index].difficulty === "Easy"
              ? state.points + 5
              : state.questions[state.index].difficulty === "Medium"
              ? state.points + 15
              : state.questions[state.index].difficulty === "Hard"
              ? state.points + 30
              : state.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "timeOut":
      return {
        ...state,
        secondesRemining: null,
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
        status: "finished",
      };
    default:
      throw new Error("unkonwn action");
  }
}

function QuizProvider({ children }) {
  const [
    {
      tag,
      difficulty,
      limit,
      questions,
      status,
      index,
      answer,
      points,
      highScore,
      secondesRemining,
      error,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  return (
    <QuizContext.Provider
      value={{
        tag,
        difficulty,
        limit,
        questions,
        status,
        index,
        answer,
        points,
        highScore,
        secondesRemining,
        error,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}

export { QuizProvider, useQuiz };
