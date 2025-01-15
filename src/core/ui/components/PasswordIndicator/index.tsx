import React from 'react';

// utils

import { t } from '@core/utils/translate';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Grid } from '@core/ui/components/Grid';
import { Text } from '@core/ui/components/Text';
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { CheckboxMarker } from '@core/ui/components/CheckboxMarker';

type Props = {
  className?: string;
  score?: string;
} & React.HTMLAttributes<HTMLElement>;

export const PasswordIndicator: React.FC<Props> = ({ className, score }) => {
  const atLeastOneUppercase = /[A-Z]/g;
  const atLeastOneNumeric = /[0-9]/g;
  const atLeastOneSpecialChar = /[#?!@$%^&*-]/g;
  const eightCharsOrMore = /.{8,}/g;

  const minLength = Boolean(score?.match(eightCharsOrMore));
  const minUpperCase = Boolean(score?.match(atLeastOneUppercase));
  const minNumbers = Boolean(score?.match(atLeastOneNumeric));
  const minSpecSymbols = Boolean(score?.match(atLeastOneSpecialChar));

  const scoreValue = Number(minLength) + Number(minUpperCase) + Number(minNumbers) + Number(minSpecSymbols);

  const passwordStrength = () => {
    switch (scoreValue) {
      case 0:
        return {
          color: 'error',
          label: 'Very weak',
          indicator: [
            { id: 1, color: 'default' },
            { id: 2, color: 'default' },
            { id: 3, color: 'default' },
            { id: 4, color: 'default' },
          ],
        };
      case 1:
        return {
          color: 'error',
          label: 'Weak',
          indicator: [
            { id: 1, color: 'error' },
            { id: 2, color: 'default' },
            { id: 3, color: 'default' },
            { id: 4, color: 'default' },
          ],
        };
      case 2:
        return {
          color: 'warning',
          label: 'Average',
          indicator: [
            { id: 1, color: 'warning' },
            { id: 2, color: 'warning' },
            { id: 3, color: 'default' },
            { id: 4, color: 'default' },
          ],
        };
      case 3:
        return {
          color: 'success',
          label: 'Strong',
          indicator: [
            { id: 1, color: 'success' },
            { id: 2, color: 'success' },
            { id: 3, color: 'success' },
            { id: 4, color: 'default' },
          ],
        };
      case 4:
        return {
          color: 'primary',
          label: 'Excellent',
          indicator: [
            { id: 1, color: 'primary' },
            { id: 2, color: 'primary' },
            { id: 3, color: 'primary' },
            { id: 4, color: 'primary' },
          ],
        };
      default:
        return { color: 'none', label: 'Weak' };
    }
  };

  return (
    <Grid container direction='column' spacing={2}>
      <Grid item>
        <Grid alignItems='center' justifyContent='between' fullWidth>
          <ul className={styles['list']}>
            {passwordStrength().indicator?.map((item) => (
              <li key={item.id} className={cn(styles['list-item'], styles[`list-item-color-${item.color}`])} />
            ))}
          </ul>
          <Text
            align='right'
            className={styles['label']}
            color={passwordStrength().color}
            variant='xs'
            weight='medium'
            whiteSpace='nowrap'
          >
            {passwordStrength().label}
          </Text>
        </Grid>
      </Grid>
      <Grid item>
        <Card color='surface-02' fullWidth>
          <CardContent>
            <Grid display='grid' className='grid grid-cols-2 gap-y-2 gap-x-2'>
              {[
                {
                  'label': t(
                    'general.min8character.label',
                    'min 8 character',
                    'Specifies that a password must consist of at least eight characters to meet minimum security requirements.',
                  ),
                  'isValid': minLength,
                },
                {
                  'label': t(
                    'general.oneUppercase.label',
                    'one uppercase',
                    'Indicates that a password should include at least one capital letter to enhance its security.',
                  ),
                  'isValid': minUpperCase,
                },
                {
                  'label': t(
                    'general.oneNumberCharacter.label',
                    'one number character',
                    'Specifies that a password should contain at least one numerical digit to improve its security.',
                  ),
                  'isValid': minNumbers,
                },
                {
                  'label': t(
                    'general.oneSpecialCharacter.label',
                    'one special character',
                    'Signifies that a password should include at least one non-alphanumeric character to enhance its security.',
                  ),
                  'isValid': minSpecSymbols,
                },
              ].map((item) => (
                <Grid key={item.label} alignItems='center' item>
                  <CheckboxMarker isChecked={item.isValid} rounded size='sm' />
                  <Text className='ml-2 select-none' color='typography-secondary' variant='xs'>
                    {item.label}
                  </Text>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
