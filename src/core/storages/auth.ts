import { action, computed, flow, makeObservable, observable, override } from 'mobx';

import { api } from '@core/api';

// types

import { LoginOutput, UserProfileOutput, User, ResultOutput, Location, ResetPasswordInput } from '@core/api/types';

// storages

import { AsyncStorage } from './async';
import { errors } from './errors';
import { LocationsController } from './controllers/locations';

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
        this.loading = false;
        const my: UserProfileOutput = yield api.me();
        this.profile = my.user;
        //locations.initialize();
        yield this.detectSolutions();
      } else {
        // invalid saved token
        localStorage.removeItem('accessToken');
        this.loading = false;
      }
    } else {
      // no saved token
      this.loading = false;
    }
  }

  isAuthenticated() {
    return !!this.accessToken;
  }

  @action
  clear() {
    this.accessToken = undefined;
    this.profile = undefined;
    localStorage.removeItem('accessToken');
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
