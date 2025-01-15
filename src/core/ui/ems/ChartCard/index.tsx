import React, { useEffect } from 'react';
import { useState } from 'react';

// SCSS
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// COMPONENTS
import { Grid } from '@core/ui/components/Grid';
import { Card } from '@core/ui/components/Card';
import { CardHeader } from '@core/ui/components/CardHeader';
import { CardContent } from '@core/ui/components/CardContent';
import { Text } from '@core/ui/components/Text';

type Props = {
  title: string;
  selectDateTimeElement: React.ReactElement<any, any>;
  chartStartDate?: string;
  chartEndDate?: string;
} & React.HTMLAttributes<HTMLElement>;

export const ChartCard: React.FC<Props> = ({
  title,
  children,
  selectDateTimeElement,
  chartStartDate,
  chartEndDate,
}) => {
  const [chartCardRender, setChartCardRender] = useState<Number | null>(null);
  const [updateChildren, setUpdateChildren] = useState(children);
  const Has_getDataFun: boolean = React.isValidElement(children) ? (children.props.getDataFun ? true : false) : false;

  // To re-render the ChartCard component through the SelectDateTimeElement.
  // Copy the selectDateTimeElement child component using React.cloneElement() and pass the chartCardRender and setChartCardRender props.
  const selectDateTimeElementWithProps = Has_getDataFun
    ? React.cloneElement(selectDateTimeElement as React.ReactElement, {
        setChartCardRender: setChartCardRender,
      })
    : React.cloneElement(selectDateTimeElement as React.ReactElement);

  useEffect(() => {
    Has_getDataFun;
    setUpdateChildren(React.cloneElement(children as React.ReactElement, { chartStartDate, chartEndDate }));
  }, [chartCardRender]);

  return (
    <Card fullWidth className={cn(styles['card'])}>
      <CardHeader>
        <Grid container justifyContent='between' alignItems='start'>
          {/* TITLE TEXT */}
          <Grid item>
            <Text variant='lg' weight='bold' className={cn(styles['card-header-text'])}>
              {title}
            </Text>
          </Grid>

          {/* SELECT */}
          <Grid item>{selectDateTimeElement && <Grid item>{selectDateTimeElementWithProps}</Grid>}</Grid>
        </Grid>
      </CardHeader>
      <CardContent>{Has_getDataFun ? updateChildren : children}</CardContent>
    </Card>
  );
};
