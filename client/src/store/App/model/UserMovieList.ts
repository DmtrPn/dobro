import { isDefined } from 'good-lib/utils';

import { UserMovieData } from 'dobro-types/frontend';

import { SimpleList } from '@store/models/SimpleList';

interface FilterParams {
    isViewed?: boolean;
}

export class UserMovieList extends SimpleList<UserMovieData, FilterParams> {
    protected override readonly identifiableFieldName = 'movieId';

    protected filterValue(value: UserMovieData, { isViewed }: FilterParams): boolean {
        return isDefined(isViewed) ? value.isViewed === isViewed : false;
    }
}
