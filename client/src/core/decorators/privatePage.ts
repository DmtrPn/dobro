import React from 'react';
import { inject, observer } from 'mobx-react';

import { AuthPage } from '@modules/auth';
import { AppStore } from '@store/App/AppStore';
import { authService } from '@store/App/service/authService';

export interface StoreProps {
    appStore: AppStore;
}

const injectableStores: (keyof StoreProps)[] = [
    AppStore.Name,
];

export function privatePage<Props>(
    WrappedComponent: any,
): void {

    @inject(...injectableStores)
    @observer
    class PrivatePage extends React.Component<Props & StoreProps> {

        public async componentDidMount(): Promise<void> {
            this.props.appStore.previousPageUrl = window.location.pathname;
            await authService.loadAuthorizedUser();
        }

        public componentWillUnmount() {
            this.props.appStore.previousPageUrl = '/';
        }

        public render() {
            const { appStore: { isAuthorized }, ...props } = this.props;
            return isAuthorized
                ? React.createElement(WrappedComponent, {
                    ...props,
                })
                : React.createElement(AuthPage);
        }
    }

    return PrivatePage as any as void;

}
