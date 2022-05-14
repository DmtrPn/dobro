import { observable, computed, makeObservable, action } from 'mobx';

import { MovieData, UserMovieData, MovieUpdateData } from 'dobro-types/frontend';
import { Optional } from 'dobro-types/common';

import { IEntry } from '@store/models/IEntry';
import { toArrayFromIterable } from '@utils/toArrayFromIterable';

import { MovieMutableData } from './MovieMuttableData';
import { removeNotNumbers } from '@utils/removeNotNumbers';

export class Movie implements IEntry<MovieData, MovieUpdateData> {

    @observable public readonly id: string;
    @observable public readonly authorId: string;
    @observable private readonly ratings: Map<string, UserMovieData>;
    private data: MovieMutableData;
    private readonly previewApiUrl = 'https://kinopoiskapiunofficial.tech/images/posters/kp_small/';

    constructor({ id, authorId, ratings = [], ...data }: MovieData) {
        makeObservable(this);

        this.id = id;
        this.authorId = authorId;
        this.ratings = new Map(ratings.map(rating => ([this.makeRatingKey(rating), rating])));
        this.data = new MovieMutableData(data);
    }

    @computed
    public get posterUrl(): Optional<string> {
        const { link } = this.data.serialize();
        const movieId = removeNotNumbers(link);

        return movieId.length > 0 ? `${this.previewApiUrl}${movieId}.jpg` : undefined;
    }

    @computed
    public get rating(): string {
        const total = toArrayFromIterable<UserMovieData>(this.ratings)
            .reduce((acc, { rating }) => acc + rating, 0);

        return (this.ratings.size > 0 ? (total / this.ratings.size) : 0).toFixed(1);
    }

    public getUserRating(userId: string): Optional<number> {
        return this.ratings.get(this.makeRatingKey({ userId }))?.rating;
    }

    @action
    public update(params: MovieUpdateData) {
        this.data.update(params);
    }

    @action
    public updateRating(movieRating: UserMovieData) {
        this.ratings.set(this.makeRatingKey(movieRating), movieRating);
    }

    public serialize(): MovieData {
        return {
            id: this.id,
            authorId: this.authorId,
            ratings: toArrayFromIterable<UserMovieData>(this.ratings),
            ...this.data.serialize(),
        };
    }

    private makeRatingKey({ userId }: Pick<UserMovieData, 'userId'>): string {
        return userId;
    }
}
