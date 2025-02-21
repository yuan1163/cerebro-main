import { useUI } from '@core/storages/ui';
import { Select, SelectOption } from '@core/ui/components/Select';
import { useNavigate } from 'react-router';

import { t } from '@core/utils/translate';

export const getPageSwitch = () => {
  const navigate = useNavigate();

  return {
    toggleButtons: [
      { label: t('ems.summarySwitch.label', '', ''), value: 'summary' },
      { label: t('ems.managementSwitch.label', '', ''), value: 'management' },
    ],
    toggleLists: (button?: string) => {
      switch (button) {
        case 'summary':
          navigate(`../summary`);
          break;
        case 'management':
          navigate(`../management/product`);
          break;
      }
    },
  };
};
