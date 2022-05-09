import { LoginParams } from 'dobro-types/frontend';

import { AuthApi } from '@api/AuthApi';
import { UserApi } from '@api/UserApi';
import { isDefined } from '@utils/isDefined';

import { store } from '@store';

class AuthService {

    public async loadAuthorizedUser(): Promise<void> {
        const { appStore } = store;

        if (!appStore.isAuthorized) {
            const authUser = await AuthApi.getAuthorizedUser();

            if (isDefined(authUser)) {
                const user = await UserApi.getById(authUser.id);

                store.appStore.login(user);
            }
        }
    }

    public async login(loginUser: LoginParams): Promise<void> {
        const authUser = await AuthApi.login(loginUser);

        if (isDefined(authUser)) {
            const user = await UserApi.getById(authUser.id);
            store.appStore.login(user);
        }
    }

    public async logout(): Promise<void> {
        await AuthApi.logout();
        store.appStore.logout();
    }
}

export const authService = new AuthService();
