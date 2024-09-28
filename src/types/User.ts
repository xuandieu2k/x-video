
export class User {
    id: number = 0
    name: string = ""
    url: string = ""


    constructor(user?: Partial<User>) {
        Object.assign(this, user)
    }
}