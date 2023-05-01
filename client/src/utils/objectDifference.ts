import omit from 'lodash/omit';
import keys from 'lodash/keys';
import isEqual from 'lodash/isEqual';

export const objectDifference = <T extends Object>(obj: T, other: Object): Partial<T> => {
    return omit(
        obj,
        keys(obj).filter(key => isEqual(obj[key], other[key])),
    );
};
