// utils

import { t } from '@core/utils/translate';

export type ResultOutput = {
  resultCode: number;
  resultCodeDesc?: string;
  resultCodeMessage?: string;
};

export type LoginInput = {
  username: string;
  password: string;
};

export type LoginOutput = ResultOutput & {
  token: string;
  tokenExpire?: Date;
  tokenExpireMs?: number;
};

export type RestorePasswordInput = {
  username: string;
  brand?: string;
};

export type ResetPasswordInput = {
  oldPassword?: string;
  newPassword: string;
  brand?: string;
};

export enum LocationType {
  Company = 1,
  Region = 2,
  Formation = 3,
  Area = 4,
  Building = 5,
  Space = 6,
  Zone = 7,
  Installation = 8,
  ProductionLine = 9,
  Process = 10,
}

export type Location = {
  branchSolutions: number; // bitmask, see SolutionsMasks type @ src\core\ui\types.ts
  children?: Location[];
  city: string;
  country: string;
  creationDate?: string;
  creationDateMs?: number;
  files?: FileRecord[];
  latitude: number;
  locationId: number;
  longitude: number;
  maxUsers: number;
  name: string;
  riskLevel?: number; // TODO
  shape: number[][];
  state: string;
  street: string;
  timezone: string;
  type: LocationType;
  userAccess: boolean;
  zip: string;
};

export type LocationsInput = Record<string, any> &
  Partial<{
    locationId: string;
    name: string;
    type: string;
    deviceType: string;
    fileName: string;
    flat: boolean;
  }>;

export type LocationsOutput = ResultOutput & {
  locations: Location[];
};

export type UserProfileOutput = ResultOutput & {
  user: User;
};

export type Device = {
  deviceId: string;
  deviceType: number;
  connectionStatus: number;
  ownerLocationId: number;
  currentLocationId: number;
  name: string;
  serialNumber: string;
  userId: number;
  firmware: string;
  updateDate: Date;
  updateDateMs: number;
  startDate: Date;
  startDateMs: number;
  connectionDate: Date;
  connectionDateMs: number;
  posX: number;
  posY: number;
  posR: number;
  proxyId: string;
};

export type Rule = {
  ruleId: number;
  name: string;
  actionText: string;
  alertPriority: AlertPriority;
};

export enum AlertType {
  ZoneRule = 1,
  Connection = 2,
  Both = 3,
  CurrentRule = 4,
}

export enum AlertStatus {
  Active = 1,
  Resolved = 2,
}

export type Notification = {
  actionText: string;
  alertId: number;
  alertPriority: AlertPriority;
  alertType: AlertType;
  asset: Asset;
  creationDate: Date;
  creationDateMs: number;
  device: Device;
  location: Location;
  locationId: number;
  posX: number;
  posY: number;
  ruleId: number;
  status: AlertStatus;
  updateDate: Date;
  updateDateMs: number;
  issueIds: number[];

  alertName: string;
  alertImageUrl: string;
};

export type NotificationsInput = Record<string, any> &
  Partial<{
    assetGroupId: number;
    assetId: number;
    deviceId: number;
    endDate: number;
    locationId: number;
    startDate: number;
    priority: AlertPriority;
    triggerType: number;
  }>;

export type NotificationsOutput = {
  alerts: Notification[];
} & ResultOutput;

export enum AlertPriority {
  Trivial = 0,
  Normal = 1,
  Warning = 2,
  Critical = 3,
}

export type Alert = {
  alertType: number;
  status: number;
  alertPriority: AlertPriority;
  updateDate: Date;
  updateDateMs: number;
  locationId: number;
  location: Location;
  device: Device;
  asset?: Asset;
  rules?: Rule[];
};

export type AlertsInput = Record<string, any> &
  Partial<{
    locationId: number;
    deviceId: string;
    deviceType: number;
    assetId: number;
    priority: AlertPriority;
  }>;

export type AlertsOutput = ResultOutput & {
  activeAlerts: Alert[];
};

export type DevicesInput = Record<string, any> &
  Partial<{
    locationId: number;
    deviceId?: string;
  }>;

export type DevicesOutput = ResultOutput & {
  devices: Device[];
};

export const getDeviceType = (deviceType: number): string => {
  // TODO move to enum or/and models
  switch (deviceType) {
    case 101:
      return t('asset.station.label', 'Station', 'Centralized location or setup for managing and accessing devices.');
    case 102:
      return t('asset.tracker.label', 'Tracker', 'Tools or systems used to monitor and follow activities.');
    case 500:
      return t('deviceTypes.Cameras', 'Cameras', 'Cameras device type.');
    default:
      return t('asset.unknownDevice.label', 'Unknown Device', 'Unknown device.');
  }
};

export type MapDimensions = {
  width: number;
  height: number;
};

export type MapInput = Record<string, any> &
  Partial<{
    locationId: number;
  }>;

export type MapOutput = ResultOutput & {
  map: MapDimensions;
};

export type AssetsInput = Record<string, any> &
  Partial<{
    locationId: number;
    groupId?: number;
  }>;

export type AssetGroupsInput = Record<string, any> &
  Partial<{
    locationId: number;
  }>;

export type AssetGroupsOutput = ResultOutput & {
  groups: AssetGroup[];
};

export type AssetGroup = {
  groupId: number;
  locationId: number;
  name: string;
  assetsCount: number;

  description: string;
  style: string;
};

export enum AssetPriority {
  Low = 0,
  Medium = 1,
  High = 2,
}

export type Asset = {
  assetId: number;
  name: string;
  serialNumber: string;
  assetUid: string;
  assetPriority: AssetPriority;
  locationId: number;
  location: Location;
  groups: AssetGroup[];
  devices: Device[];
  description: string;
  manufacturer: string;
  costRange: string;
  files?: {
    url: string;
  }[];
};

export type AssetsOutput = ResultOutput & {
  assets: Asset[];
};

export type UserRole = {
  roleId: number;
  name: string;
  description: string;
  permissions: UserPermissions[];
};

export enum UserPermissions {
  Unlimited = 0,
  Roles = 1,
  Locations = 3,
  Users = 4,
  Assets = 5,
  LocationsDevices = 6,
}

export enum UserCategory {
  Administrator = 1,
  Contact = 2,
  Trackable = 3,
}

export type User = {
  userId: number;
  username: string;
  password?: string;
  confirmPassword?: string; // TODO
  newPassword?: string; // TODO
  passwordSet: boolean;
  firstName: string;
  lastName: string;
  email: string;
  emailStatus: number;
  creationDate: Date;
  creationDateMs: number;
  lastLoginDate: Date;
  lastLoginDateMs: number;
  permissions: UserPermissions[];
  role: UserRole | undefined;
  phone?: string;
  language: string;
  locationIds: number[];
  jobTitle?: string;
  smsStatus?: number;
  files?: {
    url: string;
  }[];
  groups: UserGroup[];
  category: UserCategory;
};

export type UsersInput = Record<string, any> &
  Partial<{
    locationId: number;
  }>;

export type UsersOutput = ResultOutput & {
  users: User[];
};

export type UserRolesInput = Record<string, any> & {};

export type UserRolesOutput = ResultOutput & {
  roles: UserRole[];
};

export type UserProperities = {
  name: string;
  value: any;
};

export type UserProperitiesOutput = ResultOutput & {
  properties: UserProperities[];
};

export type UserProperitiesInput = Record<string, any> &
  Partial<{
    name: string | undefined;
    // value: string | undefined;
  }>;

export type FilesInput = Record<string, any> &
  Partial<{
    fileId: number;
    type: number;
    objectId: string;
    locationId: number;
    name: string;
    getUrl: boolean;
  }>;

export type FileRecord = {
  fileId: number;
  type: number;
  name: string;
  size: number;
  objectId: string;
  publicAccess: boolean;
  contentType: string;
  url: string;
};

export type FilesOutput = ResultOutput & {
  files: FileRecord[];
};

export type DeviceInput = Record<string, any> &
  Partial<{
    locationId: number | null;
    deviceId: string | null;
  }>;

export type DeviceCommandInput = Record<string, any> &
  Partial<{
    locationId: number | null;
  }>;

export type DeviceParameter = {
  name?: string | null;
  index?: string | null;
  value?: string | null;
};

export type DeviceParametersOutput = ResultOutput & {
  parameters: DeviceParameter[];
};

export type DeviceCommandData = {
  command: {
    deviceId?: string | null;
    commandType?: number | null;
    parameters?: DeviceParameter[];
  };
};

export type UserGroup = {
  'groupId': number;
  'name': string;
  'description': string;
  'style': string;
  'locationId': number;
};

export type UserGroupsInput = Record<string, any> &
  Partial<{
    locationId: number;
    userId: number;
    groupId: number;
  }>;

export type UserGroupsOutput = ResultOutput & {
  groups: UserGroup[];
};

export enum IssuePriority {
  Critical = 4,
  High = 3,
  Medium = 2,
  Low = 1,
}

export enum IssueStatus {
  Open = 1,
  InProgress = 2,
  Resolved = 3,
  Closed = 4,
}

export type Issue = {
  issueId: number;
  locationId: number;
  alerts: Partial<Notification>[];
  priority: IssuePriority;
  dueDate: Date;
  status: IssueStatus;
  creationDate: Date;
  creationDateMs: number;
  updateDate: Date;
  updateDateMs: number;
  title: string;
  text: string;
  assigneeId: number;
  assignee: User;
  reporterId: number;
  reporter: User;
  //comments
};

export type IssuesInput = Record<string, any> &
  Partial<{
    locationId: number;
    issueId: number;
    startDate: Date;
    endDate: Date;
    assigneeId: number;
    reporterId: number;
    status: IssueStatus;
    priority: IssuePriority;
    searchBy: string;
  }>;

export type IssuesOutput = ResultOutput & {
  issues: Issue[];
};

export type AlertsTotalInput = Record<string, any> &
  Partial<{
    locationId: number;
    startDate: string; // Date
    endDate: string; // Date
    status: number;
    priority: number;
    aggregation: number;
    byLocations: boolean;
    byAlertType: boolean;
    byPriority: boolean;
    byDeviceType: boolean;
    triggerType: number;
  }>;

export type AlertsTotal = {
  alertType: number;
  alertPriority: number;
  startDate: Date;
  startDateMs: number;
  locationId: number;
  deviceType: number;
  total: number;
};

export type AlertsTotalOutput = ResultOutput & {
  totals: AlertsTotal[];
};

export type CommentInput = Record<string, any> &
  Partial<{
    locationId: number;
    issueId: number;
    //commentId: number;
  }>;

export type Comment = {
  commentId: number;
  author: Partial<User>;
  creationDate: Date;
  creationDateMs: number;
  updateDate: Date;
  updateDateMs: number;
  text: string;
};
