import { observable, makeAutoObservable } from 'mobx';

import { ExampleList } from './models/ExampleList';

export class ExampleStore {
    public static Name = 'exampleStore' as const;

    @observable public exampleList = new ExampleList();

    constructor() {
        makeAutoObservable(this);
    }
}
