import React from 'react';
// import autobind from 'autobind';
// import { observer, inject } from 'mobx-react';

import { privatePage } from '@core/decorators/privatePage';

import { AffirmationPage, AffirmationProps } from './AffirmationPage';

interface Props extends AffirmationProps {
}

// interface StoreProps {
// }

// const injectableStores: (keyof StoreProps)[] = [
// ];

@privatePage
// @observer
export class AffirmationPageContainer extends React.Component<Props> {

    public render() {
        return React.createElement(AffirmationPage, {
            ...this.props,
        });
    }
}

// export const AffirmationContainer = inject<Props, StoreProps>(...injectableStores)(Component);
