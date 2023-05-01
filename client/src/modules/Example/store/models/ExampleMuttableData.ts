// @ts-ignore
import { ExampleData, ExampleUpdateData } from 'dobro-types/frontend';

import { MutableData } from '@store/abstract/MutableData';

export interface ExampleMutableDataParams extends Pick<ExampleData, keyof ExampleUpdateData> {}

export class ExampleMutableDataParams extends MutableData<ExampleMutableDataParams> {
    protected numbersFields = new Set(['rating']);
    protected mutableKeys: (keyof ExampleMutableDataParams)[] = [];

    constructor(data: ExampleMutableDataParams) {
        super();
        this.init(data);
    }

    public get isValid(): boolean {
        const serialized = this.serialize();

        return !!serialized;
    }
}
