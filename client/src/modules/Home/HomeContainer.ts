import React from 'react';
// import autobind from 'autobind';
import { observer } from 'mobx-react';
import { observable, action, makeObservable } from 'mobx';

import { HomePage } from './Home';
import { affirmationFacade } from '@affirmation/services/affirmationFacade';
import { authService } from '@store/App/service/authService';

interface Props {}

// interface StoreProps {
// }

// const injectableStores: (keyof StoreProps)[] = [
// ];

@observer
export class HomeContainer extends React.Component<Props> {
    @observable private isSent = false;
    @observable private wish = '';
    @observable private affirmation = 'Живи';

    constructor(props: Props) {
        super(props);

        makeObservable(this);
    }

    public async componentDidMount(): Promise<void> {
        const [affirmations] = await Promise.all([affirmationFacade.getRandom(), authService.loadAuthorizedUser()]);
        this.affirmation = affirmations[0]?.text ?? this.affirmation;
    }

    public render() {
        return React.createElement(HomePage, {
            isSent: this.isSent,
            wish: this.wish,
            affirmation: this.affirmation,
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
