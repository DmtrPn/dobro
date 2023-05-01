import React, { RefObject } from 'react';

import style from './StarBackground.scss';

interface Props {
    rootRef: RefObject<HTMLDivElement>;
}

export function StarBackground({ rootRef }: Props): JSX.Element {
    return (
        <div className={style.root}>
            <div ref={rootRef} className={style.stars} />
        </div>
    );
}
