import { auth } from '@core/storages/auth';
import { LoginInput, LoginOutput, ResetPasswordInput, RestorePasswordInput, ResultOutput, User } from './types';

export const SERVER = import.meta.env.VITE_API_HOST;

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
  async request(method: METHOD, endpoint: string, data?: unknown, useToken?: string | null): Promise<unknown> {
    const url = `${SERVER}/${endpoint}`;
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

  async requestBinary(method: METHOD, endpoint: string, data?: unknown, useToken?: string | null): Promise<unknown> {
    const url = `${SERVER}/${endpoint}`;
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
    return fetch(url, init).then((response) => response.blob());
  }

  async upload(endpoint: string, contentType: string, data: BodyInit): Promise<unknown> {
    const url = `${SERVER}/${endpoint}`;
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

  async uploadMCFile<Input, Output>(endpoint: string, contentType: string, data: BodyInit): Promise<Output> {
    const url = `${SERVER}/${endpoint}`;
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

  async get<Input, Output>(endpoint: string, data?: Input): Promise<Output> {
    return this.request(METHOD.Get, endpoint, data) as Promise<Output>;
  }

  async downloadFile<Input, Output>(endpoint: string, data?: Input): Promise<Output> {
    return this.requestBinary(METHOD.Get, endpoint, data) as Promise<Output>;
  }

  async post<Input, Output>(endpoint: string, data?: Input): Promise<Output> {
    return this.request(METHOD.Post, endpoint, data) as Promise<Output>;
  }

  async put<Input, Output>(endpoint: string, data?: Input): Promise<Output> {
    return this.request(METHOD.Put, endpoint, data) as Promise<Output>;
  }

  async delete<Input, Output>(endpoint: string, data?: Input): Promise<Output> {
    return this.request(METHOD.Delete, endpoint, data) as Promise<Output>;
  }

  async checkResulCode<DataType extends ResultOutput>(result: DataType): Promise<DataType> {
    if (result.resultCode !== 0) return Promise.reject(result);
    else return Promise.resolve(result);
  }

  async login(input: LoginInput): Promise<LoginOutput> {
    return this.post<LoginInput, LoginOutput>(ENDPOINT.Login, input);
  }

  async logout() {
    return this.get<void, void>(ENDPOINT.Logout);
  }

  async checkToken(token: string): Promise<LoginOutput> {
    return this.request(METHOD.Get, ENDPOINT.CheckToken, null, token) as Promise<LoginOutput>;
  }

  async me(): Promise<User> {
    return this.get<void, User>(ENDPOINT.User);
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
