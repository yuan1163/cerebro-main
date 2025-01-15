import React from 'react';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Box } from '@core/ui/components/Box';
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { CardMedia } from '@core/ui/components/CardMedia';
import { DeviceQuery } from '@solutions/utilus/api/generated';
import { FormControlLabel } from '@core/ui/components/FormControlLabel';
import { Grid } from '@core/ui/components/Grid';
import { Image } from '@core/ui/components/Image';
import { RangeSlider } from '@core/ui/components/RangeSlider';
import { Stack } from '@core/ui/components/Stack';
import { Switch } from '@core/ui/components/Switch';
import { Text } from '@core/ui/components/Text';

// images

import light from './light.svg';
import off from './off.png';

// data
import {
  useDeviceIndexParameter,
  usePostDeviceIndexParameter,
} from '@solutions/utilus/api/data/useDeviceIndexParameter';

type Props = {
  device: DeviceQuery['device'];
};

const COMMAND_TYPE = 0;
const PARAMETER_NAME = 'brightness';

export const DeviceTab: React.FC<Props> = ({ device }) => {
  const pole = device?.smartPole;
  const parameterIndex = device?.connectParamIndex;

  const parameter = useDeviceIndexParameter(
    {
      locationId: pole?.connectLocationId,
      deviceId: pole?.connectDeviceId,
    },
    PARAMETER_NAME,
    parameterIndex,
  );

  const send = usePostDeviceIndexParameter(
    {
      locationId: pole?.connectLocationId,
    },
    pole?.connectDeviceId,
    COMMAND_TYPE,
    PARAMETER_NAME,
    parameterIndex,
  );

  const [brightness, setBrightness] = React.useState(parameter?.value ? parseInt(parameter.value) : 0);

  React.useEffect(() => {
    if (parameter?.value) setBrightness(parseInt(parameter.value));
  }, [device, parameter]);

  const changeBrightness = (value: number) => {
    console.log('...sending to backend', value);
    send(value.toString());
    setBrightness(value);
  };

  // const [switch, setSwitch] = React.useState();

  const handleSwitch = () => {
    brightness <= 0 ? true : false;
    brightness <= 0 ? changeBrightness(100) : changeBrightness(0);
  };

  return parameterIndex ? (
    <Grid container spacing={2}>
      <Grid item lg={6}>
        <Card variant='outlined' fullWidth>
          <CardContent>
            <Stack spacing={2}>
              <Text variant='sm' component='h3' weight='bold'>
                LED Control
              </Text>
              <Card color='surface-02' className={styles['image-container']}>
                <Box className={styles['glow-container']} style={{ opacity: brightness / 100 }}>
                  <svg xmlns='http://www.w3.org/2000/svg' width='144' height='144' viewBox='0 0 144 144'>
                    <path
                      d='M41.743,63.626l-17.6-52.4a6,6,0,0,1,5.391-7.9L72.117,1.215,114.668,3.3a6,6,0,0,1,5.265,8.251l-21.3,52.421a6,6,0,0,1-5.559,3.742H47.431A6,6,0,0,1,41.743,63.626Z'
                      fill='#ffd12b'
                      style={{ mixBlendMode: 'overlay', filter: 'blur(4.5px)' }}
                    />
                    <path
                      d='M22.3,9.724,1.752,135.749a6,6,0,0,0,5.922,6.966H136.639a6,6,0,0,0,5.932-6.9L123.394,9.341a6,6,0,0,0-5.962-5.1l-89.24.448A6,6,0,0,0,22.3,9.724Z'
                      fill='#fff'
                      style={{
                        opacity: 0.5,
                        filter: 'blur(50px)',
                      }}
                    />
                    <path
                      d='M41.743,63.626l-17.6-52.4a6,6,0,0,1,5.391-7.9L72.117,1.215,114.668,3.3a6,6,0,0,1,5.265,8.251l-21.3,52.421a6,6,0,0,1-5.559,3.742H47.431A6,6,0,0,1,41.743,63.626Z'
                      fill='#fff'
                      style={{ mixBlendMode: 'overlay', opacity: 0.4, filter: 'blur(4.5px)' }}
                    />
                    <path
                      d='M41.743,63.626l-17.6-52.4a6,6,0,0,1,5.391-7.9L72.117,1.215,114.668,3.3a6,6,0,0,1,5.265,8.251l-21.3,52.421a6,6,0,0,1-5.559,3.742H47.431A6,6,0,0,1,41.743,63.626Z'
                      fill='#fff'
                      style={{ mixBlendMode: 'overlay', filter: 'blur(10px)' }}
                    />
                  </svg>
                </Box>
                <Image src={off} className={styles['image']} />
              </Card>
              <Card color='surface-02'>
                <CardContent>
                  <Grid alignItems='center' justifyContent='between'>
                    <Text variant='sm'>Status</Text>
                    <Switch isChecked={brightness > 0} label='On' onChange={handleSwitch} />
                  </Grid>
                </CardContent>
              </Card>
              <Card color='surface-02'>
                <CardContent className={styles['slider-container']}>
                  <Stack spacing={0}>
                    <Grid alignItems='baseline' justifyContent='between'>
                      <Text variant='sm'>Dimming</Text>
                      <Text variant='sm' weight='bold'>
                        {`${brightness}%`}
                      </Text>
                    </Grid>
                  </Stack>
                  <RangeSlider
                    max={100}
                    min={0}
                    onChange={(evt) => changeBrightness(parseInt(evt.target.value))}
                    step={1}
                    value={brightness}
                  />
                </CardContent>
              </Card>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid item lg={6}>
        <Card variant='outlined' fullWidth>
          <CardContent>
            <Text variant='sm' component='h3' weight='bold'>
              Schedule
            </Text>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  ) : (
    <p>{`This Device (${device?.id}) is not connected to a real one`}</p>
  );
};
