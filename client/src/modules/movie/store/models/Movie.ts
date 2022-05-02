import { observable, computed, makeObservable, action } from 'mobx';

import { MovieData, MovieRatingData, MovieUpdateData } from 'dobro-types/frontend';
import { Optional } from 'dobro-types/common';

import { IEntry } from '@store/models/IEntry';
import { toArrayFromIterable } from '@utils/toArrayFromIterable';

import { MovieMutableData } from './MovieMuttableData';

export class Movie implements IEntry<MovieData, MovieUpdateData> {

    @observable public readonly id: string;
    @observable public readonly authorId: string;
    @observable private readonly ratings: Map<string, MovieRatingData>;
    private data: MovieMutableData;

    constructor({ id, authorId, ratings = [], ...data }: MovieData) {
        makeObservable(this);

        this.id = id;
        this.authorId = authorId;
        this.ratings = new Map(ratings.map(rating => ([this.makeRatingKey(rating), rating])));
        this.data = new MovieMutableData(data);
    }

    @computed
    public get rating(): string {
        const total = toArrayFromIterable<MovieRatingData>(this.ratings)
            .reduce((acc, { rating }) => acc + rating, 0);

        return (total / this.ratings.size).toFixed(1);
    }

    public getUserRating(userId: string): Optional<number> {
        return this.ratings.get(this.makeRatingKey({ userId }))?.rating;
    }

    @action
    public update(params: MovieUpdateData) {
        this.data.update(params);
    }

    @action
    public updateRating(movieRating: MovieRatingData) {
        this.ratings.set(this.makeRatingKey(movieRating), movieRating);
    }

    public serialize(): MovieData {
        return {
            id: this.id,
            authorId: this.authorId,
            ratings: toArrayFromIterable<MovieRatingData>(this.ratings),
            ...this.data.serialize(),
        };
    }

    private makeRatingKey({ userId }: Pick<MovieRatingData, 'userId'>): string {
        return userId;
    }
}
