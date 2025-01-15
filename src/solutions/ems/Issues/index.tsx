import React from 'react';

// utils

import { t } from '@core/utils/translate';

// component
import { Header } from '@core/ui/cerebro/Header';
import { UnitContainer } from '@core/ui/components/UnitContainer';

// icons
import CheckDone01LineIcon from '@assets/icons/line/check-done-01.svg?component';

export const Issues = () => {
  return (
    <>
      <Header icon={<CheckDone01LineIcon />} title={t('issue.issuesTitle.label', 'Issues', 'Issues title.')} />
      <UnitContainer />
    </>
  );
};
