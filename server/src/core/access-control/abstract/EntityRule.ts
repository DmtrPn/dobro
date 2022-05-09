import { AuthUserViewModel } from 'dobro-types/backend';

export abstract class EntityRule<E extends { authorId: string }> {

    public isOwner(user: AuthUserViewModel, { authorId }: E): boolean {
        return user.id === authorId;
    }

}
