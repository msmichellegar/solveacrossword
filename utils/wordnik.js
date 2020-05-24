import fetch from 'node-fetch';
import querystring from 'querystring';

const API_URL = 'http://api.wordnik.com/v4';
const API_KEY = process.env.API_KEY;

export const fetchSuggestions = async () => {
  const params = querystring.stringify({
    api_key: API_KEY,
  });

  const url = `${API_URL}/words.json/search/om?${params}`;

  let results;

  try {
    results = await fetch(url);
  } catch (err) {
    console.log({ err });
  }

  const json = await results.json();

  console.log(json);

  fetch(`${API_URL}/`)
    .then((res) => res.json())
    .then((json) => console.log(json));
};
