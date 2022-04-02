export const enum MovieStatus {
    New = 'new',
    Viewed = 'Female',
}

export interface MovieData {
    id: string;
    link: string;
    name: string;
    description?: string;
    authorId: string;
    status: MovieStatus;
    rating: number;
}

export interface MovieListResponse {
    movies: MovieData[];
}
