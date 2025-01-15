import React, { useState } from 'react';
import { t } from '@core/utils/translate';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';
import stylesInputBase from '@core/ui/components/InputBase/styles.module.scss';

// components

import { IconButton } from '@core/ui/components/IconButton';
import DatePicker from 'react-datepicker';

// icons

import ChevronLeftLineIcon from '@assets/icons/line/chevron-left.svg?component';
import ChevronRightLineIcon from '@assets/icons/line/chevron-right.svg?component';

type Props = {
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

const CustomInput = ({
  value,
  onClick,
}: {
  value: string;
  date: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => {
  return (
    <button className={styles['date-picker-input']} onClick={onClick}>
      {value}
    </button>
  );
};

export const Datepicker = ({ className, onChange, onClick, ...rest }: Props) => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className={cn(stylesInputBase['input-base'], styles['date-picker-container'], className)}>
      <DatePicker
        className={styles['date-picker-input']}
        customInput={React.createElement(CustomInput)}
        dateFormat='MMMM yyyy'
        onChange={(date: Date) => setStartDate(date)}
        selected={startDate}
        shouldCloseOnSelect={false}
        showPopperArrow={false}
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
          </div>
        )}
      />
    </div>
  );
};
