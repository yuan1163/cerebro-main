import React from 'react';

// styles

import styles from './styles.module.scss';

// components

import { Text } from '@core/ui/components/Text';

export const WeatherInfo = () => (
  <Text color='typography-primary' component='span' className='mr-1' variant='sm' weight='semibold' whiteSpace='nowrap'>
    72°F,
  </Text>
);
