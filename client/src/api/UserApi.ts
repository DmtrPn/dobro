import { UserResponse, UserData } from 'dobro-types/frontend';

import { axios } from '../lib/axios';

const BASE_URL = '/api/user';

export class UserApi {
    public static async getById(userId: string): Promise<UserData> {
        const res = await axios.get<UserResponse>(`${BASE_URL}/${userId}`);

        return res.data.user;
    }
}

export const USER_API_BASE_URL = BASE_URL;
