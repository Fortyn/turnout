import { from, Observable } from 'rxjs';
import {AuthenticationProps} from "./auth-models";
import localStorageHelperService from './local-storage-helper-service';
import { AxiosResponse } from 'axios';
import { map, tap } from 'rxjs/operators';
import httpClientService from './http-client.service';

export class AuthService {
  public refreshToken(): Observable<AuthenticationProps> {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorageHelperService.getRefreshToken(),
      },
      baseURL: httpClientService.baseUrl,
    };
    const observable$: Observable<AxiosResponse<AuthenticationProps>> = from(
      httpClientService.axiosInstance.post('auth/refresh', {}, config)
    );
    return observable$.pipe(
      map((response: AxiosResponse<AuthenticationProps>) => response.data),
      tap((data: AuthenticationProps) => {
        if (data.accessToken) {
          localStorageHelperService.setAccessToken(data.accessToken);
        }
        if (data.refreshToken) {
          localStorageHelperService.setRefreshToken(data.refreshToken);
        }
      })
    );
  }
}

const authService = new AuthService();

export default authService;
