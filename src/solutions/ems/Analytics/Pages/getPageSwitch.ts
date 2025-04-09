import { useNavigate } from 'react-router';

import { t } from '@core/utils/translate';
import { getRootLocationInfo } from '@solutions/ems/api/data/getRootLocationInfo';

export type RadioOption = {
  icon?: React.ReactNode;
  isDisabled?: boolean;
  label: string;
  value?: string;
};
export type pageSwitchOut = {
  toggleButtons: RadioOption[];
  toggleLists: () => void;
};

export const getPageSwitch = (rootLocation: boolean) => {
  const navigate = useNavigate();

  const hasSPBM = getRootLocationInfo(rootLocation);

  return {
    toggleButtons: [
      {
        label: t('ems.demand.label', 'Demand', 'The amount of power required or requested at a given time.'),
        value: 'demand',
        isDisabled: !(Boolean(hasSPBM.deviceSPBMId) && Boolean(rootLocation)),
        // isDisabled: false,
      },
      {
        label: t('ems.consumption.label', 'Consumption', 'The amount of energy or resources used over a given period.'),
        value: 'consumption',
        isDisabled: false,
      },
      {
        label: t(
          'ems.carbonEmission.label',
          'Carbon Emission',
          'The release of carbon compounds, especially carbon dioxide, into the atmosphere, contributing to climate change.',
        ),
        value: 'carbon',
        isDisabled: false,
      },
    ],
    toggleLists: (button?: string) => {
      switch (button) {
        case 'demand':
          navigate(`../demand`);
          break;
        case 'consumption':
          navigate(`../consumption`);
          break;
        case 'carbon':
          navigate(`../carbon`);
          break;
      }
    },
  };
};
