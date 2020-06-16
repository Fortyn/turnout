import {CurrentUser} from "./current-user";

export interface AuthenticationProps {
    accessToken: string | null;
    refreshToken: string | null;
    error: boolean;
    user: CurrentUser | null;
}

export interface AuthState {
    login: string;
    password: string;
}