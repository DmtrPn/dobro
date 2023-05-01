import orderBy from 'lodash/orderBy';

import { MovieData, MovieUpdateData } from 'dobro-types/frontend';
import { MovieStatus } from 'dobro-types/enums';

import { EntityList } from '@store/models/EntityList';
import { isDefined } from '@utils/isDefined';

import { Movie } from './Movie';

interface FilterParams {
    ids?: string[];
    name?: string;
    excludeIds?: string[];
    status?: MovieStatus;
}

export class MovieList extends EntityList<Movie, MovieData, MovieUpdateData, FilterParams> {
    protected entityClass = Movie;

    protected filterValue(value: Movie, { status, ids, excludeIds, name }: FilterParams): boolean {
        const data = value.serialize();
        const idsSet = isDefined(ids) ? new Set(ids) : undefined;
        const excludeIdsSet = isDefined(excludeIds) ? new Set(excludeIds) : undefined;

        return (
            (!!status ? data.status === status : true) &&
            (!!idsSet ? idsSet.has(data.id) : true) &&
            (!!excludeIdsSet ? !excludeIdsSet.has(data.id) : true) &&
            (!!name && name.length > 0 ? data.name.toLowerCase().includes(name.toLowerCase()) : true)
        );
    }

    protected getOrderedValues(params: Movie[]): Movie[] {
        return orderBy(params, movie => Number(movie.serialize().rating), 'desc');
    }
}
