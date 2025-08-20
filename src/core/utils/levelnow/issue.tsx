import { EventsIssue } from '@core/api/types';
import LevelLowIcon from '@assets/icons/LevelNOW/issue/level-low.svg?component';
import OilFillingIcon from '@assets/icons/LevelNOW/issue/oil-filling.svg?component';
import BatteryLowIcon from '@assets/icons/LevelNOW/issue/battery-low.svg?component';
import OfflineIcon from '@assets/icons/LevelNOW/issue/offline.svg?component';
import FaultIcon from '@assets/icons/LevelNOW/issue/fault.svg?component';

export const getIssueIcon = (issue: EventsIssue) => {
  switch (issue) {
    case 'Level Low':
      return <LevelLowIcon />;
    case 'Oil Filling':
      return <OilFillingIcon />;
    case 'Battery Low':
      return <BatteryLowIcon />;
    case 'Offline':
      return <OfflineIcon />;
    case 'Fault':
      return <FaultIcon />;
    default:
      return null;
  }
};
