import API_KEY from "./keys";
const CONTEXT_KEY = "1e4b841ff3cd006fe";

function useGoogleSearch(term, pageNumber) {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    fetch(
      `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CONTEXT_KEY}&q=${term}&start=${
        (pageNumber - 1) * 10 + 1
      }`
    )
      .then((response) => response.json())
      .then((result) => {
        setData(result);
      });
  };

  fetchData();
  return { data };
}

export default useGoogleSearch;
