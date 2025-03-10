import { useEffect } from "react";
import Loader from "./Loader";

const API_KEY = "YCSHhbJCFG1goW63mj4f5EKNplj9F3dPo1242W2e";

function FetchQuestions({ status, tag, difficulty, limit, dispatch }) {
  useEffect(
    function () {
      async function fetchTags() {
        try {
          const res = await fetch(
            `https://quizapi.io/api/v1/questions?apiKey=${API_KEY}&category=${tag}&difficulty=${difficulty}&limit=${limit}`
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
        }
      }
      fetchTags();
    },
    [dispatch, limit, difficulty, tag]
  );

  return <Loader />;
}

export default FetchQuestions;
