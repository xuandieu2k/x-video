

export class VideoFile {
    id: number = 0
    quality: string = ""
    file_type: string = ""
    width: number = 0
    height: number = 0
    fps: number = 0
    link: string = ""
    size: number = 0

    constructor(videoFile: Partial<VideoFile>) {            
        Object.assign(this, videoFile)      
    }
}

