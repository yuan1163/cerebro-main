import React from 'react';

// utils

import { t } from '@core/utils/translate';

// form

import { formFieldSettings } from '@constants/formFieldSettings';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Avatar } from '@core/ui/components/Avatar';
import { Button } from '@core/ui/components/Button';
import { Grid } from '@core/ui/components/Grid';
import { Text } from '@core/ui/components/Text';

type Props = {
  className?: string;
  clearImage?: () => void;
  getImage?: () => string | undefined;
  setImage?: (file: File) => void;
  stillLife?: boolean;
  title?: string;
} & React.HTMLAttributes<HTMLElement>;

export const UploadImage: React.FC<Props> = ({
  className,
  clearImage,
  getImage,
  setImage,
  stillLife,
  title,
  ...props
}) => {
  const imageInputRef = React.useRef<HTMLInputElement>(null);
  const profileImage = getImage ? getImage() : undefined;
  return (
    <Grid alignItems='center' justifyContent='between' fullWidth>
      <Grid direction='column' container spacing={3}>
        <Grid item direction='column'>
          <Text variant='sm' weight='medium'>
            {title}
          </Text>
          <Text color='typography-secondary' variant='sm'>
            {t(
              'general.imageRecommendedSize.label',
              'Recommended 500x500 px',
              'The recommended size for the uploaded image.',
            )}
          </Text>
        </Grid>
        <Grid item>
          <Grid container spacing={2}>
            {profileImage === undefined ? (
              <Grid item>
                <Button onClick={() => imageInputRef.current?.click()} size='sm' variant='outlined'>
                  {t('general.imageFileUploadButton.label', 'Upload', 'Upload button.')}
                </Button>
              </Grid>
            ) : null}
            {profileImage !== undefined ? (
              <>
                <Grid item>
                  <Button onClick={() => imageInputRef.current?.click()} size='sm' variant='outlined'>
                    {t('general.imageFileChangeButton.label', 'Change', 'Change button.')}
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    onClick={() => {
                      if (clearImage) {
                        clearImage();
                      }
                    }}
                    size='sm'
                    variant='outlined'
                  >
                    {t('general.imageFileRemoveButton.label', 'Remove', 'Removal or deletion of an image button.')}
                  </Button>
                </Grid>
              </>
            ) : null}
          </Grid>
        </Grid>
      </Grid>
      <input
        accept='image/*'
        hidden
        onChange={(event) => {
          if (event.target.files && event.target.files.length > 0 && setImage) {
            setImage(event.target.files[0]);
          }
          event.target.value = '';
        }}
        ref={imageInputRef}
        type='file'
      />
      {/* <Button onClick={() => imageInputRef.current?.click()} variant='outlined'>
                          Upload
                        </Button> */}
      <Avatar className={styles['avatar']} size='4xl' src={profileImage} stillLife={stillLife} />
    </Grid>
  );
};
