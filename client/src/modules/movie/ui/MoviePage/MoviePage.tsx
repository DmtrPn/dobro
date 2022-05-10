import React from 'react';
import classnames from 'classnames';

import style from './MoviePage.scss';

import { SaveButton } from '@components/ActionButtons/SaveButton';

import { MovieForm } from './MovieForm';
import { Movie } from './Movie';

export interface MoviePageProps {
}

interface Props extends MoviePageProps {
    canEdit: boolean;
    addMode: boolean;
    ids: string[];
    onAddClick(): void;
    onFinishCreate(): void;
}

export function MoviePage({
    ids,
    addMode,
    canEdit,
    onAddClick,
    onFinishCreate,
}: Props): JSX.Element {
    return (
        <div className={style.root}>
            <div className={style.cards}>
                {ids.map(id => (
                    <div
                        key={id}
                        className={classnames([
                            style.card,
                        ])}
                    >
                        <Movie id={id} />
                    </div>
                ))}
            </div>
            {canEdit && (
                addMode
                    ? <div className={style.card}>
                        <MovieForm onFinish={onFinishCreate} />
                    </div>
                    : <SaveButton onSaveClick={onAddClick} label={'Добавить'} />
            )}
        </div>
    );
}
