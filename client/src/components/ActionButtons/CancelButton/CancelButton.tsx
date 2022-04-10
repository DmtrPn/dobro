import React from 'react';

import { Button, ButtonProps, ButtonTheme } from '@components/Button';

interface CancelButtonProps extends Omit<ButtonProps, 'onClick' | 'theme'> {
    onCancelClick(): void;
}

export function CancelButton({
    label = 'Отменить',
    onCancelClick,
    ...props
}: CancelButtonProps): JSX.Element {
    return (
        <Button
            onClick={onCancelClick}
            theme={ButtonTheme.Light}
            {...props}
        >
            {label}
        </Button>
    );
}
