import React from 'react';
import { inject, observer } from 'mobx-react';

import { AuthPage } from '@modules/auth';
import { AppStore, authService } from '@store/App';

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
            await authService.loadAuthorizedUser();
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
