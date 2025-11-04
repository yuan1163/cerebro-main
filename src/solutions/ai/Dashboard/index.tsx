import React from 'react';

// utils

import { t } from '@core/utils/translate';

// storages

import { useUI } from '@core/storages/ui';

// styles
import { cn } from '@core/utils/classnames';
// import styles from './styles.module.scss';

// data
import { useLocations } from '@core/storages/controllers/locations';
import { useAlerts } from '@core/storages/controllers/alerts';

// components

import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { DataSelect } from '@core/ui/components/DataSelect';
// import { EventsList } from './EventsList';
// import { FormationMap } from './FormationMap';
import { Grid } from '@core/ui/components/Grid';
import { Header } from '@core/ui/cerebro/Header';
import { Search } from '@core/ui/components/Search';
import { Stack } from '@core/ui/components/Stack';
import { Text } from '@core/ui/components/Text';
import { Unit } from '@core/ui/components/Unit';
import { UnitContainer } from '@core/ui/components/UnitContainer';
import { Slider } from '@core/ui/components/Slider';
import { SwiperSlide } from 'swiper/react';
// import { AlertCard } from './AlertCard';

// icons
import DashboardLineIcon from '@assets/icons/IvedaAI/sidebar/dashboard-line.svg?component';

import ModuleIcon from '@assets/icons/line/dashboard.svg?component';
import { useAuth } from '@core/storages/auth';
import { useParams } from '@nodemodules/react-router/dist';
import { log } from 'console';
import { CameraLocations } from './CameraLocations';
import { Alerts } from './Alerts';
import { Scrollbar } from '@core/ui/components/Scrollbar';

type DashboardProps = {
  groupId: number;
  index: number;
};

export const Dashboard = ({ groupId, index }: DashboardProps) => {
  return (
    <>
      <Header
        icon={<DashboardLineIcon />}
        title={t(
          'solutions.dashboard.label',
          'Dashboard',
          "An overview of the solution's core purpose and components.",
        )}
        widgets={false}
        className='fixed z-10 bg-[#f9fafb]'
      />
      <UnitContainer className='mt-[84px]'>
        <Unit variant='sidebar' height='full'>
          <div className='flex flex-col h-full gap-4'>
            <CameraLocations />
            <Alerts />
          </div>
        </Unit>
        <div className='h-[1000px] bg-main w-12'></div>
        <Unit height='full'>
          {/* <Grid className={styles['container']} display='grid' fullHeight>
            <DomainMap expended={expendMap} onClick={handleExpand} />
            <Grid className={cn(expendMap ? 'hidden' : '')} fullWidth fullHeight gap={5}>
              <Overview />
              <ResponsibleTanks />
            </Grid>
          </Grid> */}
        </Unit>
      </UnitContainer>
    </>
  );
};
