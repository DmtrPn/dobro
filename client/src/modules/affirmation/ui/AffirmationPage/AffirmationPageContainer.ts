import React from 'react';
import { observer, inject } from 'mobx-react';
import { observable, action, makeObservable } from 'mobx';

import { AffirmationPage, AffirmationPageProps } from './AffirmationPage';
import { AffirmationStore } from '@affirmation/store/AffirmationStore';
import { affirmationService } from '@affirmation/services/affirmationService';
import { privatePage } from '@core/decorators/privatePage';

interface Props extends AffirmationPageProps {}

interface StoreProps {
    affirmationStore: AffirmationStore;
}

const injectableStores: (keyof StoreProps)[] = [AffirmationStore.Name];

@privatePage
@inject(...injectableStores)
@observer
export class AffirmationPageContainer extends React.Component<Props & StoreProps> {
    @observable private addMode = false;

    constructor(props: Props & StoreProps) {
        super(props);

        makeObservable(this);
    }

    public async componentDidMount(): Promise<void> {
        await affirmationService.load();
    }

    public render() {
        const {
            affirmationStore: { affirmationList },
        } = this.props;
        return React.createElement(AffirmationPage, {
            ids: affirmationList.ids,
            addMode: this.addMode,
            onAddClick: this.onAddClick,
            onFinishCreate: this.onFinishCreate,
        });
    }

    @action.bound
    private onAddClick(): void {
        this.addMode = true;
    }

    @action.bound
    private onFinishCreate(): void {
        this.addMode = false;
    }
}
