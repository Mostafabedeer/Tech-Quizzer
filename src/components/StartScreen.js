import { useEffect, useState } from "react";
import Loader from "./Loader";
import { useQuiz } from "../contexts/QuizContext";
import { useApiKey } from "../hooks/useApiKey";

function StartScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const { limit, difficulty, tag, dispatch } = useQuiz();
  const API_KEY = useApiKey();

  useEffect(
    function () {
      async function fetchQuestions() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `https://quizapi.io/api/v1/questions?apiKey=${API_KEY}&category=${tag}&difficulty=${
              difficulty === "any" ? " " : difficulty
            }&limit=${limit}`
          );

          const data = await res.json();
          dispatch({
            type: "dataReceived",
            payload: data,
          });
        } catch (err) {
          dispatch({
            type: "dataFailed",
            payload: "An error occurred while fetching questions",
          });
        } finally {
          setIsLoading(false);
        }
      }
      fetchQuestions();
    },
    [dispatch, limit, difficulty, tag, API_KEY]
  );

  if (isLoading) return <Loader />;
  return (
    <div className='start'>
      <h3>
        Ary you ready
        <img
          className='ready_emoji'
          src='ready.webp'
          alt='smile emoji'
          loading='lazy'
        />
        ?
      </h3>

      <button className='btn-play' onClick={() => dispatch({ type: "active" })}>
        S T A R T
        <div id='clip'>
          <div id='leftTop' className='corner'></div>
          <div id='rightBottom' className='corner'></div>
          <div id='rightTop' className='corner'></div>
          <div id='leftBottom' className='corner'></div>
        </div>
        <span id='rightArrow' className='arrow'></span>
        <span id='leftArrow' className='arrow'></span>
      </button>
    </div>
  );
}

export default StartScreen;
