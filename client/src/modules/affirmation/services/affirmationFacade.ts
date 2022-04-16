import { affirmationService } from './affirmationService';

class AffirmationFacade {
    public async load(): Promise<void> {
        await affirmationService.load();
    }
}

export const affirmationFacade = new AffirmationFacade();
