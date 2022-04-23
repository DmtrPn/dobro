export interface AffirmationCreateForm {
    affirmation: AffirmationCreateParams;
}
export interface AffirmationCreateParams {
    id: string; // uuid
    text: string;
}
export interface AffirmationListResponse {
    readonly affirmations: AffirmationViewModel[];
}
export interface AffirmationUpdateForm {
    affirmation: AffirmationUpdateParams;
}
export interface AffirmationUpdateParams {
    text?: string;
}
export interface AffirmationViewModel {
    id: string;
    text: string;
}
export interface MovieCreateForm {
    movie: MovieCreateParams;
}
export interface MovieCreateParams {
    id: string; // uuid
    name: string;
    link: string;
    description?: string;
    rating?: number;
}
export interface MovieListResponse {
    readonly movies: MovieViewModel[];
}
export interface MovieRatingModel {
    movieId: string;
    userId: string;
    rating: number;
}
export interface MovieRatingUpdateForm {
    movieRating: MovieRatingUpdateParams;
}
export interface MovieRatingUpdateParams {
    movieId: string;
    userId: string;
    rating: number;
}
export type MovieStatus = "new" | "viewed" | "rejected";
export interface MovieUpdateForm {
    movie: MovieUpdateParams;
}
export interface MovieUpdateParams {
    name?: string;
    link?: string;
    description?: string;
    status?: "new" | "viewed" | "rejected";
    rating?: number;
}
export interface MovieViewModel {
    id: string;
    status: MovieStatus;
    link: string;
    name: string;
    description?: string;
    rating?: number;
    authorId: string;
    ratings?: MovieRatingModel[];
}
declare namespace Parameters {
    export type Id = string;
}
export interface PathParameters {
    id: Parameters.Id;
}
export type RequestBody = MovieRatingUpdateForm;
declare namespace Responses {
    export type $200 = UserResponse;
}
export interface UserListResponse {
    readonly users: UserViewModel[];
}
export interface UserResponse {
    readonly user: {
        id: string;
        status: UserStatus;
        name: string;
        email: string;
    };
}
export type UserStatus = "active" | "archive";
export interface UserViewModel {
    id: string;
    status: UserStatus;
    name: string;
    email: string;
}
