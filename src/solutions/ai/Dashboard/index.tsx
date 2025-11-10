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
import { LiveView } from './Live View';
import { CameraHealth } from './Camera Health';
import { CameraData } from './Camera Data';

type DashboardProps = {
  group: {
    id: number;
    counting: boolean;
    faceRecognition: boolean;
    intrusion: boolean;
    abnormal: boolean;
    lpr: boolean;
  };
};

export const Dashboard = ({ group }: DashboardProps) => {
  // const dataTabs = [
  //   { label: t('cameraData.counting.label', 'Counting', 'Label for counting tab'), enabled: group.counting },
  //   { label: t('cameraData.face.label', 'Face', 'Label for face tab'), enabled: group.faceRecognition },
  //   { label: t('cameraData.intrusion.label', 'Intrusion', 'Label for intrusion tab'), enabled: group.intrusion },
  //   { label: t('cameraData.abnormal.label', 'Abnormal', 'Label for abnormal tab'), enabled: group.abnormal },
  //   { label: t('cameraData.lpr.label', 'LPR', 'Label for LPR tab'), enabled: group.lpr },
  // ];
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
          <div className='flex flex-col min-h-full gap-4'>
            <CameraLocations />
            <Alerts />
          </div>
        </Unit>
        <Unit height='full'>
          <div className='flex flex-col gap-4'>
            <LiveView />
            <CameraHealth />
          </div>
        </Unit>
        <Unit height='full'>
          <CameraData />
          {/* <CameraData tabs={dataTabs} /> */}
          {/* <LiveView /> */}
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
