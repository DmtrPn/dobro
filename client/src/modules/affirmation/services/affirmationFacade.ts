import { AffirmationData } from 'dobro-types/frontend';

import { affirmationService } from './affirmationService';

class AffirmationFacade {

    public async load(): Promise<void> {
        await affirmationService.load();
    }

    public async getRandom(): Promise<AffirmationData[]> {
        await this.load();
        return affirmationService.getRandom();
    }
}

export const affirmationFacade = new AffirmationFacade();
