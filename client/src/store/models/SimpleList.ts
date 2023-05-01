import { List } from '@store/abstract/List';

export class SimpleList<P, F = null, I = string> extends List<P, P, P, F, I> {
    public update(id: I, updateParams: Partial<P>): void {
        const current = this.get(id);

        this.list.set(id, { ...current, ...updateParams });
    }

    protected create(params: P): P {
        return params;
    }
}
