import { makeObservable, observable, computed, action } from 'mobx';
import { assignParams } from 'good-lib/utils';

import { UserData, UserMovieData, UserMovieUpdateParams } from 'dobro-types/frontend';
import { EntityName, RoleName, UserStatus } from 'dobro-types/enums';

import { UserMovieList } from './UserMovieList';

export class AuthUser {
    @observable public readonly id!: string;
    @observable public readonly name!: string;
    @observable public readonly email!: string;
    @observable public status!: UserStatus;
    @observable public roles!: Set<RoleName>;
    @observable public entities!: Set<EntityName>;
    @observable public readonly movies = new UserMovieList();

    constructor({ roles, entities, ...user }: UserData) {
        makeObservable(this);

        assignParams<Omit<UserData, 'roles' | 'entities'>>(this, user);

        this.roles = new Set<RoleName>(roles);
        this.entities = new Set<EntityName>(entities);
    }

    public get isAdmin(): boolean {
        return this.roles.has(RoleName.Admin);
    }

    @computed
    public get viewedMoviesIds(): string[] {
        return this.movies.getFilteredValues({ isViewed: true }).map(({ movieId }) => movieId);
    }

    public isEntityModerator(entityName: EntityName): boolean {
        return this.isAdmin || (this.entities.has(entityName) && this.roles.has(RoleName.Moderator));
    }

    @action
    public setMovies(userMovies: UserMovieData[]): void {
        this.movies.set(userMovies);
    }

    @action
    public updateMovie({ movieId, ...updateParams }: Omit<UserMovieUpdateParams, 'userId'>): void {
        if (this.movies.has(movieId)) {
            this.movies.update(movieId, updateParams);
        } else {
            this.movies.add([
                {
                    movieId,
                    userId: this.id,
                    isViewed: false,
                    ...updateParams,
                },
            ]);
        }
    }
}
