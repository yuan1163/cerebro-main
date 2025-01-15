import React, { useState } from 'react';

// utils

import { t } from '@core/utils/translate';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// component
import { Input } from '@core/ui/components/Input';
import moment from 'moment';
import Datepicker from 'react-datepicker';
import { electricityData } from '../CircuitSummary/HistoricalTrendChart/stroages/electricityData';

const CustomInput = ({
  value,
  onClick,
}: {
  value: string;
  date: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => {
  return <Input className={styles['date-picker-input']}>123</Input>;
};

const Daterangepicker = () => {
  const controller = electricityData();

  const [dateRange, setDateRange] = useState<null[] | Date[]>([
    moment(controller.startDate).toDate(),
    moment(controller.endDate).toDate(),
  ]);

  const [startDate, endDate] = dateRange;

  const [maxDate, setMaxDate] = useState(
    moment(startDate)
      .add({ ['day']: 2 })
      .startOf('day')
      .valueOf() >= moment().startOf('day').valueOf()
      ? moment().toDate()
      : moment(startDate)
          .add({ ['day']: 2 })
          .toDate(),
  );

  const onDateRangePickerChange = (update: any) => {
    const [start, end] = update;
    setDateRange(update);

    if (start)
      setMaxDate(
        moment(start)
          .add({ ['day']: 2 })
          .startOf('day')
          .valueOf() >= moment().startOf('day').valueOf()
          ? moment().toDate()
          : moment(start)
              .add({ ['day']: 2 })
              .toDate(),
      );

    // start date
    if (start && end) {
      controller.setStartDate(start);
      controller.setEndDate(end);
    }
  };

  return (
    <div className={cn(styles['date-picker-container'])}>
      <Datepicker
        className={styles['date-picker-input']}
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={onDateRangePickerChange}
        selected={startDate}
        withPortal
        maxDate={maxDate}
      />
    </div>
  );
};

export default Daterangepicker;
