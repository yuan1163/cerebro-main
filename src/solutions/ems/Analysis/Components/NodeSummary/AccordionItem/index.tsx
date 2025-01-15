import { Grid } from '@core/ui/components/Grid';
import { Text } from '@core/ui/components/Text';
import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

type Props = {
  title?: string;
  subTitle?: string;
  valueText?: string;
  valueUnit?: string;
  valueColor?: string;
};

const AccordionItem: React.FC<Props> = ({ title, subTitle, valueText, valueUnit, valueColor }) => {
  return (
    <Grid direction='column' className={styles['container']}>
      <Text weight='semibold'>{title ? title : ''}</Text>
      <Text color={'typography-secondary'} variant='sm' weight='semibold'>
        {subTitle ? subTitle : ''}
      </Text>
      <Text color={valueColor ? valueColor : 'typography-primary'} variant='lg' weight='semibold'>
        {valueText ? valueText : ''} {valueUnit ? valueUnit : ''}
      </Text>
    </Grid>
  );
};

export default AccordionItem;
