import { observable, computed, action, makeObservable } from 'mobx';

import { UserData } from 'dobro-types/frontend';
import { Optional } from 'dobro-types/common';

import { isDefined } from '@utils/isDefined';

import { AuthUser } from './model/AuthUser';

export class AppStore {
    public static Name = 'appStore' as const;

    @observable public previousPageUrl: string = '/';
    @observable public authUser?: AuthUser;

    constructor() {
        makeObservable(this);
    }

    @computed
    public get isAuthorized(): boolean {
        return isDefined(this.authUser);
    }

    @computed
    public get authUserId(): Optional<string> {
        return this.authUser?.id;
    }

    @computed
    public get authUserName(): Optional<string> {
        return this.authUser?.name;
    }

    @action
    public login(authUser: UserData): void {
        this.authUser = new AuthUser(authUser);
    }

    @action
    public logout(): void {
        this.authUser = undefined;
    }
}
