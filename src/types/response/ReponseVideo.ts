import { Video } from "../video"

export class ResponseVideo {
    page: number = 0
    per_page: number = 0
    total_results: number = 0
    next_page: string = ""
    prev_page: string = ""
    videos: Video[] = []
    url: string = ""

    constructor(response: Partial<ResponseVideo>) {
        Object.assign(this, response)
    }
}