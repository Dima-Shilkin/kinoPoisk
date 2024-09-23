import {changeTheme} from './theme.js';
import { showMovies } from './cards.js';

const APIKEY = 'K6H9X04-VP74557-QCQP080-RCNTY1T';
const top20 = 'https://api.kinopoisk.dev/v1.4/movie?page=1&limit=20&notNullFields=name&rating.kp=1-10'; //здесь запрос на список фильмов с рейтингом от 1-10

changeTheme(); // вызываю функцию смены темы

getMovies(top20)

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









