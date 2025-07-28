import { observer } from 'mobx-react';
import moment from 'moment';
import React from 'react';

// icons
import Home02LineIcon from '@assets/icons/line/home-02.svg?component';
// core ui components
import { Header } from '@core/ui/cerebro/Header';
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { Grid } from '@core/ui/components/Grid';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { Text } from '@core/ui/components/Text';
import { Unit } from '@core/ui/components/Unit';
import { UnitContainer } from '@core/ui/components/UnitContainer';
// styles
import { cn } from '@core/utils/classnames';
// utils
import { t } from '@core/utils/translate';
import { DomainStatus } from '@solutions/cerebro/Domain/DomainStatus';
import { DomainObjectsList } from '@solutions/levelnow/Domain/DomainObjectsList';

// own solution components
import { DomainMap } from './DomainMap';
import Overview from './Overview';
import styles from './styles.module.scss';

// implementation
export const Domain = observer(() => {
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
            <Grid className={cn(expendMap ? 'hidden' : '')} fullWidth fullHeight>
              <Card fullWidth fullHeight elevation='xs'>
                <CardHeader>
                  <Text component='h3' variant='lg' weight='semibold'>
                    {t(
                      'solutions.domainOverview.overview',
                      'Overview',
                      "A summary of the domain's key features and functionalities.",
                    )}
                  </Text>
                </CardHeader>
                <CardContent disablePaddingTop>
                  <Overview />
                </CardContent>
              </Card>
              <Card fullWidth fullHeight elevation='xs'>
                <CardHeader>
                  <Text component='h3' variant='lg' weight='semibold'>
                    {t(
                      'solutions.domainOverview.responsibleTanks',
                      'Responsible Tanks',
                      "A list of tanks responsible for the domain's operations.",
                    )}
                  </Text>
                </CardHeader>
                <CardContent disablePaddingTop>
                  <Overview />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Unit>
      </UnitContainer>
    </>
  );
});
