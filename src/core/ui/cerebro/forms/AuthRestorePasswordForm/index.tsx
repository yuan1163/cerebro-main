import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// utils

import { t } from '@core/utils/translate';

// storages

import { useAuth } from '@core/storages/auth';

// styles

import styles from '../AuthLoginForm/styles.module.scss';

// components

import { Button } from '@core/ui/components/Button';
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { Grid } from '@core/ui/components/Grid';
import { Icon } from '@core/ui/components/Icon';
import { Input } from '@core/ui/components/Input';
import { Text } from '@core/ui/components/Text';

// icons

import ArrowLeftLineIcon from '@assets/icons/line/arrow-left.svg?component';
import PasscodeResetLineIcon from '@assets/icons/line/passcode-reset.svg?component';

export type AuthRestorePasswordFormData = {
  email: string;
};

type Props = {
  onConfirm: () => void;
  onBackToSignIn: () => void;
};

export const AuthRestorePasswordForm: React.FC<Props> = ({ onConfirm, onBackToSignIn }) => {
  // yup

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email(
        t(
          'login.form.email.emailFormatValidation.label',
          'Please enter valid email in the format example@mail.com.',
          'Alert indicating that form field validation is in the format example@mail.com.',
        ),
      )
      .required(
        t(
          'login.form.emal.emailRequired.label',
          'Please enter your email.',
          'Alert indicating that the email field is required.',
        ),
      ),
  });

  // form
  const {
    formState: { errors },
    handleSubmit,
    register,
    control,
    watch,
  } = useForm<AuthRestorePasswordFormData>({
    resolver: yupResolver(validationSchema),
  });
  const auth = useAuth();
  const watchEmail = watch('email');

  const submit = (data: AuthRestorePasswordFormData) => {
    auth.restorePassword(data);
    onConfirm();
  };

  return (
    <Card className={styles['card']}>
      <CardContent size='xl'>
        <form onSubmit={handleSubmit(submit)}>
          <Grid alignItems='center' justifyContent='center' direction='column'>
            {/* ICON */}

            <Grid item className='mb-6'>
              <Icon rounded size='3xl' variant='tint'>
                <PasscodeResetLineIcon />
              </Icon>
            </Grid>

            {/* TITLE */}

            <Grid direction='column'>
              <Text align='center' component='h1' variant='xl' weight='semibold'>
                {t('login.forgotPasswordPage.label', 'Forgot password', 'Title of Forgot password Page.')}
              </Text>
              <Text align='center' className='mt-1' color='typography-secondary' variant='sm'>
                {t(
                  'login.forgotPasswordPage.forgotPasswordPageIntro.label',
                  'No worries, we’ll send you reset instructions.',
                  'Introductory text for the Forgot password form.',
                )}
              </Text>
            </Grid>

            {/* EMAIL */}

            <Grid className='mt-6' component='fieldset' direction='column' fullWidth>
              <Controller
                name={'email'}
                control={control}
                rules={{ required: true }}
                render={(props) => (
                  <Input
                    inputId='email'
                    autoCapitalize='off'
                    autoComplete='email'
                    autoCorrect='off'
                    helperText={errors.email?.message}
                    label={t('login.form.email.label', 'Email', "User's email address.")}
                    name={props.field.name}
                    placeholder={t(
                      'login.form.email.placeholder.label',
                      'Enter email',
                      'Placeholder for email address.',
                    )}
                    severity={errors.email?.message ? 'error' : undefined}
                    onChange={(value): void => {
                      props.field.onChange(value);
                    }}
                    value={props.field.value}
                    type='email'
                  />
                )}
              />
            </Grid>
            {/* SUBMIT */}
            <Grid alignItems='center' justifyContent='center' className='mt-4' direction='column' fullWidth>
              <Button fullWidth size='lg' type='submit' variant='solid'>
                {t('login.resetPasswordButton.label', 'Reset password', 'Label for Reset password button.')}
              </Button>
              <Button
                className='mt-6'
                onClick={onBackToSignIn}
                size='md'
                startIcon={<ArrowLeftLineIcon />}
                type='submit'
                variant='text'
              >
                {t(
                  'login.forgotPasswordPage.backToSignIn.label',
                  'Back to Sign In',
                  'Label for Back to Sign In button.',
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};
