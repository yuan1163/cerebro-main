import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Bull } from '@core/ui/components/Bull';
import { Grid } from '@core/ui/components/Grid';

type Props = {
  className?: string;
  kickers?: Array<React.ReactNode>;
} & React.HTMLAttributes<HTMLElement>;

export const KickerContainer: React.FC<Props> = ({ children, className, kickers = [], ...props }) => {
  return (
    <Grid alignItems='center' container className={styles['kicker-container']}>
      {kickers.map((item, i, row) => {
        let kickerDivider;
        if (i + 1 === row.length) {
          kickerDivider = null;
        } else {
          kickerDivider = (
            <Grid item>
              <Bull />
            </Grid>
          );
        }
        return (
          <React.Fragment key={i}>
            <Grid item>{item}</Grid>
            {kickerDivider}
          </React.Fragment>
        );
      })}
    </Grid>
  );
};
