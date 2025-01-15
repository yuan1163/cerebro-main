import { action, computed, makeObservable, observable } from 'mobx';

export class ErrorsStorage {
  @observable
  errors: Array<string | undefined> = [];
  timeout: number | undefined;

  @computed
  get length() {
    return 0;
  }

  @action
  showError(error?: any, timeout?: number | undefined) {
    let message;
    if ('message' in error) message = error.message;
    else if ('resultCodeDesc' in error) message = error.resultCodeDesc;
    else if (typeof error === 'string') message = error;
    else if (typeof error === 'object') message = JSON.stringify(error);
    else message = error.toString();

    this.errors.push(message);
    this.errors = [...this.errors];
    this.timeout = timeout || 5000;
  }

  @action
  removeError(key?: number) {
    let removedError = this.errors.filter((i, index) => index !== key);
    this.errors = removedError;
  }

  constructor() {
    makeObservable(this);
  }

  // TODO debouncing and/or throttle and/or "more errors" counter
}

export const errors = new ErrorsStorage();

export const useErrors = () => errors;
