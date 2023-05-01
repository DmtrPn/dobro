import pick from 'lodash/pick';

import { StoreState, store } from './index';

type Params = keyof StoreState;

export function useStore<T extends Params>(stores: T[]): Pick<StoreState, T> {
    return pick(store, stores);
}
