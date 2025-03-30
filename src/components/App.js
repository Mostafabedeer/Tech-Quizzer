import Header from "./Header";
import Main from "./Main";
import Error from "./Error";
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
import { useQuiz } from "../contexts/QuizContext";

export default function App() {
  const { status } = useQuiz();

  return (
    <div className='app'>
      <Header />
      <Main>
        {status === "pendingForTag" && <TagInput />}
        {status === "pendingForDifficulty" && <DifficultyInput />}
        {status === "pendingForLimit" && <LimitInput />}
        {status === "ready" && <StartScreen />}
        {status === "error" && <Error />}

        {status === "active" && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextBtn />
            </Footer>
          </>
        )}
        {status === "finished" && <FinishScreen />}
      </Main>
    </div>
  );
}
