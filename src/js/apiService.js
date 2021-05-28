const API_KEY = '21815021-79bfb23f6f8ef5a2e7a087898';
const BASE_URL = 'https://pixabay.com/api/';

export default class NewApiServise {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 12;
  }

  async fetchArticles() {
    const response = await fetch(
      `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=${this.per_page}&key=${API_KEY}`,
    );

    const newImage = await response.json();
    this.incrementPage();

    return newImage.hits;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
