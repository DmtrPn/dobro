import { makeObservable, observable } from 'mobx';

import { MovieList } from './models/MovieList';

export class MovieStore {
    public static Name = 'movieStore' as const;

    @observable public movieList = new MovieList();

    constructor() {
        makeObservable(this);
    }

}
