import {changeTheme} from './theme.js';
import { showMovies } from './cards.js';
import { APIKEY, API_URL_TOP_POPULAR, API_URL_SEARCH } from './api.js';

const form = document.querySelector('.main__search-form');
const search = document.querySelector('.main__search-form_input');

changeTheme(); // вызываю функцию смены темы

async function getMovies(url) {
  try {
    const resp = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': APIKEY,
      }
    });

    if (!resp.ok) {
      throw new Error(`Ошибка запроса! Статус ошибки: ${resp.status} Обновите страницу`)
    }

    const respData = await resp.json();
    console.log(respData);
    showMovies(respData);

    if (respData.searchFilmsCountResult === 0) {
      console.log(`ошибка`)
    }
  }
  catch(error) {
    console.log(`Ошибка: ${error.message}`)
  }
  }

  getMovies(API_URL_TOP_POPULAR);
 

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
  if (search.value) {
      getMovies(apiSearchUrl);
      search.value = '';
  } 
})
// ----------------------

// if (respData.searchFilmsCountResult === 0) {
//   console.log('Ошибка: Фильмы не найдены'); // Выводим сообщение об ошибке
// }








