import { MovieStatus } from '../enums';

export interface MovieData {
    id: string;
    link: string;
    name: string;
    description?: string;
    authorId: string;
    status: MovieStatus;
    rating?: number;
}

export interface MovieCreateData {
    id: string;
    link: string;
    name: string;
    description?: string;
    rating?: number;
}

export interface MovieUpdateData {
    link?: string;
    name?: string;
    description?: string;
    status?: MovieStatus;
    rating?: number;
}

export interface MovieListResponse {
    movies: MovieData[];
}
