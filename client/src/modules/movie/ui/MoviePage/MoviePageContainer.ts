import React from 'react';
// import autobind from 'autobind';
// import { observer, inject } from 'mobx-react';

import { MoviePage, MoviePageProps } from './MoviePage';

interface Props extends MoviePageProps {
}

// interface StoreProps {
// }

// const injectableStores: (keyof StoreProps)[] = [
// ];

// @observer
export class MoviePageContainer extends React.Component<Props> {

    public render() {
        return React.createElement(MoviePage, {
            ...this.props,
        });
    }
}

// export const MoviePageContainer = inject<Props, StoreProps>(...injectableStores)(Component);
