import {changeTheme} from './theme.js';
import { showMovies } from './cards.js';
import { APIKEY, API_URL_TOP_POPULAR, API_URL_SEARCH } from './api.js';

const form = document.querySelector('.main__search-form');
const search = document.querySelector('.main__search-form_input');

changeTheme(); // вызываю функцию смены темы

// фетч логика
async function fetchData(url) {
  const resp = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': APIKEY,
    }
  })
  if (!resp.ok) {
    throw new Error(`Ошибка запроса! Статус ошибки: ${resp.status} Обновите страницу`)
  }
  return await resp.json();
}

async function getMovies(url) {
  try {
    const respData = await fetchData(url)
    showMovies(respData);

    if (respData.searchFilmsCountResult === 0) {
      showNoResult();
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

function showNoResult() {
  // Проверяем, существует ли уже сообщение об ошибке
  const existingError = document.querySelector('.no-results');

  if (existingError) {
    existingError.remove();
  }

  // Создаем новое сообщение об ошибке
  const noResultError = document.createElement('p');
  noResultError.innerHTML = 'Фильм не найден<br>Попробуйте еще раз';
  noResultError.classList.add('no-results');
  form.insertAdjacentElement('afterend', noResultError);

  // Показать сообщение с небольшой задержкой
  setTimeout(() => {
    noResultError.classList.add('show');
  }, 50);
}












