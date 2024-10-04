export class Movie {
  adult: boolean = false
  backdrop_path: string = ""
  belongs_to_collection: BelongsToCollection | null = null
  budget: number = 0
  genres: Genre[] = []
  homepage: string = ""
  id: number = 0
  imdb_id: string = ""
  origin_country: string[] = []
  original_language: string = ""
  original_title: string = ""
  overview: string = ""
  popularity: number = 0
  poster_path: string = ""
  production_companies: ProductionCompany[] = []
  production_countries: ProductionCountry[] = []
  release_date: string = ""
  first_air_date: string = ""
  revenue: number = 0
  runtime: number = 0
  spoken_languages: SpokenLanguage[] = []
  status: string = ""
  tagline: string = ""
  title: string = ""
  name: string = ""
  original_name: string = ""
  video: boolean = false
  vote_average: number = 0
  vote_count: number = 0
  videos: Videos | null = null
  media_type: MediaType = MediaType.NotFound
  seasons: Season[] = []

  constructor(movie?: Partial<Movie>) {
    Object.assign(this, movie)
  }
}

export enum MediaType {
  Movie = "movie",
  TV = "tv",
  NotFound = "not_found",
}

export class BelongsToCollection {
  id: number = 0
  name: string = ""
  poster_path: string = ""
  backdrop_path: string = ""

  constructor(collection?: Partial<BelongsToCollection>) {
    Object.assign(this, collection)
  }
}

export class Genre {
  id: number = 0
  name: string = ""

  constructor(genre?: Partial<Genre>) {
    Object.assign(this, genre)
  }
}

export class ProductionCompany {
  id: number = 0
  logo_path?: string = ""
  name: string = ""
  origin_country: string = ""

  constructor(company?: Partial<ProductionCompany>) {
    Object.assign(this, company)
  }
}

export class ProductionCountry {
  iso_3166_1: string = ""
  name: string = ""

  constructor(country?: Partial<ProductionCountry>) {
    Object.assign(this, country)
  }
}

export class SpokenLanguage {
  english_name: string = ""
  iso_639_1: string = ""
  name: string = ""

  constructor(language?: Partial<SpokenLanguage>) {
    Object.assign(this, language)
  }
}

export class Videos {
  results: Result[] = []

  constructor(videos?: Partial<Videos>) {
    Object.assign(this, videos)
  }
}

export class Result {
  iso_639_1: string = ""
  iso_3166_1: string = ""
  name: string = ""
  key: string = ""
  site: string = ""
  size: number = 0
  type: string = ""
  official: boolean = false
  published_at: string = ""
  id: string = ""

  constructor(result?: Partial<Result>) {
    Object.assign(this, result)
  }
}

export class Season {
  air_date: string = ""
  episode_count: number = 0
  id: number = 0
  name: string = ""
  overview: string = ""
  poster_path: string = ""
  season_number: number = 0
  vote_average: number = 0.0

  constructor(result?: Partial<Season>) {
    Object.assign(this, result)
  }

}

export class Episode {
  id: number = 0
  name: string = ""
  constructor(result?: Partial<Episode>) {
    Object.assign(this, result)
  }
} 