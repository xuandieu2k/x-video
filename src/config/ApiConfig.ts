
export const ApiBaseConfig = {
  API_URL: "https://api.pexels.com",
  HOST_THE_MOVIE_DB: "https://api.themoviedb.org/3",
  HOST_THE_MOVIE_DB_TV: "https://api.themoviedb.org/3/tv/",
  HOST_THE_MOVIE_DB_MOVIE: "https://api.themoviedb.org/3/movie/",
  API_HTTPS: 'https://',
  HOST_IMAGE_BIG_SIZE: 'https://image.tmdb.org/t/p/w500',
  HOST_IMAGE: "https://image.tmdb.org/t/p/original"
}
export const ApiVideoRouters = {
  get API_GET_VIDEO_POPULAR() {
    return `/videos/popular`;
  },
  get API_GET_VIDEO_WITH_KEYSEARCH() {
    return `/videos/search`;
  },
}

export const ApiMovieRouters = {
  get API_GET_POPULAR() {
    return `/movie/popular`;
  },

  get API_GET_TRENDING() {
    return `/trending/all/day`;
  },

  get API_GET_NOW_PLAYING() {
    return `/movie/now_playing`;

  },

  get API_GET_UPCOMING() {
    return `/movie/upcoming`;

  },

  get API_GET_TOP_RATED() {
    return `/movie/top_rated`;

  },
  get API_SEARCH() {
    return `/search/multi`;

  },

  API_GET_CASTS(idIMDB: number) {
    return `${idIMDB}/casts`;
  },
  API_GET_CASTS_TV_SHOW(idIMDB: number) {
    return `${idIMDB}/credits`;
  },
  API_GET_REVIEWS(idIMDB: number) {
    return `${idIMDB}/reviews`;
  }
}
