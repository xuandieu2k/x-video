import { AxiosResponse } from "axios";
import { ApiBaseConfig, ApiMovieRouters } from "../config/ApiConfig";
import axiosClient from "../config/AxiosClient";
import { ResponseVideo } from "../types/response/ReponseVideo";
import { MediaType, Movie } from "../types/Movie";
import { Review } from "../types/Review";

export const API_MOVIE = "b7c3309b3ea8fdf5c9afa62154eefc7f"
interface MovieResponse {
    page: number;
    results: Movie[]; // or TVShow[] depending on the response
    total_pages: number;
    total_results: number;
}

interface ReviewResponse {
    id: number;
    page: number;
    results: Review[];
    total_pages: number;
    total_results: number;
}

interface CreditsResponse {
    id: number;
    cast: Cast[];
    crew: Crew[];
}

interface Crew {
    id: number;
    name: string;
    job: string;
    profile_path: string;
}

export const getMovie = async (id: number, type: MediaType) => {
    try {
        const url = `${type == MediaType.TV ? ApiBaseConfig.HOST_THE_MOVIE_DB_TV : ApiBaseConfig.HOST_THE_MOVIE_DB_MOVIE}${id}?api_key=${API_MOVIE}&append_to_response=videos`;
        console.log("URL: " + url)
        const response: AxiosResponse<Movie> = await axiosClient.get(url);
        // console.log('Movie: ', JSON.stringify(response.data))
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getPopular = async (page: number) => {
    try {
        const url = `${ApiBaseConfig.HOST_THE_MOVIE_DB}${ApiMovieRouters.API_GET_POPULAR}?api_key=${API_MOVIE}&page=${page}`;
        const response: AxiosResponse<MovieResponse> = await axiosClient.get(url);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getTrending = async (page: number) => {
    try {
        const url = `${ApiBaseConfig.HOST_THE_MOVIE_DB}${ApiMovieRouters.API_GET_TRENDING}?api_key=${API_MOVIE}&page=${page}`;
        const response: AxiosResponse<MovieResponse> = await axiosClient.get(url);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export const searchMovie = async (query: string, page: number, include_adult: boolean) => {
    try {
        const url = `${ApiBaseConfig.HOST_THE_MOVIE_DB}${ApiMovieRouters.API_SEARCH}?include_adult=${include_adult}&api_key=${API_MOVIE}&query=${query}&language=en-US&page=${page}`;
        const response: AxiosResponse<ResponseVideo> = await axiosClient.get(url);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getReviews = async (idIMDB: number, type: MediaType) => {
    try {
        const url = `${type == MediaType.TV ? ApiBaseConfig.HOST_THE_MOVIE_DB_TV : ApiBaseConfig.HOST_THE_MOVIE_DB_MOVIE}${ApiMovieRouters.API_GET_REVIEWS(idIMDB)}?api_key=${API_MOVIE}`;
        // console.log("URL: " + url)
        const response: AxiosResponse<ReviewResponse> = await axiosClient.get(url);
        return response.data;
    } catch (error) {
        console.error('Reviews Request Error: ', error);
        throw error;
    }
};

export const getCasts = async (idIMDB: number, type: MediaType) => {
    try {
        const url = `${type == MediaType.TV ? ApiBaseConfig.HOST_THE_MOVIE_DB_TV : ApiBaseConfig.HOST_THE_MOVIE_DB_MOVIE}${type == MediaType.TV ? ApiMovieRouters.API_GET_CASTS_TV_SHOW(idIMDB) : ApiMovieRouters.API_GET_CASTS(idIMDB)}?api_key=${API_MOVIE}`;
        // console.log("URL: " + url)
        const response: AxiosResponse<CreditsResponse> = await axiosClient.get(url);
        return response.data;
    } catch (error) {
        console.error('Casts Request Error: ', error);
        throw error;
    }
};