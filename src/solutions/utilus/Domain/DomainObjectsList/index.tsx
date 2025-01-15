import React from 'react';
import { useNavigate } from 'react-router';

// utils

import { t } from '@core/utils/translate';

// data

import { useRegions } from '@solutions/utilus/api/data/useRegions';
import { useDevicesCountFormation } from '@solutions/utilus/api/data/useDevicesCountFormation';
import { useAlertsCountFormation } from '@solutions/utilus/api/data/useAlertsCountFormation';
import { useSmartPolesFormation } from '@solutions/utilus/api/data/useSmartPolesFormation';
import { useUI } from '@core/storages/ui';

// styles

import { cn } from '@core/utils/classnames';

// components

import { Accordion } from '@core/ui/components/Accordion';
import { AccordionDomain } from '@core/ui/components/AccordionDomain';
import { AccordionGroup } from '@core/ui/components/AccordionGroup';
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { Chip } from '@core/ui/components/Chip';
import { Grid } from '@core/ui/components/Grid';
import { Icon } from '@core/ui/components/Icon';
import { LegendMarker } from '@core/ui/components/LegendMarker';
import { Map } from '@core/ui/utilus/Map';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { Stack } from '@core/ui/components/Stack';
import { UtilusMap } from '@core/ui/utilus/UtilusMap';

// icons

import SmartPoleLineIcon from '@assets/icons/line/smart-pole.svg?component';

type Props = {
  className?: string;
};

type InFormation = {
  formationId: number;
};

const AssetChip: React.FC<InFormation> = ({ formationId }) => {
  const devices = useDevicesCountFormation(formationId);
  const alerts = useAlertsCountFormation(formationId);

  return (
    <Grid alignItems='center' className='mt-2'>
      <Icon size='xs' variant='plain'>
        <SmartPoleLineIcon />
      </Icon>
      <Stack direction='row'>
        <Grid alignItems='center'>
          <LegendMarker color='success' disableGutterLeft />
          <span>{devices}</span>
        </Grid>
        <Grid alignItems='center'>
          <LegendMarker color='error' disableGutterLeft />
          <span>{alerts}</span>
        </Grid>
      </Stack>
    </Grid>
  );
};

const FORMATION_ZOOM = 19;

const FormationMap: React.FC<InFormation> = ({ formationId }) => {
  const ui = useUI();
  const navigate = useNavigate();
  const smartPoles = useSmartPolesFormation(formationId);

  return smartPoles ? (
    <UtilusMap
      points={smartPoles}
      zoom={FORMATION_ZOOM}
      onClick={() => {
        ui.setCurrentFormation(formationId);
        navigate(`dashboard/${formationId}`);
      }}
    />
  ) : null;
};

// function AlertChip() {
//   return (
//     <Box className={styles['map-alerts-container']}>
//       <Box className={styles['map-alerts']}>
//         <Icon color='error' size='small' className={styles['map-alerts-icon']}>
//           <Bell01SolidIcon />
//         </Icon>
//         <span>48</span>
//       </Box>
//     </Box>
//   );
// }

export const DomainObjectsList: React.FC<Props> = ({ className }) => {
  const regions = useRegions();
  const ui = useUI();
  const navigate = useNavigate();

  return (
    <Card scrollable>
      <Scrollbar>
        <AccordionGroup gap divider variant='solid'>
          {regions &&
            regions.map((region) => (
              <Accordion
                key={region.id}
                title={region.name || t('general.notAvailable.label', 'n/a', 'Not Available.')}
                disableGutters
                defaultOpen
                shadow
                rounded
              >
                {region.formations.map((formation) => {
                  return (
                    <AccordionDomain
                      key={formation.id}
                      title={formation.name || t('general.notAvailable.label', 'n/a', 'Not Available.')}
                      subtitle={formation.address || t('general.notAvailable.label', 'n/a', 'Not Available.')}
                      onArrowClick={() => {
                        ui.setCurrentFormation(formation.id);
                        navigate(`dashboard/${formation.id}`);
                      }}
                      map={<FormationMap formationId={formation.id} />}
                      features={<AssetChip formationId={formation.id} />}
                    />
                    // <CardContent disablePaddingTop>
                    //   <Grid className='mt-3' wrap='wrap'>
                    //     {formation.solutions.map((solution) => (
                    //       <Chip key={solution.id} className='mr-2'>
                    //         {solution.name!}
                    //       </Chip>
                    //     ))}
                    //   </Grid>
                    // </CardContent>
                  );
                })}
              </Accordion>
            ))}
        </AccordionGroup>
      </Scrollbar>
    </Card>
  );
};
