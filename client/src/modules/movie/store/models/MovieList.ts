import { MovieData } from 'dobro-types/frontend';
import { MovieStatus } from 'dobro-types/enums';

import { SimpleList } from '@store/models/SimpleList';

interface FilterParams {
    status?: MovieStatus;
}

export class MovieList extends SimpleList<MovieData, FilterParams> {

    protected filterValue(value: MovieData, { status }: FilterParams): boolean {
        return !!status ? value.status === status : true;
    }
}
