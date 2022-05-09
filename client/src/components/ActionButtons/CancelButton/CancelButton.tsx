import React from 'react';

import { Button, ButtonProps } from '@components/Button';

interface CancelButtonProps extends Omit<ButtonProps, 'onClick'> {
    onCancelClick(): void;
}

export function CancelButton({
    label = 'Отменить',
    onCancelClick,
    ...props
}: CancelButtonProps): JSX.Element {
    return (
        <Button
            basic
            color='purple'
            onClick={onCancelClick}
            {...props}
        >
            {label}
        </Button>
    );
}
