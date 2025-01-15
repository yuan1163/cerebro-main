import React from "react";
import { action, makeObservable, observable } from "mobx";

export class ModalsStorage {

  @observable
  stack: React.ReactNode[] = [];

  @action
  open(component: React.ReactNode) {
    this.stack.push(component);
    this.stack = [...this.stack];
  }

  @action
  close() {
    this.stack.pop();
    this.stack = [...this.stack];
  }

  constructor() {
    makeObservable(this);
  };
};

export const modals = new ModalsStorage();

export const useModals = () => modals;
