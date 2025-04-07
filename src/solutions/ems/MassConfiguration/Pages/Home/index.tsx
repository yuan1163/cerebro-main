import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';

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
import { Modal } from '@core/ui/components/Modal';
import { Button } from '@core/ui/components/Button';
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

export const Home = observer(() => {
  const navigate = useNavigate();
  const locations = useLocations();

  const uploadInputRef = React.useRef<HTMLInputElement>(null);
  const [alertMsg, setAlertMsg] = useState<alertMsg>({
    msg: '',
    show: false,
    isLoading: false,
  });
  
  // 確認對話框的狀態
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  // 暫存選擇的檔案
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleReadMeClick = () => {
    // 建立一個下載連結
    const link = document.createElement('a');
    link.href = encodeURI('/doc/Cerebro Upload Conditions (Draft 20250317).pdf');
    link.download = 'ReadMe.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
  
  // 處理確認對話框的確認操作
  const handleConfirmUpload = () => {
    if (selectedFile) {
      UploadFile(locations.getCompany().locationId, selectedFile, setAlertMsg);
      setSelectedFile(null);
    }
    setConfirmDialogOpen(false);
  };
  
  // 取消上傳操作
  const handleCancelUpload = () => {
    setSelectedFile(null);
    setConfirmDialogOpen(false);
  };

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
                <Grid item lg={3}>
                  <ItemButton
                    icon="ReadMe" 
                    title={t('general.readme.label', 'ReadMe', 'Documentation guide.')}
                    onClick={handleReadMeClick}
                  />
                </Grid>
                
                {ConfigurationFileData().map((item) => {
                  if (item.title === t(
                    'general.download.label',
                    'Download',
                    'Process of transferring data to a local device.',
                  )) {
                    console.log('Download button icon:', item.icon);
                    return (
                      <Grid item lg={3} key={item.title}>
                        <ItemButton
                          icon={item.icon}
                          title={item.title}
                          disabled={item.disabled}
                          onClick={() => {
                            if (!item.disabled) {
                              DownloadMCFile(locations.getCompany().locationId, setAlertMsg);
                            }
                          }}
                        ></ItemButton>
                      </Grid>
                    );
                  }
                  return null;
                })}
                
                {ConfigurationFileData().map((item) => {
                  // 再渲染上傳按鈕
                  if (item.title === t(
                    'general.upload.label',
                    'Upload',
                    'Process of transferring data to a remote server or platform.',
                  )) {
                    console.log('Upload button icon:', item.icon);
                    return (
                      <Grid item lg={3} key={item.title}>
                        <input
                          accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                          hidden
                          onChange={(evt) => {
                            if (evt.target.files?.length) {
                              // 不立即上傳，而是保存檔案並顯示確認對話框
                              setSelectedFile(evt.target.files[0]);
                              setConfirmDialogOpen(true);
                              
                              // clear input value
                              evt.target.value = '';
                            }
                          }}
                          ref={uploadInputRef}
                          type='file'
                        />
                        
                        <ItemButton
                          icon={item.icon}
                          title={item.title}
                          disabled={item.disabled}
                          onClick={() => {
                            if (!item.disabled) {
                              uploadInputRef.current?.click();
                            }
                          }}
                        ></ItemButton>
                      </Grid>
                    );
                  }
                  return null;
                })}

                <Toast isShowing={alertMsg['show']} message={alertMsg['msg']} />
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
      
      {/* 確認上傳對話框 */}
      <Modal
        open={confirmDialogOpen}
        onClose={handleCancelUpload}
        title=" " 
      >
        <div style={{ padding: '16px', backgroundColor: 'white' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            marginBottom: '16px',
            fontWeight: 'bold',
            fontSize: '18px' 
          }}>
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              style={{ color: '#ff9800' }}
            >
              <path 
                d="M12 2L1 21h22L12 2z" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
              <line 
                x1="12" 
                y1="9" 
                x2="12" 
                y2="13" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
              <line 
                x1="12" 
                y1="17" 
                x2="12.01" 
                y2="17" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            </svg>
            <span>{t('ems.uploadConfirmTitle.label', 'uploadConfirmTitle','are you sure you want to proceed?')}</span>
          </div>
          
          <p style={{ marginBottom: '16px' }}>
            {t('ems.confirmUploadMessage.label', 'confirmUploadMessage', 
              'Data Override Warning: Uploading this Excel sheet will replace the existing data. This may result in the removal of current records and addition of new data. This action cannot be undone.')}
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px', gap: '10px' }}>
            <Button 
              variant="solid" 
              style={{ backgroundColor: 'lightblue', color: 'white' }}
              onClick={handleCancelUpload}
            >
              {t('ems.Cancel.label', 'Cancel', 'Cancel action.')}
            </Button>
            <Button 
              variant="solid" 
              color="error" 
              onClick={handleConfirmUpload}
            >
              {t('ems.Proceed.label', 'Proceed', 'Confirm action.')}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
});
