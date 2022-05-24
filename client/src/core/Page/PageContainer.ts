import React from 'react';
// import autobind from 'autobind';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import { Page } from './Page';
import { authService } from '@store/App/service/authService';

interface Props {
}

// interface StoreProps {
// }

// const injectableStores: (keyof StoreProps)[] = [
// ];

@observer
export class PageContainer extends React.Component<Props> {

    @observable isAuthUserLoaded = false;

    public async componentDidMount(): Promise<void> {
        await authService.loadAuthorizedUser();
        this.isAuthUserLoaded = true;
        this.forceUpdate();
    }

    public render() {
        return this.isAuthUserLoaded
            ? React.createElement(Page, {
                ...this.props,
            })
            : null;
    }
}

// export const PageContainer = inject<Props, StoreProps>(...injectableStores)(Component);
