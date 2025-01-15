import { action, makeObservable, observable } from 'mobx';
import moment from 'moment';

import { DeviceHistoryParameter } from '../api/entities/deviceItems';

import { useDeviceHistoryParameters } from '../api/hook/useDeviceHistoryParameters';

type consumption = DeviceHistoryParameter[] | undefined;

export class ConsumptionStorage {
  @observable
  currentHourMs?: number;

  @action
  setCurrentQuarter(QuarterMs: number) {
    this.currentHourMs = QuarterMs;
  }

  @observable
  consumptionFromLastMonth?: consumption;

  @action
  setConsumptionFromLastMonth(consumption: consumption) {
    this.consumptionFromLastMonth = consumption;
  }

  @observable
  IsFetching: boolean = true;

  @action
  setIsFetching(isFetching: boolean) {
    this.IsFetching = isFetching;
  }

  getTodayData() {
    const todayStartDateMs = moment().startOf('day').valueOf();
    const todayEndDateMs = moment().valueOf();

    const consumptionData = this.consumptionFromLastMonth?.filter((data) => {
      if (data.value && data.measureDateMs) {
        if (data.measureDateMs >= todayStartDateMs && data.measureDateMs <= todayEndDateMs) return data;
      }
    });

    return consumptionData;
  }

  getThisMonthData() {
    const thisMonthStartDateMs = moment().startOf('month').valueOf();
    const thisMonthEndDateMs = moment().valueOf();

    const consumptionData = this.consumptionFromLastMonth?.filter((data) => {
      if (data.value && data.measureDateMs) {
        if (data.measureDateMs >= thisMonthStartDateMs && data.measureDateMs <= thisMonthEndDateMs) return data;
      }
    });

    return consumptionData;
  }

  getYesterdayCompare() {
    let YESTERDAY_SUM: number = 0;
    let CURRENT_SUM: number = 0;

    const todayStartDateMs = moment(this.currentHourMs).startOf('day').valueOf();
    const todayEndDateMs = moment(this.currentHourMs).valueOf();
    const yesterdayStartDateMs = moment(this.currentHourMs).subtract('1', 'day').startOf('day').valueOf();
    const yesterdayEndDateMs = moment(this.currentHourMs).subtract('1', 'day').valueOf();
    // console.log(
    //   moment(yesterdayStartDateMs).toISOString(),
    //   moment(yesterdayEndDateMs).toISOString(),
    //   moment(todayStartDateMs).toISOString(),
    //   moment(todayEndDateMs).toISOString(),
    // );

    this.consumptionFromLastMonth?.forEach((data) => {
      if (data.value && data.measureDateMs) {
        if (data.measureDateMs >= yesterdayStartDateMs && data.measureDateMs <= yesterdayEndDateMs) {
          YESTERDAY_SUM += Number(data.value);
        } else if (data.measureDateMs >= todayStartDateMs && data.measureDateMs <= todayEndDateMs) {
          CURRENT_SUM += Number(data.value);
        }
      }
    });

    return {
      currentValue: CURRENT_SUM,
      historyValue: YESTERDAY_SUM,
    };
  }

  getWeekCompare() {
    let WEEK_SUM: number = 0;
    let CURRENT_SUM: number = 0;

    const thisWeekStartDateMs = moment(this.currentHourMs).startOf('isoWeek').valueOf();
    const thisWeekEndDateMs = moment(this.currentHourMs).valueOf();
    const lastWeekStartDateMs = moment(this.currentHourMs)
      .subtract('1', 'week')
      .startOf('isoWeek')
      .startOf('day')
      .valueOf();
    const lastWeekEndDateMs = moment(this.currentHourMs).subtract('1', 'week').valueOf();
    // console.log(
    //   moment(thisWeekStartDateMs).toISOString(),
    //   moment(thisWeekEndDateMs).toISOString(),
    //   moment(lastWeekStartDateMs).toISOString(),
    //   moment(lastWeekEndDateMs).toISOString(),
    // );

    this.consumptionFromLastMonth?.forEach((data) => {
      if (data.value && data.measureDateMs) {
        if (data.measureDateMs >= lastWeekStartDateMs && data.measureDateMs <= lastWeekEndDateMs) {
          WEEK_SUM += Number(data.value);
        } else if (data.measureDateMs >= thisWeekStartDateMs && data.measureDateMs <= thisWeekEndDateMs) {
          CURRENT_SUM += Number(data.value);
        }
      }
    });

    return {
      currentValue: CURRENT_SUM,
      historyValue: WEEK_SUM,
    };
  }

  getMonthCompare() {
    let MONTH_SUM: number = 0;
    let CURRENT_SUM: number = 0;

    const thisMonthStartDateMs = moment(this.currentHourMs).startOf('month').valueOf();
    const thisMonthEndDateMs = moment(this.currentHourMs).valueOf();
    const lastMonthStartDateMs = moment(this.currentHourMs)
      .subtract('1', 'month')
      .startOf('month')
      .startOf('day')
      .valueOf();
    const lastMonthEndDateMs = moment(this.currentHourMs).subtract('1', 'month').valueOf();
    // console.log(
    //   moment(thisMonthStartDateMs).toISOString(),
    //   moment(thisMonthEndDateMs).toISOString(),
    //   moment(lastMonthStartDateMs).toISOString(),
    //   moment(lastMonthEndDateMs).toISOString(),
    // );

    this.consumptionFromLastMonth?.forEach((data) => {
      if (data.value && data.measureDateMs) {
        if (data.measureDateMs >= lastMonthStartDateMs && data.measureDateMs <= lastMonthEndDateMs) {
          MONTH_SUM += Number(data.value);
        } else if (data.measureDateMs >= thisMonthStartDateMs && data.measureDateMs <= thisMonthEndDateMs) {
          CURRENT_SUM += Number(data.value);
        }
      }
    });

    return {
      currentValue: CURRENT_SUM,
      historyValue: MONTH_SUM,
    };
  }

  getTodaySum() {
    let consumptionSum: number = 0;
    const start_date = moment(this.currentHourMs).startOf('day').valueOf();
    this.consumptionFromLastMonth?.forEach((data) => {
      if (data.value && data.measureDateMs) {
        if (data.measureDateMs >= start_date) {
          consumptionSum += Number(data.value);
        }
      }
    });

    return consumptionSum;
  }

  getYesterdaySum() {
    let consumptionSum: number = 0;
    const start_date = moment(this.currentHourMs).subtract('1', 'day').startOf('day').valueOf();
    const end_date = moment(this.currentHourMs).subtract('1', 'day').endOf('day').valueOf();

    this.consumptionFromLastMonth?.forEach((data) => {
      if (data.value && data.measureDateMs) {
        if (data.measureDateMs >= start_date && data.measureDateMs <= end_date) {
          consumptionSum += Number(data.value);
        }
      }
    });

    return consumptionSum;
  }

  getThisWeekSum() {
    let consumptionSum: number = 0;
    const start_date = moment(this.currentHourMs).weekday(1).startOf('day').valueOf();

    this.consumptionFromLastMonth?.forEach((data) => {
      if (data.value && data.measureDateMs) {
        if (data.measureDateMs >= start_date) {
          consumptionSum += Number(data.value);
        }
      }
    });

    return consumptionSum;
  }

  getLastWeekSum() {
    let consumptionSum: number = 0;
    const start_date = moment(this.currentHourMs).subtract('7', 'day').weekday(1).startOf('day').valueOf();
    const end_date = moment(this.currentHourMs).subtract('7', 'day').weekday(7).endOf('day').valueOf();

    this.consumptionFromLastMonth?.forEach((data) => {
      if (data.value && data.measureDateMs) {
        if (data.measureDateMs >= start_date && data.measureDateMs <= end_date) {
          consumptionSum += Number(data.value);
        }
      }
    });

    return consumptionSum;
  }

  getThisMonSum(locationIdArray?: number[]) {
    let consumptionSum: number = 0;
    const start_date = moment(this.currentHourMs).startOf('month').valueOf();

    if (locationIdArray) {
      this.consumptionFromLastMonth?.forEach((data) => {
        if (data.value && data.measureDateMs && data.partLocationId) {
          if (data.measureDateMs >= start_date && locationIdArray.includes(data.partLocationId)) {
            consumptionSum += Number(data.value);
          }
        }
      });

      return consumptionSum;
    }

    this.consumptionFromLastMonth?.forEach((data) => {
      if (data.value && data.measureDateMs) {
        if (data.measureDateMs >= start_date) {
          consumptionSum += Number(data.value);
        }
      }
    });

    return consumptionSum;
  }

  getLastMonSum(locationIdArray?: number[]) {
    let consumptionSum: number = 0;
    const start_date = moment(this.currentHourMs).subtract('1', 'month').startOf('month').valueOf();
    const end_date = moment(this.currentHourMs).subtract('1', 'month').endOf('month').valueOf();

    if (locationIdArray) {
      this.consumptionFromLastMonth?.forEach((data) => {
        if (data.value && data.measureDateMs && data.partLocationId) {
          if (
            data.measureDateMs >= start_date &&
            data.measureDateMs <= end_date &&
            locationIdArray.includes(data.partLocationId)
          ) {
            consumptionSum += Number(data.value);
          }
        }
      });

      return consumptionSum;
    }

    this.consumptionFromLastMonth?.forEach((data) => {
      if (data.value && data.measureDateMs) {
        if (data.measureDateMs >= start_date && data.measureDateMs <= end_date) {
          consumptionSum += Number(data.value);
        }
      }
    });

    return consumptionSum;
  }
}

// const getcurrentQuarter = () => {
//   const nowTime = moment().set({ second: 0, millisecond: 0 });
//   let currentQuarter;
//   if (nowTime.minute() >= 45) {
//     currentQuarter = nowTime.set({ minute: 45 });
//   } else if (nowTime.minute() >= 30) {
//     currentQuarter = nowTime.set({ minute: 30 });
//   } else if (nowTime.minute() >= 15) {
//     currentQuarter = nowTime.set({ minute: 15 });
//   } else {
//     currentQuarter = nowTime.set({ minute: 0 });
//   }
//   return currentQuarter;
// };

export const consumption = new ConsumptionStorage();

export const consumptionFromLastMonth = (partLocationId: number | undefined) => {
  const currentHour = moment().set({ minute: 0, second: 0, millisecond: 0 });
  const consumptionArray = useDeviceHistoryParameters({
    endDate: currentHour.clone().utc().valueOf().toString(),
    startDate: currentHour
      .clone()
      .subtract('1', 'month')
      .startOf('month')
      .utc()
      // .format('YYYY-MM-DDTHH:00:00')
      .valueOf()
      .toString(),
    paramName: 'energyHourly',
    // paramName: 'phaseEnergySum',
    partLocationId: partLocationId,
    aggregation: 1,
  });
  //   console.log(consumptionArray);

  consumption.setCurrentQuarter(currentHour.valueOf());
  consumption.setConsumptionFromLastMonth(consumptionArray.data);
  consumption.setIsFetching(consumptionArray.isFetching);

  return consumption;
};
