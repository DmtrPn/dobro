import React from 'react';

import style from './ExamplePage.scss';

export interface ExamplePageProps {
}

interface Props extends ExamplePageProps {
}

export function ExamplePage({
}: Props): JSX.Element {
    return (
        <div className={style.root}>
            ExamplePage!!!!
        </div>
    );
}
