import React, { useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router';

// utils

import { t } from '@core/utils/translate';

// styles

import styles from './styles.module.scss';

// components

import { DataSelect } from '@core/ui/components/DataSelect';
import { Unit } from '@core/ui/components/Unit';
import { UnitContainer } from '@core/ui/components/UnitContainer';
import { Card } from '@core/ui/components/Card';
import { CardHeader } from '@core/ui/components/CardHeader';
import { CardContent } from '@core/ui/components/CardContent';
import { Grid } from '@core/ui/components/Grid';
import { ItemButton } from '@solutions/ems/MassConfiguration/Components/ItemButton';
import { Profile as CCProfile } from './ContractCapacity/Profile';
import { ProfileEdit as CCProfileEdit } from './ContractCapacity/ProfileEdit';
import { Profile as CEProfile } from './CarbonEmission/Profile';
import { ProfileEdit as CEProfileEdit } from './CarbonEmission/ProfileEdit';
import { MCHeader, SegmentedControlObjectProps } from '@solutions/ems/MassConfiguration/Components/MCHeader';

// icon

import Carbonemission01LineIcon from '@assets/icons/line/carbon-emission-01.svg?component';
import Lightning01LineIcon from '@assets/icons/line/lightning-01.svg?component';

// type

import { Properties } from '@solutions/ems/api/entities/locations';

// others

import { settingButtons } from '../Setting';
import { useFilters } from './useFilter';
import { useFilterText } from './filter';

export const CampusPage = () => {
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

  const [selectedVariant, setSelectedVariant] = useState<string>('campus');
  const onSegmentedControlVariantChange = (value: string) => {
    setSelectedVariant(value);
    toggleLists?.(value);
  };

  const SegmentedControlObject: SegmentedControlObjectProps = {
    buttons: settingButtons,
    onChange: onSegmentedControlVariantChange,
    value: selectedVariant,
  };

  // filter

  const { filterText, setFilterText } = useFilterText();
  const filter = useFilters(filterText);
  const contractCapacityObject: Partial<Properties> | undefined = filter.properties?.getContractCapacity();
  const contractCapacity = contractCapacityObject?.value && JSON.parse(contractCapacityObject.value);
  const emissionFactorObject: Partial<Properties> | undefined = filter.properties?.getEmissionFactor();
  const emissionFactorValue = emissionFactorObject?.value;
  const emissionFactor = emissionFactorValue && JSON.parse(emissionFactorValue);

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

  return (
    <>
      <MCHeader previousPageURL='../' SegmentedControlObject={SegmentedControlObject} />
      <UnitContainer>
        <Unit>
          <Card>
            <CardHeader
              borderBottom
              title={t('solutions.system.label', 'System', 'System.')}
              children={
                <DataSelect
                  placeholder={t(
                    'location.selectCampusSelectPlaceholder.label',
                    'Select campus',
                    'Select campus select label.',
                  )}
                  options={filter.campusOptions}
                  present={(option) => option.label}
                  value={filter.selectedCampusOptions}
                  onChange={(option) => {
                    filter.setSelectedCampusOptions(option);
                    navigate('./');
                    handleClose();
                  }}
                />
              }
            />
            <CardContent fullWidth>
              <Grid container fullHeight fullWidth spacing={3}>
                <Grid item lg={3}>
                  <ItemButton
                    icon={<Lightning01LineIcon />}
                    title={contractCapacity?.capacity || '-'}
                    subTitle={t('ems.contractCapacity.label', 'Contract capacity', 'Contract capacity.')}
                    onClick={() => {
                      navigate('contractCapacity');
                    }}
                  />
                </Grid>
                <Grid item lg={3}>
                  <ItemButton
                    icon={<Carbonemission01LineIcon />}
                    title={(emissionFactor && Object.values(emissionFactor)[0]) || '-'}
                    subTitle={t(
                      'solutions.carbonEmissionFactor.label',
                      'Carbon emission factor',
                      'Carbon output rate.',
                    )}
                    onClick={() => {
                      navigate('carbonEmission');
                    }}
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
            path={'contractCapacity'}
            element={
              <Unit variant='sidebar'>
                <Card className={styles['card']} fullHeight fullWidth scrollable>
                  {state.open ? (
                    state.component
                  ) : (
                    <CCProfile
                      contractCapacity={contractCapacity}
                      handleEditProfile={handleClick(
                        <CCProfileEdit
                          onClose={handleClose}
                          contractCapacity={contractCapacity}
                          formationLocationId={filter.selectedCampusOptions.value}
                        />,
                      )}
                    />
                  )}
                </Card>
              </Unit>
            }
          />
          <Route
            path={'carbonEmission'}
            element={
              <Unit variant='sidebar'>
                <Card className={styles['card']} fullHeight fullWidth scrollable>
                  {state.open ? (
                    state.component
                  ) : (
                    <CEProfile
                      emissionFactor={emissionFactor}
                      handleEditProfile={handleClick(
                        <CEProfileEdit
                          onClose={handleClose}
                          emissionFactor={emissionFactor}
                          formationLocationId={filter.selectedCampusOptions.value}
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
