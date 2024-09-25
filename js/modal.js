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
  console.log(respData)
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
            <a class="modal__">
          </div>
        </div>
  `
  
  const btnClose = document.querySelector('.modal__image-close');
  btnClose.addEventListener('click', () => closeModal())
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

// // добавляет или удаляет марджин у body
// function scrollBarToggler() {
//   if (modalEl.classList.contains('open')) {
//     const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
//     document.body.style.marginRight = scrollBarWidth + 'px';
//   } else {
//     document.body.style.marginRight = ''
//   }
// }
function scrollBarToggler() {

  const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
  
     document.body.style.marginRight = modalEl.classList.contains('open') ? scrollBarWidth + 'px'
      : ''
  }

 

