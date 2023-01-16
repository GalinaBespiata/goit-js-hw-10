import { Notify } from 'notiflix';

export function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,flags,population,languages`
  ).then(response => {
    if (!response.ok) {
      Notify.failure('Oops, there is no country with that name');
    } else {
      return response.json();
    }
  });
}
