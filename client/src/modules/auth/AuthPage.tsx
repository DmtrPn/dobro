import React from 'react';
import classnames from 'classnames';

import style from './AuthPage.scss';

import commonStyle from '@components/mixins/commonStyles.scss';
import { Input } from '@components/Input';
import { SaveButton } from '@components/ActionButtons/SaveButton';
import { useAuthUser } from '@store/App/hooks/useAuthUser';

import { useAuth } from './hooks/useAuth';

export interface AuthPageProps {}

interface Props extends AuthPageProps {
    errorMessage?: string;
    email: string;
    password: string;
    fullName?: string;
    onLoginClick(): void;
    onLogoutClick(): void;
    onInputChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

export function AuthPage({}: Props): JSX.Element {
    const { email, errorMessage, password, isPasswordValid, onInputChange, onLoginClick, onLogoutClick } = useAuth();
    const { fullName } = useAuthUser();

    return !!fullName ? (
        <div className={style.root}>
            <div className={style.form}>
                <div className={commonStyle.field}>
                    <span className={style.message}>Здравствуйте, {fullName}</span>
                </div>
                <div className={commonStyle.field}>
                    <SaveButton label={'Выйти'} onSaveClick={onLogoutClick} />
                </div>
            </div>
        </div>
    ) : (
        <div className={style.root}>
            <div className={style.form}>
                <div className={commonStyle.field}>
                    <span className={style.message}>Авторизация</span>
                </div>
                {!!errorMessage && (
                    <div className={commonStyle.field}>
                        <span className={style.errorMessage}>{errorMessage}</span>
                    </div>
                )}
                <div className={commonStyle.field}>
                    <Input
                        name={'email'}
                        title={'email'}
                        type={'email'}
                        value={email}
                        onChange={onInputChange}
                        onKeyDown={e => (e.keyCode === 13 ? onLoginClick() : null)}
                    />
                </div>
                <div className={commonStyle.field}>
                    <Input
                        type={'password'}
                        name={'password'}
                        title={'Пароль'}
                        value={password}
                        onChange={onInputChange}
                        onKeyDown={e => (e.keyCode === 13 ? onLoginClick() : null)}
                    />
                </div>
                <div className={classnames([commonStyle.field, style.buttons])}>
                    <SaveButton disabled={!isPasswordValid} label={'Войти'} onSaveClick={onLoginClick} />
                </div>
            </div>
        </div>
    );
}
