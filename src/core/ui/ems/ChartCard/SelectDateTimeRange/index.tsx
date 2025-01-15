import moment, { DurationInputObject } from 'moment';
import React, { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react';

// utils

import { t } from '@core/utils/translate';

// storages
import { ChartStateStorage } from '@solutions/ems/storages/chartState';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Button } from '@core/ui/components/Button';
import { Divider } from '@core/ui/components/Divider';
import { Grid } from '@core/ui/components/Grid';
import { List } from '@core/ui/components/List';
import { MenuItem } from '@core/ui/components/MenuItem';
import { MenuItemButton } from '@core/ui/components/MenuItemButton';
import { MenuItemText } from '@core/ui/components/MenuItemText';
import { DatePicker } from '@core/ui/ems/ChartCard/DatePicker';
import { DateRangepicker } from '@core/ui/ems/ChartCard/DateRangepicker';
import { Popover, Transition } from '@headlessui/react';

// icons
import CheckLineIcon from '@assets/icons/line/check.svg?component';
import ChevronSelectorVerticalLineIcon from '@assets/icons/line/chevron-selector-vertical.svg?component';

export type SelectDateTimeRangeOption<ValueType> = {
  label: string;
  value: ValueType;
  startDateText: string;
  endDateText: string;
  type: 'last' | 'current';
  timeValue?: number;
  timeType?: string;
};

type SelectProps<ValueType> = {
  id: string;
  className?: string;
  limitTimeValue?: number;
  limitTimeType?: string;
  options?: SelectDateTimeRangeOption<ValueType>[];
  IsRangeDate?: boolean;
  setChartCardRender?: Dispatch<SetStateAction<Number | null>>;
  chartStateClass: ChartStateStorage;
};

export const SelectDateTimeRange: React.FC<SelectProps<any>> = ({
  id,
  className,
  limitTimeValue,
  limitTimeType,
  options = [],
  IsRangeDate = true,
  setChartCardRender,
  chartStateClass,
}) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [buttonText, setButtonText] = useState<string>(options[0].label);
  const [startDateText, setStartDateText] = useState<string>(options[0].startDateText);
  const [endDateText, setEndDateText] = useState<string>(options[0].endDateText);

  const [startDateActive, setStartDateActive] = useState<boolean>(false);
  const [endDateActive, setEndDateActive] = useState<boolean>(false);

  type handleListItemClickProps = {
    text: string;
    value: number;
    index: number;
    startDateText: string;
    endDateText: string;
    type: 'last' | 'current';
    timeValue?: number;
    timeType?: any;
  };

  const handleListItemClick = ({
    text,
    value,
    index,
    startDateText = t('date.now.label', 'Now', 'The current moment or present time.'),
    endDateText = t('date.now.label', 'Now', 'The current moment or present time.'),
    type,
    timeType = 'second',
    timeValue = 1,
  }: handleListItemClickProps) => {
    const duration: any = { [timeType]: timeValue };
    let START_DATETIME: string | undefined, END_DATETIME: string | undefined;
    let TIME_TYPE: 'day' | 'month' | 'year' = 'day';

    switch (type) {
      case 'last':
        value = moment().subtract(duration).valueOf();

        setStartDate(moment(value).toDate());
        setEndDate(new Date());
        // Because value is utc time value
        TIME_TYPE = timeType === 'hour' ? 'day' : timeType;
        START_DATETIME = moment.utc(value).format('YYYY-MM-DDTHH:mm:00').toString();
        END_DATETIME = moment.utc().format('YYYY-MM-DDTHH:mm:00').toString();

        break;
      case 'current':
        setStartDate(moment(value).startOf(timeType).toDate());
        setEndDate(moment(value).endOf(timeType).toDate());
        // Because value is utc time value
        TIME_TYPE = timeType;
        START_DATETIME = moment.utc(value).startOf(timeType).format('YYYY-MM-DDT00:00:00').toString();
        END_DATETIME = moment.utc(value).endOf(timeType).format('YYYY-MM-DDT00:00:00').toString();

        break;
      default:
        break;
    }

    setSelectedItemIndex(index);

    setButtonText(text);
    setStartDateText(startDateText);
    setEndDateText(endDateText);

    setStartDateActive(false);
    setEndDateActive(false);

    chartStateClass.setDataType(TIME_TYPE);
    chartStateClass.setSelectedType(type);
    chartStateClass.setStartDate(START_DATETIME);
    chartStateClass.setEndDate(END_DATETIME);
  };

  useEffect(() => {
    setChartCardRender && setChartCardRender(moment().valueOf());
  }, [buttonText]);

  return (
    <div className={cn(styles['container'], className)}>
      <Popover className={cn(styles['popover'], className)}>
        {({ open, close }) => (
          <>
            <Popover.Button className={cn(styles['button'])}>
              <Button
                component='div'
                endIcon={<ChevronSelectorVerticalLineIcon />}
                iconColor='icon-secondary'
                variant='outlined'
              >
                {buttonText}
              </Button>
            </Popover.Button>
            <Transition
              as={Fragment}
              leave='transition ease-out-standard duration-shorter'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Popover.Panel className={styles['popover-panel']}>
                <Grid container justifyContent='between' spacing={3}>
                  <Grid item>
                    {IsRangeDate ? (
                      <DateRangepicker
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                        setButtonText={setButtonText}
                        startDateText={startDateText}
                        setStartDateText={setStartDateText}
                        endDateText={endDateText}
                        setEndDateText={setEndDateText}
                        selectedItemIndex={selectedItemIndex}
                        setSelectedItemIndex={setSelectedItemIndex}
                        limitTimeValue={limitTimeValue}
                        limitTimeType={limitTimeType}
                        startDateActive={startDateActive}
                        setStartDateActive={setStartDateActive}
                        endDateActive={endDateActive}
                        setEndDateActive={setEndDateActive}
                        options={options}
                        chartStateClass={chartStateClass}
                        close={close}
                      />
                    ) : (
                      <DatePicker
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                        setButtonText={setButtonText}
                        startDateText={startDateText}
                        setStartDateText={setStartDateText}
                        endDateText={endDateText}
                        setEndDateText={setEndDateText}
                        selectedItemIndex={selectedItemIndex}
                        setSelectedItemIndex={setSelectedItemIndex}
                        limitTimeValue={limitTimeValue}
                        limitTimeType={limitTimeType}
                        startDateActive={startDateActive}
                        setStartDateActive={setStartDateActive}
                        endDateActive={endDateActive}
                        setEndDateActive={setEndDateActive}
                        options={options}
                        chartStateClass={chartStateClass}
                        close={close}
                      />
                    )}
                  </Grid>
                  <Grid item>
                    <Divider orientation={'vertical'} />
                  </Grid>
                  <Grid item>
                    <Grid container direction='column'>
                      <Grid item>
                        <List dense>
                          {options?.map((item, i) => (
                            <MenuItem key={`lastTimeItem-${i}`}>
                              <MenuItemButton
                                active={selectedItemIndex === i ? true : false}
                                endIcon={selectedItemIndex === i ? <CheckLineIcon /> : null}
                                onClick={() => {
                                  close();
                                  handleListItemClick({
                                    text: item.label,
                                    value: item.value,
                                    index: i,
                                    startDateText: item.startDateText,
                                    endDateText: item.endDateText,
                                    type: item.type,
                                    timeValue: item.timeValue,
                                    timeType: item.timeType,
                                  });
                                }}
                              >
                                <MenuItemText title={item.label} />
                              </MenuItemButton>
                            </MenuItem>
                          ))}
                        </List>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};
