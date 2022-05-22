import React from 'react';
import { inject, observer } from 'mobx-react';

import { EntityName } from 'dobro-types/enums';

import { AuthPage } from '@modules/auth';
import { AppStore } from '@store/App/AppStore';
import { authService } from '@store/App/service/authService';
import { NotFound } from '@modules/notFound';

export interface StoreProps {
    appStore: AppStore;
}

const injectableStores: (keyof StoreProps)[] = [
    AppStore.Name,
];

export function moderatorPage<Props>(
    WrappedComponent: any,
    entityName: EntityName,
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
            const { appStore: { isAuthorized, authUser }, ...props } = this.props;
            return isAuthorized
                ? authUser!.isEntityModerator(entityName)
                    ? React.createElement(WrappedComponent, {
                        ...props,
                    })
                    : React.createElement(NotFound)
                : React.createElement(AuthPage);
        }
    }

    return PrivatePage as any as void;

}
