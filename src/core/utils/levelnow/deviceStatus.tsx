import React from 'react';

// Tank icons
import TankHighIcon from '@assets/icons/LevelNOW/tank/tank-high.svg?component';
import TankLowIcon from '@assets/icons/LevelNOW/tank/tank-low.svg?component';
import TankMediumIcon from '@assets/icons/LevelNOW/tank/tank-medium.svg?component';

// Battery icons
import BatteryWarningIcon from '@assets/icons/LevelNOW/battery/battery-level-warning.svg?component';
import BatteryLevelOneIcon from '@assets/icons/LevelNOW/battery/battery-level-1.svg?component';
import BatteryLevelTwoIcon from '@assets/icons/LevelNOW/battery/battery-level-2.svg?component';
import BatteryLevelThreeIcon from '@assets/icons/LevelNOW/battery/battery-level-3.svg?component';
import BatteryLevelFourIcon from '@assets/icons/LevelNOW/battery/battery-level-4.svg?component';

// Device level
export const getDeviceLevelIcon = (deviceLevel: number): React.ReactNode => {
  const size = 'w-[52px] h-[52px]';
  switch (deviceLevel) {
    case 0:
      return <TankLowIcon className={size} />;
    case 1:
      return <TankMediumIcon className={size} />;
    case 3:
      return <TankHighIcon className={size} />;
    default:
      return <TankHighIcon className={size} />; // Default icon if no match found
  }
};

// Battery level
export const getBatteryLevelIcon = (batteryLevel: number): React.ReactNode => {
  let children: React.ReactNode;
  if (batteryLevel === 0 || (batteryLevel > 0 && batteryLevel < 30)) {
    children = <BatteryWarningIcon />;
  } else if (batteryLevel >= 30 && batteryLevel <= 50) {
    children = <BatteryLevelOneIcon />;
  } else if (batteryLevel >= 51 && batteryLevel <= 70) {
    children = <BatteryLevelTwoIcon />;
  } else if (batteryLevel >= 71 && batteryLevel <= 90) {
    children = <BatteryLevelThreeIcon />;
  } else if (batteryLevel >= 91 && batteryLevel <= 100) {
    children = <BatteryLevelFourIcon />;
  } else {
    children = <BatteryWarningIcon />;
  }

  return (
    <div className='flex items-center gap-1'>
      {children}
      <span className='font-medium text-16 tracking-32 text-neutral-900'>{batteryLevel}%</span>
    </div>
  );
};

// Device connection
export const getDeviceConnection = (connection: number): React.ReactNode => {
  switch (connection) {
    case 0:
      return <span className='font-medium text-16 tracking-32 text-error-500'>Off-line</span>;
    case 1:
      return <span className='font-medium text-16 tracking-32 text-neutral-900'>On-line</span>;
    default:
      return null;
  }
};
