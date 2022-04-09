export interface AuthUserData {
    id: string;
    email: string;
    name: string;
}

export interface AuthUserResponse {
    user: AuthUserData;
}

export interface LoginForm {
    user: LoginParams;
}

export interface LoginParams {
    email: string;
    password: string;
}
