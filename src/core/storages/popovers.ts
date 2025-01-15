import { makeObservable, observable } from "mobx";

export class PopoversStorage {
  
  @observable
  popovers = [];
  
  constructor() {
    makeObservable(this);
  };
};

export const popovers = new PopoversStorage();

export const usePopovers = () => popovers;
