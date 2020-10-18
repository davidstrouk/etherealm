import queryFromWikimedia from "./Wikimedia";

function queryFromWikipedia(params) {
  const url = "https://en.wikipedia.org/w/api.php";
  return queryFromWikimedia(url, params);
}

export default queryFromWikipedia;
