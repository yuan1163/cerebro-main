import React from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router';

// utils
import { t } from '@core/utils/translate';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// component
import { Header } from '@core/ui/cerebro/Header';

// icons
import DashboardLineIcon from '@assets/icons/line/dashboard.svg?component';

// pages
import { CarbonEmissionPage } from './Pages/CarbonEmissionPage';
import { ConsumptionPage } from './Pages/ConsumptionPage';
import { DemandPage } from './Pages/DemandPage';

// storage
import { useLocations } from '@core/storages/controllers/locations';
import { useUI } from '@core/storages/ui';
import { getRootLocationInfo } from '../api/data/getRootLocationInfo';
import { getAccessLocationsId } from './data/getLocationBlackList';

type Props = {};

export const Analytics: React.FC = (Props) => {
  const ui = useUI();
  const locations = useLocations();
  const emsLocationName = locations.getElementById(ui.emsCurrentLocation)?.name;

  const isFormation = ui.emsCurrentLocation === ui.currentFormation;

  const activeFormation = locations.getElementById(ui.currentFormation);
  const activeEmsLocation = locations.getElementById(ui.emsCurrentLocation);
  const levelHigherFormation = activeFormation?.type ? activeFormation?.type < 3 : false;

  if (!activeFormation || !activeEmsLocation || levelHigherFormation) {
    ui.setEmsCurrentLocation(locations.getFormations()[0].locationId);
    ui.setCurrentFormation(locations.getFormations()[0].locationId);
    ui.gotoAnalytics();
  }

  const [root, solution, page, currentFormation, ...rest] = window.location.pathname.split('/');
  if (!isFormation && rest.join('/') === 'demand') {
    ui.gotoAnalytics();
  }

  const hasSPBM = getRootLocationInfo(isFormation).deviceSPBMId;

  return (
    <>
      <Header
        icon={<DashboardLineIcon />}
        title={
          emsLocationName
            ? emsLocationName
            : t('solutions.energyOverview.label', 'Energy Overview', 'Energy Overview page title.')
        }
      />
      <Routes>
        {/* TODO Need Zones*/}
        {
          /* Only root location has access to demand page
            FIXME: It can't stop user type 'demand' on browser url, maybe need something like middleware.
          */
          !!(isFormation && hasSPBM) ? (
            <Route path='/' element={<Navigate to='demand' />} />
          ) : (
            // <Route path='/' element={<Navigate to='demand' />} />
            <Route path='/' element={<Navigate to='consumption' />} />
          )
        }
        {/* <Route path='/' element={<Navigate to='demand' />} /> */}
        <Route path='/demand' element={<DemandPage />} />
        <Route path='/consumption' element={<ConsumptionPage />} />
        <Route path='/carbon' element={<CarbonEmissionPage />} />
        <Route path='assets/*' element={<Navigate to='../../assets' />} />
      </Routes>
    </>
  );
};

// const tabsArray = ['Demand', 'Consumption', 'Carbon Emission'];
// const tabPanelsArray = [<DemandPage />];
