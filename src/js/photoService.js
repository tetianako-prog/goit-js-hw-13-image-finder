const API_KEY = '20559470-5ee6005a5b9d05f63754ea23b';
const BASE_URL = 'https://pixabay.com/api/';

export default {
  searchQuery: '',
  page: 1,
  fetchPhotos() {
    return fetch(
      `${BASE_URL}?key=${API_KEY}&q=${this.query}&image_type=photo&page=${this.page}&orientation=horizontal&per_page=12`,
    )
      .then(res => res.json())
      .then(({ hits }) => {
        this.incrementPage();
        return hits;
      });
  },

  resetPage() {
    this.page = 1;
  },

  get query() {
    return this.searchQuery;
  },

  set query(value) {
    this.searchQuery = value;
  },

  incrementPage() {
    this.page += 1;
  },
};
