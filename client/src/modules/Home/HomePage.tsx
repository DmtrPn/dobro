import React, { useState } from 'react';
import classnames from 'classnames';
import { Helmet } from 'react-helmet';

import style from './Home.scss';
import commonStyles from '@components/mixins/commonStyles.scss';

import { StarBackground } from '@components/StarBackground';
import { Textarea } from '@components/Textarea';
import { SaveButton } from '@components/ActionButtons/SaveButton';

import { HappyHour } from './HappyHour';
import { useRandomAffirmation } from '@affirmation/hooks/useRandomAffirmation';
import { useTextareaValue } from '@components/Textarea/hooks/useTextareaValue';

interface Props {}

export function HomePage({}: Props): JSX.Element {
    const { affirmation } = useRandomAffirmation();
    const [isSent, setIsSent] = useState<boolean>(false);
    const { value: wish, onChange: onWishChange } = useTextareaValue();

    return (
        <div className={style.root}>
            <Helmet>
                <title>Внешнее проявляет то, что у тебя есть внутри</title>
            </Helmet>
            <div className={style.content}>
                <div className={commonStyles.field}>
                    <HappyHour />
                </div>
                <div className={classnames([commonStyles.field, style.textarea])}>
                    <Textarea
                        disabled={isSent}
                        placeholder={'Напиши свое желание'}
                        value={wish}
                        onChange={onWishChange}
                    />
                </div>
                <div className={commonStyles.field}>
                    {isSent ? (
                        <div className={style.sent}>
                            Твое желание отправлено в космос! Ожидай в радости и в лучшее время оно сбудется
                        </div>
                    ) : (
                        <SaveButton
                            disabled={wish.length < 3}
                            label={'Отправить желание в космос'}
                            onSaveClick={() => setIsSent(true)}
                        />
                    )}
                </div>
                <div className={commonStyles.field}>
                    <div className={style.affirmation}>{affirmation}</div>
                </div>
            </div>
            <StarBackground />
        </div>
    );
}
