import { observable, computed, action, makeObservable } from 'mobx';

import { AuthUserData } from 'dobro-types/frontend';
import { Optional } from 'dobro-types/common';

import { isDefined } from '@utils/isDefined';

import { AuthUser } from './model/AuthUser';

export class AppStore {
    public static Name = 'appStore' as const;

    @observable private authUser?: AuthUser;

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
    public login(authUser: AuthUserData): void {
        this.authUser = new AuthUser(authUser);
    }

    @action
    public logout(): void {
        this.authUser = undefined;
    }
}