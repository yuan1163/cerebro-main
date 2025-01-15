import React, { useEffect, useState } from 'react';

// utils

import { t } from '@core/utils/translate';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { IconButton } from '@core/ui/components/IconButton';
import { Input } from '@core/ui/components/Input';
import { Text } from '@core/ui/components/Text';

// icons

import ChevronLeftLineIcon from '@assets/icons/line/chevron-left.svg?component';
import ChevronRightLineIcon from '@assets/icons/line/chevron-right.svg?component';

type Props = {
  children?: React.ReactNode;
  className?: string;
  currentPage?: number;
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePrevClick?: () => void;
  handleNextClick?: () => void;
  nextElRef?: React.Ref<HTMLButtonElement>;
  prevElRef?: React.Ref<HTMLButtonElement>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages?: number;
} & React.HTMLAttributes<HTMLElement>;

export const Pagination: React.FC<Props> = ({
  className,
  nextElRef,
  prevElRef,
  setCurrentPage: setParentCurrentPage,
  totalPages = 0,
  handleInputChange,
  handlePrevClick,
  handleNextClick,
  currentPage,
}) => {
  const [key, setKey] = useState(0);
  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [currentPage]);

  return (
    <div className={styles['pagination-container']}>
      <div className={styles['pagination-prev-button-container']}>
        <IconButton
          aria-label={t('general.goToPreviousPageButton.label', 'Go to previous page', 'Go to previous page button.')}
          decoratorSize='lg'
          disabled={currentPage === 1}
          onClick={handlePrevClick}
          ref={prevElRef}
          variant='text'
        >
          <ChevronLeftLineIcon />
        </IconButton>
      </div>
      <div className={styles['pagination-input-container']}>
        <Input
          key={key}
          className={styles['no-spinners']}
          disabled={currentPage === totalPages}
          max={totalPages}
          min='1'
          noLabel
          onChange={handleInputChange}
          type='number'
          value={currentPage}
        />
      </div>
      <div className={styles['pagination-text-container']}>
        <Text casing='lowercase' className={styles['pagination-starting-point']} variant='sm'>
          {t('general.from.label', 'From', 'Refers to the starting point.')}
        </Text>
        <Text align='center' className={styles['pagination-count']} variant='sm' weight='semibold'>
          {totalPages}
        </Text>
      </div>
      <div className={styles['pagination-next-button-container']}>
        <IconButton
          aria-label={t('general.goToNextPageButton.label', 'Go to next page', 'Go to next page button.')}
          decoratorSize='lg'
          disabled={currentPage === totalPages}
          onClick={handleNextClick}
          ref={nextElRef}
          variant='text'
        >
          <ChevronRightLineIcon />
        </IconButton>
      </div>
    </div>
  );
};
