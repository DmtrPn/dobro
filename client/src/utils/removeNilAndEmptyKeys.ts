import omitBy from 'lodash/omitBy';
import isNil from 'lodash/isNil';

export const removeNilAndEmptyKeys = <T = object>(o: object): T => {
    return omitBy(
        o,
        value => isNil(value) || ((typeof value === 'string' || Array.isArray(value)) && (value as any).length === 0),
    ) as unknown as T;
};
