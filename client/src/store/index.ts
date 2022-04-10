import { DreamStore } from '@dream/store/Dream';
import { MovieStore } from '@movie/store';
import { WishStore } from './Wish/Wish';
import { AppStore } from '@store/App';

export interface StoreState {
    dreamStore: DreamStore;
    wishStore: WishStore;
    appStore: AppStore;
    movieStore: MovieStore;
}

export const store: StoreState = {
    dreamStore: new DreamStore(),
    wishStore: new WishStore(),
    appStore: new AppStore(),
    movieStore: new MovieStore(),
};
