import { action, makeObservable, observable } from 'mobx';
import moment from 'moment';

import { DeviceHistoryParameter } from '../api/entities/deviceItems';
import { DeviceParts } from '../api/entities/deviceParts';

import { useDeviceHistoryParameters } from '../api/hook/useDeviceHistoryParameters';
import { useDeviceHistoryParametersQueries } from '../api/hook/useDeviceHistoryParametersQueries';

type power = DeviceHistoryParameter[][] | undefined;

export class PowerStorage {
  @observable
  currentHourMs?: number;

  @action
  setCurrentQuarter(QuarterMs: number) {
    this.currentHourMs = QuarterMs;
  }

  @observable
  powerFromLastMonth?: power;

  @action
  setPowerFromLastMonth(power: power) {
    this.powerFromLastMonth = power;
  }

  @observable
  IsFetching: boolean = true;

  @action
  setIsFetching(isFetching: boolean) {
    this.IsFetching = isFetching;
  }

  getTodayData() {
    const todayStartDateMs = moment().startOf('month').valueOf();
    const todayEndDateMs = moment().valueOf();

    const powerData = this.powerFromLastMonth?.map((data) => {
      return data?.filter((data) => {
        if (data.value && data.measureDateMs) {
          if (data.measureDateMs >= todayStartDateMs && data.measureDateMs <= todayEndDateMs) return data;
        }
      });
    });

    return powerData;
  }

  getThisMonthData() {
    const thisMonthStartDateMs = moment().startOf('month').valueOf();
    const thisMonthEndDateMs = moment().valueOf();

    const powerData = this.powerFromLastMonth?.map((data) => {
      return data?.filter((data) => {
        if (data.value && data.measureDateMs) {
          if (data.measureDateMs >= thisMonthStartDateMs && data.measureDateMs <= thisMonthEndDateMs) return data;
        }
      });
    });

    return powerData;
  }
}

export const power = new PowerStorage();

export const powerFromLastMonth = (partLocationId: number | undefined, deviceParts: DeviceParts[]) => {
  let currentQuarter = moment();
  if (moment().minutes() < 15) {
    currentQuarter = moment().set({ minute: 0, second: 0, millisecond: 0 });
  } else if (moment().minutes() < 30) {
    currentQuarter = moment().set({ minute: 15, second: 0, millisecond: 0 });
  } else if (moment().minutes() < 45) {
    currentQuarter = moment().set({ minute: 30, second: 0, millisecond: 0 });
  } else {
    currentQuarter = moment().set({ minute: 45, second: 0, millisecond: 0 });
  }

  const currentHour = moment().set({ minute: 0, second: 0, millisecond: 0 });

  const queryKey = 'MaximumPower';
  const powerArray = useDeviceHistoryParametersQueries(
    {
      startDate: currentQuarter.clone().startOf('week').valueOf().toString(),
      endDate: currentQuarter.clone().valueOf().toString(),
      paramName: 'power',
    },
    deviceParts,
    queryKey,
  );

  power.setCurrentQuarter(currentHour.valueOf());
  power.setPowerFromLastMonth(powerArray.data);
  power.setIsFetching(powerArray.isFetching);

  return power;
};
