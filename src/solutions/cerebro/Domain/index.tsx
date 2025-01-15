import moment from 'moment';
import React from 'react';

// utils

import { t } from '@core/utils/translate';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';
// components

import { Header } from '@core/ui/cerebro/Header';
import { Grid } from '@core/ui/components/Grid';
import { Unit } from '@core/ui/components/Unit';
import { UnitContainer } from '@core/ui/components/UnitContainer';
import { DomainMap } from './DomainMap';
import { DomainObjectsList } from './DomainObjectsList';
import { DomainStatus } from './DomainStatus';

// icons

import Home02LineIcon from '@assets/icons/line/home-02.svg?component';
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { Text } from '@core/ui/components/Text';

// implementation

export const Domain = () => {
  const [expendMap, setExpandMap] = React.useState(false);

  const handleExpand = () => {
    setExpandMap(!expendMap);
  };

  return (
    <>
      <Header
        icon={<Home02LineIcon />}
        title={t(
          'solutions.domainOverview.label',
          'Domain Overview',
          "An overview of the solution's core purpose and components.",
        )}
        widgets={false}
      />
      <UnitContainer>
        <Unit variant='sidebar'>
          <DomainObjectsList />
        </Unit>
        <Unit height='full'>
          <Grid className={styles['container']} display='grid' fullHeight>
            <DomainMap expendIconButton={true} expended={expendMap} onClick={handleExpand} />
            <Card className={cn(styles['card'], expendMap ? 'hidden' : 'grid')} fullWidth fullHeight elevation='xs'>
              <CardHeader>
                <Text component='h3' variant='lg' weight='semibold'>
                  {t(
                    'events.criticalEvents.label',
                    'Critical events',
                    'Significant incidents that demand urgent attention.',
                  )}
                </Text>
              </CardHeader>
              <CardContent disablePaddingTop>
                <DomainStatus />
              </CardContent>
            </Card>
          </Grid>
        </Unit>
      </UnitContainer>
    </>
  );
};
