import React from 'react';
import { observer } from 'mobx-react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// utils

import { t } from '@core/utils/translate';

// types

import { LoginOutput } from '@core/api/types';

// storages

import { useAuth } from '@core/storages/auth';
import { useUI } from '@core/storages/ui';

// styles

import styles from './styles.module.scss';

// components

import { Button } from '@core/ui/components/Button';
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { Checkbox } from '@core/ui/components/Checkbox';
import { Grid } from '@core/ui/components/Grid';
import { Input } from '@core/ui/components/Input';
import { PasswordInput } from '@core/ui/components/PasswordInput';
import { Text } from '@core/ui/components/Text';

export type AuthLoginFormData = {
  username: string;
  password: string;
  remember?: boolean;
};

export type AuthLoginFormOutput = LoginOutput;

type Props = {
  onForgotPassword: () => void;
};

export const AuthLoginForm: React.FC<Props> = observer(({ onForgotPassword }) => {
  // yup

  const validationSchema = yup.object().shape({
    username: yup
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
    password: yup
      .string()
      .min(
        8,
        t(
          'login.form.password.passwordCharCountValidation.label',
          'Password must be at least 8 characters.',
          'Alert indicating that the password length must be more than 8 characters.',
        ),
      )
      .max(60)
      .required(
        t(
          'login.form.password.passwordRequired.label',
          'Please enter your password.',
          'Alert indicating that the email field is required.',
        ),
      ),
  });

  // FORM

  const defaultValues: AuthLoginFormData = {
    username: '',
    password: '',
    remember: false,
  };

  const {
    formState: { errors },
    handleSubmit,
    register,
    control,
  } = useForm<AuthLoginFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });

  const auth = useAuth();
  const ui = useUI();

  const [alertMessage, setAlertMessage] = React.useState(false);

  const submit = async (data: AuthLoginFormData) => {
    const result: any = await auth.login(data);
    if (result.resultCode === 4) {
      setAlertMessage(true);
    }
  };

  const handleKeyDown = (submit: () => void) => (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      submit();
    }
  };

  // checkbox

  const [checkboxValue, setCheckboxValue] = React.useState(true);

  const handleChange = () => {
    setCheckboxValue(!checkboxValue);
  };

  const cerebroBrand = import.meta.env.VITE_BRAND === 'cerebro';

  return (
    <Card className={styles['card']}>
      <CardContent size='xl'>
        <form className='w-full' onSubmit={handleSubmit(submit)}>
          <Grid container direction='column'>
            {/* TITLE */}

            <Grid item fullWidth>
              <Grid alignItems='center' justifyContent='center' item fullWidth>
                <Grid direction='column'>
                  <Text align='center' component='h1' variant='xl' weight='semibold'>
                    {cerebroBrand && t('login.loginPage.label', 'Welcome to Cerebro', 'Title of Login page.')}
                  </Text>
                  <Text align='center' className='mt-1' color='typography-secondary' variant='sm'>
                    {t(
                      'login.loginPageFormIntro.label',
                      'Enter your credentials to access your account',
                      'Introductory text for the login form.',
                    )}
                  </Text>
                </Grid>
              </Grid>
            </Grid>

            {/* NOTIFICATION */}

            {alertMessage && (
              <Card className='mt-6 rounded' color='error'>
                <CardContent size='xs'>
                  <Text align='center' color='error' variant='sm'>
                    {t(
                      'login.loginPageFormAlert.label',
                      'Incorrect email or password, please try again',
                      'Invalid form content information label.',
                    )}
                  </Text>
                </CardContent>
              </Card>
            )}

            {/* FIELDSET */}

            <Grid component='fieldset' container direction='column'>
              <Grid className='mt-6' item fullWidth>
                <Grid container direction='column' spacing={4}>
                  {/* EMAIL */}
                  <Grid item>
                    <Controller
                      name={'username'}
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <Input
                          autoCapitalize='off'
                          autoComplete='email'
                          autoCorrect='off'
                          // defaultValue={defaultValues.username}
                          helperText={errors.username?.message}
                          inputId='email'
                          label={t('login.form.email.label', 'Email', "User's email address.")}
                          onChange={onChange}
                          onKeyDown={handleKeyDown(handleSubmit(submit))}
                          placeholder={t(
                            'login.form.email.placeholder.label',
                            'Enter email',
                            'Placeholder for email address.',
                          )}
                          severity={errors.username?.message ? 'error' : undefined}
                          value={value}
                          type='email'
                        />
                      )}
                    />
                  </Grid>
                  {/* PASSWORD */}
                  <Grid item>
                    <Controller
                      name={'password'}
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <PasswordInput
                          id='current-password'
                          autoComplete='current-password'
                          // defaultValue={defaultValues.password}
                          helperText={errors.password?.message}
                          label={t('login.form.password.label', 'Password', "User's password.")}
                          onChange={onChange}
                          onKeyDown={handleKeyDown(handleSubmit(submit))}
                          placeholder={t(
                            'login.form.password.placeholder.label',
                            'Enter password',
                            'Placeholder for password.',
                          )}
                          severity={errors.password?.message ? 'error' : undefined}
                          value={value}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>

              {/* CHECKBOX */}

              <Grid className='mt-5' item>
                <Grid container alignItems='center' justifyContent='between'>
                  <Checkbox
                    inputId='stay-signed-in'
                    label={t('login.form.rememberMeCheckbox.label', 'Remember me', 'Remember me checkbox label.')}
                    labelColor='typography-secondary'
                    size='sm'
                    {...register('remember')}
                    isChecked={checkboxValue}
                    onChange={handleChange}
                  />
                  <Button onClick={onForgotPassword} variant='link'>
                    {t('login.form.forgotPassword.label', 'Forgot password', 'Label for forgot password button.')}
                  </Button>
                </Grid>
              </Grid>

              {/* SUBMIT */}

              <Grid item className='mt-6'>
                <Button fullWidth size='lg' loading={ui.acting} type='submit' variant='solid'>
                  {ui.acting
                    ? t('login.signInLoadingButton.label', 'Signing In...', 'Label for Sign In button loading state.')
                    : t('login.signInButton.label', 'Sign In', 'Label for Sign In button.')}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
});
