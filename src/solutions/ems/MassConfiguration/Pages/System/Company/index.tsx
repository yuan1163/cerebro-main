import React, { useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router';

// utils

import { t } from '@core/utils/translate';

// styles

import styles from './styles.module.scss';

// components

import { Unit } from '@core/ui/components/Unit';
import { UnitContainer } from '@core/ui/components/UnitContainer';
import { Card } from '@core/ui/components/Card';
import { CardHeader } from '@core/ui/components/CardHeader';
import { CardContent } from '@core/ui/components/CardContent';
import { Grid } from '@core/ui/components/Grid';
import { ItemButton } from '@solutions/ems/MassConfiguration/Components/ItemButton';
import { Profile } from './DomainMap/Profile';
import { MCHeader, SegmentedControlObjectProps } from '@solutions/ems/MassConfiguration/Components/MCHeader';
import { ProfileEdit } from './DomainMap/ProfileEdit';

// icon

import Map01LineIcon from '@assets/icons/line/map-01.svg?component';

// storages

import { useLocations } from '@core/storages/controllers/locations';
import { useLocationProperties } from '@solutions/ems/api/storages/controllers/locationProperties';

// type

import { Properties } from '@solutions/ems/api/entities/locations';

// others

import { settingButtons } from '../Setting';

export const CompanyPage = () => {
  // location properties
  const locations = useLocations();
  const company = locations.getCompany();

  const properties = useLocationProperties(company.locationId);
  const domainMapZoomInSize: Partial<Properties> | undefined = properties?.getDomainMapZoomInSize();

  // segment control

  const navigate = useNavigate();

  const toggleLists = (button?: string) => {
    switch (button) {
      case 'company':
        navigate(`../company`);
        break;
      case 'campus':
        navigate(`../campus`);
        break;
    }
  };

  const [selectedVariant, setSelectedVariant] = useState<string>('company');
  const onSegmentedControlVariantChange = (value: string) => {
    setSelectedVariant(value);
    toggleLists?.(value);
  };

  const SegmentedControlObject: SegmentedControlObjectProps = {
    buttons: settingButtons,
    onChange: onSegmentedControlVariantChange,
    value: selectedVariant,
  };

  // edit assets

  const [state, setState] = React.useState<{
    open: boolean;
    component: React.ReactNode;
  }>({
    open: false,
    component: 'span',
  });

  const handleClick = (component: React.ReactNode) => () => {
    setState({
      open: true,
      component,
    });
  };

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };

  const [selectedItem, setSelectItem] = useState<string>('');

  return (
    <>
      <MCHeader previousPageURL='../' SegmentedControlObject={SegmentedControlObject} />
      <UnitContainer>
        <Unit>
          <Card>
            <CardHeader borderBottom title={t('solutions.system.label', 'System', 'System.')}></CardHeader>
            <CardContent fullWidth>
              <Grid container fullHeight fullWidth spacing={3}>
                <Grid item lg={3}>
                  <ItemButton
                    icon={<Map01LineIcon />}
                    title={domainMapZoomInSize?.value || '-'}
                    subTitle={t('map.domainMapZoom.label', '"Domain map zoom in size', 'Domain map zoom in size.')}
                    onClick={() => {
                      setSelectItem('DomainMap');
                      navigate('domainMap');
                    }}
                    selected={selectedItem === 'DomainMap'}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Unit>
        <Routes>
          <Route
            path='/'
            element={
              state.open && (
                <Unit variant='sidebar'>
                  <Card className={styles['card']} fullHeight fullWidth scrollable>
                    {state.component}
                  </Card>
                </Unit>
              )
            }
          />
          <Route
            path={'domainMap'}
            element={
              <Unit variant='sidebar'>
                <Card className={styles['card']} fullHeight fullWidth scrollable>
                  {state.open ? (
                    state.component
                  ) : (
                    <Profile
                      domainMapZoomInSize={domainMapZoomInSize}
                      handleEditProfile={handleClick(
                        <ProfileEdit
                          onClose={handleClose}
                          domainMapZoomInSize={domainMapZoomInSize}
                          companyLocationId={company.locationId}
                        />,
                      )}
                    />
                  )}
                </Card>
              </Unit>
            }
          />
        </Routes>
      </UnitContainer>
    </>
  );
};
