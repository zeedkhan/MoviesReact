const API_KEY = "0930d6e169489c706f349c5e382ab610";

const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=th-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=th-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentariesMovies: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  fetchAnimation: `/discover/movie?api_key=${API_KEY}&with_genres=16`,
  fetchBanner: `/discover/movie?api_key=${API_KEY}&language=th-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`,
  fetchTopBox: `/discover/movie?api_key=${API_KEY}&language=th-US&sort_by=revenue.desc`,
};

export default requests;
