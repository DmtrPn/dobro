import { AffirmationData, AffirmationCreateData, AffirmationUpdateData } from 'dobro-types/frontend';

import { AffirmationApi } from '@api/AffirmationsApi';
import { store } from '@store';
import { isDefined } from '@utils/isDefined';
import { getId } from '@utils/getId';

class AffirmationService {

    public async load(): Promise<void> {
        const { affirmationStore } = store;

        if (!affirmationStore.affirmationList.isDataSet) {
            const affirmations = await AffirmationApi.getList();

            affirmationStore.affirmationList.set(affirmations);
        }
    }

    public async getRandom(): Promise<AffirmationData[]> {
        return AffirmationApi.getRandomList();
    }

    public async create(createParams: Omit<AffirmationCreateData, 'id'>): Promise<void> {
        const { affirmationStore: { affirmationList }, appStore: { authUserId } } = store;

        if (isDefined(authUserId)) {
            const id = getId();
            await AffirmationApi.create({ id, ...createParams });

            affirmationList.add([{
                id,
                ...createParams,
            }]);
        }
    }

    public async update(id: string, updateParams: AffirmationUpdateData): Promise<void> {
        const { affirmationStore: { affirmationList }, appStore: { authUserId } } = store;

        if (isDefined(authUserId)) {
            await AffirmationApi.update(id, updateParams);

            affirmationList.update(id, updateParams);
        }
    }

    public async remove(id: string): Promise<void> {
        const { affirmationStore: { affirmationList }, appStore: { authUserId } } = store;

        if (isDefined(authUserId)) {
            await AffirmationApi.remove(id);

            affirmationList.remove(id);
        }
    }
}

export const affirmationService = new AffirmationService();
