import { DreamStore } from '@dream/store/Dream';
import { WishStore } from './Wish/Wish';
import { AppStore } from '@store/App';

export interface StoreState {
    dreamStore: DreamStore;
    wishStore: WishStore;
    appStore: AppStore;
}

export const store: StoreState = {
    dreamStore: new DreamStore(),
    wishStore: new WishStore(),
    appStore: new AppStore(),
};
