import { auth } from '@core/storages/auth';
import { LoginInput, LoginOutput, ResetPasswordInput, RestorePasswordInput, ResultOutput, User } from './types';

export const SERVER = import.meta.env.VITE_API_HOST;
export const LEVELNOW_SERVER = import.meta.env.VITE_LEVELNOW_API_HOST || SERVER;
export const LEVELNOW_LOGIN_SERVER = import.meta.env.VITE_LEVELNOW_API_LOGIN_HOST || SERVER;
export const IVEDA_SERVER = import.meta.env.VITE_IVEDA_API_HOST || SERVER;

export type ApiSource = 'ivedaAI' | 'levelnow' | 'levelnowLogin' | 'cerebro';

export enum METHOD {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Patch = 'PATCH',
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
      case 'ivedaAI':
        return IVEDA_SERVER;
      default:
        return SERVER;
    }
  }

  /**
   * 處理未授權的回應（401/403 或 resultCode 表示未授權）
   * 自動清除 session 並導向登入頁
   */
  private handleUnauthorized(): void {
    // 避免在登入/重設密碼頁面重複導向
    const currentPath = window.location.pathname;
    if (currentPath === '/login' || currentPath === '/reset') {
      return;
    }

    // 清除認證資訊
    auth.clear();

    // 導向登入頁
    window.location.href = '/login';
  }

  /**
   * 檢查回應是否表示未授權
   */
  private isUnauthorizedResponse(response: Response, data: any): boolean {
    // 檢查 HTTP status code
    if (response.status === 401 || response.status === 403) {
      return true;
    }

    // 檢查 resultCode（根據專案慣例，某些錯誤碼表示未授權）
    // 常見的未授權 resultCode: 401, 403, 1001, 1002 等
    if (data && typeof data === 'object' && 'resultCode' in data) {
      const unauthorizedCodes = [401, 403, 1001, 1002];
      if (unauthorizedCodes.includes(data.resultCode)) {
        return true;
      }
    }

    return false;
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

    return fetch(url, init)
      .then(async (response) => {
        const jsonData = await response.json();

        // 檢查是否為未授權回應
        if (this.isUnauthorizedResponse(response, jsonData)) {
          this.handleUnauthorized();
          return Promise.reject({
            resultCode: response.status,
            resultMessage: 'Unauthorized. Please login again.',
          });
        }

        return jsonData;
      })
      .catch((error) => {
        // 如果是網路錯誤或其他非 JSON 錯誤，直接拋出
        if (error.resultCode === undefined) {
          throw error;
        }
        throw error;
      });
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
    return fetch(url, init).then(async (response) => {
      // 檢查未授權狀態
      if (response.status === 401 || response.status === 403) {
        this.handleUnauthorized();
        return Promise.reject({
          resultCode: response.status,
          resultMessage: 'Unauthorized. Please login again.',
        });
      }
      return await response.blob();
    });
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
    return fetch(url, init).then(async (response) => {
      const jsonData = await response.json();

      // 檢查是否為未授權回應
      if (this.isUnauthorizedResponse(response, jsonData)) {
        this.handleUnauthorized();
        return Promise.reject({
          resultCode: response.status,
          resultMessage: 'Unauthorized. Please login again.',
        });
      }

      return jsonData;
    });
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
    return fetch(url, init).then(async (response) => {
      const jsonData = await response.json();

      // 檢查是否為未授權回應
      if (this.isUnauthorizedResponse(response, jsonData)) {
        this.handleUnauthorized();
        return Promise.reject({
          resultCode: response.status,
          resultMessage: 'Unauthorized. Please login again.',
        });
      }

      return jsonData;
    });
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

  async patch<Input, Output>(endpoint: string, data?: Input, source?: ApiSource): Promise<Output> {
    return this.request(METHOD.Patch, endpoint, data, null, source) as Promise<Output>;
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

  async resetPassword(input: ResetPasswordInput, token?: string | null): Promise<ResultOutput> {
    const payload = { ...input, brand: undefined };
    return this.request(
      METHOD.Put,
      ENDPOINT.ResetPassword + `?brand=${input.brand}`,
      payload,
      token,
    ) as Promise<ResultOutput>;
  }
}

export const api = new ApiLayer();

export const useAPI = () => api;
