import { AffirmationData, AffirmationUpdateData } from 'dobro-types/frontend';

import { MutableData } from '@store/abstract/MutableData';

export interface AffirmationMutableDataParams extends Pick<AffirmationData, keyof AffirmationUpdateData> {
}

export class AffirmationMutableDataParams extends MutableData<AffirmationMutableDataParams> {

    protected numbersFields = new Set(['rating']);
    protected mutableKeys: (keyof AffirmationMutableDataParams)[] = [
        'text',
    ];

    constructor(data: AffirmationMutableDataParams) {
        super();
        this.init(data);
    }

    public get isValid(): boolean {
        const { text } = this.serialize();

        return text.length > 3;
    }

}
