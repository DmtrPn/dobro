import isUndefined from 'lodash/isUndefined';
import omitBy from 'lodash/omitBy';

type DefinedType<T> = T extends ((infer U) | undefined) ? U : T;

export const removeUndefinedKeys = <T extends object>(o: T): { [key in keyof T]: DefinedType<T[key]> } => {
    return omitBy(o, isUndefined) as { [key in keyof T]: DefinedType<T[key]> };
};
