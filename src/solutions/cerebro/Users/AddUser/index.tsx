import React, { useEffect, useState } from 'react';

import { AsYouType, getCountries, getExampleNumber, parsePhoneNumber } from 'libphonenumber-js';
import examples from 'libphonenumber-js/mobile/examples';

// form

import { Controller, useForm } from 'react-hook-form';
import { formFieldSettings } from '@constants/formFieldSettings';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// utils

import { t } from '@core/utils/translate';

// storages

import { useAuth } from '@core/storages/auth';
import { useLocations } from '@core/storages/controllers/locations';
import { useUser } from '@core/storages/controllers/users';
import { useUI } from '@core/storages/ui';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// types

import { Location, User, UserCategory, UserGroup, UserPermissions } from '@core/api/types';

// components

import { Accordion } from '@core/ui/components/Accordion';
import { Button } from '@core/ui/components/Button';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { Grid } from '@core/ui/components/Grid';
import { IconButton } from '@core/ui/components/IconButton';
import { Input } from '@core/ui/components/Input';
import { PhoneInput } from '@core/ui/components/PhoneInput';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { SelectUserGroups } from '../SelectUserGroups';
import { SelectUserLocations } from '../SelectUserLocations';
import { UploadImage } from '../UploadImage';
import { UserCategorySelect } from '@core/ui/cerebro/UserCategorySelect';
import { UserRoleSelect } from '@core/ui/cerebro/UserRoleSelect';

// icons

import XCloseLineIcon from '@assets/icons/line/x-close.svg?component';

type Props = {
  category?: UserCategory;
  className?: string;
  onClose?: () => void;
};

export const AddUser: React.FC<Props> = ({ className, onClose, category }) => {
  const ui = useUI();
  //const [formData, setFormData] = React.useState<Partial<User>>({});
  const controller = useUser({});

  const locations = useLocations();

  // const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setFormData((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  // };

  // PHONE

  const [currentLibphonenumber, setCurrentLibphonenumber] = React.useState(getCountries()?.[227]);
  const phoneNational = getExampleNumber(currentLibphonenumber, examples)?.formatNational();

  const validationSchema = yup.object().shape({
    firstName: yup.string().required(formFieldSettings.user.firstName.required),
    lastName: yup.string().required(formFieldSettings.user.lastName.required),
    email: yup.string().email(formFieldSettings.user.email.invalid).required(formFieldSettings.user.email.required),
    // phone: yup
    //   .string()
    //   .required(
    //     `${t(
    //       'user.phoneValidation.label',
    //       'You must enter phone in the format',
    //       'Input phone for field verification.',
    //     )} ${phoneNational}.`,
    //   ),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    category,
  };

  const {
    formState: { errors },
    control,
    handleSubmit,
    getValues,
    setValue,
  } = useForm<User>({
    defaultValues,
    // TODO
    // @ts-ignore
    resolver: yupResolver(validationSchema),
  });

  const [isAdmin, setIsAdmin] = React.useState(getValues().category === UserCategory.Administrator);

  // CATEGORY

  const [initialCategory, setInitialCategory] = useState<UserCategory>(category || UserCategory.Contact);
  const [selectedCategory, setSelectedCategory] = useState<UserCategory>(category || UserCategory.Contact);

  const handleSelectCategory = (category: UserCategory) => {
    setSelectedCategory(category);
  };

  // USER GROUP

  const [initialGroupState, setInitialGroupState] = useState([...controller.groups]);
  const [selectedGroups, setSelectedGroups] = useState([...controller.groups]);

  const handleAppendGroup = (group: UserGroup) => {
    setSelectedGroups((prev) => [...prev, group]);
  };

  const handleRemoveGroup = (group: UserGroup) => {
    setSelectedGroups((prev) => prev.filter((g) => g.groupId !== group.groupId));
  };

  // ADMIN LOCATION

  const [initialLocationsState, setInitialLocationsState] = useState([...controller.locations]);
  const [selectedLocations, setSelectedLocations] = useState(() => {
    const defaultLocation = locations.getCompany();
    return controller.locations.length > 0
      ? [
          ...controller.locations,
          ...(controller.locations.some((loc) => loc.locationId === defaultLocation.locationId)
            ? []
            : [defaultLocation]),
        ]
      : [defaultLocation];
  });

  // 確保公司主要地點始終包含在selectedLocations中
  const handleSetSelectedLocations = (newLocations: Location[]) => {
    const companyLocation = locations.getCompany();
    // 如果新的地點列表不包含公司主要地點，則添加它
    if (!newLocations.some((loc) => loc.locationId === companyLocation.locationId)) {
      newLocations.push(companyLocation);
    }
    setSelectedLocations(newLocations);
  };

  const handleAppendLocation = (location: Location) => {
    setSelectedLocations((prevLocations) => [...prevLocations, location]);
  };

  const handleRemoveLocation = (locationToRemove: Location) => {
    const companyLocation = locations.getCompany();
    // 如果嘗試移除的是公司主要地點，則不執行任何操作
    if (locationToRemove.locationId === companyLocation.locationId) {
      return;
    }
    setSelectedLocations((prevLocations) =>
      prevLocations.filter((location) => location.locationId !== locationToRemove.locationId),
    );
  };

  // ON SAVE

  // 儲存個人訊息
  const save = async (data: Partial<User>) => {
    // SAVING GROUPS

    const currentGroups = controller.groups;

    const groupsToAdd = selectedGroups.filter((group) => !currentGroups.some((g) => g.groupId === group.groupId));
    const groupsToRemove = currentGroups.filter((group) => !selectedGroups.some((g) => g.groupId === group.groupId));
    await Promise.all(
      groupsToRemove.map(async (group) => {
        await controller.removeGroup(group);
      }),
    );
    await Promise.all(
      groupsToAdd.map(async (group) => {
        await controller.addGroup(group);
      }),
    );
    setInitialGroupState([...selectedGroups]);

    // SAVING LOCATIONS

    const currentLocations = controller.locations;
    const locationsToAdd = selectedLocations.filter(
      (location) => !currentLocations.some((loc) => loc.locationId === location.locationId),
    );
    const locationsToRemove = currentLocations.filter(
      (location) => !selectedLocations.some((loc) => loc.locationId === location.locationId),
    );
    await Promise.all(
      locationsToRemove.map(async (location) => {
        await controller.removeLocation(location);
      }),
    );
    await Promise.all(
      locationsToAdd.map(async (location) => {
        await controller.addLocation(location);
      }),
    );
    setInitialLocationsState([...controller.locations]);

    // @ts-ignore
    if (isAdmin) controller.requestNewPassword(data.email);

    await controller.add({
      ...data,
      username: isAdmin ? data.email : undefined,
      role: undefined,
      groups: undefined,
      category: selectedCategory,
    });

    onClose?.();
  };

  React.useEffect(() => {
    const company = locations.getCompany();
    if (!controller.locations.includes(company)) {
      controller.addLocation(locations.getCompany());
    }
  }, []);

  // ON CANCEL

  const handleCancel = () => {
    setSelectedCategory(initialCategory);
    setSelectedLocations([...initialLocationsState]);
    setSelectedGroups([...initialGroupState]);
    onClose?.();
  };

  // AUTHORIZATION

  const auth = useAuth();
  const profile = auth.profile;
  const hasEditRights =
    profile?.permissions?.includes(UserPermissions.Users) &&
    !(isAdmin && !profile?.permissions?.includes(UserPermissions.Roles));

  return (
    <>
      <CardHeader
        action={
          <IconButton
            ariaLabel={t('general.closeButton.label', 'Close', 'Close button.')}
            size='lg'
            onClick={onClose}
            variant='text'
          >
            <XCloseLineIcon />
          </IconButton>
        }
        title={t('user.addUser.label', 'Add User', 'Add User Title.')}
        // disablePaddingBottom
        borderBottom
        className='py-5'
      />
      <form id='add-user-form' className={styles['form']} onSubmit={handleSubmit(save)}>
        <Scrollbar>
          <CardContent className={styles['card-content']}>
            <Grid direction='column'>
              <Accordion
                disableSummaryGutters
                disableGutters
                defaultOpen
                title={t('solutions.basicInformation.label', 'Basic information', 'Basic information header.')}
              >
                <Grid direction='column'>
                  <Grid container direction='column' spacing={2}>
                    {/* AVATAR */}

                    <Grid item className='mb-2'>
                      <UploadImage
                        clearImage={() => controller.clearAvatar()}
                        getImage={() => controller.getAvatar()}
                        setImage={(file) => controller.setAvatar(file)}
                        title={t('user.profileImage.label', 'Profile Image', 'User avatar image.')}
                      />
                    </Grid>

                    {/* FIRST NAME */}

                    <Grid item>
                      <Controller
                        name={'firstName'}
                        control={control}
                        defaultValue={defaultValues.firstName}
                        render={({ field: { onChange, value } }) => (
                          <Input
                            inputId='fname'
                            disabled={!hasEditRights}
                            helperText={errors?.firstName?.message}
                            label={formFieldSettings.user.firstName.label}
                            onChange={onChange}
                            placeholder={formFieldSettings.user.firstName.placeholder}
                            requiredLabel
                            severity={errors.firstName?.message ? 'error' : undefined}
                            value={value}
                          />
                        )}
                      />
                    </Grid>

                    {/* LAST NAME */}

                    <Grid item>
                      <Controller
                        name={'lastName'}
                        control={control}
                        defaultValue={defaultValues.lastName}
                        render={({ field: { onChange, value } }) => (
                          <Input
                            inputId='lname'
                            disabled={!hasEditRights}
                            helperText={errors?.lastName?.message}
                            label={formFieldSettings.user.lastName.label}
                            onChange={onChange}
                            placeholder={formFieldSettings.user.lastName.placeholder}
                            requiredLabel
                            severity={errors.lastName?.message ? 'error' : undefined}
                            value={value}
                          />
                        )}
                      />
                    </Grid>

                    {/* EMAIL */}

                    <Grid item>
                      <Controller
                        name={'email'}
                        control={control}
                        defaultValue={defaultValues.email}
                        render={({ field: { onChange, value } }) => (
                          <Input
                            inputId='email'
                            disabled={!hasEditRights}
                            helperText={errors?.email?.message}
                            label={formFieldSettings.user.email.label}
                            onChange={onChange}
                            placeholder={formFieldSettings.user.email.placeholder}
                            requiredLabel
                            severity={errors.email?.message ? 'error' : undefined}
                            type='email'
                            value={value}
                          />
                        )}
                      />
                    </Grid>

                    {/* PHONE */}

                    <Grid item>
                      <Controller
                        name={'phone'}
                        control={control}
                        defaultValue={defaultValues.phone}
                        render={({ field: { onChange, value } }) => (
                          <PhoneInput
                            disabled={!hasEditRights}
                            onChange={onChange}
                            // severity={String(errors.phone)}
                            value={value}
                          />
                        )}
                      />
                    </Grid>

                    {/* JOB */}

                    <Grid item>
                      <Controller
                        name={'jobTitle'}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Input
                            inputId='jobTitle'
                            disabled={!hasEditRights}
                            label={formFieldSettings.user.jobTitle.label}
                            onChange={onChange}
                            placeholder={formFieldSettings.user.jobTitle.placeholder}
                            value={value}
                          />
                        )}
                      />
                    </Grid>

                    {/* TIMEZONE */}

                    {/* <Grid item>
                      <Controller
                        name={'timezone'}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Input
                            inputId='timezone'
                            label={t('label.timezone', 'Timezone', 'Text for input label')}
                            placeholder='Enter job title'
                            onChange={onChange}
                            value={value}
                            disabled={!hasEditRights}
                          />
                        )}
                      />
                    </Grid> */}
                  </Grid>
                </Grid>
              </Accordion>
              <Accordion
                disableSummaryGutters
                disableGutters
                title={t('general.access.label', 'Access', 'Ability to enter.')}
              >
                <Grid container direction='column' spacing={2}>
                  {/* CATEGORY */}

                  {/* <Grid item>
                    <Controller
                      name='category'
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <UserCategorySelect
                          disabled={!profile?.permissions?.includes(UserPermissions.Roles)}
                          label={formFieldSettings.user.categories.label}
                          onSelect={(selectedValue) => {
                            onChange(selectedValue);
                            handleSelectCategory(selectedValue);
                          }}
                          placeholder={formFieldSettings.user.categories.placeholder}
                          value={value}
                        />
                      )}
                    />
                  </Grid> */}

                  {/* ROLE */}

                  {isAdmin && (
                    <Grid item>
                      <UserRoleSelect
                        disabled={!hasEditRights}
                        label={formFieldSettings.user.role.label}
                        onSelect={(role) => {
                          setValue('role', role);
                          controller.grantRole(role);
                        }}
                        placeholder={formFieldSettings.user.role.placeholder}
                        value={getValues().role}
                      />
                    </Grid>
                  )}

                  {/* ADMIN LOCATION */}

                  {/* {isAdmin && (
                    <Grid item>
                      <Controller
                        control={control}
                        name='locationIds'
                        render={({ field }) => (
                          <SelectUserLocations
                            {...field}
                            disabled={!hasEditRights}
                            initial={selectedLocations}
                            inputId='locations'
                            label={formFieldSettings.user.locations.label}
                            onAppend={handleAppendLocation}
                            onChange={handleSetSelectedLocations}
                            onRemove={handleRemoveLocation}
                            placeholder={formFieldSettings.user.locations.placeholder}
                            onlyShowCompany={true}
                          />
                        )}
                      />
                    </Grid>
                  )} */}

                  {/* USER GROUP */}

                  <Grid item>
                    <Controller
                      control={control}
                      name='groups'
                      render={({ field }) => (
                        <SelectUserGroups
                          {...field}
                          inputId='groups'
                          disabled={!hasEditRights}
                          initial={selectedGroups}
                          label={formFieldSettings.user.groups.label}
                          onAppend={handleAppendGroup}
                          onChange={setSelectedGroups}
                          onRemove={handleRemoveGroup}
                          placeholder={t('user.selectUserGroups.label', 'Select User Groups', 'Select User Groups.')}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Accordion>
            </Grid>
          </CardContent>
        </Scrollbar>
        {hasEditRights && (
          <CardContent className={styles['card-footer']}>
            <Grid container spacing={2} fullWidth>
              <Grid item lg={6}>
                <Button color='secondary' fullWidth variant='outlined' onClick={handleCancel} type='button'>
                  {t('general.cancelButton.label', 'Cancel', 'Cancel button.')}
                </Button>
              </Grid>
              <Grid item lg={6}>
                <Button fullWidth variant='solid' type='submit'>
                  {t('user.addUser.label', 'Add User', 'Add User Title.')}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        )}
      </form>
    </>
  );
};
