import React from 'react';
import { Button as SemanticButton, ButtonProps as SemanticButtonProps } from 'semantic-ui-react';

import './UiButton_.scss';

export interface ButtonProps extends SemanticButtonProps {
}

export function Button(props: ButtonProps): JSX.Element {
    return (<SemanticButton {...props} />);
}
