import React from 'react';

// utils

import { t } from '@core/utils/translate';

// styles

import { cn } from '@core/utils/classnames';

// components

import { CardContent } from '@core/ui/components/CardContent';
import { Grid } from '@core/ui/components/Grid';
import { IconButton } from '@core/ui/components/IconButton';
import { Text } from '@core/ui/components/Text';

// icons

import ArrowRightLineIcon from '@assets/icons/line/arrow-right.svg?component';

type Props = {
  title: string;
  subtitle: string;
  map: React.ReactNode;
  onArrowClick?: () => void;
};

export const AccordionItem: React.FC<Props> = ({ title, subtitle, map, onArrowClick }) => {
  return (
    <Grid direction='column' className='gap-5 p-5 py-0'>
      <CardContent className='p-0'>
        <Grid fullWidth alignItems='center' justifyContent='between'>
          <Grid direction='column' gap={2}>
            <Text component='h3' variant='sm' weight='semibold'>
              {title}
            </Text>
            <Text color='typography-secondary' variant='sm'>
              {subtitle}
            </Text>
          </Grid>
          <IconButton
            ariaLabel={t(
              'general.updatePage.label',
              'Update page',
              'Prompt that refreshes the content displayed on a webpage.',
            )}
            color='icon-secondary'
            size='lg'
            variant='text'
            onClick={onArrowClick}
          >
            <ArrowRightLineIcon />
          </IconButton>
        </Grid>
      </CardContent>
      <CardContent className='p-0'>
        <div>{map}</div>
      </CardContent>
    </Grid>
  );
};
