import {changeTheme} from './theme.js';
import { showMovies } from './cards.js';
import { APIKEY, API_URL_TOP_POPULAR, API_URL_SEARCH } from './api.js';

const form = document.querySelector('.main__search-form');
const search = document.querySelector('.main__search-form_input');

changeTheme(); // вызываю функцию смены темы

getMovies(API_URL_TOP_POPULAR);

async function getMovies(url) {
  const resp = await fetch(url, {
    headers: {
      'Content-Type': 'aplication/json',
      'X-API-KEY': APIKEY,
    }
  });
  const respData = await resp.json();
  console.log(respData);
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
// ----------------------


// const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
// document.body.style.marginRight = scrollBarWidth + 'px';







