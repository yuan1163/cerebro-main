import React, { Dispatch, SetStateAction } from 'react';

// icons
import ArrowDownLineIcon from '@assets/icons/line/arrow-down.svg?component';
import MarkerPin01LineIcon from '@assets/icons/line/marker-pin-01.svg?component';
import PlusLineIcon from '@assets/icons/line/plus.svg?component';
import Server01LineIcon from '@assets/icons/line/server-01.svg?component';
import Settings01LineIcon from '@assets/icons/line/settings-01.svg?component';

type InformationProps = {
  icon: React.ReactNode;
  title: string;
  subTitle: string | null;
  path: string;
  component: React.ReactNode;
  disabled: boolean;
}[];

export type alertMsg = {
  msg?: string;
  show: boolean;
  isLoading?: boolean;
};
