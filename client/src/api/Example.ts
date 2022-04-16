// @ts-ignore
import { ExmapleData, ExmapleListResponse, ExmapleResponse, ExmapleCreateData, ExmapleUpdateData } from 'dobro-types/frontend';

import { axios } from '../lib/axios';

const EXAMPLE_URL = '/api/example';

export class ExampleApi {

    public static async getList(): Promise<ExmapleData[]> {
        const res = await axios.get<ExmapleListResponse>(EXAMPLE_URL);

        return res.data.examples;
    }

    public static async getById(id: string): Promise<ExmapleData> {
        const res = await axios.get<ExmapleResponse>(`${EXAMPLE_URL}/${id}`);

        return res.data.example;
    }

    public static async create(example: ExmapleCreateData): Promise<void> {
        await axios.post(EXAMPLE_URL, { example });
    }

    public static async update(id: string, example: ExmapleUpdateData): Promise<void> {
        await axios.put(`${EXAMPLE_URL}/${id}`, { example });
    }

    public static async remove(id: string): Promise<void> {
        await axios.delete(`${EXAMPLE_URL}/${id}`);
    }

}
