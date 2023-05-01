import { AuthUserResponse, AuthUserData, LoginParams } from 'dobro-types/frontend';

import { axios } from '../lib/axios';

export const AUTH_URL = '/api/auth';

export class AuthApi {
    public static async login(user: LoginParams): Promise<AuthUserData> {
        const res = await axios.post<AuthUserResponse>(`${AUTH_URL}/login`, { user });

        return res.data.user;
    }

    public static async getAuthorizedUser(): Promise<AuthUserData> {
        const res = await axios.get<AuthUserResponse>(`${AUTH_URL}/user`);

        return res.data.user;
    }

    public static async logout(): Promise<void> {
        await axios.put(`${AUTH_URL}/logout`);
    }
}
