export interface AuthUserData {
    id: string;
    email: string;
}

export interface LoginForm {
    user: LoginParams;
}

export interface LoginParams {
    email: string;
    password: string;
}
