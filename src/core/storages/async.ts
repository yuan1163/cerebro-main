import { observable, flow, makeObservable } from 'mobx';

export class AsyncStorage {
  // You can't provide different options to makeObservable in subclass. @see https://mobx.js.org/subclassing.html

  @observable
  loading: boolean = false;

  @flow
  *initialize(): Generator {
  }  

  private timer?: NodeJS.Timer;

  startPolling(interval: number) {
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => {
      //console.log('polling', this.constructor.name, interval);
      this.initialize();
    }, interval);
  }  

  stopPolling() {
    if (this.timer) clearInterval(this.timer);
  }  

  constructor(initialize: boolean) {
    makeObservable(this);
    if (initialize) {
      this.initialize();
    }
  }  

};
