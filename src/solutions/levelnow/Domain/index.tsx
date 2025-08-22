import { observer } from 'mobx-react';
import { useState } from 'react';

// icons
import DomainLineIcon from '@assets/icons/LevelNOW/sidebar/domain-line.svg?component';

// core ui components
import { Header } from '@core/ui/cerebro/Header';
import { Grid } from '@core/ui/components/Grid';
import { Unit } from '@core/ui/components/Unit';
import { UnitContainer } from '@core/ui/components/UnitContainer';

// styles
import { cn } from '@core/utils/classnames';

// utils
import { t } from '@core/utils/translate';
import { DomainLocationList } from '@solutions/levelnow/Domain/DomainLocationList';

// own solution components
import { DomainMap } from './DomainMap';
import Overview from './Overview';
import styles from './styles.module.scss';
import ResponsibleTanks from './ResponsibleTanks';

// implementation
export const Domain = observer(() => {
  const [expendMap, setExpandMap] = useState(false);

  const handleExpand = () => {
    setExpandMap(!expendMap);
  };

  return (
    <>
      <Header
        icon={<DomainLineIcon />}
        title={t(
          'solutions.domainOverview.label',
          'Domain Overview',
          "An overview of the solution's core purpose and components.",
        )}
        widgets={false}
      />
      <UnitContainer>
        <Unit variant='sidebar'>
          <DomainLocationList />
        </Unit>
        <Unit height='full'>
          <Grid className={styles['container']} display='grid' fullHeight>
            <DomainMap />
            <Grid className={cn(expendMap ? 'hidden' : '')} fullWidth fullHeight gap={5}>
              <Overview />
              <ResponsibleTanks />
            </Grid>
          </Grid>
        </Unit>
      </UnitContainer>
    </>
  );
});
