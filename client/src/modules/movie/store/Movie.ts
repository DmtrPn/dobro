import { makeAutoObservable } from 'mobx';

export class MovieStore {
    public static Name = 'movieStore' as const;

    constructor() {
        makeAutoObservable(this);
    }
}
