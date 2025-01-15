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
import { Card } from '@core/ui/components/Card';
import { CardHeader } from '@core/ui/components/CardHeader';
import { Box } from '@core/ui/components/Box';
import { IconButton } from '@core/ui/components/IconButton';
import { Tooltip } from '@core/ui/components/Tooltip';
import { CardContent } from '@core/ui/components/CardContent';

// cerebro components
import { DomainMap } from '@solutions/cerebro/Domain/DomainMap';
import { DomainObjectsList } from '@solutions/cerebro/Domain/DomainObjectsList';
import { Text } from '@core/ui/components/Text';

// icons

import Home02LineIcon from '@assets/icons/line/home-02.svg?component';
import InfoCircleLineIcon from '@assets/icons/line/info-circle.svg?component';
import { DomainStatus } from './DomainStatus';

// implementation

export const Domain = () => {
  const [expendMap, setExpandMap] = React.useState(false);

  const handleExpand = () => {
    setExpandMap(!expendMap);
  };

  const buttonRef = React.useRef(null);
  const [visible, setVisibility] = React.useState(false);

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
            <DomainMap expendIconButton={false} expended={expendMap} onClick={handleExpand} />
          </Grid>
          <Card>
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
        </Unit>
      </UnitContainer>
    </>
  );
};
