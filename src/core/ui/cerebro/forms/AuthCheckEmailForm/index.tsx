import React from 'react';

// utils

import { t } from '@core/utils/translate';

// styles

import styles from '../AuthLoginForm/styles.module.scss';

// components

import { Button } from '@core/ui/components/Button';
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { Grid } from '@core/ui/components/Grid';
import { Icon } from '@core/ui/components/Icon';
import { Text } from '@core/ui/components/Text';

// icons

import ArrowLeftLineIcon from '@assets/icons/line/arrow-left.svg?component';
import Mail01LineIcon from '@assets/icons/line/mail-01.svg?component';

type Props = {
  onBackToSignIn: () => void;
};

export const AuthCheckEmailForm: React.FC<Props> = ({ onBackToSignIn }) => {
  return (
    <Card className={styles['card']}>
      <CardContent size='xl'>
        <Grid alignItems='center' justifyContent='center' direction='column'>
          {/* ICON */}

          <Grid item className='mb-6'>
            <Icon rounded size='3xl' variant='tint'>
              <Mail01LineIcon />
            </Icon>
          </Grid>

          {/* TITLE */}

          <Grid direction='column'>
            <Text align='center' component='h1' variant='xl' weight='semibold'>
              {t('login.resetEmailPage.label', 'Check your email', 'Title of Reset email Page.')}
            </Text>
            <Text align='center' className='mt-1' color='typography-secondary' variant='sm'>
              {t(
                'login.resetEmailPage.resetEmailPageIntro.label',
                'We sent a password reset link to',
                'Introductory text for Reset email Page.',
              )}
            </Text>

            {/* TO DO EMAIL */}

            <Text align='center' component='span' variant='sm' weight='medium'>
              {t('login.yourEmailPlaceholder.label', 'your email', 'Your email placeholder label.')}
            </Text>
          </Grid>

          {/* SUBMIT */}

          <Grid alignItems='center' justifyContent='center' className='mt-6' direction='column' fullWidth>
            <Button fullWidth size='lg' type='submit' variant='solid'>
              {t('login.resendEmailButton.label', 'Resend email', 'Label for Resend email button.')}
            </Button>
            <Button
              className='mt-6'
              onClick={onBackToSignIn}
              size='md'
              startIcon={<ArrowLeftLineIcon />}
              type='submit'
              variant='text'
            >
              {t('login.backToSignInButton.label', 'Back to Sign In', 'Label for Back to Sign In button.')}
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
