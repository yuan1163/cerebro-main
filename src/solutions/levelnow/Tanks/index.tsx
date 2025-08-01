import { observer } from 'mobx-react';
import { useState } from 'react';

// icons
import TankLineIcon from '@assets/icons/line/tank-line.svg?component';

// core ui components
import { Header } from '@core/ui/cerebro/Header';

// styles
import { cn } from '@core/utils/classnames';

// utils
import { t } from '@core/utils/translate';

// own solution components

// implementation
export const Tanks = observer(() => {
  return (
    <>
      <Header
        icon={<TankLineIcon />}
        title={t('solutions.tanks.label', 'Tanks', 'Tanks page title.')}
        widgets={false}
      />
    </>
  );
});
