import { action } from 'mobx';

import { Class } from 'dobro-types/common';

import { List } from '@store/abstract/List';

import { IEntry } from './IEntry';

export abstract class EntityList<E extends IEntry<any, UP>, CP, UP, F = null, I = string> extends List<
    E,
    CP,
    UP,
    F,
    I
> {
    protected abstract entityClass: Class<E, CP>;

    @action
    public update(id: I, updateParams: UP): void {
        const model = this.get(id);

        model.update(updateParams);
    }

    protected create(params: CP): E {
        return new this.entityClass(params);
    }
}
