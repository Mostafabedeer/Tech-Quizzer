import { useEffect, useState } from "react";
import Loader from "./Loader";
import { useQuiz } from "../contexts/QuizContext";
import { useApiKey } from "../hooks/useApiKey";

function TagInput() {
  const { dispatch } = useQuiz();
  const [isLoading, setIsLoading] = useState(false);
  const [tag, setTag] = useState("Linux");
  const [tags, setTags] = useState([]);
  const API_KEY = useApiKey();

  function handleAddTag() {
    dispatch({ type: "addTag", payload: tag });
  }

  useEffect(
    function () {
      async function fetchTags() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `https://quizapi.io/api/v1/categories?apiKey=${API_KEY}`
          );
          if (!res.ok)
            dispatch({
              type: "dataFailed",
              payload: `An error occurred while fetching tags ${res.status}`,
            });
          const data = await res.json();
          setTags(data);
          setIsLoading(false);
        } catch (err) {
          dispatch({
            type: "dataFailed",
            payload: "An error occurred while fetching tags",
          });
        }
      }
      fetchTags();
    },
    [dispatch, API_KEY]
  );

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className='main__content'>
          <h3>Category</h3>
          <label>
            <select value={tag} onChange={(e) => setTag(e.target.value)}>
              {tags.map((tag) => (
                <option key={tag.id} value={tag.name}>
                  {tag.name}
                </option>
              ))}
            </select>
          </label>
          <button className='btn btn-shine' onClick={handleAddTag}>
            <span>Next</span>
          </button>
        </div>
      )}
    </>
  );
}

export default TagInput;
