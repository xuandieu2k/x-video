class Cast {
    id: number = 0
    name: string = ""
    character: string = ""
    profile_path: string =""

    constructor(cast?: Partial<Cast>) {
        Object.assign(this, cast)
    }
}