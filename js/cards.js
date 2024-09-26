import { openModal } from "./modal.js";

//  Маппер
function mapMoviesData(data) {
  // Проверяем наличие данных и выбираем правильное поле
  const moviesArray = data.items || data.films;

    return moviesArray.map(movie => ({
      name: movie.nameRu, // Имя фильма
      genres: movie.genres.map(genre => genre.genre).join(', '), // Жанры
      rating: movie.ratingKinopoisk || movie.rating, // Рейтинг
      poster: movie.posterUrlPreview, // постре
      year: movie.year, // год
      id: movie.kinopoiskId || movie.filmId,
    }));
  };
  
 export function showMovies(data) {
  const moviesEl = document.querySelector('.main__movies');
  const movies = mapMoviesData(data);
  moviesEl.innerHTML = '';

  movies.forEach(movie => {
    const movieEl = document.createElement('article');
    movieEl.classList.add('movie');
    
    movieEl.innerHTML = `
    <div class="movie">
        <div class="movie__cover-inner">
          <img 
            class="movie__cover-inner_img"
            src="${movie.poster}"
            alt="${movie.name}"
          />
          <div class="movie__cover-inner-darkened"></div>
        </div>
        <div class="movie__info">
          <h2 class="movie__info_title">${movie.name}</h2>
          <p class="movie__info_year">${movie.year}</p>
          <p class="movie__info_category">${movie.genres}</p>
          ${getRating(movie.rating)}
        </div>
      </div>
    `;

   // слушатель для модального окна
    movieEl.addEventListener('click', () => openModal(movie.id));
    
    moviesEl.appendChild(movieEl);
  });
};

//Функция для отображения рейтинга 
function getRating(rating) {
  if (rating !== null && rating !== undefined && rating !== 'null') {
    const classByRate = getClassByRate(rating)
    return `
    <span class="movie__info_average movie__info_average_${classByRate}">${rating}</span>`;
  }
    return '';
}

//Функция для отображения кружка с рейтингом
function getClassByRate(rate) {
  if (rate >= 7) {
    return 'green'
  } else if (rate > 5) {
    return 'orange'
  } else {
    return 'red'
  }
}











