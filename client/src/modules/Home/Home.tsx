import * as React from 'react';
import classnames from 'classnames';

import style from './Home.scss';
import commonStyles from '@components/mixins/commonStyles.scss';

import { StarBackground } from '@components/StarBackground';
import { Clock } from '@components/Clock';
import { Textarea } from '@components/Textarea';

import { HappyHour } from './HappyHour';

interface Props {
}

export function HomePage({
}: Props): JSX.Element {
    return (
        <div className={style.root}>
            <div className={style.content}>
                <div className={commonStyles.field}>
                    <HappyHour />
                </div>
                <div className={classnames([
                        commonStyles.field,
                        style.textarea
                    ])}>
                    <Textarea placeholder={'Напиши свое желание'} />
                </div>
                <div className={commonStyles.field}>
                    <Clock />
                </div>
            </div>
            <StarBackground />
        </div>
    );
}
