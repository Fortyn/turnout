import {CurrentUser} from "./current-user";

export const ACCESS_TOKEN_KEY = 'jwt_access_token';
export const REFRESH_TOKEN_KEY = 'jwt_refresh_token';
export const USER_INFO_KEY = 'user_info';

class LocalStorageHelperService {
  public getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  public setAccessToken(token: string): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  }

  public removeAccessToken(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }

  public getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  public setRefreshToken(token: string): void {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  }

  public removeRefreshToken(): void {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }

  public removeAllTokens(): void {
    this.removeAccessToken();
    this.removeRefreshToken();
  }

  public getUserInfo(): CurrentUser | null {
    const userInfo = localStorage.getItem(USER_INFO_KEY);
    if (!userInfo) {
      return null;
    }
    try {
      return JSON.parse(userInfo) as CurrentUser;
    } catch (e) {
      return null;
    }
  }

  public getUserName(): string | null {
    const user = this.getUserInfo();
    return user ? user.fullName : null;
  }

  public setUserInfo(user: CurrentUser): void {
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(user));
  }

  public removeUserInfo() {
    localStorage.removeItem(USER_INFO_KEY);
  }
}

const localStorageHelperService = new LocalStorageHelperService();

export default localStorageHelperService;
