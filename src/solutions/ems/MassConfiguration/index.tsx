// utils
import { t } from '@core/utils/translate';

// components
import { Header } from '@core/ui/cerebro/Header';

// icons
import SettingsIcon from '@assets/icons/line/settings-01.svg?component';

// data
import { InformationData } from './data/entryPageData';
import { Route, Routes } from 'react-router';
import { Home } from './Pages/Home';

export const MassConfiguration = () => {
  return (
    <>
      <Header
        icon={<SettingsIcon />}
        title={t('solutions.massConfiguration.label', 'Mass Configuration', 'Mass Configuration title.')}
      />

      <Routes>
        <Route key={'mc:home'} path={'/'} element={<Home />}></Route>

        {InformationData()
          .filter((item) => !item.disabled)
          .map((item) => {
            return <Route key={`info:${item.title}`} path={`/${item.path}/*`} element={item.component}></Route>;
          })}
      </Routes>
    </>
  );
};
