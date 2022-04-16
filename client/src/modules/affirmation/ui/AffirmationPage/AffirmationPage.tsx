import React from 'react';

import style from './AffirmationPage.scss';

export interface AffirmationProps {
}

interface Props extends AffirmationProps {
}

export function AffirmationPage({
}: Props): JSX.Element {
    return (
        <div className={style.root}>
            Affirmation!!!!
        </div>
    );
}
