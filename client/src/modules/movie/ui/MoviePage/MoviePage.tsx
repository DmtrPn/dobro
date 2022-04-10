import React from 'react';
import classnames from 'classnames';

import style from './MoviePage.scss';
import commonStyle from '@components/mixins/commonStyles.scss';

import { SaveButton } from '@components/ActionButtons/SaveButton';

import { CreateForm } from './CreateForm';
import { Movie } from './Movie';

export interface MoviePageProps {
}

interface Props extends MoviePageProps {
    addMode: boolean;
    ids: string[];
    onAddClick(): void;
    onFinishCreate(): void;
}

export function MoviePage({
    ids,
    addMode,
    onAddClick,
    onFinishCreate,
}: Props): JSX.Element {
    return (
        <div className={style.root}>
            {ids.map(id => (
                <div
                    key={id}
                    className={classnames([
                        style.card,
                        commonStyle.field,
                    ])}
                >
                    <Movie id={id} />
                </div>
            ))}
            {addMode
                ? <CreateForm onFinishCreate={onFinishCreate} />
                : <SaveButton onSaveClick={onAddClick} label={'Добавить'} />
            }
        </div>
    );
}
