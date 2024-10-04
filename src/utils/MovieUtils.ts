import { ApiBaseConfig } from "../config/ApiConfig"
import { Movie } from "../types/Movie"

export const getURLImage = (path: string) => {
    path = path ?? "url-not-correct"
    if (path == '') {
        path = path + "url-not-correct"
    }
    try {
        if (path && !path.includes("http")) {
            return ApiBaseConfig.HOST_IMAGE + path
        } else {
            return path;
        }
    } catch (error) {
        return path;
    }
}

export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0, // Không hiển thị phần thập phân
        maximumFractionDigits: 0
    }).format(amount);
}

export const getMediaType = (mediaType: string) => {
    switch (mediaType) {
        case "movie":
            return "MOVIE"
        case "tv":
            return "TV SHOW"
        default:
            return "movie"
    }
}

export const getNameMovie = (movie: Movie) => {
    if (movie.media_type == "tv") {
        return movie.name
    }

    if (movie.media_type == "movie") {
        return movie.title
    }

    return "Không xác định"
}

export const getReleaseMovie = (movie: Movie) => {
    if (movie.media_type == "tv") {
        return movie.first_air_date
    }

    if (movie.media_type == "movie") {
        return movie.release_date
    }

    return "Không xác định"
}