import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';
import {localHistory} from "../portal-container/portal-container";
import localStorageHelperService from './local-storage-helper-service';
import { Observable } from 'rxjs';
import authService from './auth.service';
import { finalize, mapTo, share, switchMap } from 'rxjs/operators';

export class HttpClientService {
  public readonly baseUrl = '';
  public readonly axiosInstance: AxiosInstance;
  private tokenSubject: Observable<boolean> | undefined;

  public constructor() {
    this.axiosInstance = this.createAxiosInstance();
  }

  public get<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    const c = Object.assign({}, config, this.getBaseConfig());
    return this.axiosInstance.get(url, c);
  }

  public post<T>(
    url: string,
    payload: any, // eslint-disable-line @typescript-eslint/no-explicit-any
    config?: AxiosRequestConfig
  ): AxiosPromise<T> {
    const c = Object.assign({}, config, this.getBaseConfig());
    return this.axiosInstance.post(url, payload, c);
  }

  public put = <T>(
    url: string,
    payload: any, // eslint-disable-line @typescript-eslint/no-explicit-any
    config?: AxiosRequestConfig
  ): AxiosPromise<T> => {
    const c = Object.assign({}, config, this.getBaseConfig());
    return this.axiosInstance.put(url, payload, c);
  };

  public delete<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    const c = Object.assign({}, config, this.getBaseConfig());
    return this.axiosInstance.delete(url, c);
  }

  private createAxiosInstance(): AxiosInstance {
    const axiosInstance = axios.create();
    axiosInstance.interceptors.response.use(
      response => response,
      error => {
        switch (error.response.status) {
          case 401:
            return Promise.reject(error);
          case 452:
            return this.handle452Error(error.config);
          case 453:
            return this.handle453Error(error);
          default:
            return Promise.reject(error);
        }
      }
    );

    return axiosInstance;
  }

  private getBaseConfig(): AxiosRequestConfig {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorageHelperService.getAccessToken(),
      },
      baseURL: this.baseUrl,
    };
    return config;
  }

  private handle452Error(config: AxiosRequestConfig) {
    if (!this.tokenSubject) {
      localStorageHelperService.removeAccessToken();
      this.tokenSubject = authService.refreshToken().pipe(
        mapTo(true),
        share(),
        finalize(() => (this.tokenSubject = undefined))
      );
    }

    return this.tokenSubject
      .pipe(
        switchMap(() => {
          config.headers['Authorization'] = 'Bearer ' + localStorageHelperService.getAccessToken();
          return this.axiosInstance.request(config);
        })
      )
      .toPromise();
  }

  private handle453Error(error: Error) {
    localStorageHelperService.removeRefreshToken();
    localStorageHelperService.removeUserInfo();
    localHistory.push("/login")
    window.location.reload();
    return Promise.reject(error);
  }
}

const httpClientService = new HttpClientService();
export default httpClientService;
