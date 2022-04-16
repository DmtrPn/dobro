import { observable, makeAutoObservable } from 'mobx';

import { AffirmationList } from './models/AffirmationList';

export class AffirmationStore {
    public static Name = 'affirmationStore' as const;

    @observable public affirmationList = new AffirmationList();

    constructor() {
        makeAutoObservable(this);
    }
}
