import { useEffect } from 'react';
import { AppStore } from '../AppStore';
import { useStore } from '../../useStore';
import { authService } from '../service/authService';

export interface UseAuthUserData {
    isAuthorized: boolean;
    fullName?: string;
}

export function useAuthUser(): UseAuthUserData {
    const { appStore } = useStore([AppStore.Name]);

    useEffect(() => {
        if (!appStore.isAuthorized) {
            authService.loadAuthorizedUser();
        }
    }, []);

    return {
        isAuthorized: appStore.isAuthorized,
        fullName: appStore.isAuthorized ? appStore.authUserName : undefined,
    };
}
