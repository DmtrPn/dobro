import { DreamApi } from '@api/DreamApi';
import { store } from '@store';

class DreamService {
    public async load(): Promise<void> {
        const dreams = await DreamApi.getDreamList();

        store.dreamStore.setDreams(dreams);
    }
}

export const dreamService = new DreamService();
