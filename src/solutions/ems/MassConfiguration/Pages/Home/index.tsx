import React, { useEffect, useState } from 'react';

// utils

import { t } from '@core/utils/translate';

// components

import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { Grid } from '@core/ui/components/Grid';
import { ItemButton } from '@solutions/ems/MassConfiguration/Components/ItemButton';
import { Unit } from '@core/ui/components/Unit';
import { UnitContainer } from '@core/ui/components/UnitContainer';
// styles
import styles from './styles.module.scss';

// data
import { useLocations } from '@core/storages/controllers/locations';
import { Toast } from '@core/ui/components/Toast';
import {
  alertMsg,
  ConfigurationFileData,
  DownloadMCFile,
  InformationData,
  UploadFile,
} from '@solutions/ems/MassConfiguration/data/entryPageData';
import { useNavigate } from 'react-router';

export const Home = () => {
  const navigate = useNavigate();
  const locations = useLocations();

  const uploadInputRef = React.useRef<HTMLInputElement>(null);
  const [alertMsg, setAlertMsg] = useState<alertMsg>({
    msg: '',
    show: false,
    isLoading: false,
  });

  useEffect(() => {
    if (alertMsg.show && !alertMsg.isLoading) {
      setTimeout(() => {
        setAlertMsg({
          msg: '',
          show: false,
        });
      }, 60 * 1000);
    }
  }, [alertMsg]);

  return (
    <>
      <UnitContainer className={styles['container']}>
        <Unit>
          {/* Configuration File */}
          <Card>
            <CardHeader
              borderBottom
              title={t('solutions.massConfiguration.label', 'Mass Configuration', 'Mass Configuration title.')}
            />
            <CardContent fullWidth>
              <Grid container fullHeight fullWidth spacing={3}>
                {ConfigurationFileData.map((item) => {
                  return (
                    /** 若是上傳按鈕 需要隱藏一個 input file */
                    <Grid item lg={3} key={item.title}>
                      {item.title ===
                        t(
                          'general.upload.label',
                          'Upload',
                          'Process of transferring data to a remote server or platform.',
                        ) && (
                        /** 檔案上傳的按鈕, 點客製化按鈕透過 ref 來執行這檔案上傳按鈕 */
                        <input
                          accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                          hidden
                          onChange={(evt) => {
                            if (evt.target.files?.length) {
                              UploadFile(locations.getCompany().locationId, evt.target.files[0], setAlertMsg);

                              // clear input value
                              evt.target.value = '';
                            }
                          }}
                          ref={uploadInputRef}
                          type='file'
                        />
                      )}

                      <ItemButton
                        icon={item.icon}
                        title={item.title}
                        disabled={item.disabled}
                        onClick={() => {
                          if (!item.disabled) {
                            switch (item.title) {
                              case t(
                                'general.upload.label',
                                'Upload',
                                'Process of transferring data to a remote server or platform.',
                              ):
                                uploadInputRef.current?.click();
                                break;
                              case t(
                                'general.download.label',
                                'Download',
                                'Process of transferring data to a local device.',
                              ):
                                DownloadMCFile(locations.getCompany().locationId, setAlertMsg);
                                break;

                              default:
                                break;
                            }
                          }
                        }}
                      ></ItemButton>

                      <Toast isShowing={alertMsg['show']} message={alertMsg['msg']} />
                    </Grid>
                  );
                })}
              </Grid>
            </CardContent>
          </Card>
        </Unit>
        <Unit>
          {/* Information */}
          <Card>
            <CardHeader
              borderBottom
              title={t('general.information.label', 'Information', 'Data about a particular subject.')}
            ></CardHeader>
            <CardContent fullWidth>
              <Grid container fullHeight fullWidth spacing={3}>
                {InformationData().map((item) => {
                  return (
                    <Grid item lg={3} key={item.title}>
                      <ItemButton
                        icon={item.icon}
                        title={item.title}
                        subTitle={item.subTitle}
                        disabled={item.disabled}
                        onClick={() => {
                          if (!item.disabled) {
                            switch (item.title) {
                              case t('solutions.system.label', 'System', 'System.'):
                                navigate(`${item.path}/company`);
                                break;
                              case t('asset.device.label', 'Device', 'Device.'):
                                navigate(`${item.path}/list`);
                                break;
                              default:
                                navigate(`${item.path}`);
                                break;
                            }
                          }
                        }}
                      ></ItemButton>
                    </Grid>
                  );
                })}
              </Grid>
            </CardContent>
          </Card>
        </Unit>
      </UnitContainer>
    </>
  );
};
