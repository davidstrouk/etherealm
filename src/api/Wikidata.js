import queryFromWikimedia from "./Wikimedia";

function queryFromWikidata(params) {
  const url = "https://www.wikidata.org/w/api.php";

  return queryFromWikimedia(url, params);
}

export default queryFromWikidata;
