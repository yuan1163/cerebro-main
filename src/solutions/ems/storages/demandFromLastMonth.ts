import { action, makeObservable, observable } from 'mobx';
import moment from 'moment';

import { DeviceHistoryParameter } from '../api/entities/deviceItems';

import { useDeviceHistoryParameters } from '../api/hook/useDeviceHistoryParameters';

type demand = DeviceHistoryParameter[] | undefined;

export class DemandStorage {
  @observable
  QuarterMs?: number;

  @action
  setCurrentQuarterMs(QuarterMs: number) {
    this.QuarterMs = QuarterMs;
  }

  @observable
  demandFromLastMonth?: demand;

  @action
  setDemandFromLastMonth(demand: demand) {
    this.demandFromLastMonth = demand;
  }

  getLastData() {
    const todayData = this.getToday();

    const lastData = todayData && todayData[todayData.length - 1];

    return lastData;
  }

  getToday() {
    const todayStartDateMs = moment().startOf('day').valueOf();
    const todayEndDateMs = moment().valueOf();

    const demandData = this.demandFromLastMonth?.filter((data) => {
      if (data.value && data.measureDateMs) {
        if (data.measureDateMs >= todayStartDateMs && data.measureDateMs <= todayEndDateMs) return data;
      }
    });

    return demandData;
  }

  getTodayMax() {
    let demandMax: number | undefined;
    const start_date = moment(this.QuarterMs).startOf('day').valueOf();

    this.demandFromLastMonth?.forEach((data) => {
      if (data.value && data.measureDateMs) {
        if (data.measureDateMs >= start_date) {
          if (demandMax) {
            demandMax = Number(data.value) > demandMax ? Number(data.value) : demandMax;
          } else {
            demandMax = Number(data.value);
          }
        }
      }
    });

    return demandMax;
  }

  getYesterdayMax() {
    let demandMax: number | undefined;
    const start_date = moment(this.QuarterMs).subtract('1', 'day').startOf('day').valueOf();
    const end_date = moment(this.QuarterMs).subtract('1', 'day').endOf('day').valueOf();

    this.demandFromLastMonth?.forEach((data) => {
      if (data.value && data.measureDateMs) {
        if (data.measureDateMs >= start_date && data.measureDateMs <= end_date) {
          if (demandMax) {
            demandMax = Number(data.value) > demandMax ? Number(data.value) : demandMax;
          } else {
            demandMax = Number(data.value);
          }
        }
      }
    });

    return demandMax;
  }

  getThisWeekMax() {
    let demandMax: number | undefined;
    const start_date = moment(this.QuarterMs).startOf('isoWeek').valueOf();

    this.demandFromLastMonth?.forEach((data) => {
      if (data.value && data.measureDateMs) {
        if (data.measureDateMs >= start_date) {
          if (demandMax) {
            demandMax = Number(data.value) > demandMax ? Number(data.value) : demandMax;
          } else {
            demandMax = Number(data.value);
          }
        }
      }
    });

    return demandMax;
  }

  getLastWeekMax() {
    let demandMax: number | undefined;
    const start_date = moment(this.QuarterMs).subtract('1', 'week').startOf('isoWeek').valueOf();
    const end_date = moment(this.QuarterMs).subtract('1', 'week').endOf('isoWeek').valueOf();

    this.demandFromLastMonth?.forEach((data) => {
      if (data.value && data.measureDateMs) {
        if (data.measureDateMs >= start_date && data.measureDateMs <= end_date) {
          if (demandMax) {
            demandMax = Number(data.value) > demandMax ? Number(data.value) : demandMax;
          } else {
            demandMax = Number(data.value);
          }
        }
      }
    });

    return demandMax;
  }

  getThisMonMax() {
    let demandMax: number | undefined;
    const start_date = moment(this.QuarterMs).startOf('month').valueOf();

    this.demandFromLastMonth?.forEach((data) => {
      if (data.value && data.measureDateMs) {
        if (data.measureDateMs >= start_date) {
          if (demandMax) {
            demandMax = Number(data.value) > demandMax ? Number(data.value) : demandMax;
          } else {
            demandMax = Number(data.value);
          }
        }
      }
    });

    return demandMax;
  }

  getLastMonMax() {
    let demandMax: number | undefined;
    const start_date = moment(this.QuarterMs).subtract('1', 'month').startOf('month').valueOf();
    const end_date = moment(this.QuarterMs).subtract('1', 'month').endOf('month').valueOf();

    this.demandFromLastMonth?.forEach((data) => {
      if (data.value && data.measureDateMs) {
        if (data.measureDateMs >= start_date && data.measureDateMs <= end_date) {
          if (demandMax) {
            demandMax = Number(data.value) > demandMax ? Number(data.value) : demandMax;
          } else {
            demandMax = Number(data.value);
          }
        }
      }
    });

    return demandMax;
  }
}

export const demand = new DemandStorage();

export const demandFromLastMonth = (locationId: number | undefined, deviceSPBMId: string | undefined) => {
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

  const demandArray = useDeviceHistoryParameters({
    endDate: currentQuarter.clone().valueOf().toString(),
    startDate: currentQuarter.clone().subtract('1', 'month').startOf('month').valueOf().toString(),
    deviceId: deviceSPBMId,
    paramName: 'demand',
    index: 'P',
    locationId: locationId,
  }).data;

  demand.setCurrentQuarterMs(currentQuarter.valueOf());
  // demand.setDemandFromLastMonth(deviceSPBMId ? demandArray : []);
  demand.setDemandFromLastMonth(demandArray);

  return demand;
};
