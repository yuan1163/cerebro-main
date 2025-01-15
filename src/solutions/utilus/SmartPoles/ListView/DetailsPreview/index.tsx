import { useNavigate, useParams } from 'react-router-dom';

// utils
import { t } from '@core/utils/translate';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Button } from '@core/ui/components/Button';
import { Card } from '@core/ui/components/Card';
import { Divider } from '@core/ui/components/Divider';
import { Grid } from '@core/ui/components/Grid';
import { SmartPoleCardHeader } from '../../SmartPoleCardHeader';
import { SmartPoleDetails } from './SmartPoleDetails';
import { SmartPoleEvents } from '../../DetailsView/SmartPoleEvents';

// data
import { useSmartPole } from '@solutions/utilus/api/data/useSmartPole';

type Props = {
  poleId?: number;
};

export const DetailsPreview: React.FC<Props> = ({ poleId }) => {
  const pole = useSmartPole(poleId);
  const navigate = useNavigate();
  return (
    <>
      <SmartPoleCardHeader
        pole={pole}
        action={
          <Button className={styles['button']} onClick={() => navigate(`../../details/${pole?.id}`)} variant='outlined'>
            {t('general.seeMore.label', 'See More', 'See more button or link.')}
          </Button>
        }
      />
      <Grid container spacing={0} grow>
        <Grid item lg={6}>
          <SmartPoleDetails pole={pole} />
        </Grid>
        <Divider orientation='vertical' flexItem />
        <Grid item lg={6}>
          <SmartPoleEvents pole={pole} />
        </Grid>
      </Grid>
    </>
  );
};
