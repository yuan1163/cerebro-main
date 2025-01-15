import React, { Dispatch, SetStateAction } from 'react';

// styles
import styles from './styles.module.scss';

// components
import { Icon } from '@core/ui/components/Icon';
import { Grid } from '@core/ui/components/Grid';

// icons
import ArrowLeftLineIcon from '@assets/icons/line/arrow-left.svg?component';
import { useNavigate } from 'react-router';
import { Search } from '@core/ui/components/Search';
import { SegmentedControl } from '@core/ui/components/SegmentedControl';
import { Stack } from '@core/ui/components/Stack';

type RadioOption = {
  icon?: React.ReactNode;
  isDisabled?: boolean;
  label: string;
  value?: string;
};

export type SegmentedControlObjectProps = {
  buttons: Array<RadioOption>;
  onChange: (value: string) => void;
  value: string;
};

type Props = {
  placeholder?: string;
  SegmentedControlObject?: SegmentedControlObjectProps;
  previousPageURL?: string;
  setFilterText?: Dispatch<SetStateAction<string | undefined>>;
};

export const MCHeader: React.FC<Props> = ({ placeholder, SegmentedControlObject, previousPageURL, setFilterText }) => {
  const navigate = useNavigate();

  return (
    <Stack direction={'row'} className={styles['stack']}>
      {previousPageURL && (
        <Icon
          color='icon-primary'
          onClick={() => navigate(previousPageURL)}
          size='xl'
          variant='plain'
          className={styles['back-icon']}
        >
          <ArrowLeftLineIcon />
        </Icon>
      )}

      {SegmentedControlObject && (
        <SegmentedControl
          buttons={SegmentedControlObject.buttons}
          onChange={SegmentedControlObject.onChange}
          value={SegmentedControlObject.value}
        ></SegmentedControl>
      )}

      {placeholder && setFilterText && (
        <Search
          id='search-input'
          placeholder={placeholder}
          onChange={(text) => setFilterText(text)}
          onClear={() => setFilterText('')}
        ></Search>
      )}
    </Stack>
  );
};
