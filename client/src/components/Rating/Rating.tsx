import React from 'react';
import { Rating as SemanticRating, StrictRatingProps } from 'semantic-ui-react';

import style from './Rating.scss';

import { FieldTitle, FieldTitleTheme } from '@components/FieldTitle';

export interface RatingEventData extends StrictRatingProps {}

export interface RatingProps extends StrictRatingProps {
    title?: string;
    onRate?(event: React.MouseEvent<HTMLDivElement>, data: RatingEventData): void
}

export function Rating({
    icon = 'star',
    maxRating = 5,
    title,
    ...props
}: RatingProps): JSX.Element {
    return (
        <div className={style.root}>
            {title && (
                <FieldTitle
                    theme={FieldTitleTheme.Bold}
                    title={title}
                />
            )}
            <SemanticRating
                icon={icon}
                maxRating={maxRating}
                {...props}
            />
        </div>
    );
}
