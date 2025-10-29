import { action, computed, flow, makeObservable, observable, override } from 'mobx';

import { api } from '@core/api';

// types

import { LoginOutput, UserProfileOutput, User, ResultOutput, Location, ResetPasswordInput } from '@core/api/types';

// storages

import { AsyncStorage } from './async';
import { errors } from './errors';
import { LocationsController } from './controllers/locations';
import { IdleTimeoutManager } from './idleTimeout';

// components

import { AuthLoginFormData } from '@core/ui/cerebro/forms/AuthLoginForm';
import { AuthRestorePasswordFormData } from '@core/ui/cerebro/forms/AuthRestorePasswordForm';
import { ui } from './ui';
import { apiGetLocations } from '@core/api/entities/locations';
import { Solutions, getAvailbableSolutions } from '@core/ui/types';

export class AuthStorage extends AsyncStorage {
  @observable
  accessToken?: string;

  @observable
  profile?: User;

  @observable
  tokenExpireMs?: number;

  private tokenCheckTimer?: number;
  private readonly TOKEN_CHECK_INTERVAL = 60000; // 每分鐘檢查一次 token 是否過期
  private idleTimeoutManager?: IdleTimeoutManager;

  @override
  *initialize() {
    if (this.loading) {
      return; // throttle
    }
    this.loading = true;
    const token = localStorage.getItem('accessToken');
    if (token) {
      const response: LoginOutput = yield api.checkToken(token, 'levelnowLogin');
      if (response.resultCode === 0) {
        this.accessToken = token;
        
        // 儲存 token 過期時間
        if (response.tokenExpireMs) {
          this.tokenExpireMs = response.tokenExpireMs;
          localStorage.setItem('tokenExpireMs', response.tokenExpireMs.toString());
          // 啟動定期檢查
          this.startTokenExpirationCheck();
          // 啟動閒置逾時監控
          this.startIdleTimeout();
        }
        
        this.loading = false;
        const my: UserProfileOutput = yield api.me();
        this.profile = my.user;
        //locations.initialize();
        yield this.detectSolutions();
      } else {
        // invalid saved token
        localStorage.removeItem('accessToken');
        localStorage.removeItem('tokenExpireMs');
        this.loading = false;
      }
    } else {
      // no saved token
      this.loading = false;
    }
  }

  /**
   * 檢查 token 是否已過期
   */
  @action
  isTokenExpired(): boolean {
    if (!this.tokenExpireMs) {
      return false;
    }
    const now = Date.now();
    // 提前 5 分鐘判定為過期，給使用者緩衝時間
    const bufferTime = 5 * 60 * 1000;
    return now >= (this.tokenExpireMs - bufferTime);
  }

  /**
   * 啟動定期檢查 token 過期的機制
   */
  private startTokenExpirationCheck() {
    // 清除現有的 timer
    this.stopTokenExpirationCheck();

    // 設置新的 timer
    this.tokenCheckTimer = window.setInterval(() => {
      if (this.isTokenExpired()) {
        console.warn('Token has expired. Logging out...');
        this.logout();
      }
    }, this.TOKEN_CHECK_INTERVAL);
  }

  /**
   * 停止 token 過期檢查
   */
  private stopTokenExpirationCheck() {
    if (this.tokenCheckTimer) {
      window.clearInterval(this.tokenCheckTimer);
      this.tokenCheckTimer = undefined;
    }
  }

  /**
   * 啟動閒置逾時監控
   */
  private startIdleTimeout() {
    // 清除現有的監控
    this.stopIdleTimeout();

    // 建立新的閒置監控器
    this.idleTimeoutManager = new IdleTimeoutManager(() => {
      console.warn('User has been idle for too long. Logging out...');
      this.logout();
    });
  }

  /**
   * 停止閒置逾時監控
   */
  private stopIdleTimeout() {
    if (this.idleTimeoutManager) {
      this.idleTimeoutManager.cleanup();
      this.idleTimeoutManager = undefined;
    }
  }

  isAuthenticated() {
    return !!this.accessToken;
  }

  @action
  clear() {
    this.accessToken = undefined;
    this.profile = undefined;
    this.tokenExpireMs = undefined;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('tokenExpireMs');
    this.stopTokenExpirationCheck();
    this.stopIdleTimeout();
  }

  @action
  setNavigationPerformedPostLogin(value: boolean) {
    this.hasNavigatedPostLogin = value;
  }

  @flow
  *login(data: AuthLoginFormData) {
    ui.setActing(true);
    const response: LoginOutput = yield api.login({
      username: data.username,
      password: data.password,
    });
    if (response.resultCode === 0) {
      this.accessToken = response.token;
      this.hasNavigatedPostLogin = true;
      
      // 儲存 token 過期時間
      if (response.tokenExpireMs) {
        this.tokenExpireMs = response.tokenExpireMs;
        localStorage.setItem('tokenExpireMs', response.tokenExpireMs.toString());
        // 啟動定期檢查
        this.startTokenExpirationCheck();
        // 啟動閒置逾時監控
        this.startIdleTimeout();
      }
      
      if (data.remember) {
        localStorage.setItem('accessToken', this.accessToken);
      }
      const my: UserProfileOutput = yield api.me();
      this.profile = my.user;
      //locations.initialize();
      yield this.detectSolutions();
      ui.gotoWorkspace();
    } else {
      errors.showError(response);
    }
    ui.setActing(false);
    return response;
  }

  @flow
  *logout() {
    yield api.logout();
    this.clear();
    LocationsController.invalidate();
    ui.gotoLogin();
    window.location.href = '/login'; // TODO Full reload to fix cursor display error in Input field
  }

  @flow
  *restorePassword(data: AuthRestorePasswordFormData) {
    ui.setActing(true);
    const response: ResultOutput = yield api.restorePassword({
      username: data.email,
      brand: 'default',
    });
    if (response.resultCode === 0) {
    } else {
      errors.showError(response);
    }
    ui.setActing(false);
    return response;
  }

  @observable
  solutions: Solutions[] = [];

  hasNavigatedPostLogin = false;

  @flow
  *detectSolutions() {
    const locations: Location[] = yield apiGetLocations();
    const company = locations[0];
    this.solutions = getAvailbableSolutions(company);

    const storedValue = localStorage.getItem('activeSolution') as Solutions;
    let defaultValue: Solutions;
    if (this.solutions.includes(storedValue)) defaultValue = storedValue;
    else defaultValue = this.solutions[0];
    if (ui.activeSolution !== defaultValue) ui.setActiveSolution(defaultValue);
  }

  @flow
  *resetPassword(input: ResetPasswordInput, token?: string | null) {
    const response: ResultOutput = yield api.resetPassword(input, token);
    if (response.resultCode === 0) {
      ui.gotoLogin();
    } else {
      errors.showError(response);
    }
    return response;
  }
}

export const auth = new AuthStorage(true);

export const useAuth = () => auth;
