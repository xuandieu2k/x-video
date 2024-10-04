export class Review {
    id: number = 0
    author: string = ""
    content: string = ""
    created_at: string = ""
    updated_at: string = ""
    url: string = ""
    rating: number | null = null
    author_details: AuthorDetails = new AuthorDetails()

    constructor(review?: Partial<Review>) {
        Object.assign(this, review)
    }
}

class AuthorDetails {
    name: string = ""
    username: string = ""
    avatar_path: string | null = null

    constructor(authorDetails?: Partial<AuthorDetails>) {
        Object.assign(this, authorDetails)
    }
}