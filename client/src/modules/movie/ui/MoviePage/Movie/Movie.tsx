import React from 'react';
import classnames from 'classnames';
import { observer } from 'mobx-react-lite';

import style from './Movie.scss';
import commonStyle from '@components/mixins/commonStyles.scss';

import { IconButton } from '@components/ActionButtons/IconButton';
import { EditButton } from '@components/ActionButtons/EditButton';
import { TruncatedText } from '@components/TruncatedText';
import { TextLink, TextLinkTheme } from '@components/TextLink';
import { IconType } from '@components/Icon';
import { Rating } from '@components/Rating';
import { useMovie } from './useMovie';

export interface MovieProps {}

interface Props extends MovieProps {
    id: string;
    onEditClick(): void;
}

function Component({ id, onEditClick }: Props): JSX.Element {
    const {
        movie: { name, link, description = '', posterUrl },
        isViewed,
        canEdit,
        userRating,
        rating,
        onRatingChange,
        toggleStatus,
    } = useMovie({ id });

    return (
        <div className={style.root}>
            {canEdit && (
                <div className={style.editButton}>
                    <EditButton onEditClick={onEditClick} />
                </div>
            )}
            {posterUrl && <img className={style.poster} src={posterUrl} />}
            <div className={style.detail}>
                <div className={style.title}>
                    {canEdit && (
                        <span className={isViewed ? style.statusIcon_viewed : style.statusIcon}>
                            <IconButton inheritColor icon={IconType.CHECK} onButtonClick={toggleStatus} />
                        </span>
                    )}
                    <TextLink link={link} label={name} theme={TextLinkTheme.Bold} />
                    <span className={classnames([style.rating, commonStyle.font_text])}>{rating}</span>
                </div>
                <div className={style.description}>
                    <TruncatedText text={description} maxLine={3} />
                </div>
                {canEdit && (
                    <span className={style.ratingSelect}>
                        <Rating title={'Мой рейтинг'} rating={userRating} maxRating={10} onRate={onRatingChange} />
                    </span>
                )}
            </div>
        </div>
    );
}

export const Movie = observer(Component);
