import moment from 'moment';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

// utils

import { t } from '@core/utils/translate';

// storages

import { chartState, ChartStateStorage } from '@solutions/ems/storages/chartState';

// styles

import stylesInputBase from '@core/ui/components/InputBase/styles.module.scss';
import { cn } from '@core/utils/classnames';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './styles.module.scss';

// Type
import { SelectDateTimeRangeOption } from '../SelectDateTimeRange';

// components

import { Box } from '@core/ui/components/Box';
import { Button } from '@core/ui/components/Button';
import { Grid } from '@core/ui/components/Grid';
import { IconButton } from '@core/ui/components/IconButton';
import { Text } from '@core/ui/components/Text';
import Datepicker from 'react-datepicker';

// icons

import ChevronLeftLineIcon from '@assets/icons/line/chevron-left.svg?component';
import ChevronRightLineIcon from '@assets/icons/line/chevron-right.svg?component';

type Props = {
  className?: string;
  startDate: Date;
  setStartDate: Dispatch<SetStateAction<Date>>;
  endDate: Date;
  setEndDate: Dispatch<SetStateAction<Date>>;
  setButtonText: Dispatch<SetStateAction<string>>;
  startDateText: string;
  setStartDateText: Dispatch<SetStateAction<string>>;
  endDateText: string;
  setEndDateText: Dispatch<SetStateAction<string>>;
  selectedItemIndex: number;
  setSelectedItemIndex: Dispatch<SetStateAction<number>>;
  startDateActive: boolean;
  setStartDateActive: Dispatch<SetStateAction<boolean>>;
  endDateActive: boolean;
  setEndDateActive: Dispatch<SetStateAction<boolean>>;
  close: any;
  limitTimeValue?: number;
  limitTimeType?: string;
  options: SelectDateTimeRangeOption<number>[];
  chartStateClass: ChartStateStorage;
} & React.HTMLAttributes<HTMLElement>;

export const DateRangepicker = ({
  className,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  setButtonText,
  startDateText,
  setStartDateText,
  endDateText,
  setEndDateText,
  selectedItemIndex,
  setSelectedItemIndex,
  startDateActive,
  setStartDateActive,
  endDateActive,
  setEndDateActive,
  close,
  limitTimeValue,
  limitTimeType,
  options,
  onChange,
  onClick,
  chartStateClass,
  ...rest
}: Props) => {
  const CustomInput = React.forwardRef<
    HTMLButtonElement,
    {
      startButtonText: string;
      endButtonText: string;
      onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    }
  >(({ startButtonText, endButtonText, onClick }, ref) => {
    return (
      <>
        <Grid container direction='column' spacing={3}>
          <Grid item direction='column'>
            <Text className={styles['label']}>{t('general.from.label', 'From', 'Refers to the starting point.')}</Text>
            <button className={styles['date-picker-input']} onClick={onClick} ref={ref}>
              {startButtonText}
            </button>
          </Grid>
          <Grid item direction='column'>
            <Text className={styles['label']}>{t('general.to.label', 'To', 'Endpoint of something.')}</Text>
            <button className={styles['date-picker-input']} onClick={onClick} ref={ref}>
              {endButtonText}
            </button>
          </Grid>
          <Grid item justifyContent='end'>
            <Button variant='outlined' onClick={handelApplyButtonClick}>
              {t('general.applyButton.label', 'Apply', 'Confirms the selected choices.')}
            </Button>
          </Grid>
        </Grid>
      </>
    );
  });

  const [startDateValue, setStartDateValue] = useState(moment().utc().format('YYYY-MM-DDT00:00:00').toString());
  const [endDateValue, setEndDateValue] = useState(moment().utc().format('YYYY-MM-DDT00:00:00').toString());
  const [maxDateValue, setMaxDateValue] = useState<undefined | Date>(undefined);

  const handelApplyButtonClick = () => {
    if (startDateActive && endDateActive) {
      setButtonText(`${startDateText} ~ ${endDateText}`);
      setSelectedItemIndex(-1);

      chartStateClass.setStartDate(startDateValue);
      chartStateClass.setEndDate(endDateValue);
    } else {
      setStartDateText(options[selectedItemIndex].startDateText);
      setEndDateText(options[selectedItemIndex].endDateText);
    }

    close();
  };

  useEffect(() => {
    limitTimeType && limitTimeValue
      ? moment(startDate).diff(moment()) >= 0
        ? setMaxDateValue(
            moment()
              .add({ [limitTimeType]: limitTimeValue })
              .toDate(),
          )
        : setMaxDateValue(
            moment(startDate)
              .add({ [limitTimeType]: limitTimeValue })
              .toDate(),
          )
      : setMaxDateValue(undefined);
  }, []);

  useEffect(() => {
    limitTimeType && limitTimeValue
      ? moment(startDate).diff(moment()) >= 0
        ? setMaxDateValue(
            moment()
              .add({ [limitTimeType]: limitTimeValue })
              .toDate(),
          )
        : setMaxDateValue(
            moment(startDate)
              .add({ [limitTimeType]: limitTimeValue })
              .toDate(),
          )
      : setMaxDateValue(undefined);
  }, [startDateValue]);

  const handleDateRangePickerChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (start) {
      setStartDateActive(true);
      setStartDateText(moment(start).format('MM/DD/YYYY'));
      setEndDateText('');
      setStartDateValue(moment(start).set({ hour: 0, minute: 0, second: 0 }).toISOString());
    }

    if (end) {
      setEndDateActive(true);
      setEndDateText(moment(end).format('MM/DD/YYYY'));
      setEndDateValue(moment(end).set({ hour: 0, minute: 0, second: 0 }).add('1', 'day').toISOString());
    }
  };

  return (
    <Grid container direction='column'>
      <Grid item direction='column'>
        <div className={cn(styles['date-picker-container'], className)}>
          <Datepicker
            selected={startDate}
            onChange={handleDateRangePickerChange}
            onCalendarOpen={() => {
              limitTimeType && limitTimeValue
                ? moment(startDate)
                    .add({ [limitTimeType]: limitTimeValue })
                    .toDate()
                : setMaxDateValue(undefined);
            }}
            startDate={startDate}
            endDate={endDate}
            maxDate={maxDateValue}
            selectsRange
            withPortal
            shouldCloseOnSelect
            customInput={<CustomInput startButtonText={startDateText} endButtonText={endDateText} />}
            renderCustomHeader={({
              date,
              monthDate,
              changeYear,
              changeMonth,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <Box className={styles['date-picker-header']}>
                <IconButton
                  aria-label={t('general.backButton.label', 'Back', 'Back button or link.')}
                  className={styles.button}
                  disabled={prevMonthButtonDisabled}
                  onClick={decreaseMonth}
                >
                  <ChevronLeftLineIcon />
                </IconButton>
                <span className='react-datepicker__current-month'>
                  {monthDate.toLocaleString('en-US', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
                <IconButton
                  aria-label={t('general.nextButton.label', 'Next', 'A Next button or link.')}
                  className={styles.button}
                  disabled={nextMonthButtonDisabled}
                  onClick={increaseMonth}
                >
                  <ChevronRightLineIcon />
                </IconButton>
              </Box>
            )}
          />
        </div>
      </Grid>
    </Grid>
  );
};
