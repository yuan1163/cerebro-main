import React from 'react';
import moment from 'moment-timezone';

// components

import { Text } from '@core/ui/components/Text';

// icons

import Moon01LineIcon from '@assets/icons/line/moon-01.svg?component';
import SunLineIcon from '@assets/icons/line/sun.svg?component';

const FORMAT = 'hh:mm A';

type Props = {
  timezone?: string;
};

export const TimeInfo = ({ timezone = 'EST' }: Props) => {
  const [time, setTime] = React.useState(moment().tz(timezone).format());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(moment().tz(timezone).format()), 1000);
    return () => clearInterval(timer);
  }, []);

  const currentHour = moment(time).tz(timezone).hour();
  const formationTime = moment(time).tz(timezone).format(FORMAT);

  return (
    <Text color='typography-primary' component='span' variant='sm' weight='semibold' whiteSpace='nowrap'>
      {formationTime}
    </Text>
  );
};

{
  /* {currentHour >= 3 && currentHour <= 17 ? <SunLineIcon /> : <Moon01LineIcon />} */
}
