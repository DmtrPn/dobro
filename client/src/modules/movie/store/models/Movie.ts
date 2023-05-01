import { observable, computed, makeObservable, action } from 'mobx';
import { removeNotNumbers } from 'good-lib/utils';

import { MovieData, MovieUpdateData } from 'dobro-types/frontend';
import { Optional } from 'dobro-types/common';

import { IEntry } from '@store/models/IEntry';

import { MovieMutableData } from './MovieMuttableData';

export class Movie implements IEntry<MovieData, MovieUpdateData> {
    @observable public readonly id: string;
    @observable public readonly authorId: string;
    private data: MovieMutableData;
    private readonly previewApiUrl = 'https://kinopoiskapiunofficial.tech/images/posters/kp_small/';

    constructor({ id, authorId, ...data }: MovieData) {
        makeObservable(this);

        this.id = id;
        this.authorId = authorId;
        this.data = new MovieMutableData(data);
    }

    @computed
    public get posterUrl(): Optional<string> {
        const { link } = this.data.serialize();
        const movieId = removeNotNumbers(link);

        return movieId.length > 0 ? `${this.previewApiUrl}${movieId}.jpg` : undefined;
    }

    @action
    public update(params: MovieUpdateData & { rating?: number }) {
        this.data.update(params);
    }

    public serialize(): MovieData {
        return {
            id: this.id,
            authorId: this.authorId,
            ...this.data.serialize(),
        };
    }
}
