import React from 'react';

import style from './Movie.scss';

import { MovieData } from 'dobro-types/frontend';
import { MovieStatus } from 'dobro-types/enums';

import { IconButton } from '@components/ActionButtons/IconButton';
import { EditButton } from '@components/ActionButtons/EditButton';
import { TruncatedText } from '@components/TruncatedText';
import { TextLink } from '@components/TextLink';
import { IconType } from '@components/Icon';

export interface MovieProps {
}

interface Props extends MovieProps {
    movie: MovieData;
    onEditClick(): void;
    toggleStatus(): void;
}

export function Movie({
    movie: {
        name,
        link,
        description = '',
        status,
    },
    onEditClick,
    toggleStatus,
}: Props): JSX.Element {
    const isNew = status === MovieStatus.New;
    return (
        <div className={style.root}>
            <div className={style.editButton}>
                <EditButton onEditClick={onEditClick} />
            </div>
            <div>
                <span className={isNew ? style.statusIcon : style.statusIcon_viewed}>
                    <IconButton
                        inheritColor
                        icon={IconType.CHECK}
                        onButtonClick={toggleStatus}
                    />
                </span>
                <TextLink link={link} label={name} />
            </div>
            <TruncatedText text={description} maxLine={3} />
        </div>
    );
}
