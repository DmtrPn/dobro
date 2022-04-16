import React from 'react';
import { observer, inject } from 'mobx-react';
import autobind from 'autobind';

import { AppStore } from '@store/App/AppStore';
import { authService } from '@store/App/service/authService';
import { AuthApi } from '@api/AuthApi';

import { AuthPage } from './AuthPage';

interface Props {
}

interface StoreProps {
    appStore: AppStore;
}

const injectableStores: (keyof StoreProps)[] = [
    AppStore.Name,
];

interface State {
    token?: string;
    errorMessage?: string;
    email: string;
    password: string;
}

@inject(...injectableStores)
@observer
export class AuthPageContainer extends React.Component<Props & StoreProps, State> {

    public state: State = {
        email: '',
        password: '',
    };

    public render() {
        const { appStore: { isAuthorized, authUserName } } = this.props;
        const { email, password, errorMessage } = this.state;

        return React.createElement(AuthPage, {
            email,
            password,
            errorMessage,
            fullName: isAuthorized ? authUserName : undefined,
            onLoginClick: this.onLoginClick,
            onLogoutClick: this.onLogoutClick,
            onInputChange: this.onInputChange,
        });
    }

    @autobind
    private onInputChange({ target: { value, name } }: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({ [name]: value } as unknown as State);
    }

    @autobind
    private async onLoginClick(): Promise<void> {
        await this.processLogin();
    }

    @autobind
    private async onLogoutClick(): Promise<void> {
        await AuthApi.logout();
    }

    private async processLogin(): Promise<void> {
        const { email, password } = this.state;
        this.setState({ errorMessage: undefined });

        if (email.length > 1 && password.length > 3) {
            try {
                await authService.login({ password: password.trim(), email: email.toLocaleLowerCase().trim() });
            } catch (e: any) {
                console.error('e', e);
                this.setState({ errorMessage: e.message });
            }
        }
    }

}
