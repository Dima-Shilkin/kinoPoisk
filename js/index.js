import {changeTheme} from './theme.js';
import { showMovies } from './cards.js';
import { MovieAPI } from './MovieAPI.js';

const form = document.querySelector('.main__search-form');
const search = document.querySelector('.main__search-form_input');
const movieAPI = new MovieAPI();
changeTheme(); // вызываю функцию смены темы



async function loadPopularMovies() {
  try {
    const respData = await movieAPI.getPopularMovies();
    showMovies(respData);
  }
  catch(error) {
    console.log(`Ошибка: ${error.message}`)
  }
}

loadPopularMovies();
 

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const keyword = search.value;

  if (keyword) {
    const respData = await movieAPI.searchMovies(keyword);
    showMovies(respData);
    search.value = '';

    if (respData.searchFilmsCountResult === 0) {
      showNoResult();
    }
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












