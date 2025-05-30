import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { observer } from 'mobx-react';

// form

import { Controller, Resolver, useForm } from 'react-hook-form';
import { formFieldSettings } from '@constants/formFieldSettings';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// utils

import { t } from '@core/utils/translate';

// storages

import { useAuth } from '@core/storages/auth';
import { useLocations } from '@core/storages/controllers/locations';
import { useUser, useUsers } from '@core/storages/controllers/users';
import { useTranslation } from '@core/storages/translation';

// types

import { Location, User, UserCategory, UserGroup, UserPermissions } from '@core/api/types';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Accordion } from '@core/ui/components/Accordion';
import { Button } from '@core/ui/components/Button';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { Grid } from '@core/ui/components/Grid';
import { IconButton } from '@core/ui/components/IconButton';
import { Input } from '@core/ui/components/Input';
import { ModalDelete } from '@core/ui/components/ModalDelete';
import { PasswordIndicator } from '@core/ui/components/PasswordIndicator';
import { PasswordInput } from '@core/ui/components/PasswordInput';
import { PhoneInput } from '@core/ui/components/PhoneInput';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { SelectUserGroups } from '../SelectUserGroups';
import { SelectUserLocations } from '../SelectUserLocations';
import { Text } from '@core/ui/components/Text';
import { UserCategorySelect } from '@core/ui/cerebro/UserCategorySelect';
import { UserRoleSelect } from '@core/ui/cerebro/UserRoleSelect';

// icons

import XCloseLineIcon from '@assets/icons/line/x-close.svg?component';
import { UploadImage } from '../UploadImage';

type Props = {
  className?: string;
  onClose?: () => void;
  user: Partial<User>;
};

export const ProfileEdit: React.FC<Props> = observer(({ className, onClose, user, ...props }) => {
  const controller = useUser(user);
  const translation = useTranslation();

  // const [data, update] = React.useState<Partial<User>>({
  //   ...user,
  //   lastLoginDate: undefined,
  //   lastLoginDateMs: undefined,
  //   smsStatus: undefined,
  //   groups: undefined,
  // });
  // TODO make components controlled as in AddUser

  // type UserEdit = {
  //   email: string;
  //   fname: string;
  //   jobTitle: string;
  //   language: string;
  //   lname: string;
  //   phone: string;
  // };

  // FORM VALIDATION

  const validationSchema = yup.object().shape({
    firstName: yup.string().required(formFieldSettings.user.firstName.required),
    lastName: yup.string().required(formFieldSettings.user.lastName.required),
    email: yup.string().email(formFieldSettings.user.email.invalid).required(formFieldSettings.user.email.required),
    phone: yup.string().optional(),
    jobTitle: yup.string().optional(),
    category: yup.string().optional(),
    // phone: yup
    //   .string()
    //   .required(
    //     t(
    //       'user.phoneValidation.label',
    //       'Please enter a phone number with both the country calling code and the national number.',
    //       'Input phone for field verification.',
    //     ),
    //   ),
  });

  // UseForm PARAMETERS

  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm<User>({
    defaultValues: { ...user },
    // TODO
    // @ts-ignore
    resolver: yupResolver(validationSchema),
  });

  const watchPassword = watch('newPassword');

  // ADMIN

  const [isAdmin, setIsAdmin] = React.useState(getValues().category === UserCategory.Administrator);

  type ChangePasswordForm = {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  };

  // const [passwordFormData, setPasswordFormData] = React.useState<Partial<ChangePasswordForm>>({
  //   passwordChanged: false,
  // });

  const passwordForm = useForm<ChangePasswordForm>();

  const navigate = useNavigate();
  const locations = useLocations();
  const company = locations.getCompany();
  const users = useUsers({
    locationId: company.locationId,
    fileName: 'avatar',
  });

  const remove = async (item: Partial<User>) => {
    await users.remove(item);
    // await controller.remove();
    navigate('..');
  };

  // dialogs

  const [openDialog, setDialogOpen] = React.useState(false);
  const [openChangePasswordDialog, setChangePasswordDialogOpen] = React.useState(false);

  // user role

  // const [roleSelected, setRoleSelected] = React.useState(user.role);

  // AUTHORIZATION

  const auth = useAuth();
  const profile = auth.profile;
  const hasEditRights =
    profile?.permissions?.includes(UserPermissions.Users) &&
    !(isAdmin && !profile?.permissions?.includes(UserPermissions.Roles));

  const changeCurrentPassword = () => {
    const data = passwordForm.getValues();
    const passwordInvalidMsgData: string[] = [];
    console.log('data: ', data);
    const { confirmPassword, newPassword, oldPassword } = data;

    initPasswordInvalidMsg();
    checkAllFieldEmpty();
    checkNewPassword();

    if (!passwordInvalidMsgData.length) {
      console.log('密碼更換成功');
      auth.resetPassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
        brand: import.meta.env.VITE_BRAND,
      });
    } else {
      console.log('更換失敗');
      setPasswordInvalidMsg(passwordInvalidMsgData);
    }

    function checkNewPassword() {
      if (newPassword && confirmPassword && newPassword !== confirmPassword) {
        // passwordInvalidMsgData.push('新密碼與二次確認密碼不一致，請確保兩者輸入相同。')
        passwordInvalidMsgData.push(
          'The new password and the confirmation password do not match. Please ensure both are entered the same',
        );
      }
    }
    function checkAllFieldEmpty() {
      // if(!oldPassword) passwordInvalidMsgData.push('目前密碼 欄位不得為空')
      if (!oldPassword) passwordInvalidMsgData.push('The current password field cannot be empty');

      // if(!newPassword) passwordInvalidMsgData.push('新密碼 欄位不得為空')
      if (!newPassword) passwordInvalidMsgData.push('The new password field cannot be empty');

      // if(!confirmPassword) passwordInvalidMsgData.push('新密碼再確認 欄位不得為空')
      if (!confirmPassword) passwordInvalidMsgData.push('The new password confirmation field cannot be empty');
    }
    function initPasswordInvalidMsg() {
      setPasswordInvalidMsg([]);
    }
  };

  // CATEGORY

  const [initialCategory, setInitialCategory] = useState<UserCategory>(user.category || UserCategory.Contact);
  const [selectedCategory, setSelectedCategory] = useState<UserCategory>(user.category || UserCategory.Contact);

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
    // 確保公司主要地點始終被包含在選擇中
    return controller.locations.length > 0 
      ? [...controller.locations, ...(controller.locations.some(loc => loc.locationId === defaultLocation.locationId) ? [] : [defaultLocation])]
      : [defaultLocation];
  });

  // 確保公司主要地點始終包含在selectedLocations中
  const handleSetSelectedLocations = (newLocations: Location[]) => {
    const companyLocation = locations.getCompany();
    // 如果新的地點列表不包含公司主要地點，則添加它
    if (!newLocations.some(loc => loc.locationId === companyLocation.locationId)) {
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

  const save = async (data: User) => {
    // phone

    // const phoneNumberWithCode = `${countryCallingCode}${data.phone}`;

    // password

    const passwordFormData = passwordForm.getValues();
    if (passwordFormData.oldPassword && passwordFormData.newPassword && passwordFormData.confirmPassword) {
      auth.resetPassword({
        oldPassword: passwordFormData.oldPassword,
        newPassword: passwordFormData.newPassword,
        brand: 'default',
      });
    }

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

    await controller.update({
      ...data,
      username: isAdmin ? data.email : undefined,
      category: selectedCategory,
    });
    // phone: phoneNumberWithCode,
    onClose?.();
  };

  // ON CANCEL

  const handleCancel = () => {
    setSelectedCategory(initialCategory);
    setSelectedLocations([...initialLocationsState]);
    setSelectedGroups([...initialGroupState]);
    onClose?.();
  };

  const [newPassword, setNewPassword] = useState('');
  const [passwordInvalidMsg, setPasswordInvalidMsg] = useState<string[]>([]);

  async function getNewPassword() {
    const newPwd = await controller.requestNewPassword(user.email);
    setNewPassword(newPwd);
  }
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
        title={t('user.editUser.label', 'Edit User', 'Editing User.')}
        disablePaddingBottom
      />
      <form id='profile-edit-form' className={styles['form']} onSubmit={handleSubmit(save)}>
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
                        name='firstName'
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Input
                            inputId='fname'
                            disabled={!hasEditRights}
                            helperText={errors?.firstName?.message}
                            label={t('user.firstNameInput.label', 'FIRST NAME', 'user first name label.')}
                            onChange={onChange}
                            placeholder={formFieldSettings.user.firstName.placeholder}
                            requiredLabel
                            severity={errors.firstName ? 'error' : undefined}
                            value={value}
                          />
                        )}
                      />
                    </Grid>

                    {/* LAST NAME */}

                    <Grid item>
                      <Controller
                        name='lastName'
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Input
                            inputId='lname'
                            disabled={!hasEditRights}
                            helperText={errors?.lastName?.message}
                            label={t('user.lastNameInput.label', 'LAST NAME', 'user last name label.')}
                            onChange={onChange}
                            placeholder={formFieldSettings.user.lastName.placeholder}
                            requiredLabel
                            severity={errors.lastName ? 'error' : undefined}
                            value={value}
                          />
                        )}
                      />
                    </Grid>

                    {/* EMAIL */}

                    <Grid item>
                      <Controller
                        name='email'
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Input
                            inputId='email'
                            disabled={!hasEditRights}
                            helperText={errors?.email?.message}
                            label={t('user.emailInput.label', 'EMAIL', 'user email label.')}
                            onChange={onChange}
                            placeholder={formFieldSettings.user.email.placeholder}
                            requiredLabel
                            severity={errors.email ? 'error' : undefined}
                            type='email'
                            value={value}
                          />
                        )}
                      />
                    </Grid>

                    {/* PHONE */}

                    <Grid item>
                      <Controller
                        name='phone'
                        control={control}
                        render={({ field: { onChange, value } }) => {
                          return <PhoneInput disabled={!hasEditRights} onChange={onChange} value={value} />;
                        }}
                      />
                    </Grid>

                    {/* JOB */}

                    <Grid item>
                      <Controller
                        name='jobTitle'
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Input
                            inputId='jobTitle'
                            disabled={!hasEditRights}
                            label={t('user.jobTitleInput.label', 'JOB', 'user job label.')}
                            onChange={onChange}
                            placeholder={t('user.jobTitleInputPlaceholder.label', 'Job Title', 'Job Title')}
                            value={value}
                          />
                        )}
                      />
                    </Grid>

                    {/* LANGUAGE */}

                    {/* <Grid item>
                              <Controller
                                name={'language'}
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                  <Input
                                    inputId='language'
                                    label={t('label.language', 'Language', 'Text for input language label')}
                                    placeholder='Add a language'
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

                  <Grid item>
                    <Controller
                      name='category'
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <UserCategorySelect
                          disabled={!profile?.permissions?.includes(UserPermissions.Roles)}
                          label={t('user.categoryInput.label', 'CATEGORY', 'user category label.')}
                          onSelect={(selectedValue) => {
                            onChange(selectedValue);
                            handleSelectCategory(selectedValue);
                          }}
                          placeholder={formFieldSettings.user.categories.placeholder}
                          value={value}
                        />
                      )}
                    />
                  </Grid>

                  {/* ROLE */}

                  {isAdmin && (
                    <Grid item>
                      <UserRoleSelect
                        label={t('user.roleInput.label', 'ROLE', 'user role label.')}
                        onSelect={(role) => {
                          setValue('role', role);
                          controller.grantRole(role);
                        }}
                        placeholder={t('user.roleInputPlaceholder.label', 'ROLE', 'user role label.')}
                        value={getValues().role}
                        disabled={!hasEditRights}
                      />
                    </Grid>
                  )}

                  {/* ADMIN LOCATION */}

                  <Grid item>
                    <Controller
                      control={control}
                      name='locationIds'
                      render={({ field }) => (
                        <SelectUserLocations
                          {...field}
                          inputId='locations'
                          disabled={!hasEditRights}
                          initial={selectedLocations}
                          label={t('location.locations.label', 'CATEGORY', 'user category label.')}
                          onAppend={handleAppendLocation}
                          onChange={handleSetSelectedLocations}
                          onRemove={handleRemoveLocation}
                          placeholder={formFieldSettings.user.locations.placeholder}
                          onlyShowCompany={true}
                        />
                      )}
                    />
                  </Grid>

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
                          label={t('user.groups.label', 'CATEGORY', 'user category label.')}
                          onAppend={handleAppendGroup}
                          onChange={setSelectedGroups}
                          onRemove={handleRemoveGroup}
                          placeholder={t('general.selectGroupFromList.label', 'Select User Groups', 'Select User Groups.')}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Accordion>
              {/* <Accordion square>
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button as={AccordionSummary} disableGutters expanded={open} size='small'>
                        Notifications
                      </Disclosure.Button>
                      <Disclosure.Panel>
                        <Grid container direction='column' spacing={2}>
                          <Grid item>
                            <FormControl fullWidth>
                              <FormLabel>Preferred method of contact</FormLabel>
                              <Card color='surface-02' fullWidth>
                                <CardContent>
                                 <Stack spacing={3}>
                                    <Checkbox
                                      inputId='text-checkbox'
                                      label={t('checkbox.label', 'Text', 'Label for checkbox')}
                                      size='sm'
                                      disabled
                                    />
                                    <Checkbox
                                      inputId='email-checkbox'
                                      label={t('checkbox.label', 'Email', 'Label for checkbox')}
                                      size='sm'
                                      disabled
                                    />
                                    <Checkbox
                                      inputId='call-checkbox'
                                      label={t('checkbox.label', 'Call', 'Label for checkbox')}
                                      size='sm'
                                      disabled
                                    />
                                  </Stack>
                                </CardContent>
                              </Card>
                            </FormControl>
                          </Grid>
                          <Grid item>
                            <FormControl fullWidth>
                              <FormLabel>Send notifications, when...</FormLabel>
                              <Card color='surface-02' fullWidth>
                                <CardContent>
                                  <Stack spacing={3}>
                                    <Checkbox
                                      inputId='critical-events-checkbox'
                                      label={t('checkbox.label', 'Critical events', 'Label for checkbox')}
                                      size='sm'
                                      disabled
                                    />
                                    <Checkbox
                                      inputId='tickets-checkbox'
                                      label={t(
                                        'checkbox.label',
                                        'Tickets create, commented, resolved',
                                        'Label for checkbox',
                                      )}
                                      size='sm'
                                      disabled
                                    />
                                    <Checkbox
                                      inputId='news-checkbox'
                                      label={t('checkbox.label', 'News and updates', 'Label for checkbox')}
                                      size='sm'
                                      disabled
                                    />
                                  </Stack>
                                </CardContent>
                              </Card>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </Accordion> */}

              {/* SECURITY */}

              {/* 先關閉用戶重新設定密碼的電子郵件功能 */}
              {isAdmin && (
                <Accordion disableSummaryGutters disableGutters title='Security'>
                  <Grid container direction='column' spacing={3}>
                    {profile && user.userId === profile.userId ? (
                      <>
                        <Grid item>
                          <Text color='typography-secondary' variant='sm'>
                            {t(
                              'general.confirmPassword.label',
                              'To set a new password confirm your current.',
                              'Title prompts users to verify their existing password before making changes.',
                            )}
                          </Text>
                        </Grid>
                        <Grid item>
                          <Controller
                            name={'oldPassword'}
                            control={passwordForm.control}
                            render={({ field: { onChange, value } }) => (
                              // label={formFieldSettings.user.password.currentPassword.label}
                              <PasswordInput
                                id='password'
                                autoComplete='off'
                                label={t('user.currentPassword.label', 'current password', 'current password')}
                                name='password'
                                onChange={onChange}
                                placeholder={t(
                                  'user.currentPasswordInputPlaceholder.label',
                                  'current password',
                                  'current password',
                                )}
                                value={value}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item>
                          <Controller
                            name={'newPassword'}
                            control={passwordForm.control}
                            // rules={{ required: true, validate: (value) => getValues().newPassword || '' }}
                            render={({ field: { onChange, value } }) => (
                              <PasswordInput
                                id='newPassword'
                                autoComplete='new-password'
                                label={t('user.newPasswordInput.label', 'new password', 'new password')}
                                onChange={onChange}
                                placeholder={t(
                                  'user.newPasswordInputPlaceholder.label',
                                  'new password',
                                  'new password',
                                )}
                                value={value}
                              />
                            )}
                          />
                        </Grid>
                        {/* <Grid item>
                          <PasswordIndicator score={watchPassword} />
                        </Grid> */}
                        <Grid item>
                          <Controller
                            name={'confirmPassword'}
                            control={passwordForm.control}
                            render={({ field: { onChange, value } }) => (
                              <PasswordInput
                                id='confirmPassword'
                                autoComplete='confirmPassword'
                                label={t('user.confirmPasswordInput.label', 'confirm password', 'confirm password')}
                                onChange={onChange}
                                placeholder={t(
                                  'user.confirmPasswordInputPlaceholder.label',
                                  'confirm password',
                                  'confirm password',
                                )}
                                value={value}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item>
                          <Button fullWidth variant='solid' onClick={changeCurrentPassword}>
                            {t('general.changeButton.label', 'Change', 'Change button.')}
                          </Button>
                        </Grid>

                        {passwordInvalidMsg.length > 0 &&
                          passwordInvalidMsg.map((item) => {
                            return (
                              <Text color='error' key={item} className='my-1'>
                                {item}
                              </Text>
                            );
                          })}
                      </>
                    ) : (
                      <Button onClick={getNewPassword} fullWidth variant='outlined'>
                        {t(
                          'general.resetPasswordButton.label',
                          'Send reset password email',
                          'A prompt that triggers an email to users for password recovery or change.',
                        )}
                      </Button>
                    )}

                    {newPassword &&
                      `
                          ${t('user.newPasswordInputPlaceholder.label', 'New password', 'New password')}：
                          ${newPassword}
                        `}
                  </Grid>
                </Accordion>
              )}

              {/* DELETE */}

              <Accordion
                disableSummaryGutters
                disableGutters
                title={t('user.deleteAccount.label', 'Delete account', 'Delete user account.')}
              >
                <Grid container direction='column' spacing={2}>
                  <Grid item>
                    <Text color='typography-secondary' variant='paragraph-md'>
                      {t(
                        'user.deleteUserCaption.label',
                        'Careful! This will permanently delete the user and all their information. After this, user will no longer have access to the system.',
                        'Delete group caption.',
                      )}
                    </Text>
                  </Grid>
                  <Grid item>
                    <Button color='error' fullWidth onClick={() => setDialogOpen(true)} type='button'>
                      {t('user.deleteAccount.label', 'Delete account', 'Delete user account.')}
                    </Button>
                  </Grid>
                </Grid>
              </Accordion>
            </Grid>
          </CardContent>
        </Scrollbar>
        <CardContent className={styles['card-footer']}>
          <Grid container direction='column' spacing={3}>
            {/* {isDirty && (
              <Grid item>
                <Grid alignItems='center' container spacing={2}>
                  <Grid item>
                    <Icon color='icon-tertiary' size='sm' variant='plain'>
                      <AlertCircleLineIcon />
                    </Icon>
                  </Grid>
                  <Grid item>
                    <Text color='typography-secondary' variant='sm' weight='medium'>
                      {t(
                        'general.youHaveUnsavedChanges.label',
                        'You have unsaved changes.',
                        'Label displayed to alert that there are edits made to the content.',
                      )}
                    </Text>
                  </Grid>
                </Grid>
              </Grid>
            )} */}

            {/* SUBMIT */}

            <Grid item>
              <Grid container spacing={2} fullWidth>
                <Grid item lg={6}>
                  <Button color='secondary' fullWidth variant='outlined' onClick={handleCancel} type='button'>
                    {t('general.cancelButton.label', 'Cancel', 'Cancel button.')}
                  </Button>
                </Grid>
                <Grid item lg={6}>
                  <Button fullWidth type='submit' variant='solid'>
                    {t(
                      'general.saveChanges.label',
                      'Save changes',
                      'Allows users to confirm any modifications they have made to content.',
                    )}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <ModalDelete
            content={`${t(
              'user.deleteAccountQuestion.label',
              'Are you sure you want to remove user?',
              'Confirmation prompt: Delete user profile?',
            )} ${user.firstName} ${user.lastName} ${t(
              'company.fromCerebroApp.label',
              'from Cerebro App?',
              'Refers to the source app.',
            )}`}
            open={openDialog}
            title={t('user.deleteAccount.label', 'Delete account', 'Delete user account.')}
            close={() => {
              setDialogOpen(false);
              onClose?.();
            }}
            cancel={() => {
              setDialogOpen(false);
            }}
            confirm={() => {
              remove(user);
              onClose?.();
            }}
          />
        </CardContent>
      </form>
    </>
  );
});
