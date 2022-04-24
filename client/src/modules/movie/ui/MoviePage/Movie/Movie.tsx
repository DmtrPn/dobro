import React from 'react';
import classnames from 'classnames';

import style from './Movie.scss';
import commonStyle from '@components/mixins/commonStyles.scss';

import { MovieData } from 'dobro-types/frontend';
import { MovieStatus } from 'dobro-types/enums';

import { IconButton } from '@components/ActionButtons/IconButton';
import { EditButton } from '@components/ActionButtons/EditButton';
import { TextTruncate } from '@components/TextTruncate';
import { TextLink } from '@components/TextLink';
import { IconType } from '@components/Icon';

export interface MovieProps {
}

interface Props extends MovieProps {
    movie: MovieData;
    rating: string;
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
    rating,
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
                <span className={classnames([
                    style.rating,
                    commonStyle.font_text,
                ])}>
                    {rating}
                </span>
            </div>
            <TextTruncate text={description} />
        </div>
    );
}
