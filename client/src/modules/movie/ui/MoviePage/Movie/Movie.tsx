import React from 'react';
import classnames from 'classnames';

import style from './Movie.scss';
import commonStyle from '@components/mixins/commonStyles.scss';

import { MovieData } from 'dobro-types/frontend';
import { MovieStatus } from 'dobro-types/enums';

import { IconButton } from '@components/ActionButtons/IconButton';
import { EditButton } from '@components/ActionButtons/EditButton';
import { TruncatedText } from '@components/TruncatedText';
import { TextLink } from '@components/TextLink';
import { IconType } from '@components/Icon';
import { OptionType } from '@components/Select/types';
import { Select } from '@components/Select';
import { movieRatingOptions } from '@movie/store/types';

export interface MovieProps {
}

interface Props extends MovieProps {
    movie: MovieData & { posterUrl?: string; };
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
        posterUrl,
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
            {posterUrl && <img className={style.poster} src={posterUrl} />}
            <div className={style.detail}>
                <div className={style.title}>
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
                <div className={style.description}>
                    <TruncatedText text={description} maxLine={3} />
                </div>
                <span className={style.ratingSelect}>
                    <Select
                        title={'Мой рейтинг'}
                        selectedValue={userRating}
                        options={movieRatingOptions}
                        onChange={onRatingChange}
                    />
                </span>
            </div>
        </div>
    );
}
