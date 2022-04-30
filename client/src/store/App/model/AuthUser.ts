import { observable, makeObservable } from 'mobx';

import { AuthUserData } from 'dobro-types/frontend';

import { assignParams } from '@utils/assignParams';

export class AuthUser {

    @observable public readonly id!: string;
    @observable public readonly name!: string;
    @observable public readonly email!: string;

    constructor(user: AuthUserData) {
        makeObservable(this);

        assignParams<AuthUserData>(this, user);
    }

}
