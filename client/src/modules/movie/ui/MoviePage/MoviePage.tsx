import React from 'react';

import style from './MoviePage.scss';

export interface MoviePageProps {
}

interface Props extends MoviePageProps {
}

export function MoviePage({
}: Props): JSX.Element {
    return (
        <div className={style.root}>
            MoviePage!!!!
        </div>
    );
}
