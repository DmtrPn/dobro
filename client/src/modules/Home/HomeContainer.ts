import React from 'react';
// import autobind from 'autobind';
import { observer } from 'mobx-react';
import { observable, action, makeObservable } from 'mobx';

import { HomePage } from './Home';

interface Props {
}

// interface StoreProps {
// }

// const injectableStores: (keyof StoreProps)[] = [
// ];

@observer
export class HomeContainer extends React.Component<Props> {

    @observable private isSent = false;
    @observable private wish = '';

    constructor(props: Props) {
        super(props);

        makeObservable(this);
    }

    public render() {
        return React.createElement(HomePage, {
            isSent: this.isSent,
            wish: this.wish,
            onSendClick: this.onSendClick,
            onWishChange: this.onWishChange,
        });
    }

    @action.bound
    private onSendClick(): void {
        this.isSent = true;
    }

    @action.bound
    private onWishChange({ target: { value } }: React.ChangeEvent<HTMLTextAreaElement>): void {
        this.wish = value;
    }
}

// export const HomeContainer = inject<Props, StoreProps>(...injectableStores)(Component);
