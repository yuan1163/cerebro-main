import React from 'react';
import { observer } from 'mobx-react';

// utils
import { t } from '@core/utils/translate';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Box } from '@core/ui/components/Box';
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { CommandCenterCard } from './CommandCenterCard';
import { DomainObjectsList } from './DomainObjectsList';
import { Grid } from '@core/ui/components/Grid';
import { Header } from '@core/ui/utilus/Header';
import { IconButton } from '@core/ui/components/IconButton';
import { SmartPoleMap } from './SmartPoleMap';
import { Text } from '@core/ui/components/Text';
import { Tooltip } from '@core/ui/components/Tooltip';
import { Unit } from '@core/ui/components/Unit';
import { UnitContainer } from '@core/ui/components/UnitContainer';

// icons
import Home02LineIcon from '@assets/icons/line/home-02.svg?component';
import InfoCircleLineIcon from '@assets/icons/line/info-circle.svg?component';

// data
import { commands } from '@core/ui/pages/SmartPolesPage/commands';

export const Domain = observer(() => {
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
        widget={false}
      />
      <UnitContainer>
        <Unit variant='sidebar'>
          <DomainObjectsList />
        </Unit>
        <Unit className={styles['unit']}>
          <Card className={styles['map-container']}>
            <SmartPoleMap />
          </Card>
          <Grid>
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
                <Grid container spacing={2} wrap='wrap'>
                  {commands.map((command) => (
                    <Grid key={command.id} item lg={6}>
                      <CommandCenterCard command={command} />
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Unit>
      </UnitContainer>
    </>
  );
});
