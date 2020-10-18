import fetch from "cross-fetch";

function queryFromWikimedia(endpoint, params) {
  let url = endpoint + "?origin=*";
  Object.keys(params).forEach((key) => {
    url += "&" + key + "=" + params[key];
  });

  return fetch(url)
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });
}

export default queryFromWikimedia;
