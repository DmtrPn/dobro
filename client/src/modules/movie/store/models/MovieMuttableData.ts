import { MovieData, MovieUpdateData } from 'dobro-types/frontend';

import { MutableData } from '@store/abstract/MutableData';

export interface MovieMutableDataParams extends Pick<MovieData, keyof MovieUpdateData> {
    rating: number;
}

export class MovieMutableData extends MutableData<MovieMutableDataParams> {
    protected numbersFields = new Set(['rating']);
    protected mutableKeys: (keyof MovieMutableDataParams)[] = ['link', 'name', 'description', 'status', 'rating'];

    constructor(data: MovieMutableDataParams) {
        super();
        this.init(data);
    }

    public get isValid(): boolean {
        const { name, link } = this.serialize();

        return name.length > 0 && link.length > 0;
    }
}
