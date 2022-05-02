import orderBy from 'lodash/orderBy';

import { MovieData, MovieUpdateData } from 'dobro-types/frontend';
import { MovieStatus } from 'dobro-types/enums';

import { EntityList } from '@store/models/EntityList';
import { Movie } from './Movie';

interface FilterParams {
    status?: MovieStatus;
}

export class MovieList extends EntityList<Movie, MovieData, MovieUpdateData, FilterParams> {

    protected entityClass = Movie;

    protected filterValue(value: Movie, { status }: FilterParams): boolean {
        return !!status ? value.serialize().status === status : true;
    }

    protected getOrderedValues(params: Movie[]): Movie[] {
        return orderBy(params, movie => Number(movie.rating), 'desc');
    }
}
