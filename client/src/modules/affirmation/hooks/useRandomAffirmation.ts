import { useState, useEffect } from 'react';
import { affirmationFacade } from '../services/affirmationFacade';

export interface UseRandomAffirmationData {
    affirmation: string;
}

export function useRandomAffirmation() {
    const [affirmation, setAffirmation] = useState<string>('Живи');

    useEffect(() => {
        const load = async () => {
            const affirmations = await affirmationFacade.getRandom();
            setAffirmation(affirmations[0]?.text ?? affirmation);
        };

        load();
    }, []);

    return { affirmation };
}
