import {
    AffirmationData,
    AffirmationListResponse,
    AffirmationCreateData,
    AffirmationUpdateData,
} from 'dobro-types/frontend';

import { axios } from '../lib/axios';

const AFFIRMATION_URL = '/api/affirmation';

export class AffirmationApi {

    public static async getList(): Promise<AffirmationData[]> {
        const res = await axios.get<AffirmationListResponse>(AFFIRMATION_URL);

        return res.data.affirmations;
    }

    public static async getRandomList(): Promise<AffirmationData[]> {
        const res = await axios.get<AffirmationListResponse>(`${AFFIRMATION_URL}/random`);

        return res.data.affirmations;
    }

    public static async create(affirmation: AffirmationCreateData): Promise<void> {
        await axios.post(AFFIRMATION_URL, { affirmation });
    }

    public static async update(id: string, affirmation: AffirmationUpdateData): Promise<void> {
        await axios.put(`${AFFIRMATION_URL}/${id}`, { affirmation });
    }

    public static async remove(id: string): Promise<void> {
        await axios.delete(`${AFFIRMATION_URL}/${id}`);
    }

}
