import React, { useEffect, useState } from 'react';
import { useAuth } from '@core/storages/auth';
import { Controller, useForm } from 'react-hook-form';
import { Link, useSearchParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import * as yup from 'yup';

// utils

import { t } from '@core/utils/translate';

// styles

import styles from '@core/ui/cerebro/forms/AuthLoginForm/styles.module.scss';

// components

import { AuthPageLayout } from '@core/ui/templates/AuthPageLayout';
import { Button } from '@core/ui/components/Button';
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { CheckboxMarker } from '@core/ui/components/CheckboxMarker';
import { Grid } from '@core/ui/components/Grid';
import { Icon } from '@core/ui/components/Icon';
import { PasswordIndicator } from '@core/ui/components/PasswordIndicator';
import { PasswordInput } from '@core/ui/components/PasswordInput';
import { Text } from '@core/ui/components/Text';

// icons

import ArrowLeftLineIcon from '@assets/icons/line/arrow-left.svg?component';
import Key01LineIcon from '@assets/icons/line/key-01.svg?component';

type Form = {
  password: string;
  cpassword: string;
};

export const AuthResetPage = () => {
  const [searchParams] = useSearchParams();

  // yup

  const oneNumberCharacter = /\d/;
  const oneUpperCase = /^(?=.*?[A-Z])/;
  const oneSpecialCharacter = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  const validationSchema = yup.object().shape({
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
      .required('')
      .matches(
        RegExp(`${oneUpperCase}`),
        t(
          'general.oneUppercase.label',
          'one uppercase',
          'Indicates that a password should include at least one capital letter to enhance its security.',
        ),
      )
      .matches(
        RegExp(`${oneNumberCharacter}`),
        t(
          'general.oneNumberCharacter.label',
          'one number character',
          'Specifies that a password should contain at least one numerical digit to improve its security.',
        ),
      )
      .matches(
        RegExp(`${oneSpecialCharacter}`),
        t(
          'general.oneSpecialCharacter.label',
          'one special character',
          'Signifies that a password should include at least one non-alphanumeric character to enhance its security.',
        ),
      ),
    cpassword: yup
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
          'general.confirmPasswordInput.label',
          'Sorry, the page you’re looking for doesn’t exist anymore or has been moved or archived.',
          'The desired webpage is no longer available.',
        ),
      )
      .oneOf(
        [yup.ref('password')],
        t('general.matchPassword.label', 'Passwords do not match.', 'Two passwords entered by the user do not match.'),
      ),
  });

  const DefaultFormValues = {
    registration: {
      password: '',
      cpassword: '',
    },
  };

  const {
    formState: { errors },
    handleSubmit,
    register,
    getValues,
    control,
    watch,
  } = useForm<Form>({
    defaultValues: DefaultFormValues.registration,
    criteriaMode: 'all',
    // FIXME: build error with parameter { abortEarly: false }, remove it temporarily
    // resolver: yupResolver(validationSchema, { abortEarly: false }),
    resolver: yupResolver(validationSchema),
  });
  const auth = useAuth();

  const watchFields = watch();
  const watchPassword = watch('password');

  // password score

  const valueOfNewPassword: string = getValues().password?.toString();

  const [passwordStrength, setPasswordStrength] = React.useState<any>({
    minLength: null,
    minUpperCase: null,
    minNumbers: null,
    minSpecSymbols: null,
  });

  React.useEffect(() => {
    setPasswordStrength({
      minLength: valueOfNewPassword?.length >= 12,
      minUpperCase: !!oneUpperCase.test(valueOfNewPassword),
      minNumbers: !!oneNumberCharacter.test(valueOfNewPassword),
      minSpecSymbols: !!oneSpecialCharacter.test(valueOfNewPassword),
    });
  }, [valueOfNewPassword]);

  // submit

  const send = (data: Form) => {
    //console.log('send', data);
    const token = searchParams.get('token');
    auth.resetPassword({ newPassword: data.password, brand: import.meta.env.VITE_BRAND }, token);
  };

  return (
    <AuthPageLayout>
      <Card className={styles['card']}>
        <CardContent size='xl'>
          <Grid alignItems='center' container direction='column' justifyContent='center' spacing={6}>
            <Grid item>
              <Icon rounded size='3xl' variant='tint'>
                <Key01LineIcon />
              </Icon>
            </Grid>
            <Grid item fullWidth>
              <Grid alignItems='center' container direction='column' justifyContent='center' spacing={1}>
                <Grid item>
                  <Text align='center' variant='xl' weight='semibold'>
                    {t(
                      'general.setNewPassword.label',
                      'Set new password',
                      'Indicates the action of establishing a fresh password for an account, typically during the password reset or change process.',
                    )}
                  </Text>
                </Grid>
                <Grid item>
                  <Text align='center' color='typography-secondary' variant='sm'>
                    {t(
                      'general.setNewPassword.label',
                      'Reset your new password',
                      'Action of establishing a fresh password for an account.',
                    )}
                  </Text>
                </Grid>
              </Grid>
            </Grid>
            <Grid item fullWidth>
              <form onSubmit={handleSubmit(send)} className='w-full'>
                <Grid direction='column'>
                  <Grid>
                    <Controller
                      name={'password'}
                      control={control}
                      rules={{ required: true, validate: (value) => getValues().password || '' }}
                      render={({ field: { onChange, value } }) => (
                        <PasswordInput
                          id='password'
                          // helperText={
                          //     <ErrorMessage
                          //       errors={errors}
                          //       name='password'
                          //       render={({ messages }) =>
                          //         messages &&
                          //         Object.entries(messages).map(([type, message]) => (
                          //           <React.Fragment key={type}>
                          //             {message}
                          //           </React.Fragment>
                          //         ))
                          //       }
                          //     />
                          //   }
                          label={t(
                            'general.createPassword.label',
                            'Create password',
                            'Action of establishing a new password.',
                          )}
                          onChange={onChange}
                          placeholder={t(
                            'general.enterNewPassword.label',
                            'Enter new password',
                            'Instructs the user to input a fresh password.',
                          )}
                          value={value}
                        />
                      )}
                    />
                  </Grid>
                  {/* PASSWORD SRTENGTH METER */}

                  {watchPassword && <PasswordIndicator score={watchPassword} />}

                  {/* CONFIRM */}

                  <Grid item className='mt-3'>
                    <Controller
                      name={'cpassword'}
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <PasswordInput
                          id='cpassword'
                          helperText={errors.password?.message}
                          label={t('user.confirmPasswordInput.label', 'Confirm password', 'Confirm password field.')}
                          onChange={onChange}
                          value={value}
                          placeholder={t(
                            'user.confirmPasswordInputPlaceholder.label',
                            'Re-enter password',
                            'Re-enter password field.',
                          )}
                          severity={
                            errors.cpassword?.message &&
                            t('general.errorVerification.label', 'error', 'Verification mistake.')
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid item className='mt-5'>
                    <Button fullWidth type='submit' size='lg' onClick={() => send(getValues())}>
                      {t('login.resetPasswordButton.label', 'Reset password', 'Label for Reset password button.')}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
            <Grid item>
              <Button component={Link} to='/login' fullWidth startIcon={<ArrowLeftLineIcon />} variant='text'>
                {t(
                  'login.forgotPasswordPage.backToSignIn.label',
                  'Back to Sign In',
                  'Label for Back to Sign In button.',
                )}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </AuthPageLayout>
  );
};
