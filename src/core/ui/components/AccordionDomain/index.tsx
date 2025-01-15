import React from 'react';

// utils

import { t } from '@core/utils/translate';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { CardContent } from '@core/ui/components/CardContent';
import { Grid } from '@core/ui/components/Grid';
import { IconButton } from '@core/ui/components/IconButton';
import { Text } from '@core/ui/components/Text';

// icons

import ArrowRightLineIcon from '@assets/icons/line/arrow-right.svg?component';

type Props = {
  className?: string;
  features?: React.ReactNode;
  map?: React.ReactNode;
  onArrowClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  subtitle?: string;
  title?: string;
};

export const AccordionDomain: React.FC<Props> = ({ className, features, map, onArrowClick, subtitle, title }) => {
  return (
    <Grid direction='column'>
      <CardContent className={styles['card-content-text']} borderTop>
        <Grid fullWidth alignItems='baseline' justifyContent='between'>
          <Grid direction='column'>
            <Text component='h3' variant='sm' weight='semibold'>
              {title}
            </Text>
            <Text className={styles['caption']} color='typography-secondary' variant='sm'>
              {subtitle}
            </Text>
          </Grid>
          <IconButton
            ariaLabel={t(
              'general.updatePage.label',
              'Update page',
              'Prompt that refreshes the content displayed on a webpage.',
            )}
            className={styles['icon']}
            color='icon-secondary'
            onClick={onArrowClick}
            size='lg'
            variant='text'
          >
            <ArrowRightLineIcon />
          </IconButton>
        </Grid>
      </CardContent>
      <CardContent disablePaddingY>
        <div className={styles['accordion-map']}>{map}</div>
      </CardContent>
      <CardContent disablePaddingTop>
        <Grid className={styles['features-container']} wrap='wrap'>
          {features}
        </Grid>
      </CardContent>
    </Grid>
  );
};
