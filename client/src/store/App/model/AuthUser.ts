import { makeObservable, observable } from 'mobx';

import { UserData } from 'dobro-types/frontend';
import { EntityName, RoleName, UserStatus } from 'dobro-types/enums';

import { assignParams } from '@utils/assignParams';

export class AuthUser {

    @observable public readonly id!: string;
    @observable public readonly name!: string;
    @observable public readonly email!: string;
    @observable public status!: UserStatus;
    @observable public roles!: Set<RoleName>;
    @observable public entities!: Set<EntityName>;

    constructor({
        roles,
        entities,
        ...user
    }: UserData) {
        makeObservable(this);

        assignParams<Omit<UserData, 'roles' | 'entities'>>(this, user);

        this.roles = new Set<RoleName>(roles);
        this.entities = new Set<EntityName>(entities);
    }

    public get isAdmin(): boolean {
        return this.roles.has(RoleName.Admin);
    }

    public isEntityModerator(entityName: EntityName): boolean {
        return this.isAdmin ||
            (this.entities.has(entityName)
            && this.roles.has(RoleName.Moderator));
    }

}
