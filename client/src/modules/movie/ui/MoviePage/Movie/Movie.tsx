import React from 'react';

import style from './Movie.scss';

export interface MovieProps {
}

interface Props extends MovieProps {
}

export function Movie({
}: Props): JSX.Element {
    return (
        <div className={style.root}>
            Movie!!!!
        </div>
    );
}
