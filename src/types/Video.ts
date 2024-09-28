import { User } from "./user"
import { VideoFile } from "./VideoFile"
import { VideoPicture } from "./VideoPicture"

export class Video {
    id: number = 0
    width: number = 0
    height: number = 0
    duration: number = 0
    full_res: any = {}
    tags: any[]= []
    url: string = ""
    image: string = ""
    avg_color: any = {}
    user: User = new User()
    video_files: VideoFile[] = []
    video_pictures: VideoPicture[] =[]

    constructor(video?: Partial<Video>) {
        Object.assign(this, video)
    }
}