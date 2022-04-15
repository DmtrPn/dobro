import * as React from 'react';
import classnames from 'classnames';
import { Helmet } from 'react-helmet';

import style from './Home.scss';
import commonStyles from '@components/mixins/commonStyles.scss';

import { StarBackground } from '@components/StarBackground';
// import { Clock } from '@components/Clock';
import { Textarea } from '@components/Textarea';
import { Button } from '@components/Button';

import { HappyHour } from './HappyHour';

interface Props {
    isSent: boolean;
    wish: string;
    onSendClick(): void;
    onWishChange(event: React.ChangeEvent<HTMLTextAreaElement>): void;
}

export function HomePage({
    isSent,
    wish,
    onSendClick,
    onWishChange,
}: Props): JSX.Element {
    return (
        <div className={style.root}>
            <Helmet>
                <title>Внешнее проявляет то, что у тебя есть внутри</title>
            </Helmet>
            <div className={style.content}>
                <div className={commonStyles.field}>
                    <HappyHour />
                </div>
                <div className={classnames([
                        commonStyles.field,
                        style.textarea
                    ])}>
                    <Textarea
                        disabled={isSent}
                        placeholder={'Напиши свое желание'}
                        value={wish}
                        onChange={onWishChange}
                    />
                </div>
                <div className={commonStyles.field}>
                    {isSent
                        ? (<div className={style.sent}>
                            Твое желание отправлено в космос!
                            Ожидай в радости и в лучшее время оно сбудется
                        </div>)
                        : <Button
                            disabled={wish.length < 3}
                            label={'Отправить желание в космос'}
                            onClick={onSendClick}
                        />}
                </div>
                <div className={commonStyles.field}>
                    <div className={style.affirmation}>
                        отпусти знания в пользу чувств
                    </div>
                </div>
            </div>
            <StarBackground />
        </div>
    );
}
