import { useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Error from "./Error";
import FetchQuestions from "./FetchQuestions";
import Question from "./Question";
import NextBtn from "./NextBtn";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
import Footer from "./Footer";
import TagInput from "./TagInput";
import DifficultyInput from "./DifficultyInput";
import LimitInput from "./LimitInput";
import StartScreen from "./StartScreen";

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
    case "addLimit":
      return {
        ...state,
        status: "loading",
        limit: action.payload,
      };
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        secondesRemining: state.questions.length * SEC_PER_SECOND,
        status: "ready",
      };
    case "ready":
      return {
        ...state,
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
      console.log(correctIndex, action.payload);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === correctIndex
            ? state.difficulty === "easy"
              ? state.points + 5
              : state.difficulty === "medium"
              ? state.points + 15
              : state.difficulty === "hard"
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

export default function App() {
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

  const numQuestions = questions.length;
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

  return (
    <div className='app'>
      <Header />
      <Main>
        {status === "pendingForTag" && <TagInput dispatch={dispatch} />}
        {status === "pendingForDifficulty" && (
          <DifficultyInput dispatch={dispatch} />
        )}
        {status === "pendingForLimit" && <LimitInput dispatch={dispatch} />}

        {status === "loading" && (
          <FetchQuestions
            status={status}
            tag={tag}
            difficulty={difficulty}
            limit={limit}
            dispatch={dispatch}
          />
        )}
        {status === "error" && <Error dispatch={dispatch} error={error} />}
        {status === "ready" && <StartScreen dispatch={dispatch} />}

        {status === "active" && (
          <>
            <Progress
              questions={questions}
              index={index}
              points={points}
              totalPoints={totalPoints}
              numQuestions={numQuestions}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondesRemining={secondesRemining} />
              <NextBtn
                dispatch={dispatch}
                index={index}
                answer={answer}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            highScore={highScore}
            totalPoints={totalPoints}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
