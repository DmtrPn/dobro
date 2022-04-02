import React from 'react';
// import autobind from 'autobind';
// import { observer, inject } from 'mobx-react';

import { HomePage } from './Home';

interface Props {
}

// interface StoreProps {
// }

// const injectableStores: (keyof StoreProps)[] = [
// ];

// @observer
export class HomeContainer extends React.Component<Props> {

    public render() {
        return React.createElement(HomePage, {
        });
    }
}

// export const HomeContainer = inject<Props, StoreProps>(...injectableStores)(Component);
