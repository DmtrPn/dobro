import React from 'react';

import { Button, ButtonProps, ButtonTheme } from '@components/Button';

interface SaveButtonProps extends Omit<ButtonProps, 'onClick' | 'theme'> {
    onSaveClick(): void;
}

export function SaveButton({
    label = 'Cохранить',
    onSaveClick,
    ...props
}: SaveButtonProps): JSX.Element {
    return (
        <Button
            theme={ButtonTheme.Primary}
            onClick={onSaveClick}
            {...props}
        >
            {label}
        </Button>
    );
}
