import * as BackendTypes from '../backend/types';

export interface MovieData extends BackendTypes.MovieViewModel {}
export interface MovieResponse extends BackendTypes.MovieResponse {}
export interface MovieListResponse extends BackendTypes.MovieListResponse {}
export interface MovieCreateData extends BackendTypes.MovieCreateParams {}
export interface MovieUpdateData extends BackendTypes.MovieUpdateParams {}
