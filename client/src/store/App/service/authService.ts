import { LoginParams } from 'dobro-types/frontend';

import { AuthApi } from '@api';
import { isDefined } from '@utils/isDefined';

import { store } from '@store';


class AuthService {

    public async loadAuthorizedUser(): Promise<void> {
        const { appStore } = store;

        if (!appStore.isAuthorized) {
            const user = await AuthApi.getAuthorizedUser();

            if (isDefined(user)) {
                store.appStore.login(user);
            }
        }
    }

    public async login(loginUser: LoginParams): Promise<void> {
        const user = await AuthApi.login(loginUser);

        if (isDefined(user)) {
            store.appStore.login(user);
        }
    }

    public async logout(): Promise<void> {
        await AuthApi.logout();
        store.appStore.logout();
    }
}

export const authService = new AuthService();
