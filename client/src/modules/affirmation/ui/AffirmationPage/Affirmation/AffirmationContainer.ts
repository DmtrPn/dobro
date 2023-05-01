import React from 'react';
import autobind from 'autobind';
import { observer, inject } from 'mobx-react';

import { Affirmation, AffirmationProps } from './Affirmation';
import { AffirmationStore } from '@affirmation/store/AffirmationStore';
import { affirmationService } from '@affirmation/services/affirmationService';
import { AffirmationData } from 'dobro-types/frontend';

interface Props extends AffirmationProps {
    id: string;
}

interface StoreProps {
    affirmationStore: AffirmationStore;
}

const injectableStores: (keyof StoreProps)[] = [AffirmationStore.Name];

@observer
class Container extends React.Component<Props> {
    declare readonly props: Props & StoreProps;

    public render() {
        return React.createElement(Affirmation, {
            affirmation: this.affirmation,
            onTextChange: this.onTextChange,
        });
    }

    private get affirmation(): AffirmationData {
        const {
            affirmationStore: { affirmationList },
            id,
        } = this.props;
        return affirmationList.get(id);
    }

    @autobind
    private async onTextChange({
        target: { value, name },
    }: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>): Promise<void> {
        const { id } = this.props;

        if (this.affirmation[name] !== value && value.length > 3) {
            await affirmationService.update(id, { [name]: value });
        }
    }
}

export const AffirmationContainer = inject(...injectableStores)(Container);
