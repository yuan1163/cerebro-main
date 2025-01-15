import moment from 'moment';

// uitils

import { t } from '@core/utils/translate';

// storages

import { useLocations } from '@core/storages/controllers/locations';
import { useUI } from '@core/storages/ui';

// components

import { Select, SelectOption } from '@core/ui/components/Select';

export const GetMonthRnage = (year: number): SelectOption<string>[] => {
  return [
    { label: t('date.months.january.label', 'January', 'The first month of the year.'), value: '01' },
    { label: t('date.months.february.label', 'February', 'The second month of the year.'), value: '02' },
    { label: t('date.months.march.label', 'March', 'The third month of the year.'), value: '03' },
    { label: t('date.months.april.label', 'April', 'The fourth month of the year.'), value: '04' },
    { label: t('date.months.may.label', 'May', 'The fifth month of the year.'), value: '05' },
    { label: t('date.months.june.label', 'June', 'The sixth month of the year.'), value: '06' },
    { label: t('date.months.july.label', 'July', 'The seventh month of the year.'), value: '07' },
    { label: t('date.months.august.label', 'August', 'The eighth month of the year.'), value: '08' },
    { label: t('date.months.september.label', 'September', 'The ninth month of the year.'), value: '09' },
    { label: t('date.months.october.label', 'October', 'The tenth month of the year.'), value: '10' },
    { label: t('date.months.november.label', 'November', 'The eleventh month of the year.'), value: '11' },
    { label: t('date.months.december.label', 'December', 'The twelfth and final month of the year.'), value: '12' },
  ];
};

export const GetYearRnage = () => {
  let optionArr: SelectOption<number>[] = [];
  const currentFormation = useUI().currentFormation;
  let startYear: number = Number(moment(useLocations()?.getElementById(currentFormation)?.creationDate).year());
  let endYear: number = moment().year();

  for (let currentYear = startYear; currentYear < endYear + 1; currentYear++) {
    optionArr.push({
      label: currentYear.toString(),
      value: moment(`${currentYear}`).valueOf(),
    });
  }

  return optionArr;
};
