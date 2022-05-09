import React from 'react';
import { Icon, IconProps, SemanticICONS } from 'semantic-ui-react';

import style from './Icon.scss';

interface Props extends IconProps {
    name: SemanticICONS;
}

export function SemanticIcon(props: Props): JSX.Element {
    return (
        <div className={style.root}>
            <Icon {...props} />
        </div>
    );
}
