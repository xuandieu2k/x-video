export class VideoPicture {
    id: number = 0
    nr: number = 0
    picture: string = ""

    constructor(videoPicure: VideoPicture) {
        Object.assign(this, videoPicure)
    }
}
