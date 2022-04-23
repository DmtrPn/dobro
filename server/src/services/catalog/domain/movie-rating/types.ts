export interface MovieRatingFindOptions {
    movieId?: string;
    userId?: string;
}

export interface MovieRatingDTO {
    movieId: string;
    userId: string;
    rating: number;
}

export interface MovieRatingCreateData {
    movieId: string;
    userId: string;
    rating: number;
}

export interface MovieRatingUpdateData {
    rating: number;
}
