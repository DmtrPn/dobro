import React from 'react';
// import autobind from 'autobind';
// import { observer, inject } from 'mobx-react';

import { ExamplePage, ExamplePageProps } from './ExamplePage';

interface Props extends ExamplePageProps {
}

// interface StoreProps {
// }

// const injectableStores: (keyof StoreProps)[] = [
// ];

// @observer
export class ExamplePageContainer extends React.Component<Props> {

    public render() {
        return React.createElement(ExamplePage, {
            ...this.props,
        });
    }
}

// export const ExamplePageContainer = inject<Props, StoreProps>(...injectableStores)(Component);
