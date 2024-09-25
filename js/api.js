export {APIKEY, API_URL_MOVIE_DETAILS, API_URL_TOP_POPULAR, API_URL_SEARCH}

const APIKEY = 'fbaa7d50-ccff-4b86-a9ef-1222eaea619c'; // мой апи

const API_URL_TOP_POPULAR = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_MOVIES&page=1'; // апи для отображения карточек на странице при загрузке
const API_URL_SEARCH = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword='; // апи для поиска фильмов
const API_URL_MOVIE_DETAILS = `https://kinopoiskapiunofficial.tech/api/v2.1/films/`; //// апи для получения детальной информации