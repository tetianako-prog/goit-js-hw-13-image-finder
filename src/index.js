import './styles.css';
import cardTemplate from './templates/card.hbs';
import photoService from './js/photoService';
import refs from './js/refs';
import './js/lightBox';

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  photoService.query = e.currentTarget.elements.query.value;
  if (photoService.query === '') {
    return alert('Введите поисковый запрос');
  }

  document.body.style.height = '';
  refs.gallery.innerHTML = '';
  refs.form.reset();
  photoService.resetPage();
  refs.loadMoreBtn.classList.add('is-hidden');

  photoService.fetchPhotos().then(photos => {
    createMarkup(photos);
    refs.loadMoreBtn.classList.remove('is-hidden');
  });
});

refs.loadMoreBtn.addEventListener('click', () => {
  refs.loadMoreBtn.classList.add('is-hidden');
  const height = refs.gallery.scrollHeight + 100;
  document.body.style.height = document.body.scrollHeight + 780 + 'px';

  photoService.fetchPhotos().then(photos => {
    createMarkup(photos);
    refs.loadMoreBtn.classList.remove('is-hidden');
    window.scrollTo({
      top: height,
      behavior: 'smooth',
    });
  });
});

function createMarkup(data) {
  const markup = cardTemplate(data);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}
