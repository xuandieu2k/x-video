import { AxiosResponse } from "axios";
import { ApiVideoRouters } from "../config/ApiConfig";
import { BaseResponse } from "../config/BaseResponse";
import axiosClient from "../config/AxiosClient";
import { ResponseVideo } from "../types/response/ReponseVideo";

export const API_PEXELS = "vueCURBr9F2QljdlpP1zOl4FsjKOpmBmV6J3OhWmj3vp4ZGI6rGGRMJ7"
export const getVideoByKeywordApi = async (page: number, per_page: number, query: string) => {
    try {
        const url = ApiVideoRouters.API_GET_VIDEO_WITH_KEYSEARCH;
        const response: AxiosResponse<ResponseVideo> = await axiosClient.get(url,
            {
                params: {
                    page: page,
                    per_page: per_page,
                    query: query,
                },
                headers: {
                    Authorization: API_PEXELS
                },
            });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export const getVideoPopularApi = async (page: number, per_page: number) => {
    try {
        const url = ApiVideoRouters.API_GET_VIDEO_POPULAR;
        const response: AxiosResponse<ResponseVideo> = await axiosClient.get(url,
            {
                params: {
                    page: page,
                    per_page: per_page,
                },
                headers: {
                    Authorization: API_PEXELS
                },
            });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}