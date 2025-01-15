import React from 'react';
import { t } from '@core/utils/translate';

// style

import styles from './styles.module.scss';

// components

import { Grid } from '@core/ui/components/Grid';
import { Text } from '@core/ui/components/Text';

type Props = {
  children?: React.ReactNode;
};

const brandName: string = import.meta.env.VITE_BRAND_TITLE || 'Smart Dashboard';

const version = (
  <Text align='center' color='typography-secondary' variant='sm'>
    {brandName} {import.meta.env.PACKAGE_VERSION || '0.1.1'}
  </Text>
);

const copyright =
  import.meta.env.VITE_BRAND === 'cerebro' ? (
    <Text align='center' color='typography-secondary' variant='sm'>
      {t('company.copyright.label', 'Powered by Iveda. Copyright', 'Organization that holds the copyright.')} @{' '}
      {new Date().getFullYear()}{' '}
      {t('company.name.label', 'Iveda Solutions', 'Refers to the official title of an organization.')}
    </Text>
  ) : null;

export const AuthPageLayout: React.FC<Props> = ({ children }) => (
  <Grid component='main' direction='column' className={styles['main']}>
    {children}
    <section className={styles['footer']}>
      {version}
      {copyright}
    </section>
  </Grid>
);
