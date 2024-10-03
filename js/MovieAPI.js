const APIKEY = 'fbaa7d50-ccff-4b86-a9ef-1222eaea619c'; // мой апи
// const APIKEY = 'ab83b904-72ff-4863-8752-4a4e18e1acb8'; // апи кати

const API_URL_TOP_POPULAR = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_MOVIES&page=1'; // апи для отображения карточек на странице при загрузке
const API_URL_SEARCH = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword='; // апи для поиска фильмов
const API_URL_MOVIE_DETAILS = `https://kinopoiskapiunofficial.tech/api/v2.1/films/`; //// апи для получения детальной информации

export class MovieAPI {

  // Общий метод для выполнения запроса
  async fetchData(url) {
    try {
      const resp = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': APIKEY,
        },
      });

      if (!resp.ok) {
        throw new Error(`Ошибка запроса! Статус ошибки: ${resp.status}. Обновите страницу.`);
      }

      return await resp.json();
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error); // Вывод ошибки в консоль
      throw error;
    }
  }

  // Получение популярных фильмов
  async getPopularMovies() {
    return await this.fetchData(API_URL_TOP_POPULAR);
  }

  // Поиск фильмов
  async searchMovies(keydown) {
    return await this.fetchData(`${API_URL_SEARCH}${keydown}`)
  }

  // Получение данных для модального окна
  async getMovieDetails(id) {
    return await this.fetchData(`${API_URL_MOVIE_DETAILS}${id}`)
  }

  // Получение скриншотов фильма
  async getMovieScreenshots(id) {
    return await this.fetchData(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/images?type=SCREENSHOT&page=1`)
  }
}