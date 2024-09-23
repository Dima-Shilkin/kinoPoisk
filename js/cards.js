 export function showMovies(data) {
  const moviesEl = document.querySelector('.main__movies');

  data.docs.forEach(movie => {
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
    <div class="movie">
        <div class="movie__cover-inner">
          <img 
            class="movie__cover-inner_img"
            src="${movie.poster.previewUrl}"
            alt="${movie.name}"
          />
          <div class="movie__cover-inner-darkened"></div>
        </div>
        <div class="movie__info">
          <h2 class="movie__info_title">${movie.name}</h2>
          <p class="movie__info_category">${movie.genres.map(genre => genre.name).join(', ')}</p>
          <span class="movie__info_average movie__info_average_${getClassByRate(movie.rating.kp)}">${movie.rating.kp.toFixed(1)}</span>
        </div>
      </div>
    `;
    moviesEl.appendChild(movieEl);
  })
}

// Для отображения кружка с рейтингом
function getClassByRate(rate) {
  if (rate >= 7) {
    return 'green'
  } else if (rate > 5) {
    return 'orange'
  } else {
    return 'red'
  }
}