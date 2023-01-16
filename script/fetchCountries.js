import { Notify } from 'notiflix';

export function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,flags,population,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    } else {
      return response.json();
    }
  });
}
