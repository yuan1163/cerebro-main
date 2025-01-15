import moment from 'moment';
import React, { ReactEventHandler, useState } from 'react';

// utils

import { t } from '@core/utils/translate';

// styles

import stylesInputBase from '@core/ui/components/InputBase/styles.module.scss';
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Grid } from '@core/ui/components/Grid';
import { IconButton } from '@core/ui/components/IconButton';
import { Input } from '@core/ui/components/Input';
import { InputLabel } from '@core/ui/components/InputLabel';
import { Text } from '@core/ui/components/Text';
import DatePicker from 'react-datepicker';

// icons

import ChevronLeftLineIcon from '@assets/icons/line/chevron-left.svg?component';
import ChevronRightLineIcon from '@assets/icons/line/chevron-right.svg?component';

type Props = {
  className?: string;
  date?: Date | null;
  helperText?: string;
  inputId: string;
  label?: string;
  isShowTime?: boolean;
  inputFormat?: string;
  onChange: () => void;
  placeholderText?: string;
  severity?: string;
} & React.HTMLAttributes<HTMLElement>;

export const Datepicker = ({
  className,
  date = null,
  helperText,
  inputId,
  label,
  inputFormat = 'DD/MM/YYYY',
  isShowTime = false,
  onChange,
  onClick,
  placeholderText = t('data.selectDate.label', 'Select Date', 'Choose a specific day using the date picker.'),
  severity,
  ...rest
}: Props) => {
  const CustomInput = React.forwardRef<
    HTMLInputElement,
    {
      date: Date | null;
      placeholder: string;
      onFocus?: () => void;
    }
  >(({ date, placeholder, onFocus }, ref) => {
    return (
      <>
        <Input
          onFocus={onFocus}
          label={label}
          defaultValue={date ? moment(date).format(inputFormat) : ''}
          placeholder={placeholder}
          // TODO
          severity={severity as any}
          helperText={helperText}
        />
      </>
    );
  });

  return (
    <div className={cn(stylesInputBase['input-base'], styles['date-picker-container'], className)}>
      {/* {label ? <InputLabel inputId={inputId} label={label} /> : null} */}
      <DatePicker
        className={styles['date-picker-input']}
        dateFormat='dd/MM/yyyy HH:mm:00'
        onChange={onChange}
        placeholderText={placeholderText}
        selected={date}
        startDate={date}
        // endDate={rangeDateValue[1]}
        shouldCloseOnSelect
        // showTimeInput
        showTimeSelect={isShowTime}
        // selectsRange
        withPortal
        customInput={<CustomInput date={date} placeholder={placeholderText} />}
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
          <div className={styles['date-picker-header']}>
            <IconButton
              ariaLabel={t('general.backButton.label', 'Next', 'Back button or link.')}
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
              aria-label={t('general.nextButton.label', 'Next', 'Next button or link.')}
              className={styles.button}
              disabled={nextMonthButtonDisabled}
              onClick={increaseMonth}
            >
              <ChevronRightLineIcon />
            </IconButton>
          </div>
        )}
      />
    </div>
  );
};
