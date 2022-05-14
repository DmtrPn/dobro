import { UserMovieData } from 'dobro-types/frontend';

import { SimpleList } from '@store/models/SimpleList';

export class UserMovieList extends SimpleList<UserMovieData> {
    protected override readonly identifiableFieldName = 'movieId';
}
