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
}
declare namespace Parameters {
    export type Id = string;
}
export interface PathParameters {
    id: Parameters.Id;
}
export type RequestBody = MovieUpdateForm;
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
