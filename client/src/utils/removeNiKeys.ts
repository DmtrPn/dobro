import isNil from 'lodash/isNil';
import omitBy from 'lodash/omitBy';

export const removeNilKeys = <T = object>(o: object): T => {
    return omitBy(o, isNil) as unknown as T;
};
