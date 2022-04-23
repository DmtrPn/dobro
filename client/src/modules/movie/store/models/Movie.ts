import { observable, makeObservable, action } from 'mobx';

import { MovieData, MovieRatingData, MovieUpdateData } from 'dobro-types/frontend';

import { MovieMutableData } from './MovieMuttableData';
import { toArrayFromIterable } from '@utils/toArrayFromIterable';

export class Movie {

    @observable public readonly id: string;
    @observable public readonly authorId: string;
    public data: MovieMutableData;
    @observable private readonly ratings: Map<string, MovieRatingData>;

    constructor({ id, authorId, ratings = [], ...data }: MovieData) {
        makeObservable(this);

        this.id = id;
        this.authorId = authorId;
        this.ratings = new Map(ratings.map(rating => ([this.makeRatingKey(rating), rating])));
        this.data = new MovieMutableData(data);
    }

    @action
    public update(params: MovieUpdateData) {
        this.data.update(params);
    }

    public serialize(): MovieData {
        return {
            id: this.id,
            authorId: this.authorId,
            ratings: toArrayFromIterable<MovieRatingData>(this.ratings),
            ...this.data.serialize(),
        }
    }

    private makeRatingKey({ userId }: MovieRatingData): string {
        return userId;
    }
}
