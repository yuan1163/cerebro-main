import { action, makeObservable, observable } from 'mobx';
import moment from 'moment';

export class ChartStateStorage {
  @observable
  StartDate: string | undefined;

  @action
  setStartDate(startDate: string | undefined) {
    this.StartDate = startDate;
  }

  @observable
  EndDate: string | undefined;

  @action
  setEndDate(endDate: string | undefined) {
    this.EndDate = endDate;
  }

  @observable
  DataType: string | undefined;

  @action
  setDataType(dataType: 'day' | 'month' | 'year') {
    this.DataType = dataType;
  }

  @observable
  SelectedType: string | undefined;

  @action
  setSelectedType(selectedType: 'last' | 'current') {
    this.SelectedType = selectedType;
  }

  constructor() {
    this.StartDate = moment.utc().subtract('6', 'hours').format('YYYY-MM-DDTHH:mm:00').toString();
    this.EndDate = moment.utc().format('YYYY-MM-DDTHH:mm:00').toString();
    this.DataType = 'day';
    this.SelectedType = 'last';
    makeObservable(this);
  }
}

export const chartState = new ChartStateStorage();
