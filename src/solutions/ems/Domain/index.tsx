import moment from 'moment';
import React from 'react';
import { observer } from 'mobx-react';

// utils

import { t } from '@core/utils/translate';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components
import { Header } from '@core/ui/cerebro/Header';
import { Grid } from '@core/ui/components/Grid';
import { Unit } from '@core/ui/components/Unit';
import { UnitContainer } from '@core/ui/components/UnitContainer';
import { Card } from '@core/ui/components/Card';
import { CardHeader } from '@core/ui/components/CardHeader';
import { Box } from '@core/ui/components/Box';
import { IconButton } from '@core/ui/components/IconButton';
import { Tooltip } from '@core/ui/components/Tooltip';
import { CardContent } from '@core/ui/components/CardContent';

// cerebro components
import { DomainMap } from '@solutions/cerebro/Domain/DomainMap';
import { DomainObjectsList } from '@solutions/cerebro/Domain/DomainObjectsList';
import { DomainStatus } from '@solutions/cerebro/Domain/DomainStatus';
import { CommandCenterCard } from '@solutions/utilus/Domain/CommandCenterCard';

// icons

import Home02LineIcon from '@assets/icons/line/home-02.svg?component';
import InfoCircleLineIcon from '@assets/icons/line/info-circle.svg?component';

// commands
import { commands } from '@core/ui/pages/EMSCommandCenterPage/commands';

// implementation

export const Domain = observer(() => {
  const [expendMap, setExpandMap] = React.useState(false);

  const handleExpand = () => {
    setExpandMap(!expendMap);
  };

  const buttonRef = React.useRef(null);
  const [visible, setVisibility] = React.useState(false);

  return (
    <>
      <Header
        icon={<Home02LineIcon />}
        title={t(
          'solutions.domainOverview.label',
          'Domain Overview',
          "An overview of the solution's core purpose and components.",
        )}
        widgets={false}
      />
      <UnitContainer>
        <Unit variant='sidebar'>
          <DomainObjectsList />
        </Unit>
        <Unit height='full'>
          <Grid className={styles['container']} display='grid' fullHeight>
            <DomainMap expendIconButton={false} expended={expendMap} onClick={handleExpand} />
          </Grid>
          <Card>
            <CardHeader
              disablePaddingBottom
              title={t(
                'solutions.commandCenter.label',
                'Command Center',
                'A hub for overseeing and controlling operations.',
              )}
              action={
                <Box className={styles['icon-container']}>
                  <IconButton
                    ariaLabel={t('general.help.label', 'Help', 'Assistance or guidance.')}
                    color='icon-tertiary'
                    disabled
                    onMouseEnter={() => setVisibility(true)}
                    onMouseLeave={() => setVisibility(false)}
                    ref={buttonRef}
                    size='lg'
                    variant='text'
                  >
                    <InfoCircleLineIcon />
                  </IconButton>
                  <Tooltip
                    isVisible={visible}
                    placement='top-end'
                    targetRef={buttonRef}
                    title={t(
                      'solutions.commandCenterTooltip.label',
                      'Select location and choose category that you want preview on Command Center screens. You can explore it in the same window or open in new tab.',
                      'Section tooltip.',
                    )}
                    width={60}
                  />
                </Box>
              }
            />
            <CardContent>
              <Grid container spacing={2} wrap='wrap' className={styles['command-center-grid']}>
                {commands.map((command) => (
                  <Grid key={command.id} item className={styles['command-center-grid-item']} fullWidth>
                    <CommandCenterCard command={command} />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Unit>
      </UnitContainer>
    </>
  );
});
