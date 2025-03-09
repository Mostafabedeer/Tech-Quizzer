import { useEffect, useState } from "react";
import Loader from "./Loader";

const API_KEY = "YCSHhbJCFG1goW63mj4f5EKNplj9F3dPo1242W2e";
function TagInput({ dispatch }) {
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("Linux");

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
    [dispatch]
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
