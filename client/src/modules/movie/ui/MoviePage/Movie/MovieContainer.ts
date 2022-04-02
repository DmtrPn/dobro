import React from 'react';
// import autobind from 'autobind';
// import { observer, inject } from 'mobx-react';

import { Movie, MovieProps } from './Movie';

interface Props extends MovieProps {
}

// interface StoreProps {
// }

// const injectableStores: (keyof StoreProps)[] = [
// ];

// @observer
export class MovieContainer extends React.Component<Props> {

    public render() {
        return React.createElement(Movie, {
            ...this.props,
        });
    }
}

// export const MovieContainer = inject<Props, StoreProps>(...injectableStores)(Component);
