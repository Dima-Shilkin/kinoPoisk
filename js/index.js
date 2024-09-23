import {changeTheme} from './theme.js';
import { showMovies } from './cards.js';

// const APIKEY = 'K6H9X04-VP74557-QCQP080-RCNTY1T'; // мой апи
const APIKEY = '7XZA8QE-F744GJH-QP9DPAD-A88SPXC'; // апи Кати
// const APIKEY = '6PMKK8A-27Y43TY-P97XDJP-AC70PBW'; // апи Рамиль

const API_URL_TOP20 = 'https://api.kinopoisk.dev/v1.4/movie?page=1&limit=20&notNullFields=name&rating.kp=1-10'; //здесь запрос на список фильмов с рейтингом от 1-10
const API_URL_SEARCH = 'https://api.kinopoisk.dev/v1.4/movie/search?page=1&limit=10&query=';

const form = document.querySelector('.main__search-form');
const search = document.querySelector('.main__search-form_input');

changeTheme(); // вызываю функцию смены темы

getMovies(API_URL_TOP20)

async function getMovies(url) {
  const resp = await fetch(url, {
    headers: {
      'Content-Type': 'aplication/json',
      'X-API-KEY': APIKEY,
    }
  });
  const respData = await resp.json();
  showMovies(respData);
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
  if (search.value) {
    getMovies(apiSearchUrl);
    search.value = '';
  }

})









