import { action, makeObservable, observable } from 'mobx';
import moment from 'moment';

import { DeviceHistoryParameter } from '../api/entities/deviceItems';

import { useDeviceHistoryParameters } from '../api/hook/useDeviceHistoryParameters';

type consumption = DeviceHistoryParameter[] | undefined;
type consumptionMonthly = { [key: string]: number };
export type factors = { [key: string]: any };

export class ConsumptionStorage {
  @observable
  startDateMs?: number;

  @action
  setStartDate(dateMs: number) {
    this.startDateMs = dateMs;
  }

  @observable
  endDateMs?: number;

  @action
  setEndDate(dateMs: number) {
    this.endDateMs = dateMs;
  }

  @observable
  consumptionMonthly: consumptionMonthly = {};

  @action
  setConsumptionMonthly() {
    for (let i = 11; i >= 0; i--) {
      const monthYear = moment(this.startDateMs).subtract(i, 'month').format('MM/YYYY');
      this.consumptionMonthly[monthYear] = 0;
    }

    this.consumptionCurrent12Mon?.forEach((data) => {
      if (data.measureDateMs) {
        const yearMonth = moment(data.measureDateMs).format('MM/YYYY');
        this.consumptionMonthly[yearMonth] += data.value ? Number(data.value) : 0;
      }
    });
  }

  @observable
  consumptionCurrent12Mon?: consumption;

  @action
  setconsumptionCurrent12Mon(consumption: consumption) {
    this.consumptionCurrent12Mon = consumption;
    this.setConsumptionMonthly();
  }

  @observable
  IsFetching: boolean = true;

  @action
  setIsFetching(isFetching: boolean) {
    this.IsFetching = isFetching;
  }

  getAllMonth() {
    return this.consumptionMonthly;
  }

  getALLMonthCo2e(factors: factors) {
    let co2eMonthy = Object.assign({}, this.consumptionMonthly);
    Object.keys(co2eMonthy).forEach((monthYear) => {
      const year = monthYear.slice(-4);
      if (year in factors && factors[year]) {
        co2eMonthy[monthYear] = co2eMonthy[monthYear] * factors[year];
      } else {
        co2eMonthy[monthYear] = 0;
      }
    });

    return co2eMonthy;
  }
}

export const consumption = new ConsumptionStorage();

export const consumptionCurrent12Month = (partLocationId: number | undefined) => {
  const currentDate = moment().startOf('day');
  const startDate = currentDate.valueOf();
  const endDate = currentDate.clone().subtract(11, 'month').startOf('month').valueOf();

  const consumptionArray = useDeviceHistoryParameters({
    endDate: startDate.toString(),
    startDate: endDate.toString(),
    paramName: 'energyHourly',
    partLocationId: partLocationId,
    aggregation: 5,
  });

  consumption.setStartDate(startDate.valueOf());
  consumption.setEndDate(endDate.valueOf());
  consumption.setconsumptionCurrent12Mon(consumptionArray.data);
  consumption.setConsumptionMonthly();
  consumption.setIsFetching(consumptionArray.isFetching);

  return consumption;
};
