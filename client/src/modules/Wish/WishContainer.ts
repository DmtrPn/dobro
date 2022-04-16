import * as React from 'react';
import { observer, inject } from 'mobx-react';

import { WishStore } from '@store/Wish/Wish';
import { wishService } from '@store/Wish/wishService';
import { privatePage } from '@core/decorators/privatePage';

interface Props extends StoreProps, WishProps {
}

import { Wish, WishProps } from './Wish';

interface StoreProps {
    wishStore: WishStore;
}

const injectableStores: (keyof StoreProps)[] = [
    WishStore.Name,
];


@privatePage
@inject(...injectableStores)
@observer
export class Component extends React.Component<Props> {

    public async componentDidMount(): Promise<void> {
        await wishService.load();
    }

    public render() {
        const { wishStore: { wishes } } = this.props;

        return React.createElement(Wish, { wishes });
    }
}

export const WishContainer = Component; // privatePageHOC(Component);
