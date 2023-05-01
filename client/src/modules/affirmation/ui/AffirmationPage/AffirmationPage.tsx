import React from 'react';
import classnames from 'classnames';

import style from './AffirmationPage.scss';

import { SaveButton } from '@components/ActionButtons/SaveButton';

import { AffirmationForm } from './AffirmationForm';
import { Affirmation } from './Affirmation';

export interface AffirmationPageProps {}

interface Props extends AffirmationPageProps {
    addMode: boolean;
    ids: string[];
    onAddClick(): void;
    onFinishCreate(): void;
}

export function AffirmationPage({ ids, addMode, onAddClick, onFinishCreate }: Props): JSX.Element {
    return (
        <div className={style.root}>
            <div className={style.cards}>
                {ids.map(id => (
                    <div key={id} className={classnames([style.card])}>
                        <Affirmation id={id} />
                    </div>
                ))}
            </div>
            {addMode ? (
                <div className={style.card}>
                    <AffirmationForm onFinish={onFinishCreate} />
                </div>
            ) : (
                <SaveButton onSaveClick={onAddClick} label={'Добавить'} />
            )}
        </div>
    );
}
