import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import { fetchCountries } from '../script/fetchCountries';

const DEBOUNCE_DELAY = 1300;
const inputEl = document.getElementById('search-box');
const countryWrap = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

countryWrap.style.listStyle = 'none';

let markup = '';

inputEl.addEventListener('input', debounce(onInputHandler, DEBOUNCE_DELAY));

function onInputHandler(event) {
  const country = event.target.value.trim();

  if (!country) {
    countryWrap.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }

  fetchCountries(country)
    .then(chosenCountries => {
      if (chosenCountries.length === 1) {
        countryWrap.style.display = 'none';

        renderCountry(chosenCountries);
      } else if (chosenCountries.length >= 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else {
        getCountriesList(chosenCountries);
        countryWrap.style.display = 'block';
        const textEl = document.querySelector('.js-nameCountry');
        textEl.style.margin = '0px';
      }
    })
    .catch(error => {
      console.log('error');
    });
}

function renderCountry(chosenCountries) {
  markup = chosenCountries
    .map(({ name, flags, capital, population, languages }) => {
      return `<div class="country"><img src="${
        flags.png
      }" height="30" width="30" alt="${name}"><h2 class="js-nameCountry">${
        name.official
      }</h2></div>
        <p class="js-propCountry"><span class="text">Capital: </span>${capital}</p>
        <p class="js-propCountry"><span class="text">Population: </span>${population}</p>
        <p class="js-propCountry"><span class="text">Language: </span>${Object.values(
          languages
        )}</p>`;
    })
    .join('');
  return (countryInfo.innerHTML = markup);
}

function getCountriesList(chosenCountries) {
  markup = chosenCountries
    .map(chosenCountry => {
      return `<li><img src="${chosenCountry.flags.svg}" height="30" width="30" alt="flag of${chosenCountry.name}"><p class="js-nameCountry">${chosenCountry.name.official}</p></li>`;
    })
    .join('');

  return (countryWrap.innerHTML = markup);
}
