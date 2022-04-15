import React from 'react';
import classnames from 'classnames';

import style from './MoviePage.scss';

import { SaveButton } from '@components/ActionButtons/SaveButton';

import { MovieForm } from './MovieForm';
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
            {addMode
                ? <div className={style.card}>
                    <MovieForm onFinishCreate={onFinishCreate} />
                </div>
                : <SaveButton onSaveClick={onAddClick} label={'Добавить'} />
            }
        </div>
    );
}
