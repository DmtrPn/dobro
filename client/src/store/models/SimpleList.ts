import { List } from '@store/abstract/List';

export class SimpleList<T, F = null, I = string> extends List<T, T, F, I> {

    public update(id: I, updateParams: Partial<T>): void {
        const current = this.get(id);

        super.update(id, { ...current, ...updateParams });
    }

    protected create(params: T): T {
        return params;
    }

}
