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
import { OptionType } from '@components/Select/types';
// import { Select } from '@components/Select';
// import { movieRatingOptions } from '@movie/store/types';

export interface MovieProps {
}

interface Props extends MovieProps {
    movie: MovieData;
    rating: string;
    userRating?: number;
    onEditClick(): void;
    toggleStatus(): void;
    onRatingChange(option: OptionType<number>): void;
}

export function Movie({
    movie: {
        name,
        link,
        description = '',
        status,
    },
    userRating,
    rating,
    onEditClick,
    onRatingChange,
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
            {/*<Select*/}
            {/*    title={'Мой рейтинг'}*/}
            {/*    selectedValue={userRating}*/}
            {/*    options={movieRatingOptions}*/}
            {/*    onChange={onRatingChange}*/}
            {/*/>*/}
            <TextTruncate text={description} />
        </div>
    );
}
