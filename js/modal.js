import { APIKEY, API_URL_MOVIE_DETAILS } from "./api.js";

// модальное окно
const modalEl = document.querySelector('.modal');

export async function openModal(id) {
  const resp = await fetch(API_URL_MOVIE_DETAILS + id, {
    headers: {
      'Content-Type': 'aplication/json',
      'X-API-KEY': APIKEY,
    }
  });
  const respData = await resp.json();
  console.log(respData);
  modalEl.classList.add('open');
  scrollBarToggler()

  document.body.classList.add('stop__scrolling');
  
  const genre = respData.data.genres.map(genre => genre.genre).join(', ')
  
  modalEl.innerHTML = `
        <div class="modal__content">
          <img class="modal__image-close" src="./img/close.png" alt="кнопка закрыть">
          <div class="modal__image">
            <img class="modal__image-img" src="${respData.data.posterUrl}" alt="">
          </div>
          <div class="modal__details">
            <p class="modal__title ">${respData.data.nameRu}</p>
            <p class="modal__year modal__discription">Год выпуска: ${respData.data.year}</p>
            <p class="modal__countri modal__discription">Страна: ${respData.data.premiereWorldCountry}</p>
            <p class="modal__genre modal__discription">Жанр: ${genre}</p>
            <p class="modal__discription">Описание: ${respData.data.description}</p>
            <a class="modal__discription modal__discription_link" href="${respData.data.webUrl}" target="_blank">Cмотреть здесь</a>
          </div>
          <div class="swiper mySwiper"></div>
          
        </div>
  `
  
  const btnClose = document.querySelector('.modal__image-close');
  btnClose.addEventListener('click', () => closeModal());
  
  
  await showScreen(respData.data.filmId);
}

function closeModal() {
  modalEl.classList.remove('open');
  document.body.classList.remove('stop__scrolling');
  scrollBarToggler()
  
};

window.addEventListener('click', (e) => {
  if (e.target === modalEl) {
    closeModal();
  }
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});

// // добавляет или удаляет скролл у body
function scrollBarToggler() {

  const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
  
     document.body.style.marginRight = modalEl.classList.contains('open') ? scrollBarWidth + 'px'
      : ''
  }

  async function showScreen(id) {
    const resp = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/images?type=SCREENSHOT&page=1`, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': APIKEY,  // Замени APIKEY на свой реальный ключ
      }
    });
  
    const respData = await resp.json();
    
    // Создаем контейнер для слайдов
    const screens = document.createElement('div');
    screens.className = 'swiper-wrapper';  // Контейнер для слайдов
    
    // Получаем контейнер Swiper
    const swiperr = document.querySelector('.swiper');
    swiperr.appendChild(screens);  // Добавляем swiper-wrapper внутрь swiper
  
    // Проходим по изображениям и добавляем их как слайды
    respData.items.forEach(item => {
      const screenImg = `
        <div class="swiper-slide">
          <img src="${item.imageUrl}" alt="">
        </div>
      `;
      screens.insertAdjacentHTML('beforeend', screenImg);
    });
  
    // Создаем элемент для пагинации и добавляем его в swiper
    const swiperPagination = document.createElement('div');
    swiperPagination.className = 'swiper-pagination';  // Контейнер для пагинации
    swiperr.appendChild(swiperPagination);  // Добавляем pagination внутрь swiper
  
    // Инициализируем Swiper после добавления слайдов и пагинации
    var swiper = new Swiper(".mySwiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      pagination: {
        el: ".swiper-pagination",  // Привязываем пагинацию к новому элементу
      },
    });
  
    // Обновляем Swiper после динамической загрузки данных
    swiper.update();
  }





