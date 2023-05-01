import React from 'react';
import classnames from 'classnames';

import style from './DoubleIconButtons.scss';

import { IconType } from '@components/Icon';
import { IconButton } from '@components/ActionButtons/IconButton';

export interface DoubleIconButtonsProps {
    leftIcon: IconType;
    rightIcon?: IconType;
    disableLeft?: boolean;
    disableRight?: boolean;
    onLeftClick(): void;
    onRightClick?(): void;
}

interface Props extends DoubleIconButtonsProps {}

export function DoubleIconButtons({
    leftIcon,
    rightIcon,
    disableLeft,
    disableRight,
    onLeftClick,
    onRightClick,
}: Props): JSX.Element {
    return (
        <div className={classnames([style.root])}>
            <IconButton icon={leftIcon} isDisable={disableLeft} onButtonClick={onLeftClick} />
            {onRightClick && rightIcon && (
                <IconButton icon={rightIcon} isDisable={disableRight} onButtonClick={onRightClick} />
            )}
        </div>
    );
}
