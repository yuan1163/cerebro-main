// utils

import { t } from '@core/utils/translate';

export const formFieldSettings = {
  user: {
    firstName: {
      label: t('user.firstNameInput.label', 'First Name', 'User first name input label.'),
      placeholder: t('user.firstNameInputPlaceholder.label', 'Enter first name', 'User first name input placeholder.'),
      required: t(
        'user.firstNameValidation.label',
        'You must enter first name.',
        'Input first name for field verification.',
      ),
    },
    lastName: {
      label: t('user.lastNameInput.label', 'Last Name', 'User last name input label.'),
      placeholder: t('user.lastNameInputPlaceholder.label', 'Enter last name', 'User last name input placeholder.'),
      required: t(
        'user.lastNameValidation.label',
        'You must enter last name.',
        'Input last name for field verification.',
      ),
    },
    email: {
      label: t('user.emailInput.label', 'Email', 'User email input Label.'),
      placeholder: t('user.emailInputPlaceholder.label', 'Enter email', 'User email input placeholder.'),
      invalid: t(
        'user.emailFormatValidation.label',
        'Please enter valid email in the format example@mail.com.',
        'Input a correctly formatted email for field validation.',
      ),
      required: t('user.emailValidation.label', 'You must enter email.', 'Input email for field verification.'),
    },
    jobTitle: {
      label: t('user.jobTitleInput.label', 'Job title', 'Job title input field.'),
      placeholder: t('user.jobTitleInputPlaceholder.label', 'Enter job title', 'User job title input placeholder.'),
    },
    categories: {
      label: t('user.categoryInput.label', 'Category', 'User category.'),
      placeholder: t('user.categoryInputPlaceholder.label', 'Select category', 'User category placeholder.'),
    },
    role: {
      label: t('user.roleInput.label', 'Role', 'User role input label.'),
      placeholder: t('user.roleSelect.label', 'Select role', 'User role select label.'),
    },
    locations: {
      label: t('location.locations.label', 'Locations', 'Locations.'),
      placeholder: t('location.selectUserLocations.label', 'Select User Locations', 'Select user locations.'),
    },
    password: {
      currentPassword: {
        label: t('user.currentPassword.label', 'Current password', "User's present password."),
        placeholder: t(
          'user.currentPasswordInputPlaceholder.label',
          'Input your current password',
          'Current password field.',
        ),
      },
      newUserPassword: {
        label: t('user.newPasswordInput.label', 'New password', 'Confirm password field.'),
        placeholder: t(
          'user.newPasswordInputPlaceholder.label',
          'Confirm password',
          'Confirm password field placeholder.',
        ),
      },
      confermedUserPassword: {
        label: t('user.confirmPasswordInput.label', 'Confirm password', 'Confirm password field.'),
        placeholder: t('user.confirmPasswordInputPlaceholder.label', 'Re-enter password', 'Re-enter password field.'),
      },
    },
    group: {
      name: {
        label: t('user.groupNameInput.label', 'Group name', 'The collective label for a team.'),
        placeholder: t('user.groupNameInputPlaceholder.label', 'Enter group name', 'Group name placeholder.'),
      },
      required: t(
        'user.groupNameInputVerification.label',
        'You must enter your group name.',
        'Input group name for verification.',
      ),
      description: {
        label: t('user.descriptionInput.label', 'Description', 'User group description field.'),
        placeholder: t(
          'user.descriptionInputPlaceholder.label',
          'Enter description of group',
          'Group name placeholder.',
        ),
        required: t(
          'user.groupDescriptionInputVerification.label',
          'You must enter description of group.',
          'Input description of group for verification.',
        ),
      },
    },
    groups: {
      label: t('user.groups.label', 'Groups', 'User groups.'),
    },
  },
  asset: {
    name: {
      label: t('asset.name.label', 'Asset Name', 'Asset name.'),
      placeholder: t(
        'asset.assetNameInputPlaceholder.label',
        'Enter asset name',
        'Enter the asset name into the field.',
      ),
    },
    description: {
      label: t('asset.assetDescriptionInput.label', 'Description', 'Field for asset description.'),
      placeholder: t(
        'asset.assetDescriptionInputPlaceholder.label',
        'Enter description of asset',
        'Placeholder for asset description field.',
      ),
    },
    manufacturer: {
      label: t('asset.manufacturer.label', 'Manufacturer', "Device's manufacturer."),
      placeholder: t(
        'asset.manufacturerInputPlaceholder.label',
        'Enter manufacturer',
        "Placeholder for device's manufacturer field.",
      ),
    },
    costRange: {
      label: t('asset.costRange.label', 'Cost Range', 'Cost range of device.'),
      placeholder: t(
        'asset.costRangeInputPlaceholder.label',
        'Enter approximate range',
        'Placeholder for Cost Range Field.',
      ),
    },
    serialNumber: {
      label: t('asset.serialNumber.label', 'Serial number', 'Serial number of asset or device.'),
      placeholder: t(
        'asset.serialNumberInputPlaceholder.label',
        'Enter serial number',
        'Placeholder for serial number field.',
      ),
    },
    trackerID: {
      label: t('asset.uid.label', 'UID', 'Unique identifier.'),
      placeholder: t(
        'asset.uidInputPlaceholder.label',
        'Enter asset UID',
        'Unique Asset Identifier Input Placeholder.',
      ),
    },
    group: {
      required: t(
        'asset.groupNameInputVerification.label',
        'You must enter your group name.',
        'Input group name for verification.',
      ),
      description: {
        required: t(
          'asset.groupDescriptionInputVerification.label',
          'You must enter description of group.',
          'Input description of group for verification.',
        ),
      },
    },
    classes: {
      name: {
        label: t('asset.classNameInput.label', 'Class name', 'Class name field.'),
        placeholder: t('asset.classNameInputPlaceholder.label', 'Enter class name', 'Class name field placeholder.'),
      },
      label: t('asset.classes.label', 'Classes', 'Categories of assets.'),
      placeholder: t('asset.classesPlaceholder.label', 'Select Asset Classes', 'Asset Classes Input Placeholder.'),
    },
    devices: {
      description: {
        label: t('asset.classDescriptionInput.label', 'Description', 'Field for class description.'),
        placeholder: t(
          'asset.classDescriptionInputPlaceholder.label',
          'Enter description of class',
          'Placeholder for field for class description.',
        ),
      },
      label: t('asset.devices.label', 'Devices', 'Devices'),
      placeholder: t('asset.devicesPlaceholder.label', 'Select Asset Devices', 'Asset Devices Input Placeholder.'),
    },
  },
  customer: {
    customerName: {
      label: t('customer.customerName.label', 'Customer Name', 'Customer name field.'),
    },
    customerNo: {
      label: t('customer.customerNo.label', 'Customer No.', 'Customer number field.'),
    },
    primaryContact: {
      label: t('customer.primaryContact.label', 'Primary Contact', 'Primary contact field.'),
    },
    mobileNo: {
      label: t('customer.mobileNo.label', 'Mobile No.', 'Mobile number field.'),
    },
    postcode: {
      label: t('customer.postcode.label', 'Post code', 'Post code field.'),
    },
    country: {
      label: t('customer.country.label', 'Country', 'Country field.'),
    },
    state: {
      label: t('customer.state.label', 'State', 'State field.'),
    },
    city: {
      label: t('customer.city.label', 'City', 'City field.'),
    },
  },
};
