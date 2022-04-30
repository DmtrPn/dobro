import isUndefined from 'lodash/isUndefined';

export const isDefined = <T>(arg?: T | undefined): arg is T => !isUndefined(arg);
