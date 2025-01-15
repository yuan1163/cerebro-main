import { action, makeObservable, observable } from 'mobx';
import moment from 'moment';

export class ElectricityData {
  @observable
  startDate?: Date = moment().toDate();

  @action
  setStartDate(date: Date) {
    this.startDate = date;
  }

  @observable
  endDate?: Date = moment().toDate();

  @action
  setEndDate(date: Date) {
    this.endDate = date;
  }

  constructor() {
    makeObservable(this);
  }
}

export const electricity = new ElectricityData();

export const electricityData = () => {
  return electricity;
};
