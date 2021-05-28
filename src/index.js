import './sass/main.scss';
import galleryTemplate from './templates/gallery-templates.hbs';
import NewsApiService from './js/apiService';
import LoadeMoreBtn from './js/load-more-btn';

const refs = {
  searchForm: document.querySelector('#search-form'),
  galleryContainer: document.querySelector('.js-gallery'),
  //   loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};
const loadMoreBtn = new LoadeMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchArticles);

function onSearch(evt) {
  evt.preventDefault();

  newsApiService.query = evt.currentTarget.elements.query.value;

  loadMoreBtn.show();
  newsApiService.resetPage();
  clearGalleryContainer();
  fetchArticles();
}

// document.querySelectorAll('.button').forEach(button => {
//   button.addEventListener('click', () => {
//     button.scrollIntoView({
//       behavior: 'smooth',
//       block: button.dataset.pos,
//     });
//   });
// });

function scrollToButton() {
  loadMoreBtn.refs.button.forEach(button => {
    button.addEventListener('click', () => {
      button.scrollIntoView({
        behavior: 'smooth',
        block: button.dataset.pos,
      });
    });
  });
}

function fetchArticles() {
  loadMoreBtn.disable();

  newsApiService.fetchArticles().then(hits => {
    galleryMarkup(hits);
    loadMoreBtn.enable();
  });
}

function galleryMarkup(hits) {
  refs.galleryContainer.insertAdjacentHTML('beforeend', galleryTemplate(hits));
}

function clearGalleryContainer() {
  refs.galleryContainer.innerHTML = '';
}
