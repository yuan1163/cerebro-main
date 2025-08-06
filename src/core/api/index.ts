import { auth } from '@core/storages/auth';
import { LoginInput, LoginOutput, ResetPasswordInput, RestorePasswordInput, ResultOutput, User } from './types';

export const SERVER = import.meta.env.VITE_API_HOST;
export const LEVELNOW_SERVER = import.meta.env.VITE_LEVELNOW_API_HOST || SERVER;
export const LEVELNOW_LOGIN_SERVER = import.meta.env.VITE_LEVELNOW_API_LOGIN_HOST || SERVER;

export type ApiSource = 'levelnow' | 'levelnowLogin' | 'cerebro';

export enum METHOD {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE',
}

export enum ENDPOINT {
  Login = 'login',
  Logout = 'logout',
  CheckToken = 'loginByToken',
  RestorePassword = 'password',
  ResetPassword = 'password',
  User = 'user',
}

export class ApiLayer {
  private getServerUrl(source?: ApiSource): string {
    switch (source) {
      case 'levelnow':
        return LEVELNOW_SERVER;
      case 'levelnowLogin':
        return LEVELNOW_LOGIN_SERVER;
      case 'cerebro':
        return SERVER;
      default:
        return SERVER;
    }
  }

  async request(
    method: METHOD,
    endpoint: string,
    data?: unknown,
    useToken?: string | null,
    source?: ApiSource,
  ): Promise<unknown> {
    const serverUrl = this.getServerUrl(source);
    const url = `${serverUrl}/${endpoint}`;
    const token = useToken || auth.accessToken;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // TODO make it optional if token exists only
    };
    const init = {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
    };

    return fetch(url, init).then((response) => response.json());
  }
  /** 檔案下載 api 請求 excel 檔案資源 */
  async requestBinary(
    method: METHOD,
    endpoint: string,
    data?: unknown,
    useToken?: string | null,
    source?: ApiSource,
  ): Promise<unknown> {
    const serverUrl = this.getServerUrl(source);
    const url = `${serverUrl}/${endpoint}`;
    const token = useToken || auth.accessToken;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // TODO make it optional if token exists only
    };
    const init = {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
    };
    return fetch(url, init).then(async (response) => await response.blob());
  }

  async upload(endpoint: string, contentType: string, data: BodyInit, source?: ApiSource): Promise<unknown> {
    const serverUrl = this.getServerUrl(source);
    const url = `${serverUrl}/${endpoint}`;
    const token = auth.accessToken;
    const headers = {
      'Content-Type': contentType,
      'Authorization': `Bearer ${token}`, // TODO make it optional if token exists only
    };
    const init = {
      method: METHOD.Post,
      headers,
      body: data,
    };
    return fetch(url, init).then((response) => response.json());
  }

  async uploadMCFile<Input, Output>(
    endpoint: string,
    contentType: string,
    data: BodyInit,
    source?: ApiSource,
  ): Promise<Output> {
    const serverUrl = this.getServerUrl(source);
    const url = `${serverUrl}/${endpoint}`;
    const token = auth.accessToken;
    const headers = {
      'Content-Type': contentType,
      'Authorization': `Bearer ${token}`, // TODO make it optional if token exists only
    };
    const init = {
      method: METHOD.Put,
      headers,
      body: data,
    };
    return fetch(url, init).then((response) => response.json());
  }

  async get<Input, Output>(endpoint: string, data?: Input, source?: ApiSource): Promise<Output> {
    return this.request(METHOD.Get, endpoint, data, null, source) as Promise<Output>;
  }

  /** 檔案下載 */
  async downloadFile<Input, Output>(endpoint: string, data?: Input, source?: ApiSource): Promise<Output> {
    const res = (await this.requestBinary(METHOD.Get, endpoint, data, null, source)) as Promise<Output>;
    return res;
    // return this.requestBinary(METHOD.Get, endpoint, data) as Promise<Output>;
  }

  async post<Input, Output>(endpoint: string, data?: Input, source?: ApiSource): Promise<Output> {
    return this.request(METHOD.Post, endpoint, data, null, source) as Promise<Output>;
  }

  async put<Input, Output>(endpoint: string, data?: Input, source?: ApiSource): Promise<Output> {
    return this.request(METHOD.Put, endpoint, data, null, source) as Promise<Output>;
  }

  async delete<Input, Output>(endpoint: string, data?: Input, source?: ApiSource): Promise<Output> {
    return this.request(METHOD.Delete, endpoint, data, null, source) as Promise<Output>;
  }

  async checkResulCode<DataType extends ResultOutput>(result: DataType): Promise<DataType> {
    if (result.resultCode !== 0) return Promise.reject(result);
    else return Promise.resolve(result);
  }

  async login(input: LoginInput): Promise<LoginOutput> {
    return this.post<LoginInput, LoginOutput>(ENDPOINT.Login, input, 'levelnowLogin');
  }

  async logout() {
    return this.get<void, void>(ENDPOINT.Logout);
  }

  async checkToken(token: string, source?: ApiSource): Promise<LoginOutput> {
    return this.request(METHOD.Get, ENDPOINT.CheckToken, null, token, source) as Promise<LoginOutput>;
  }

  async me(): Promise<User> {
    return this.get<void, User>(ENDPOINT.User, undefined, 'levelnowLogin');
  }

  async restorePassword(input: RestorePasswordInput): Promise<void> {
    return this.get<void, void>(ENDPOINT.RestorePassword + `?username=${input.username}&brand=${input.brand}`);
  }

  async resetPassword(input: ResetPasswordInput, token?: string | null): Promise<void> {
    const payload = { ...input, brand: undefined };
    return this.request(METHOD.Put, ENDPOINT.ResetPassword + `?brand=${input.brand}`, payload, token) as Promise<void>;
  }
}

export const api = new ApiLayer();

export const useAPI = () => api;
