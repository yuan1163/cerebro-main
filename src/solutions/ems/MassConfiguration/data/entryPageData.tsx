import React, { Dispatch, SetStateAction } from 'react';

// utils

import { t } from '@core/utils/translate';

import { apiUploadMCFile } from '@core/api/entities/files';
import { useMutation } from '@tanstack/react-query';
import { DeviceIsDisabled, LocationIsDisabled, SystemIsDisabled } from '../api/data/getIsDisabledItem';
import { apiGetMCFileDownload } from '../api/entities/downloadFile';
import { Device } from '../Pages/Device';
import { Location } from '../Pages/Location';
import { System } from '../Pages/System';

// icons

import ArrowDownLineIcon from '@assets/icons/line/arrow-down.svg?component';
import MarkerPin01LineIcon from '@assets/icons/line/marker-pin-01.svg?component';
import PlusLineIcon from '@assets/icons/line/plus.svg?component';
import Server01LineIcon from '@assets/icons/line/server-01.svg?component';
import Settings01LineIcon from '@assets/icons/line/settings-01.svg?component';

type ConfigurationFileProps = {
  icon: React.ReactNode;
  title: string;
  disabled: boolean;
}[];

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
export const UploadFile = async (
  topLocationId: number,
  file: File,
  setAlertMsg: Dispatch<SetStateAction<alertMsg>>,
) => {
  setAlertMsg({
    msg: `${t('general.upload.label', 'Upload', 'Process of transferring data to a remote server or platform.')}...`,
    show: true,
    isLoading: true,
  });
  const mtUpload = await apiUploadMCFile({ file, topLocationId });
  // const mtUpload = await apiUploadMCFile({ file, topLocationId: 11 });
  let alertMsg: alertMsg = {
    msg: '',
    show: false,
    isLoading: false,
  };

  alertMsg =
    mtUpload.resultCode !== 0
      ? { msg: mtUpload.resultCodeMessage, show: true }
      : {
          msg: t(
            'general.uploadSuccessfully.label',
            'Upload successfully!',
            'Indicates that a file has been transferred to a server without any issues.',
          ),
          show: true,
          isLoading: false,
        };

  setAlertMsg(alertMsg);
};

export const DownloadMCFile = async (
  topLocationId: number,
  setAlertMsg: Dispatch<SetStateAction<alertMsg>>,
): Promise<void> => {
  setAlertMsg({
    msg: `${t('general.download.label', 'Download', 'Process of transferring data to a local device.')}...`,
    show: true,
    isLoading: true,
  });

  await apiGetMCFileDownload({
    locationId: topLocationId,
  });

  setAlertMsg({
    msg: '',
    show: false,
    isLoading: false,
  });
};

export const ConfigurationFileData = (): ConfigurationFileProps => {
  return [
    {
      icon: <PlusLineIcon />,
      title: t('general.upload.label', 'Upload', 'Process of transferring data to a remote server or platform.'),
      disabled: false, //! 為方便測試 先關掉
      // disabled: true,
    },
    {
      icon: <ArrowDownLineIcon />,
      title: t('general.download.label', 'Download', 'Process of transferring data to a local device.'),
      disabled: false,
    },
    // {
    //   icon: <ClockLineIcon />,
    //   title: 'History',
    //   disabled: true,
    // },
  ];
}

export const InformationData = (): InformationProps => {
  return [
    // {
    //   icon: <Users01LineIcon />,
    //   title: 'User',
    //   subTitle: '-',
    //   disabled: false,
    // },
    {
      icon: <MarkerPin01LineIcon />,
      title: t('location.location.label', 'Location', 'Location title.'),
      subTitle: null, // 'Last Update: 04/11/2023 13:41:15',
      path: 'location',
      component: <Location />,
      disabled: LocationIsDisabled(),
    },
    {
      icon: <Server01LineIcon />,
      title: t('asset.device.label', 'Device', 'Device.'),
      subTitle: null,
      path: 'device',
      component: <Device />,
      // disabled: DeviceIsDisabled(),
      disabled: false, //! 為方便測試 先關掉
    },
    {
      icon: <Settings01LineIcon />,
      title: t('solutions.system.label', 'System', 'System.'),
      subTitle: null,
      path: 'system',
      component: <System />,
      // disabled: SystemIsDisabled(),
      disabled: false,
    },
  ];
};
