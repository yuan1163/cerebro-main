import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

// utils

import { t } from '@core/utils/translate';
import { generateAddress } from '@core/utils/generateAddress';

// storages

import { useLocations } from '@core/storages/controllers/locations';
import { useUI } from '@core/storages/ui';

// types

import { Location } from '@core/api/types';
import { Solutions, SolutionsMasks } from '@core/ui/types';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Accordion } from '@core/ui/components/Accordion';
import { AccordionContainer } from '@core/ui/components/AccordionContainer';
import { AccordionDetails } from '@core/ui/components/AccordionDetails';
import { AccordionDomain } from '@core/ui/components/AccordionDomain';
import { AccordionGroup } from '@core/ui/components/AccordionGroup';
import { CardContent } from '@core/ui/components/CardContent';
import { Chip } from '@core/ui/components/Chip';
import { DomainLocationAccordion } from '../DomainLocationAccordion';
import { getAccessLocationsId } from '@solutions/ems/Analytics/data/getLocationBlackList';
import { Grid } from '@core/ui/components/Grid';
import { Icon } from '@core/ui/components/Icon';
import { IconButton } from '@core/ui/components/IconButton';
import { Map } from '@core/ui/cerebro/Map';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { Text } from '@core/ui/components/Text';

// icons

import ArrowRightLineIcon from '@assets/icons/line/arrow-right.svg?component';

type Props = {
  className?: string;
};

type User = {
  userId: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  status: number;
  creationDate: string;
  lastLoginDate: string;
  jobTitle: string | null;
};

export const DomainObjectsList: React.FC<Props> = ({ className }) => {
  const locations = useLocations();
  const ui = useUI();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://app.iveda.ai/rsapic/api/users');
        const data = await response.json();
        setUsers(data.slice(0, 10)); // 只取前10筆資料
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const pointClick = (location: Location) => {
    // ui.setActiveFormation(location);
    // navigate('dashboard');
    ui.setCurrentFormation(location.locationId);

    if (ui.activeSolution == Solutions.ems) {
      // TODO discuss with Kim
      // const locationAccessList = getAccessLocationsId(location);
      // const emsCurrentLocationId = locationAccessList.includes(location.locationId)
      //   ? location.locationId
      //   : locationAccessList[0];
      const emsCurrentLocationId = location.locationId;
      ui.setEmsCurrentLocation(emsCurrentLocationId);
    }
    navigate(`dashboard/${location.locationId}`);
  };

  return (
    <>
      <Scrollbar>
        <AccordionGroup gap>
          {locations.getRegions().map((region) => (
            <Accordion
              key={`region.${region.locationId}`}
              customTitle={
                <Text component='h2' variant='lg' weight='semibold'>
                  {region.name || t('general.notAvailable.label', 'n/a', 'Not Available.')}
                </Text>
              }
              disableGutters
              defaultOpen
              shadow
              rounded
              variant='solid'
            >
              {locations.getFormations(region).map((item) => {
                // LOCATIONS

                const areas = locations.getAreas(item);
                const buildings = locations.getBuildings(item);

                // SOLUTIONS

                const solutionMappings = [
                  {
                    mask: SolutionsMasks.cerebro,
                    title: t('solutions.pinPoint.label', 'PinPoint', 'Title of PinPoint Solution.'),
                  },
                  {
                    mask: SolutionsMasks.utilus,
                    title: t('solutions.utilus.label', 'Utilus', 'Title of Utilus Solution.'),
                  },
                  { mask: SolutionsMasks.ai, title: t('solutions.ai.label', 'AI', 'Title of AI Solution.') },
                  {
                    mask: SolutionsMasks.connect,
                    title: t('solutions.connects.label', 'Connects', 'Title of Connects Solution.'),
                  },
                  { mask: SolutionsMasks.ems, title: t('solutions.ems.label', 'EMS', 'Title of EMS Solution.') },
                ];

                return (
                  <React.Fragment key={`formation.${item.locationId}`}>
                    <AccordionDomain
                      title={item.name || t('general.notAvailable.label', 'n/a', 'Not Available.')}
                      subtitle={generateAddress(item)}
                      onArrowClick={() => {
                        if (ui.activeSolution == Solutions.ems) ui.setEmsCurrentLocation(item.locationId);
                        ui.setCurrentFormation(item.locationId);
                        navigate(`dashboard/${item.locationId}`);
                      }}
                      // map={<Map onSelect={pointClick} points={[item]} zoom={19} />}
                      features={
                        <>
                          {solutionMappings.map(
                            ({ mask, title }, index) =>
                              (item.branchSolutions & mask) !== 0 && (
                                <Chip key={index} className='mr-2'>
                                  {title}
                                </Chip>
                              ),
                          )}
                        </>
                      }
                    />
                    {(areas.length > 0 || buildings.length > 0) && (
                      <CardContent disablePaddingTop>
                        <Grid container direction='column' spacing={2}>
                          {areas.length > 0 && (
                            <Grid item>
                              <DomainLocationAccordion items={areas} />
                            </Grid>
                          )}
                          {!areas.length && (
                            <Grid item>
                              <DomainLocationAccordion items={buildings} />
                            </Grid>
                          )}
                        </Grid>
                      </CardContent>
                    )}
                  </React.Fragment>
                );
              })}
            </Accordion>
          ))}
          {/* 新增的選單 */}
          <Accordion
            key='new-menu'
            customTitle={
              <Text component='h2' variant='lg' weight='semibold'>
                {t('new.menu.label', '使用者清單', 'Title of the new menu.')}
              </Text>
            }
            disableGutters
            defaultOpen
            shadow
            rounded
            variant='solid'
          >
            <CardContent>
              {users.map((user) => (
                <Text key={user.userId}>{user.username}</Text>
              ))}
            </CardContent>
          </Accordion>
        </AccordionGroup>
      </Scrollbar>
    </>
  );
};
