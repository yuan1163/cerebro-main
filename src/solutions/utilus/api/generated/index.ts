import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { fetcher } from '../service';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type AffectedRowsOutput = {
  __typename?: 'AffectedRowsOutput';
  count: Scalars['Int'];
};

export type AggregateAlert = {
  __typename?: 'AggregateAlert';
  _avg?: Maybe<AlertAvgAggregate>;
  _count?: Maybe<AlertCountAggregate>;
  _max?: Maybe<AlertMaxAggregate>;
  _min?: Maybe<AlertMinAggregate>;
  _sum?: Maybe<AlertSumAggregate>;
};

export type AggregateCompany = {
  __typename?: 'AggregateCompany';
  _avg?: Maybe<CompanyAvgAggregate>;
  _count?: Maybe<CompanyCountAggregate>;
  _max?: Maybe<CompanyMaxAggregate>;
  _min?: Maybe<CompanyMinAggregate>;
  _sum?: Maybe<CompanySumAggregate>;
};

export type AggregateDevice = {
  __typename?: 'AggregateDevice';
  _avg?: Maybe<DeviceAvgAggregate>;
  _count?: Maybe<DeviceCountAggregate>;
  _max?: Maybe<DeviceMaxAggregate>;
  _min?: Maybe<DeviceMinAggregate>;
  _sum?: Maybe<DeviceSumAggregate>;
};

export type AggregateDeviceType = {
  __typename?: 'AggregateDeviceType';
  _avg?: Maybe<DeviceTypeAvgAggregate>;
  _count?: Maybe<DeviceTypeCountAggregate>;
  _max?: Maybe<DeviceTypeMaxAggregate>;
  _min?: Maybe<DeviceTypeMinAggregate>;
  _sum?: Maybe<DeviceTypeSumAggregate>;
};

export type AggregateEvent = {
  __typename?: 'AggregateEvent';
  _avg?: Maybe<EventAvgAggregate>;
  _count?: Maybe<EventCountAggregate>;
  _max?: Maybe<EventMaxAggregate>;
  _min?: Maybe<EventMinAggregate>;
  _sum?: Maybe<EventSumAggregate>;
};

export type AggregateFormation = {
  __typename?: 'AggregateFormation';
  _avg?: Maybe<FormationAvgAggregate>;
  _count?: Maybe<FormationCountAggregate>;
  _max?: Maybe<FormationMaxAggregate>;
  _min?: Maybe<FormationMinAggregate>;
  _sum?: Maybe<FormationSumAggregate>;
};

export type AggregatePriority = {
  __typename?: 'AggregatePriority';
  _avg?: Maybe<PriorityAvgAggregate>;
  _count?: Maybe<PriorityCountAggregate>;
  _max?: Maybe<PriorityMaxAggregate>;
  _min?: Maybe<PriorityMinAggregate>;
  _sum?: Maybe<PrioritySumAggregate>;
};

export type AggregateRegion = {
  __typename?: 'AggregateRegion';
  _avg?: Maybe<RegionAvgAggregate>;
  _count?: Maybe<RegionCountAggregate>;
  _max?: Maybe<RegionMaxAggregate>;
  _min?: Maybe<RegionMinAggregate>;
  _sum?: Maybe<RegionSumAggregate>;
};

export type AggregateSmartPole = {
  __typename?: 'AggregateSmartPole';
  _avg?: Maybe<SmartPoleAvgAggregate>;
  _count?: Maybe<SmartPoleCountAggregate>;
  _max?: Maybe<SmartPoleMaxAggregate>;
  _min?: Maybe<SmartPoleMinAggregate>;
  _sum?: Maybe<SmartPoleSumAggregate>;
};

export type AggregateSolution = {
  __typename?: 'AggregateSolution';
  _avg?: Maybe<SolutionAvgAggregate>;
  _count?: Maybe<SolutionCountAggregate>;
  _max?: Maybe<SolutionMaxAggregate>;
  _min?: Maybe<SolutionMinAggregate>;
  _sum?: Maybe<SolutionSumAggregate>;
};

export type AggregateUser = {
  __typename?: 'AggregateUser';
  _avg?: Maybe<UserAvgAggregate>;
  _count?: Maybe<UserCountAggregate>;
  _max?: Maybe<UserMaxAggregate>;
  _min?: Maybe<UserMinAggregate>;
  _sum?: Maybe<UserSumAggregate>;
};

export type AggregateUserGroup = {
  __typename?: 'AggregateUserGroup';
  _avg?: Maybe<UserGroupAvgAggregate>;
  _count?: Maybe<UserGroupCountAggregate>;
  _max?: Maybe<UserGroupMaxAggregate>;
  _min?: Maybe<UserGroupMinAggregate>;
  _sum?: Maybe<UserGroupSumAggregate>;
};

export type AggregateUserRole = {
  __typename?: 'AggregateUserRole';
  _avg?: Maybe<UserRoleAvgAggregate>;
  _count?: Maybe<UserRoleCountAggregate>;
  _max?: Maybe<UserRoleMaxAggregate>;
  _min?: Maybe<UserRoleMinAggregate>;
  _sum?: Maybe<UserRoleSumAggregate>;
};

export type AggregateZone = {
  __typename?: 'AggregateZone';
  _avg?: Maybe<ZoneAvgAggregate>;
  _count?: Maybe<ZoneCountAggregate>;
  _max?: Maybe<ZoneMaxAggregate>;
  _min?: Maybe<ZoneMinAggregate>;
  _sum?: Maybe<ZoneSumAggregate>;
};

export type Alert = {
  __typename?: 'Alert';
  device?: Maybe<Device>;
  deviceId?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  message?: Maybe<Scalars['String']>;
  priority?: Maybe<Priority>;
  priorityId?: Maybe<Scalars['Int']>;
};

export type AlertAvgAggregate = {
  __typename?: 'AlertAvgAggregate';
  deviceId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  priorityId?: Maybe<Scalars['Float']>;
};

export type AlertAvgOrderByAggregateInput = {
  deviceId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  priorityId?: InputMaybe<SortOrder>;
};

export type AlertCountAggregate = {
  __typename?: 'AlertCountAggregate';
  _all: Scalars['Int'];
  deviceId: Scalars['Int'];
  id: Scalars['Int'];
  message: Scalars['Int'];
  priorityId: Scalars['Int'];
};

export type AlertCountOrderByAggregateInput = {
  deviceId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  message?: InputMaybe<SortOrder>;
  priorityId?: InputMaybe<SortOrder>;
};

export type AlertCreateInput = {
  device?: InputMaybe<DeviceCreateNestedOneWithoutAlertsInput>;
  message?: InputMaybe<Scalars['String']>;
  priority?: InputMaybe<PriorityCreateNestedOneWithoutAlertsInput>;
};

export type AlertCreateManyDeviceInput = {
  id?: InputMaybe<Scalars['Int']>;
  message?: InputMaybe<Scalars['String']>;
  priorityId?: InputMaybe<Scalars['Int']>;
};

export type AlertCreateManyDeviceInputEnvelope = {
  data: Array<AlertCreateManyDeviceInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type AlertCreateManyInput = {
  deviceId?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  message?: InputMaybe<Scalars['String']>;
  priorityId?: InputMaybe<Scalars['Int']>;
};

export type AlertCreateManyPriorityInput = {
  deviceId?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  message?: InputMaybe<Scalars['String']>;
};

export type AlertCreateManyPriorityInputEnvelope = {
  data: Array<AlertCreateManyPriorityInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type AlertCreateNestedManyWithoutDeviceInput = {
  connect?: InputMaybe<Array<AlertWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AlertCreateOrConnectWithoutDeviceInput>>;
  create?: InputMaybe<Array<AlertCreateWithoutDeviceInput>>;
  createMany?: InputMaybe<AlertCreateManyDeviceInputEnvelope>;
};

export type AlertCreateNestedManyWithoutPriorityInput = {
  connect?: InputMaybe<Array<AlertWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AlertCreateOrConnectWithoutPriorityInput>>;
  create?: InputMaybe<Array<AlertCreateWithoutPriorityInput>>;
  createMany?: InputMaybe<AlertCreateManyPriorityInputEnvelope>;
};

export type AlertCreateOrConnectWithoutDeviceInput = {
  create: AlertCreateWithoutDeviceInput;
  where: AlertWhereUniqueInput;
};

export type AlertCreateOrConnectWithoutPriorityInput = {
  create: AlertCreateWithoutPriorityInput;
  where: AlertWhereUniqueInput;
};

export type AlertCreateWithoutDeviceInput = {
  message?: InputMaybe<Scalars['String']>;
  priority?: InputMaybe<PriorityCreateNestedOneWithoutAlertsInput>;
};

export type AlertCreateWithoutPriorityInput = {
  device?: InputMaybe<DeviceCreateNestedOneWithoutAlertsInput>;
  message?: InputMaybe<Scalars['String']>;
};

export type AlertGroupBy = {
  __typename?: 'AlertGroupBy';
  _avg?: Maybe<AlertAvgAggregate>;
  _count?: Maybe<AlertCountAggregate>;
  _max?: Maybe<AlertMaxAggregate>;
  _min?: Maybe<AlertMinAggregate>;
  _sum?: Maybe<AlertSumAggregate>;
  deviceId?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  message?: Maybe<Scalars['String']>;
  priorityId?: Maybe<Scalars['Int']>;
};

export type AlertListRelationFilter = {
  every?: InputMaybe<AlertWhereInput>;
  none?: InputMaybe<AlertWhereInput>;
  some?: InputMaybe<AlertWhereInput>;
};

export type AlertMaxAggregate = {
  __typename?: 'AlertMaxAggregate';
  deviceId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  message?: Maybe<Scalars['String']>;
  priorityId?: Maybe<Scalars['Int']>;
};

export type AlertMaxOrderByAggregateInput = {
  deviceId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  message?: InputMaybe<SortOrder>;
  priorityId?: InputMaybe<SortOrder>;
};

export type AlertMinAggregate = {
  __typename?: 'AlertMinAggregate';
  deviceId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  message?: Maybe<Scalars['String']>;
  priorityId?: Maybe<Scalars['Int']>;
};

export type AlertMinOrderByAggregateInput = {
  deviceId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  message?: InputMaybe<SortOrder>;
  priorityId?: InputMaybe<SortOrder>;
};

export type AlertOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type AlertOrderByWithAggregationInput = {
  _avg?: InputMaybe<AlertAvgOrderByAggregateInput>;
  _count?: InputMaybe<AlertCountOrderByAggregateInput>;
  _max?: InputMaybe<AlertMaxOrderByAggregateInput>;
  _min?: InputMaybe<AlertMinOrderByAggregateInput>;
  _sum?: InputMaybe<AlertSumOrderByAggregateInput>;
  deviceId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  message?: InputMaybe<SortOrder>;
  priorityId?: InputMaybe<SortOrder>;
};

export type AlertOrderByWithRelationInput = {
  device?: InputMaybe<DeviceOrderByWithRelationInput>;
  deviceId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  message?: InputMaybe<SortOrder>;
  priority?: InputMaybe<PriorityOrderByWithRelationInput>;
  priorityId?: InputMaybe<SortOrder>;
};

export enum AlertScalarFieldEnum {
  DeviceId = 'deviceId',
  Id = 'id',
  Message = 'message',
  PriorityId = 'priorityId'
}

export type AlertScalarWhereInput = {
  AND?: InputMaybe<Array<AlertScalarWhereInput>>;
  NOT?: InputMaybe<Array<AlertScalarWhereInput>>;
  OR?: InputMaybe<Array<AlertScalarWhereInput>>;
  deviceId?: InputMaybe<IntNullableFilter>;
  id?: InputMaybe<IntFilter>;
  message?: InputMaybe<StringNullableFilter>;
  priorityId?: InputMaybe<IntNullableFilter>;
};

export type AlertScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<AlertScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<AlertScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<AlertScalarWhereWithAggregatesInput>>;
  deviceId?: InputMaybe<IntNullableWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  message?: InputMaybe<StringNullableWithAggregatesFilter>;
  priorityId?: InputMaybe<IntNullableWithAggregatesFilter>;
};

export type AlertSumAggregate = {
  __typename?: 'AlertSumAggregate';
  deviceId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  priorityId?: Maybe<Scalars['Int']>;
};

export type AlertSumOrderByAggregateInput = {
  deviceId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  priorityId?: InputMaybe<SortOrder>;
};

export type AlertUpdateInput = {
  device?: InputMaybe<DeviceUpdateOneWithoutAlertsNestedInput>;
  message?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  priority?: InputMaybe<PriorityUpdateOneWithoutAlertsNestedInput>;
};

export type AlertUpdateManyMutationInput = {
  message?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type AlertUpdateManyWithWhereWithoutDeviceInput = {
  data: AlertUpdateManyMutationInput;
  where: AlertScalarWhereInput;
};

export type AlertUpdateManyWithWhereWithoutPriorityInput = {
  data: AlertUpdateManyMutationInput;
  where: AlertScalarWhereInput;
};

export type AlertUpdateManyWithoutDeviceNestedInput = {
  connect?: InputMaybe<Array<AlertWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AlertCreateOrConnectWithoutDeviceInput>>;
  create?: InputMaybe<Array<AlertCreateWithoutDeviceInput>>;
  createMany?: InputMaybe<AlertCreateManyDeviceInputEnvelope>;
  delete?: InputMaybe<Array<AlertWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<AlertScalarWhereInput>>;
  disconnect?: InputMaybe<Array<AlertWhereUniqueInput>>;
  set?: InputMaybe<Array<AlertWhereUniqueInput>>;
  update?: InputMaybe<Array<AlertUpdateWithWhereUniqueWithoutDeviceInput>>;
  updateMany?: InputMaybe<Array<AlertUpdateManyWithWhereWithoutDeviceInput>>;
  upsert?: InputMaybe<Array<AlertUpsertWithWhereUniqueWithoutDeviceInput>>;
};

export type AlertUpdateManyWithoutPriorityNestedInput = {
  connect?: InputMaybe<Array<AlertWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AlertCreateOrConnectWithoutPriorityInput>>;
  create?: InputMaybe<Array<AlertCreateWithoutPriorityInput>>;
  createMany?: InputMaybe<AlertCreateManyPriorityInputEnvelope>;
  delete?: InputMaybe<Array<AlertWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<AlertScalarWhereInput>>;
  disconnect?: InputMaybe<Array<AlertWhereUniqueInput>>;
  set?: InputMaybe<Array<AlertWhereUniqueInput>>;
  update?: InputMaybe<Array<AlertUpdateWithWhereUniqueWithoutPriorityInput>>;
  updateMany?: InputMaybe<Array<AlertUpdateManyWithWhereWithoutPriorityInput>>;
  upsert?: InputMaybe<Array<AlertUpsertWithWhereUniqueWithoutPriorityInput>>;
};

export type AlertUpdateWithWhereUniqueWithoutDeviceInput = {
  data: AlertUpdateWithoutDeviceInput;
  where: AlertWhereUniqueInput;
};

export type AlertUpdateWithWhereUniqueWithoutPriorityInput = {
  data: AlertUpdateWithoutPriorityInput;
  where: AlertWhereUniqueInput;
};

export type AlertUpdateWithoutDeviceInput = {
  message?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  priority?: InputMaybe<PriorityUpdateOneWithoutAlertsNestedInput>;
};

export type AlertUpdateWithoutPriorityInput = {
  device?: InputMaybe<DeviceUpdateOneWithoutAlertsNestedInput>;
  message?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type AlertUpsertWithWhereUniqueWithoutDeviceInput = {
  create: AlertCreateWithoutDeviceInput;
  update: AlertUpdateWithoutDeviceInput;
  where: AlertWhereUniqueInput;
};

export type AlertUpsertWithWhereUniqueWithoutPriorityInput = {
  create: AlertCreateWithoutPriorityInput;
  update: AlertUpdateWithoutPriorityInput;
  where: AlertWhereUniqueInput;
};

export type AlertWhereInput = {
  AND?: InputMaybe<Array<AlertWhereInput>>;
  NOT?: InputMaybe<Array<AlertWhereInput>>;
  OR?: InputMaybe<Array<AlertWhereInput>>;
  device?: InputMaybe<DeviceRelationFilter>;
  deviceId?: InputMaybe<IntNullableFilter>;
  id?: InputMaybe<IntFilter>;
  message?: InputMaybe<StringNullableFilter>;
  priority?: InputMaybe<PriorityRelationFilter>;
  priorityId?: InputMaybe<IntNullableFilter>;
};

export type AlertWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export type Company = {
  __typename?: 'Company';
  _count?: Maybe<CompanyCount>;
  icon?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  logo?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  regions: Array<Region>;
};


export type CompanyRegionsArgs = {
  cursor?: InputMaybe<RegionWhereUniqueInput>;
  distinct?: InputMaybe<Array<RegionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<RegionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RegionWhereInput>;
};

export type CompanyAvgAggregate = {
  __typename?: 'CompanyAvgAggregate';
  id?: Maybe<Scalars['Float']>;
};

export type CompanyAvgOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type CompanyCount = {
  __typename?: 'CompanyCount';
  regions: Scalars['Int'];
};

export type CompanyCountAggregate = {
  __typename?: 'CompanyCountAggregate';
  _all: Scalars['Int'];
  icon: Scalars['Int'];
  id: Scalars['Int'];
  logo: Scalars['Int'];
  name: Scalars['Int'];
};

export type CompanyCountOrderByAggregateInput = {
  icon?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  logo?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type CompanyCreateInput = {
  icon?: InputMaybe<Scalars['String']>;
  logo?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  regions?: InputMaybe<RegionCreateNestedManyWithoutCompanyInput>;
};

export type CompanyCreateManyInput = {
  icon?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  logo?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type CompanyCreateNestedOneWithoutRegionsInput = {
  connect?: InputMaybe<CompanyWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CompanyCreateOrConnectWithoutRegionsInput>;
  create?: InputMaybe<CompanyCreateWithoutRegionsInput>;
};

export type CompanyCreateOrConnectWithoutRegionsInput = {
  create: CompanyCreateWithoutRegionsInput;
  where: CompanyWhereUniqueInput;
};

export type CompanyCreateWithoutRegionsInput = {
  icon?: InputMaybe<Scalars['String']>;
  logo?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type CompanyGroupBy = {
  __typename?: 'CompanyGroupBy';
  _avg?: Maybe<CompanyAvgAggregate>;
  _count?: Maybe<CompanyCountAggregate>;
  _max?: Maybe<CompanyMaxAggregate>;
  _min?: Maybe<CompanyMinAggregate>;
  _sum?: Maybe<CompanySumAggregate>;
  icon?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  logo?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type CompanyMaxAggregate = {
  __typename?: 'CompanyMaxAggregate';
  icon?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  logo?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type CompanyMaxOrderByAggregateInput = {
  icon?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  logo?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type CompanyMinAggregate = {
  __typename?: 'CompanyMinAggregate';
  icon?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  logo?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type CompanyMinOrderByAggregateInput = {
  icon?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  logo?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type CompanyOrderByWithAggregationInput = {
  _avg?: InputMaybe<CompanyAvgOrderByAggregateInput>;
  _count?: InputMaybe<CompanyCountOrderByAggregateInput>;
  _max?: InputMaybe<CompanyMaxOrderByAggregateInput>;
  _min?: InputMaybe<CompanyMinOrderByAggregateInput>;
  _sum?: InputMaybe<CompanySumOrderByAggregateInput>;
  icon?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  logo?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type CompanyOrderByWithRelationInput = {
  icon?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  logo?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  regions?: InputMaybe<RegionOrderByRelationAggregateInput>;
};

export type CompanyRelationFilter = {
  is?: InputMaybe<CompanyWhereInput>;
  isNot?: InputMaybe<CompanyWhereInput>;
};

export enum CompanyScalarFieldEnum {
  Icon = 'icon',
  Id = 'id',
  Logo = 'logo',
  Name = 'name'
}

export type CompanyScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<CompanyScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<CompanyScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<CompanyScalarWhereWithAggregatesInput>>;
  icon?: InputMaybe<StringNullableWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  logo?: InputMaybe<StringNullableWithAggregatesFilter>;
  name?: InputMaybe<StringNullableWithAggregatesFilter>;
};

export type CompanySumAggregate = {
  __typename?: 'CompanySumAggregate';
  id?: Maybe<Scalars['Int']>;
};

export type CompanySumOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type CompanyUpdateInput = {
  icon?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  logo?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  regions?: InputMaybe<RegionUpdateManyWithoutCompanyNestedInput>;
};

export type CompanyUpdateManyMutationInput = {
  icon?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  logo?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type CompanyUpdateOneWithoutRegionsNestedInput = {
  connect?: InputMaybe<CompanyWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CompanyCreateOrConnectWithoutRegionsInput>;
  create?: InputMaybe<CompanyCreateWithoutRegionsInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<CompanyUpdateWithoutRegionsInput>;
  upsert?: InputMaybe<CompanyUpsertWithoutRegionsInput>;
};

export type CompanyUpdateWithoutRegionsInput = {
  icon?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  logo?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type CompanyUpsertWithoutRegionsInput = {
  create: CompanyCreateWithoutRegionsInput;
  update: CompanyUpdateWithoutRegionsInput;
};

export type CompanyWhereInput = {
  AND?: InputMaybe<Array<CompanyWhereInput>>;
  NOT?: InputMaybe<Array<CompanyWhereInput>>;
  OR?: InputMaybe<Array<CompanyWhereInput>>;
  icon?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<IntFilter>;
  logo?: InputMaybe<StringNullableFilter>;
  name?: InputMaybe<StringNullableFilter>;
  regions?: InputMaybe<RegionListRelationFilter>;
};

export type CompanyWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export type DateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type DateTimeNullableWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedDateTimeNullableFilter>;
  _min?: InputMaybe<NestedDateTimeNullableFilter>;
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeNullableWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type Device = {
  __typename?: 'Device';
  _count?: Maybe<DeviceCount>;
  alerts: Array<Alert>;
  connectParamIndex?: Maybe<Scalars['String']>;
  events: Array<Event>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  serial?: Maybe<Scalars['String']>;
  smartPole?: Maybe<SmartPole>;
  smartPoleId?: Maybe<Scalars['Int']>;
  type?: Maybe<DeviceType>;
  typeId?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['String']>;
};


export type DeviceAlertsArgs = {
  cursor?: InputMaybe<AlertWhereUniqueInput>;
  distinct?: InputMaybe<Array<AlertScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AlertOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AlertWhereInput>;
};


export type DeviceEventsArgs = {
  cursor?: InputMaybe<EventWhereUniqueInput>;
  distinct?: InputMaybe<Array<EventScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<EventOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<EventWhereInput>;
};

export type DeviceAvgAggregate = {
  __typename?: 'DeviceAvgAggregate';
  id?: Maybe<Scalars['Float']>;
  smartPoleId?: Maybe<Scalars['Float']>;
  typeId?: Maybe<Scalars['Float']>;
};

export type DeviceAvgOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  smartPoleId?: InputMaybe<SortOrder>;
  typeId?: InputMaybe<SortOrder>;
};

export type DeviceCount = {
  __typename?: 'DeviceCount';
  alerts: Scalars['Int'];
  events: Scalars['Int'];
};

export type DeviceCountAggregate = {
  __typename?: 'DeviceCountAggregate';
  _all: Scalars['Int'];
  connectParamIndex: Scalars['Int'];
  id: Scalars['Int'];
  name: Scalars['Int'];
  serial: Scalars['Int'];
  smartPoleId: Scalars['Int'];
  typeId: Scalars['Int'];
  uuid: Scalars['Int'];
};

export type DeviceCountOrderByAggregateInput = {
  connectParamIndex?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  serial?: InputMaybe<SortOrder>;
  smartPoleId?: InputMaybe<SortOrder>;
  typeId?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type DeviceCreateInput = {
  alerts?: InputMaybe<AlertCreateNestedManyWithoutDeviceInput>;
  connectParamIndex?: InputMaybe<Scalars['String']>;
  events?: InputMaybe<EventCreateNestedManyWithoutDeviceInput>;
  name?: InputMaybe<Scalars['String']>;
  serial?: InputMaybe<Scalars['String']>;
  smartPole?: InputMaybe<SmartPoleCreateNestedOneWithoutDevicesInput>;
  type?: InputMaybe<DeviceTypeCreateNestedOneWithoutDevicesInput>;
  uuid?: InputMaybe<Scalars['String']>;
};

export type DeviceCreateManyInput = {
  connectParamIndex?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  serial?: InputMaybe<Scalars['String']>;
  smartPoleId?: InputMaybe<Scalars['Int']>;
  typeId?: InputMaybe<Scalars['Int']>;
  uuid?: InputMaybe<Scalars['String']>;
};

export type DeviceCreateManySmartPoleInput = {
  connectParamIndex?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  serial?: InputMaybe<Scalars['String']>;
  typeId?: InputMaybe<Scalars['Int']>;
  uuid?: InputMaybe<Scalars['String']>;
};

export type DeviceCreateManySmartPoleInputEnvelope = {
  data: Array<DeviceCreateManySmartPoleInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type DeviceCreateManyTypeInput = {
  connectParamIndex?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  serial?: InputMaybe<Scalars['String']>;
  smartPoleId?: InputMaybe<Scalars['Int']>;
  uuid?: InputMaybe<Scalars['String']>;
};

export type DeviceCreateManyTypeInputEnvelope = {
  data: Array<DeviceCreateManyTypeInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type DeviceCreateNestedManyWithoutSmartPoleInput = {
  connect?: InputMaybe<Array<DeviceWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<DeviceCreateOrConnectWithoutSmartPoleInput>>;
  create?: InputMaybe<Array<DeviceCreateWithoutSmartPoleInput>>;
  createMany?: InputMaybe<DeviceCreateManySmartPoleInputEnvelope>;
};

export type DeviceCreateNestedManyWithoutTypeInput = {
  connect?: InputMaybe<Array<DeviceWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<DeviceCreateOrConnectWithoutTypeInput>>;
  create?: InputMaybe<Array<DeviceCreateWithoutTypeInput>>;
  createMany?: InputMaybe<DeviceCreateManyTypeInputEnvelope>;
};

export type DeviceCreateNestedOneWithoutAlertsInput = {
  connect?: InputMaybe<DeviceWhereUniqueInput>;
  connectOrCreate?: InputMaybe<DeviceCreateOrConnectWithoutAlertsInput>;
  create?: InputMaybe<DeviceCreateWithoutAlertsInput>;
};

export type DeviceCreateNestedOneWithoutEventsInput = {
  connect?: InputMaybe<DeviceWhereUniqueInput>;
  connectOrCreate?: InputMaybe<DeviceCreateOrConnectWithoutEventsInput>;
  create?: InputMaybe<DeviceCreateWithoutEventsInput>;
};

export type DeviceCreateOrConnectWithoutAlertsInput = {
  create: DeviceCreateWithoutAlertsInput;
  where: DeviceWhereUniqueInput;
};

export type DeviceCreateOrConnectWithoutEventsInput = {
  create: DeviceCreateWithoutEventsInput;
  where: DeviceWhereUniqueInput;
};

export type DeviceCreateOrConnectWithoutSmartPoleInput = {
  create: DeviceCreateWithoutSmartPoleInput;
  where: DeviceWhereUniqueInput;
};

export type DeviceCreateOrConnectWithoutTypeInput = {
  create: DeviceCreateWithoutTypeInput;
  where: DeviceWhereUniqueInput;
};

export type DeviceCreateWithoutAlertsInput = {
  connectParamIndex?: InputMaybe<Scalars['String']>;
  events?: InputMaybe<EventCreateNestedManyWithoutDeviceInput>;
  name?: InputMaybe<Scalars['String']>;
  serial?: InputMaybe<Scalars['String']>;
  smartPole?: InputMaybe<SmartPoleCreateNestedOneWithoutDevicesInput>;
  type?: InputMaybe<DeviceTypeCreateNestedOneWithoutDevicesInput>;
  uuid?: InputMaybe<Scalars['String']>;
};

export type DeviceCreateWithoutEventsInput = {
  alerts?: InputMaybe<AlertCreateNestedManyWithoutDeviceInput>;
  connectParamIndex?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  serial?: InputMaybe<Scalars['String']>;
  smartPole?: InputMaybe<SmartPoleCreateNestedOneWithoutDevicesInput>;
  type?: InputMaybe<DeviceTypeCreateNestedOneWithoutDevicesInput>;
  uuid?: InputMaybe<Scalars['String']>;
};

export type DeviceCreateWithoutSmartPoleInput = {
  alerts?: InputMaybe<AlertCreateNestedManyWithoutDeviceInput>;
  connectParamIndex?: InputMaybe<Scalars['String']>;
  events?: InputMaybe<EventCreateNestedManyWithoutDeviceInput>;
  name?: InputMaybe<Scalars['String']>;
  serial?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<DeviceTypeCreateNestedOneWithoutDevicesInput>;
  uuid?: InputMaybe<Scalars['String']>;
};

export type DeviceCreateWithoutTypeInput = {
  alerts?: InputMaybe<AlertCreateNestedManyWithoutDeviceInput>;
  connectParamIndex?: InputMaybe<Scalars['String']>;
  events?: InputMaybe<EventCreateNestedManyWithoutDeviceInput>;
  name?: InputMaybe<Scalars['String']>;
  serial?: InputMaybe<Scalars['String']>;
  smartPole?: InputMaybe<SmartPoleCreateNestedOneWithoutDevicesInput>;
  uuid?: InputMaybe<Scalars['String']>;
};

export type DeviceGroupBy = {
  __typename?: 'DeviceGroupBy';
  _avg?: Maybe<DeviceAvgAggregate>;
  _count?: Maybe<DeviceCountAggregate>;
  _max?: Maybe<DeviceMaxAggregate>;
  _min?: Maybe<DeviceMinAggregate>;
  _sum?: Maybe<DeviceSumAggregate>;
  connectParamIndex?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  serial?: Maybe<Scalars['String']>;
  smartPoleId?: Maybe<Scalars['Int']>;
  typeId?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['String']>;
};

export type DeviceListRelationFilter = {
  every?: InputMaybe<DeviceWhereInput>;
  none?: InputMaybe<DeviceWhereInput>;
  some?: InputMaybe<DeviceWhereInput>;
};

export type DeviceMaxAggregate = {
  __typename?: 'DeviceMaxAggregate';
  connectParamIndex?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  serial?: Maybe<Scalars['String']>;
  smartPoleId?: Maybe<Scalars['Int']>;
  typeId?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['String']>;
};

export type DeviceMaxOrderByAggregateInput = {
  connectParamIndex?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  serial?: InputMaybe<SortOrder>;
  smartPoleId?: InputMaybe<SortOrder>;
  typeId?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type DeviceMinAggregate = {
  __typename?: 'DeviceMinAggregate';
  connectParamIndex?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  serial?: Maybe<Scalars['String']>;
  smartPoleId?: Maybe<Scalars['Int']>;
  typeId?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['String']>;
};

export type DeviceMinOrderByAggregateInput = {
  connectParamIndex?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  serial?: InputMaybe<SortOrder>;
  smartPoleId?: InputMaybe<SortOrder>;
  typeId?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type DeviceOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type DeviceOrderByWithAggregationInput = {
  _avg?: InputMaybe<DeviceAvgOrderByAggregateInput>;
  _count?: InputMaybe<DeviceCountOrderByAggregateInput>;
  _max?: InputMaybe<DeviceMaxOrderByAggregateInput>;
  _min?: InputMaybe<DeviceMinOrderByAggregateInput>;
  _sum?: InputMaybe<DeviceSumOrderByAggregateInput>;
  connectParamIndex?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  serial?: InputMaybe<SortOrder>;
  smartPoleId?: InputMaybe<SortOrder>;
  typeId?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type DeviceOrderByWithRelationInput = {
  alerts?: InputMaybe<AlertOrderByRelationAggregateInput>;
  connectParamIndex?: InputMaybe<SortOrder>;
  events?: InputMaybe<EventOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  serial?: InputMaybe<SortOrder>;
  smartPole?: InputMaybe<SmartPoleOrderByWithRelationInput>;
  smartPoleId?: InputMaybe<SortOrder>;
  type?: InputMaybe<DeviceTypeOrderByWithRelationInput>;
  typeId?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type DeviceRelationFilter = {
  is?: InputMaybe<DeviceWhereInput>;
  isNot?: InputMaybe<DeviceWhereInput>;
};

export enum DeviceScalarFieldEnum {
  ConnectParamIndex = 'connectParamIndex',
  Id = 'id',
  Name = 'name',
  Serial = 'serial',
  SmartPoleId = 'smartPoleId',
  TypeId = 'typeId',
  Uuid = 'uuid'
}

export type DeviceScalarWhereInput = {
  AND?: InputMaybe<Array<DeviceScalarWhereInput>>;
  NOT?: InputMaybe<Array<DeviceScalarWhereInput>>;
  OR?: InputMaybe<Array<DeviceScalarWhereInput>>;
  connectParamIndex?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringNullableFilter>;
  serial?: InputMaybe<StringNullableFilter>;
  smartPoleId?: InputMaybe<IntNullableFilter>;
  typeId?: InputMaybe<IntNullableFilter>;
  uuid?: InputMaybe<StringNullableFilter>;
};

export type DeviceScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<DeviceScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<DeviceScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<DeviceScalarWhereWithAggregatesInput>>;
  connectParamIndex?: InputMaybe<StringNullableWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  name?: InputMaybe<StringNullableWithAggregatesFilter>;
  serial?: InputMaybe<StringNullableWithAggregatesFilter>;
  smartPoleId?: InputMaybe<IntNullableWithAggregatesFilter>;
  typeId?: InputMaybe<IntNullableWithAggregatesFilter>;
  uuid?: InputMaybe<StringNullableWithAggregatesFilter>;
};

export type DeviceSumAggregate = {
  __typename?: 'DeviceSumAggregate';
  id?: Maybe<Scalars['Int']>;
  smartPoleId?: Maybe<Scalars['Int']>;
  typeId?: Maybe<Scalars['Int']>;
};

export type DeviceSumOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  smartPoleId?: InputMaybe<SortOrder>;
  typeId?: InputMaybe<SortOrder>;
};

export type DeviceType = {
  __typename?: 'DeviceType';
  _count?: Maybe<DeviceTypeCount>;
  devices: Array<Device>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
};


export type DeviceTypeDevicesArgs = {
  cursor?: InputMaybe<DeviceWhereUniqueInput>;
  distinct?: InputMaybe<Array<DeviceScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<DeviceOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DeviceWhereInput>;
};

export type DeviceTypeAvgAggregate = {
  __typename?: 'DeviceTypeAvgAggregate';
  id?: Maybe<Scalars['Float']>;
};

export type DeviceTypeAvgOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type DeviceTypeCount = {
  __typename?: 'DeviceTypeCount';
  devices: Scalars['Int'];
};

export type DeviceTypeCountAggregate = {
  __typename?: 'DeviceTypeCountAggregate';
  _all: Scalars['Int'];
  id: Scalars['Int'];
  name: Scalars['Int'];
};

export type DeviceTypeCountOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type DeviceTypeCreateInput = {
  devices?: InputMaybe<DeviceCreateNestedManyWithoutTypeInput>;
  name?: InputMaybe<Scalars['String']>;
};

export type DeviceTypeCreateManyInput = {
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

export type DeviceTypeCreateNestedOneWithoutDevicesInput = {
  connect?: InputMaybe<DeviceTypeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<DeviceTypeCreateOrConnectWithoutDevicesInput>;
  create?: InputMaybe<DeviceTypeCreateWithoutDevicesInput>;
};

export type DeviceTypeCreateOrConnectWithoutDevicesInput = {
  create: DeviceTypeCreateWithoutDevicesInput;
  where: DeviceTypeWhereUniqueInput;
};

export type DeviceTypeCreateWithoutDevicesInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type DeviceTypeGroupBy = {
  __typename?: 'DeviceTypeGroupBy';
  _avg?: Maybe<DeviceTypeAvgAggregate>;
  _count?: Maybe<DeviceTypeCountAggregate>;
  _max?: Maybe<DeviceTypeMaxAggregate>;
  _min?: Maybe<DeviceTypeMinAggregate>;
  _sum?: Maybe<DeviceTypeSumAggregate>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
};

export type DeviceTypeMaxAggregate = {
  __typename?: 'DeviceTypeMaxAggregate';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type DeviceTypeMaxOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type DeviceTypeMinAggregate = {
  __typename?: 'DeviceTypeMinAggregate';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type DeviceTypeMinOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type DeviceTypeOrderByWithAggregationInput = {
  _avg?: InputMaybe<DeviceTypeAvgOrderByAggregateInput>;
  _count?: InputMaybe<DeviceTypeCountOrderByAggregateInput>;
  _max?: InputMaybe<DeviceTypeMaxOrderByAggregateInput>;
  _min?: InputMaybe<DeviceTypeMinOrderByAggregateInput>;
  _sum?: InputMaybe<DeviceTypeSumOrderByAggregateInput>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type DeviceTypeOrderByWithRelationInput = {
  devices?: InputMaybe<DeviceOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type DeviceTypeRelationFilter = {
  is?: InputMaybe<DeviceTypeWhereInput>;
  isNot?: InputMaybe<DeviceTypeWhereInput>;
};

export enum DeviceTypeScalarFieldEnum {
  Id = 'id',
  Name = 'name'
}

export type DeviceTypeScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<DeviceTypeScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<DeviceTypeScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<DeviceTypeScalarWhereWithAggregatesInput>>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  name?: InputMaybe<StringNullableWithAggregatesFilter>;
};

export type DeviceTypeSumAggregate = {
  __typename?: 'DeviceTypeSumAggregate';
  id?: Maybe<Scalars['Int']>;
};

export type DeviceTypeSumOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type DeviceTypeUpdateInput = {
  devices?: InputMaybe<DeviceUpdateManyWithoutTypeNestedInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type DeviceTypeUpdateManyMutationInput = {
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type DeviceTypeUpdateOneWithoutDevicesNestedInput = {
  connect?: InputMaybe<DeviceTypeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<DeviceTypeCreateOrConnectWithoutDevicesInput>;
  create?: InputMaybe<DeviceTypeCreateWithoutDevicesInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<DeviceTypeUpdateWithoutDevicesInput>;
  upsert?: InputMaybe<DeviceTypeUpsertWithoutDevicesInput>;
};

export type DeviceTypeUpdateWithoutDevicesInput = {
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type DeviceTypeUpsertWithoutDevicesInput = {
  create: DeviceTypeCreateWithoutDevicesInput;
  update: DeviceTypeUpdateWithoutDevicesInput;
};

export type DeviceTypeWhereInput = {
  AND?: InputMaybe<Array<DeviceTypeWhereInput>>;
  NOT?: InputMaybe<Array<DeviceTypeWhereInput>>;
  OR?: InputMaybe<Array<DeviceTypeWhereInput>>;
  devices?: InputMaybe<DeviceListRelationFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringNullableFilter>;
};

export type DeviceTypeWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export type DeviceUpdateInput = {
  alerts?: InputMaybe<AlertUpdateManyWithoutDeviceNestedInput>;
  connectParamIndex?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  events?: InputMaybe<EventUpdateManyWithoutDeviceNestedInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  serial?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  smartPole?: InputMaybe<SmartPoleUpdateOneWithoutDevicesNestedInput>;
  type?: InputMaybe<DeviceTypeUpdateOneWithoutDevicesNestedInput>;
  uuid?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type DeviceUpdateManyMutationInput = {
  connectParamIndex?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  serial?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  uuid?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type DeviceUpdateManyWithWhereWithoutSmartPoleInput = {
  data: DeviceUpdateManyMutationInput;
  where: DeviceScalarWhereInput;
};

export type DeviceUpdateManyWithWhereWithoutTypeInput = {
  data: DeviceUpdateManyMutationInput;
  where: DeviceScalarWhereInput;
};

export type DeviceUpdateManyWithoutSmartPoleNestedInput = {
  connect?: InputMaybe<Array<DeviceWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<DeviceCreateOrConnectWithoutSmartPoleInput>>;
  create?: InputMaybe<Array<DeviceCreateWithoutSmartPoleInput>>;
  createMany?: InputMaybe<DeviceCreateManySmartPoleInputEnvelope>;
  delete?: InputMaybe<Array<DeviceWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<DeviceScalarWhereInput>>;
  disconnect?: InputMaybe<Array<DeviceWhereUniqueInput>>;
  set?: InputMaybe<Array<DeviceWhereUniqueInput>>;
  update?: InputMaybe<Array<DeviceUpdateWithWhereUniqueWithoutSmartPoleInput>>;
  updateMany?: InputMaybe<Array<DeviceUpdateManyWithWhereWithoutSmartPoleInput>>;
  upsert?: InputMaybe<Array<DeviceUpsertWithWhereUniqueWithoutSmartPoleInput>>;
};

export type DeviceUpdateManyWithoutTypeNestedInput = {
  connect?: InputMaybe<Array<DeviceWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<DeviceCreateOrConnectWithoutTypeInput>>;
  create?: InputMaybe<Array<DeviceCreateWithoutTypeInput>>;
  createMany?: InputMaybe<DeviceCreateManyTypeInputEnvelope>;
  delete?: InputMaybe<Array<DeviceWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<DeviceScalarWhereInput>>;
  disconnect?: InputMaybe<Array<DeviceWhereUniqueInput>>;
  set?: InputMaybe<Array<DeviceWhereUniqueInput>>;
  update?: InputMaybe<Array<DeviceUpdateWithWhereUniqueWithoutTypeInput>>;
  updateMany?: InputMaybe<Array<DeviceUpdateManyWithWhereWithoutTypeInput>>;
  upsert?: InputMaybe<Array<DeviceUpsertWithWhereUniqueWithoutTypeInput>>;
};

export type DeviceUpdateOneWithoutAlertsNestedInput = {
  connect?: InputMaybe<DeviceWhereUniqueInput>;
  connectOrCreate?: InputMaybe<DeviceCreateOrConnectWithoutAlertsInput>;
  create?: InputMaybe<DeviceCreateWithoutAlertsInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<DeviceUpdateWithoutAlertsInput>;
  upsert?: InputMaybe<DeviceUpsertWithoutAlertsInput>;
};

export type DeviceUpdateOneWithoutEventsNestedInput = {
  connect?: InputMaybe<DeviceWhereUniqueInput>;
  connectOrCreate?: InputMaybe<DeviceCreateOrConnectWithoutEventsInput>;
  create?: InputMaybe<DeviceCreateWithoutEventsInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<DeviceUpdateWithoutEventsInput>;
  upsert?: InputMaybe<DeviceUpsertWithoutEventsInput>;
};

export type DeviceUpdateWithWhereUniqueWithoutSmartPoleInput = {
  data: DeviceUpdateWithoutSmartPoleInput;
  where: DeviceWhereUniqueInput;
};

export type DeviceUpdateWithWhereUniqueWithoutTypeInput = {
  data: DeviceUpdateWithoutTypeInput;
  where: DeviceWhereUniqueInput;
};

export type DeviceUpdateWithoutAlertsInput = {
  connectParamIndex?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  events?: InputMaybe<EventUpdateManyWithoutDeviceNestedInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  serial?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  smartPole?: InputMaybe<SmartPoleUpdateOneWithoutDevicesNestedInput>;
  type?: InputMaybe<DeviceTypeUpdateOneWithoutDevicesNestedInput>;
  uuid?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type DeviceUpdateWithoutEventsInput = {
  alerts?: InputMaybe<AlertUpdateManyWithoutDeviceNestedInput>;
  connectParamIndex?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  serial?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  smartPole?: InputMaybe<SmartPoleUpdateOneWithoutDevicesNestedInput>;
  type?: InputMaybe<DeviceTypeUpdateOneWithoutDevicesNestedInput>;
  uuid?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type DeviceUpdateWithoutSmartPoleInput = {
  alerts?: InputMaybe<AlertUpdateManyWithoutDeviceNestedInput>;
  connectParamIndex?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  events?: InputMaybe<EventUpdateManyWithoutDeviceNestedInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  serial?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  type?: InputMaybe<DeviceTypeUpdateOneWithoutDevicesNestedInput>;
  uuid?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type DeviceUpdateWithoutTypeInput = {
  alerts?: InputMaybe<AlertUpdateManyWithoutDeviceNestedInput>;
  connectParamIndex?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  events?: InputMaybe<EventUpdateManyWithoutDeviceNestedInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  serial?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  smartPole?: InputMaybe<SmartPoleUpdateOneWithoutDevicesNestedInput>;
  uuid?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type DeviceUpsertWithWhereUniqueWithoutSmartPoleInput = {
  create: DeviceCreateWithoutSmartPoleInput;
  update: DeviceUpdateWithoutSmartPoleInput;
  where: DeviceWhereUniqueInput;
};

export type DeviceUpsertWithWhereUniqueWithoutTypeInput = {
  create: DeviceCreateWithoutTypeInput;
  update: DeviceUpdateWithoutTypeInput;
  where: DeviceWhereUniqueInput;
};

export type DeviceUpsertWithoutAlertsInput = {
  create: DeviceCreateWithoutAlertsInput;
  update: DeviceUpdateWithoutAlertsInput;
};

export type DeviceUpsertWithoutEventsInput = {
  create: DeviceCreateWithoutEventsInput;
  update: DeviceUpdateWithoutEventsInput;
};

export type DeviceWhereInput = {
  AND?: InputMaybe<Array<DeviceWhereInput>>;
  NOT?: InputMaybe<Array<DeviceWhereInput>>;
  OR?: InputMaybe<Array<DeviceWhereInput>>;
  alerts?: InputMaybe<AlertListRelationFilter>;
  connectParamIndex?: InputMaybe<StringNullableFilter>;
  events?: InputMaybe<EventListRelationFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringNullableFilter>;
  serial?: InputMaybe<StringNullableFilter>;
  smartPole?: InputMaybe<SmartPoleRelationFilter>;
  smartPoleId?: InputMaybe<IntNullableFilter>;
  type?: InputMaybe<DeviceTypeRelationFilter>;
  typeId?: InputMaybe<IntNullableFilter>;
  uuid?: InputMaybe<StringNullableFilter>;
};

export type DeviceWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export type Event = {
  __typename?: 'Event';
  device?: Maybe<Device>;
  deviceId?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  message?: Maybe<Scalars['String']>;
  moment?: Maybe<Scalars['DateTime']>;
  priority?: Maybe<Priority>;
  priorityId?: Maybe<Scalars['Int']>;
};

export type EventAvgAggregate = {
  __typename?: 'EventAvgAggregate';
  deviceId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  priorityId?: Maybe<Scalars['Float']>;
};

export type EventAvgOrderByAggregateInput = {
  deviceId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  priorityId?: InputMaybe<SortOrder>;
};

export type EventCountAggregate = {
  __typename?: 'EventCountAggregate';
  _all: Scalars['Int'];
  deviceId: Scalars['Int'];
  id: Scalars['Int'];
  message: Scalars['Int'];
  moment: Scalars['Int'];
  priorityId: Scalars['Int'];
};

export type EventCountOrderByAggregateInput = {
  deviceId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  message?: InputMaybe<SortOrder>;
  moment?: InputMaybe<SortOrder>;
  priorityId?: InputMaybe<SortOrder>;
};

export type EventCreateInput = {
  device?: InputMaybe<DeviceCreateNestedOneWithoutEventsInput>;
  message?: InputMaybe<Scalars['String']>;
  moment?: InputMaybe<Scalars['DateTime']>;
  priority?: InputMaybe<PriorityCreateNestedOneWithoutEventsInput>;
};

export type EventCreateManyDeviceInput = {
  id?: InputMaybe<Scalars['Int']>;
  message?: InputMaybe<Scalars['String']>;
  moment?: InputMaybe<Scalars['DateTime']>;
  priorityId?: InputMaybe<Scalars['Int']>;
};

export type EventCreateManyDeviceInputEnvelope = {
  data: Array<EventCreateManyDeviceInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type EventCreateManyInput = {
  deviceId?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  message?: InputMaybe<Scalars['String']>;
  moment?: InputMaybe<Scalars['DateTime']>;
  priorityId?: InputMaybe<Scalars['Int']>;
};

export type EventCreateManyPriorityInput = {
  deviceId?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  message?: InputMaybe<Scalars['String']>;
  moment?: InputMaybe<Scalars['DateTime']>;
};

export type EventCreateManyPriorityInputEnvelope = {
  data: Array<EventCreateManyPriorityInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type EventCreateNestedManyWithoutDeviceInput = {
  connect?: InputMaybe<Array<EventWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<EventCreateOrConnectWithoutDeviceInput>>;
  create?: InputMaybe<Array<EventCreateWithoutDeviceInput>>;
  createMany?: InputMaybe<EventCreateManyDeviceInputEnvelope>;
};

export type EventCreateNestedManyWithoutPriorityInput = {
  connect?: InputMaybe<Array<EventWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<EventCreateOrConnectWithoutPriorityInput>>;
  create?: InputMaybe<Array<EventCreateWithoutPriorityInput>>;
  createMany?: InputMaybe<EventCreateManyPriorityInputEnvelope>;
};

export type EventCreateOrConnectWithoutDeviceInput = {
  create: EventCreateWithoutDeviceInput;
  where: EventWhereUniqueInput;
};

export type EventCreateOrConnectWithoutPriorityInput = {
  create: EventCreateWithoutPriorityInput;
  where: EventWhereUniqueInput;
};

export type EventCreateWithoutDeviceInput = {
  message?: InputMaybe<Scalars['String']>;
  moment?: InputMaybe<Scalars['DateTime']>;
  priority?: InputMaybe<PriorityCreateNestedOneWithoutEventsInput>;
};

export type EventCreateWithoutPriorityInput = {
  device?: InputMaybe<DeviceCreateNestedOneWithoutEventsInput>;
  message?: InputMaybe<Scalars['String']>;
  moment?: InputMaybe<Scalars['DateTime']>;
};

export type EventGroupBy = {
  __typename?: 'EventGroupBy';
  _avg?: Maybe<EventAvgAggregate>;
  _count?: Maybe<EventCountAggregate>;
  _max?: Maybe<EventMaxAggregate>;
  _min?: Maybe<EventMinAggregate>;
  _sum?: Maybe<EventSumAggregate>;
  deviceId?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  message?: Maybe<Scalars['String']>;
  moment?: Maybe<Scalars['DateTime']>;
  priorityId?: Maybe<Scalars['Int']>;
};

export type EventListRelationFilter = {
  every?: InputMaybe<EventWhereInput>;
  none?: InputMaybe<EventWhereInput>;
  some?: InputMaybe<EventWhereInput>;
};

export type EventMaxAggregate = {
  __typename?: 'EventMaxAggregate';
  deviceId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  message?: Maybe<Scalars['String']>;
  moment?: Maybe<Scalars['DateTime']>;
  priorityId?: Maybe<Scalars['Int']>;
};

export type EventMaxOrderByAggregateInput = {
  deviceId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  message?: InputMaybe<SortOrder>;
  moment?: InputMaybe<SortOrder>;
  priorityId?: InputMaybe<SortOrder>;
};

export type EventMinAggregate = {
  __typename?: 'EventMinAggregate';
  deviceId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  message?: Maybe<Scalars['String']>;
  moment?: Maybe<Scalars['DateTime']>;
  priorityId?: Maybe<Scalars['Int']>;
};

export type EventMinOrderByAggregateInput = {
  deviceId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  message?: InputMaybe<SortOrder>;
  moment?: InputMaybe<SortOrder>;
  priorityId?: InputMaybe<SortOrder>;
};

export type EventOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type EventOrderByWithAggregationInput = {
  _avg?: InputMaybe<EventAvgOrderByAggregateInput>;
  _count?: InputMaybe<EventCountOrderByAggregateInput>;
  _max?: InputMaybe<EventMaxOrderByAggregateInput>;
  _min?: InputMaybe<EventMinOrderByAggregateInput>;
  _sum?: InputMaybe<EventSumOrderByAggregateInput>;
  deviceId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  message?: InputMaybe<SortOrder>;
  moment?: InputMaybe<SortOrder>;
  priorityId?: InputMaybe<SortOrder>;
};

export type EventOrderByWithRelationInput = {
  device?: InputMaybe<DeviceOrderByWithRelationInput>;
  deviceId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  message?: InputMaybe<SortOrder>;
  moment?: InputMaybe<SortOrder>;
  priority?: InputMaybe<PriorityOrderByWithRelationInput>;
  priorityId?: InputMaybe<SortOrder>;
};

export enum EventScalarFieldEnum {
  DeviceId = 'deviceId',
  Id = 'id',
  Message = 'message',
  Moment = 'moment',
  PriorityId = 'priorityId'
}

export type EventScalarWhereInput = {
  AND?: InputMaybe<Array<EventScalarWhereInput>>;
  NOT?: InputMaybe<Array<EventScalarWhereInput>>;
  OR?: InputMaybe<Array<EventScalarWhereInput>>;
  deviceId?: InputMaybe<IntNullableFilter>;
  id?: InputMaybe<IntFilter>;
  message?: InputMaybe<StringNullableFilter>;
  moment?: InputMaybe<DateTimeNullableFilter>;
  priorityId?: InputMaybe<IntNullableFilter>;
};

export type EventScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<EventScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<EventScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<EventScalarWhereWithAggregatesInput>>;
  deviceId?: InputMaybe<IntNullableWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  message?: InputMaybe<StringNullableWithAggregatesFilter>;
  moment?: InputMaybe<DateTimeNullableWithAggregatesFilter>;
  priorityId?: InputMaybe<IntNullableWithAggregatesFilter>;
};

export type EventSumAggregate = {
  __typename?: 'EventSumAggregate';
  deviceId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  priorityId?: Maybe<Scalars['Int']>;
};

export type EventSumOrderByAggregateInput = {
  deviceId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  priorityId?: InputMaybe<SortOrder>;
};

export type EventUpdateInput = {
  device?: InputMaybe<DeviceUpdateOneWithoutEventsNestedInput>;
  message?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  moment?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  priority?: InputMaybe<PriorityUpdateOneWithoutEventsNestedInput>;
};

export type EventUpdateManyMutationInput = {
  message?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  moment?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type EventUpdateManyWithWhereWithoutDeviceInput = {
  data: EventUpdateManyMutationInput;
  where: EventScalarWhereInput;
};

export type EventUpdateManyWithWhereWithoutPriorityInput = {
  data: EventUpdateManyMutationInput;
  where: EventScalarWhereInput;
};

export type EventUpdateManyWithoutDeviceNestedInput = {
  connect?: InputMaybe<Array<EventWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<EventCreateOrConnectWithoutDeviceInput>>;
  create?: InputMaybe<Array<EventCreateWithoutDeviceInput>>;
  createMany?: InputMaybe<EventCreateManyDeviceInputEnvelope>;
  delete?: InputMaybe<Array<EventWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<EventScalarWhereInput>>;
  disconnect?: InputMaybe<Array<EventWhereUniqueInput>>;
  set?: InputMaybe<Array<EventWhereUniqueInput>>;
  update?: InputMaybe<Array<EventUpdateWithWhereUniqueWithoutDeviceInput>>;
  updateMany?: InputMaybe<Array<EventUpdateManyWithWhereWithoutDeviceInput>>;
  upsert?: InputMaybe<Array<EventUpsertWithWhereUniqueWithoutDeviceInput>>;
};

export type EventUpdateManyWithoutPriorityNestedInput = {
  connect?: InputMaybe<Array<EventWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<EventCreateOrConnectWithoutPriorityInput>>;
  create?: InputMaybe<Array<EventCreateWithoutPriorityInput>>;
  createMany?: InputMaybe<EventCreateManyPriorityInputEnvelope>;
  delete?: InputMaybe<Array<EventWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<EventScalarWhereInput>>;
  disconnect?: InputMaybe<Array<EventWhereUniqueInput>>;
  set?: InputMaybe<Array<EventWhereUniqueInput>>;
  update?: InputMaybe<Array<EventUpdateWithWhereUniqueWithoutPriorityInput>>;
  updateMany?: InputMaybe<Array<EventUpdateManyWithWhereWithoutPriorityInput>>;
  upsert?: InputMaybe<Array<EventUpsertWithWhereUniqueWithoutPriorityInput>>;
};

export type EventUpdateWithWhereUniqueWithoutDeviceInput = {
  data: EventUpdateWithoutDeviceInput;
  where: EventWhereUniqueInput;
};

export type EventUpdateWithWhereUniqueWithoutPriorityInput = {
  data: EventUpdateWithoutPriorityInput;
  where: EventWhereUniqueInput;
};

export type EventUpdateWithoutDeviceInput = {
  message?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  moment?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  priority?: InputMaybe<PriorityUpdateOneWithoutEventsNestedInput>;
};

export type EventUpdateWithoutPriorityInput = {
  device?: InputMaybe<DeviceUpdateOneWithoutEventsNestedInput>;
  message?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  moment?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type EventUpsertWithWhereUniqueWithoutDeviceInput = {
  create: EventCreateWithoutDeviceInput;
  update: EventUpdateWithoutDeviceInput;
  where: EventWhereUniqueInput;
};

export type EventUpsertWithWhereUniqueWithoutPriorityInput = {
  create: EventCreateWithoutPriorityInput;
  update: EventUpdateWithoutPriorityInput;
  where: EventWhereUniqueInput;
};

export type EventWhereInput = {
  AND?: InputMaybe<Array<EventWhereInput>>;
  NOT?: InputMaybe<Array<EventWhereInput>>;
  OR?: InputMaybe<Array<EventWhereInput>>;
  device?: InputMaybe<DeviceRelationFilter>;
  deviceId?: InputMaybe<IntNullableFilter>;
  id?: InputMaybe<IntFilter>;
  message?: InputMaybe<StringNullableFilter>;
  moment?: InputMaybe<DateTimeNullableFilter>;
  priority?: InputMaybe<PriorityRelationFilter>;
  priorityId?: InputMaybe<IntNullableFilter>;
};

export type EventWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export type FloatNullableFilter = {
  equals?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<Scalars['Float']>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<NestedFloatNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']>>;
};

export type FloatNullableWithAggregatesFilter = {
  _avg?: InputMaybe<NestedFloatNullableFilter>;
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedFloatNullableFilter>;
  _min?: InputMaybe<NestedFloatNullableFilter>;
  _sum?: InputMaybe<NestedFloatNullableFilter>;
  equals?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<Scalars['Float']>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<NestedFloatNullableWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']>>;
};

export type Formation = {
  __typename?: 'Formation';
  _count?: Maybe<FormationCount>;
  address?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  region?: Maybe<Region>;
  regionId?: Maybe<Scalars['Int']>;
  solutions: Array<Solution>;
  zones: Array<Zone>;
};


export type FormationSolutionsArgs = {
  cursor?: InputMaybe<SolutionWhereUniqueInput>;
  distinct?: InputMaybe<Array<SolutionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SolutionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SolutionWhereInput>;
};


export type FormationZonesArgs = {
  cursor?: InputMaybe<ZoneWhereUniqueInput>;
  distinct?: InputMaybe<Array<ZoneScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ZoneOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ZoneWhereInput>;
};

export type FormationAvgAggregate = {
  __typename?: 'FormationAvgAggregate';
  id?: Maybe<Scalars['Float']>;
  regionId?: Maybe<Scalars['Float']>;
};

export type FormationAvgOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  regionId?: InputMaybe<SortOrder>;
};

export type FormationCount = {
  __typename?: 'FormationCount';
  solutions: Scalars['Int'];
  zones: Scalars['Int'];
};

export type FormationCountAggregate = {
  __typename?: 'FormationCountAggregate';
  _all: Scalars['Int'];
  address: Scalars['Int'];
  id: Scalars['Int'];
  name: Scalars['Int'];
  regionId: Scalars['Int'];
};

export type FormationCountOrderByAggregateInput = {
  address?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  regionId?: InputMaybe<SortOrder>;
};

export type FormationCreateInput = {
  address?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  region?: InputMaybe<RegionCreateNestedOneWithoutFormationsInput>;
  solutions?: InputMaybe<SolutionCreateNestedManyWithoutFormationsInput>;
  zones?: InputMaybe<ZoneCreateNestedManyWithoutFormationInput>;
};

export type FormationCreateManyInput = {
  address?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  regionId?: InputMaybe<Scalars['Int']>;
};

export type FormationCreateManyRegionInput = {
  address?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

export type FormationCreateManyRegionInputEnvelope = {
  data: Array<FormationCreateManyRegionInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type FormationCreateNestedManyWithoutRegionInput = {
  connect?: InputMaybe<Array<FormationWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<FormationCreateOrConnectWithoutRegionInput>>;
  create?: InputMaybe<Array<FormationCreateWithoutRegionInput>>;
  createMany?: InputMaybe<FormationCreateManyRegionInputEnvelope>;
};

export type FormationCreateNestedManyWithoutSolutionsInput = {
  connect?: InputMaybe<Array<FormationWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<FormationCreateOrConnectWithoutSolutionsInput>>;
  create?: InputMaybe<Array<FormationCreateWithoutSolutionsInput>>;
};

export type FormationCreateNestedOneWithoutZonesInput = {
  connect?: InputMaybe<FormationWhereUniqueInput>;
  connectOrCreate?: InputMaybe<FormationCreateOrConnectWithoutZonesInput>;
  create?: InputMaybe<FormationCreateWithoutZonesInput>;
};

export type FormationCreateOrConnectWithoutRegionInput = {
  create: FormationCreateWithoutRegionInput;
  where: FormationWhereUniqueInput;
};

export type FormationCreateOrConnectWithoutSolutionsInput = {
  create: FormationCreateWithoutSolutionsInput;
  where: FormationWhereUniqueInput;
};

export type FormationCreateOrConnectWithoutZonesInput = {
  create: FormationCreateWithoutZonesInput;
  where: FormationWhereUniqueInput;
};

export type FormationCreateWithoutRegionInput = {
  address?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  solutions?: InputMaybe<SolutionCreateNestedManyWithoutFormationsInput>;
  zones?: InputMaybe<ZoneCreateNestedManyWithoutFormationInput>;
};

export type FormationCreateWithoutSolutionsInput = {
  address?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  region?: InputMaybe<RegionCreateNestedOneWithoutFormationsInput>;
  zones?: InputMaybe<ZoneCreateNestedManyWithoutFormationInput>;
};

export type FormationCreateWithoutZonesInput = {
  address?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  region?: InputMaybe<RegionCreateNestedOneWithoutFormationsInput>;
  solutions?: InputMaybe<SolutionCreateNestedManyWithoutFormationsInput>;
};

export type FormationGroupBy = {
  __typename?: 'FormationGroupBy';
  _avg?: Maybe<FormationAvgAggregate>;
  _count?: Maybe<FormationCountAggregate>;
  _max?: Maybe<FormationMaxAggregate>;
  _min?: Maybe<FormationMinAggregate>;
  _sum?: Maybe<FormationSumAggregate>;
  address?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  regionId?: Maybe<Scalars['Int']>;
};

export type FormationListRelationFilter = {
  every?: InputMaybe<FormationWhereInput>;
  none?: InputMaybe<FormationWhereInput>;
  some?: InputMaybe<FormationWhereInput>;
};

export type FormationMaxAggregate = {
  __typename?: 'FormationMaxAggregate';
  address?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  regionId?: Maybe<Scalars['Int']>;
};

export type FormationMaxOrderByAggregateInput = {
  address?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  regionId?: InputMaybe<SortOrder>;
};

export type FormationMinAggregate = {
  __typename?: 'FormationMinAggregate';
  address?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  regionId?: Maybe<Scalars['Int']>;
};

export type FormationMinOrderByAggregateInput = {
  address?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  regionId?: InputMaybe<SortOrder>;
};

export type FormationOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type FormationOrderByWithAggregationInput = {
  _avg?: InputMaybe<FormationAvgOrderByAggregateInput>;
  _count?: InputMaybe<FormationCountOrderByAggregateInput>;
  _max?: InputMaybe<FormationMaxOrderByAggregateInput>;
  _min?: InputMaybe<FormationMinOrderByAggregateInput>;
  _sum?: InputMaybe<FormationSumOrderByAggregateInput>;
  address?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  regionId?: InputMaybe<SortOrder>;
};

export type FormationOrderByWithRelationInput = {
  address?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  region?: InputMaybe<RegionOrderByWithRelationInput>;
  regionId?: InputMaybe<SortOrder>;
  solutions?: InputMaybe<SolutionOrderByRelationAggregateInput>;
  zones?: InputMaybe<ZoneOrderByRelationAggregateInput>;
};

export type FormationRelationFilter = {
  is?: InputMaybe<FormationWhereInput>;
  isNot?: InputMaybe<FormationWhereInput>;
};

export enum FormationScalarFieldEnum {
  Address = 'address',
  Id = 'id',
  Name = 'name',
  RegionId = 'regionId'
}

export type FormationScalarWhereInput = {
  AND?: InputMaybe<Array<FormationScalarWhereInput>>;
  NOT?: InputMaybe<Array<FormationScalarWhereInput>>;
  OR?: InputMaybe<Array<FormationScalarWhereInput>>;
  address?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringNullableFilter>;
  regionId?: InputMaybe<IntNullableFilter>;
};

export type FormationScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<FormationScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<FormationScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<FormationScalarWhereWithAggregatesInput>>;
  address?: InputMaybe<StringNullableWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  name?: InputMaybe<StringNullableWithAggregatesFilter>;
  regionId?: InputMaybe<IntNullableWithAggregatesFilter>;
};

export type FormationSumAggregate = {
  __typename?: 'FormationSumAggregate';
  id?: Maybe<Scalars['Int']>;
  regionId?: Maybe<Scalars['Int']>;
};

export type FormationSumOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  regionId?: InputMaybe<SortOrder>;
};

export type FormationUpdateInput = {
  address?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  region?: InputMaybe<RegionUpdateOneWithoutFormationsNestedInput>;
  solutions?: InputMaybe<SolutionUpdateManyWithoutFormationsNestedInput>;
  zones?: InputMaybe<ZoneUpdateManyWithoutFormationNestedInput>;
};

export type FormationUpdateManyMutationInput = {
  address?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type FormationUpdateManyWithWhereWithoutRegionInput = {
  data: FormationUpdateManyMutationInput;
  where: FormationScalarWhereInput;
};

export type FormationUpdateManyWithWhereWithoutSolutionsInput = {
  data: FormationUpdateManyMutationInput;
  where: FormationScalarWhereInput;
};

export type FormationUpdateManyWithoutRegionNestedInput = {
  connect?: InputMaybe<Array<FormationWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<FormationCreateOrConnectWithoutRegionInput>>;
  create?: InputMaybe<Array<FormationCreateWithoutRegionInput>>;
  createMany?: InputMaybe<FormationCreateManyRegionInputEnvelope>;
  delete?: InputMaybe<Array<FormationWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<FormationScalarWhereInput>>;
  disconnect?: InputMaybe<Array<FormationWhereUniqueInput>>;
  set?: InputMaybe<Array<FormationWhereUniqueInput>>;
  update?: InputMaybe<Array<FormationUpdateWithWhereUniqueWithoutRegionInput>>;
  updateMany?: InputMaybe<Array<FormationUpdateManyWithWhereWithoutRegionInput>>;
  upsert?: InputMaybe<Array<FormationUpsertWithWhereUniqueWithoutRegionInput>>;
};

export type FormationUpdateManyWithoutSolutionsNestedInput = {
  connect?: InputMaybe<Array<FormationWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<FormationCreateOrConnectWithoutSolutionsInput>>;
  create?: InputMaybe<Array<FormationCreateWithoutSolutionsInput>>;
  delete?: InputMaybe<Array<FormationWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<FormationScalarWhereInput>>;
  disconnect?: InputMaybe<Array<FormationWhereUniqueInput>>;
  set?: InputMaybe<Array<FormationWhereUniqueInput>>;
  update?: InputMaybe<Array<FormationUpdateWithWhereUniqueWithoutSolutionsInput>>;
  updateMany?: InputMaybe<Array<FormationUpdateManyWithWhereWithoutSolutionsInput>>;
  upsert?: InputMaybe<Array<FormationUpsertWithWhereUniqueWithoutSolutionsInput>>;
};

export type FormationUpdateOneWithoutZonesNestedInput = {
  connect?: InputMaybe<FormationWhereUniqueInput>;
  connectOrCreate?: InputMaybe<FormationCreateOrConnectWithoutZonesInput>;
  create?: InputMaybe<FormationCreateWithoutZonesInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<FormationUpdateWithoutZonesInput>;
  upsert?: InputMaybe<FormationUpsertWithoutZonesInput>;
};

export type FormationUpdateWithWhereUniqueWithoutRegionInput = {
  data: FormationUpdateWithoutRegionInput;
  where: FormationWhereUniqueInput;
};

export type FormationUpdateWithWhereUniqueWithoutSolutionsInput = {
  data: FormationUpdateWithoutSolutionsInput;
  where: FormationWhereUniqueInput;
};

export type FormationUpdateWithoutRegionInput = {
  address?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  solutions?: InputMaybe<SolutionUpdateManyWithoutFormationsNestedInput>;
  zones?: InputMaybe<ZoneUpdateManyWithoutFormationNestedInput>;
};

export type FormationUpdateWithoutSolutionsInput = {
  address?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  region?: InputMaybe<RegionUpdateOneWithoutFormationsNestedInput>;
  zones?: InputMaybe<ZoneUpdateManyWithoutFormationNestedInput>;
};

export type FormationUpdateWithoutZonesInput = {
  address?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  region?: InputMaybe<RegionUpdateOneWithoutFormationsNestedInput>;
  solutions?: InputMaybe<SolutionUpdateManyWithoutFormationsNestedInput>;
};

export type FormationUpsertWithWhereUniqueWithoutRegionInput = {
  create: FormationCreateWithoutRegionInput;
  update: FormationUpdateWithoutRegionInput;
  where: FormationWhereUniqueInput;
};

export type FormationUpsertWithWhereUniqueWithoutSolutionsInput = {
  create: FormationCreateWithoutSolutionsInput;
  update: FormationUpdateWithoutSolutionsInput;
  where: FormationWhereUniqueInput;
};

export type FormationUpsertWithoutZonesInput = {
  create: FormationCreateWithoutZonesInput;
  update: FormationUpdateWithoutZonesInput;
};

export type FormationWhereInput = {
  AND?: InputMaybe<Array<FormationWhereInput>>;
  NOT?: InputMaybe<Array<FormationWhereInput>>;
  OR?: InputMaybe<Array<FormationWhereInput>>;
  address?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringNullableFilter>;
  region?: InputMaybe<RegionRelationFilter>;
  regionId?: InputMaybe<IntNullableFilter>;
  solutions?: InputMaybe<SolutionListRelationFilter>;
  zones?: InputMaybe<ZoneListRelationFilter>;
};

export type FormationWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type IntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type IntNullableWithAggregatesFilter = {
  _avg?: InputMaybe<NestedFloatNullableFilter>;
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedIntNullableFilter>;
  _min?: InputMaybe<NestedIntNullableFilter>;
  _sum?: InputMaybe<NestedIntNullableFilter>;
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntNullableWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type IntWithAggregatesFilter = {
  _avg?: InputMaybe<NestedFloatFilter>;
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedIntFilter>;
  _min?: InputMaybe<NestedIntFilter>;
  _sum?: InputMaybe<NestedIntFilter>;
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createManyAlert: AffectedRowsOutput;
  createManyCompany: AffectedRowsOutput;
  createManyDevice: AffectedRowsOutput;
  createManyDeviceType: AffectedRowsOutput;
  createManyEvent: AffectedRowsOutput;
  createManyFormation: AffectedRowsOutput;
  createManyPriority: AffectedRowsOutput;
  createManyRegion: AffectedRowsOutput;
  createManySmartPole: AffectedRowsOutput;
  createManySolution: AffectedRowsOutput;
  createManyUser: AffectedRowsOutput;
  createManyUserGroup: AffectedRowsOutput;
  createManyUserRole: AffectedRowsOutput;
  createManyZone: AffectedRowsOutput;
  createOneAlert: Alert;
  createOneCompany: Company;
  createOneDevice: Device;
  createOneDeviceType: DeviceType;
  createOneEvent: Event;
  createOneFormation: Formation;
  createOnePriority: Priority;
  createOneRegion: Region;
  createOneSmartPole: SmartPole;
  createOneSolution: Solution;
  createOneUser: User;
  createOneUserGroup: UserGroup;
  createOneUserRole: UserRole;
  createOneZone: Zone;
  deleteManyAlert: AffectedRowsOutput;
  deleteManyCompany: AffectedRowsOutput;
  deleteManyDevice: AffectedRowsOutput;
  deleteManyDeviceType: AffectedRowsOutput;
  deleteManyEvent: AffectedRowsOutput;
  deleteManyFormation: AffectedRowsOutput;
  deleteManyPriority: AffectedRowsOutput;
  deleteManyRegion: AffectedRowsOutput;
  deleteManySmartPole: AffectedRowsOutput;
  deleteManySolution: AffectedRowsOutput;
  deleteManyUser: AffectedRowsOutput;
  deleteManyUserGroup: AffectedRowsOutput;
  deleteManyUserRole: AffectedRowsOutput;
  deleteManyZone: AffectedRowsOutput;
  deleteOneAlert?: Maybe<Alert>;
  deleteOneCompany?: Maybe<Company>;
  deleteOneDevice?: Maybe<Device>;
  deleteOneDeviceType?: Maybe<DeviceType>;
  deleteOneEvent?: Maybe<Event>;
  deleteOneFormation?: Maybe<Formation>;
  deleteOnePriority?: Maybe<Priority>;
  deleteOneRegion?: Maybe<Region>;
  deleteOneSmartPole?: Maybe<SmartPole>;
  deleteOneSolution?: Maybe<Solution>;
  deleteOneUser?: Maybe<User>;
  deleteOneUserGroup?: Maybe<UserGroup>;
  deleteOneUserRole?: Maybe<UserRole>;
  deleteOneZone?: Maybe<Zone>;
  updateManyAlert: AffectedRowsOutput;
  updateManyCompany: AffectedRowsOutput;
  updateManyDevice: AffectedRowsOutput;
  updateManyDeviceType: AffectedRowsOutput;
  updateManyEvent: AffectedRowsOutput;
  updateManyFormation: AffectedRowsOutput;
  updateManyPriority: AffectedRowsOutput;
  updateManyRegion: AffectedRowsOutput;
  updateManySmartPole: AffectedRowsOutput;
  updateManySolution: AffectedRowsOutput;
  updateManyUser: AffectedRowsOutput;
  updateManyUserGroup: AffectedRowsOutput;
  updateManyUserRole: AffectedRowsOutput;
  updateManyZone: AffectedRowsOutput;
  updateOneAlert?: Maybe<Alert>;
  updateOneCompany?: Maybe<Company>;
  updateOneDevice?: Maybe<Device>;
  updateOneDeviceType?: Maybe<DeviceType>;
  updateOneEvent?: Maybe<Event>;
  updateOneFormation?: Maybe<Formation>;
  updateOnePriority?: Maybe<Priority>;
  updateOneRegion?: Maybe<Region>;
  updateOneSmartPole?: Maybe<SmartPole>;
  updateOneSolution?: Maybe<Solution>;
  updateOneUser?: Maybe<User>;
  updateOneUserGroup?: Maybe<UserGroup>;
  updateOneUserRole?: Maybe<UserRole>;
  updateOneZone?: Maybe<Zone>;
  upsertOneAlert: Alert;
  upsertOneCompany: Company;
  upsertOneDevice: Device;
  upsertOneDeviceType: DeviceType;
  upsertOneEvent: Event;
  upsertOneFormation: Formation;
  upsertOnePriority: Priority;
  upsertOneRegion: Region;
  upsertOneSmartPole: SmartPole;
  upsertOneSolution: Solution;
  upsertOneUser: User;
  upsertOneUserGroup: UserGroup;
  upsertOneUserRole: UserRole;
  upsertOneZone: Zone;
};


export type MutationCreateManyAlertArgs = {
  data: Array<AlertCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};


export type MutationCreateManyCompanyArgs = {
  data: Array<CompanyCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};


export type MutationCreateManyDeviceArgs = {
  data: Array<DeviceCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};


export type MutationCreateManyDeviceTypeArgs = {
  data: Array<DeviceTypeCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};


export type MutationCreateManyEventArgs = {
  data: Array<EventCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};


export type MutationCreateManyFormationArgs = {
  data: Array<FormationCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};


export type MutationCreateManyPriorityArgs = {
  data: Array<PriorityCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};


export type MutationCreateManyRegionArgs = {
  data: Array<RegionCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};


export type MutationCreateManySmartPoleArgs = {
  data: Array<SmartPoleCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};


export type MutationCreateManySolutionArgs = {
  data: Array<SolutionCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};


export type MutationCreateManyUserArgs = {
  data: Array<UserCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};


export type MutationCreateManyUserGroupArgs = {
  data: Array<UserGroupCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};


export type MutationCreateManyUserRoleArgs = {
  data: Array<UserRoleCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};


export type MutationCreateManyZoneArgs = {
  data: Array<ZoneCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};


export type MutationCreateOneAlertArgs = {
  data: AlertCreateInput;
};


export type MutationCreateOneCompanyArgs = {
  data: CompanyCreateInput;
};


export type MutationCreateOneDeviceArgs = {
  data: DeviceCreateInput;
};


export type MutationCreateOneDeviceTypeArgs = {
  data: DeviceTypeCreateInput;
};


export type MutationCreateOneEventArgs = {
  data: EventCreateInput;
};


export type MutationCreateOneFormationArgs = {
  data: FormationCreateInput;
};


export type MutationCreateOnePriorityArgs = {
  data: PriorityCreateInput;
};


export type MutationCreateOneRegionArgs = {
  data: RegionCreateInput;
};


export type MutationCreateOneSmartPoleArgs = {
  data: SmartPoleCreateInput;
};


export type MutationCreateOneSolutionArgs = {
  data: SolutionCreateInput;
};


export type MutationCreateOneUserArgs = {
  data: UserCreateInput;
};


export type MutationCreateOneUserGroupArgs = {
  data: UserGroupCreateInput;
};


export type MutationCreateOneUserRoleArgs = {
  data: UserRoleCreateInput;
};


export type MutationCreateOneZoneArgs = {
  data: ZoneCreateInput;
};


export type MutationDeleteManyAlertArgs = {
  where?: InputMaybe<AlertWhereInput>;
};


export type MutationDeleteManyCompanyArgs = {
  where?: InputMaybe<CompanyWhereInput>;
};


export type MutationDeleteManyDeviceArgs = {
  where?: InputMaybe<DeviceWhereInput>;
};


export type MutationDeleteManyDeviceTypeArgs = {
  where?: InputMaybe<DeviceTypeWhereInput>;
};


export type MutationDeleteManyEventArgs = {
  where?: InputMaybe<EventWhereInput>;
};


export type MutationDeleteManyFormationArgs = {
  where?: InputMaybe<FormationWhereInput>;
};


export type MutationDeleteManyPriorityArgs = {
  where?: InputMaybe<PriorityWhereInput>;
};


export type MutationDeleteManyRegionArgs = {
  where?: InputMaybe<RegionWhereInput>;
};


export type MutationDeleteManySmartPoleArgs = {
  where?: InputMaybe<SmartPoleWhereInput>;
};


export type MutationDeleteManySolutionArgs = {
  where?: InputMaybe<SolutionWhereInput>;
};


export type MutationDeleteManyUserArgs = {
  where?: InputMaybe<UserWhereInput>;
};


export type MutationDeleteManyUserGroupArgs = {
  where?: InputMaybe<UserGroupWhereInput>;
};


export type MutationDeleteManyUserRoleArgs = {
  where?: InputMaybe<UserRoleWhereInput>;
};


export type MutationDeleteManyZoneArgs = {
  where?: InputMaybe<ZoneWhereInput>;
};


export type MutationDeleteOneAlertArgs = {
  where: AlertWhereUniqueInput;
};


export type MutationDeleteOneCompanyArgs = {
  where: CompanyWhereUniqueInput;
};


export type MutationDeleteOneDeviceArgs = {
  where: DeviceWhereUniqueInput;
};


export type MutationDeleteOneDeviceTypeArgs = {
  where: DeviceTypeWhereUniqueInput;
};


export type MutationDeleteOneEventArgs = {
  where: EventWhereUniqueInput;
};


export type MutationDeleteOneFormationArgs = {
  where: FormationWhereUniqueInput;
};


export type MutationDeleteOnePriorityArgs = {
  where: PriorityWhereUniqueInput;
};


export type MutationDeleteOneRegionArgs = {
  where: RegionWhereUniqueInput;
};


export type MutationDeleteOneSmartPoleArgs = {
  where: SmartPoleWhereUniqueInput;
};


export type MutationDeleteOneSolutionArgs = {
  where: SolutionWhereUniqueInput;
};


export type MutationDeleteOneUserArgs = {
  where: UserWhereUniqueInput;
};


export type MutationDeleteOneUserGroupArgs = {
  where: UserGroupWhereUniqueInput;
};


export type MutationDeleteOneUserRoleArgs = {
  where: UserRoleWhereUniqueInput;
};


export type MutationDeleteOneZoneArgs = {
  where: ZoneWhereUniqueInput;
};


export type MutationUpdateManyAlertArgs = {
  data: AlertUpdateManyMutationInput;
  where?: InputMaybe<AlertWhereInput>;
};


export type MutationUpdateManyCompanyArgs = {
  data: CompanyUpdateManyMutationInput;
  where?: InputMaybe<CompanyWhereInput>;
};


export type MutationUpdateManyDeviceArgs = {
  data: DeviceUpdateManyMutationInput;
  where?: InputMaybe<DeviceWhereInput>;
};


export type MutationUpdateManyDeviceTypeArgs = {
  data: DeviceTypeUpdateManyMutationInput;
  where?: InputMaybe<DeviceTypeWhereInput>;
};


export type MutationUpdateManyEventArgs = {
  data: EventUpdateManyMutationInput;
  where?: InputMaybe<EventWhereInput>;
};


export type MutationUpdateManyFormationArgs = {
  data: FormationUpdateManyMutationInput;
  where?: InputMaybe<FormationWhereInput>;
};


export type MutationUpdateManyPriorityArgs = {
  data: PriorityUpdateManyMutationInput;
  where?: InputMaybe<PriorityWhereInput>;
};


export type MutationUpdateManyRegionArgs = {
  data: RegionUpdateManyMutationInput;
  where?: InputMaybe<RegionWhereInput>;
};


export type MutationUpdateManySmartPoleArgs = {
  data: SmartPoleUpdateManyMutationInput;
  where?: InputMaybe<SmartPoleWhereInput>;
};


export type MutationUpdateManySolutionArgs = {
  data: SolutionUpdateManyMutationInput;
  where?: InputMaybe<SolutionWhereInput>;
};


export type MutationUpdateManyUserArgs = {
  data: UserUpdateManyMutationInput;
  where?: InputMaybe<UserWhereInput>;
};


export type MutationUpdateManyUserGroupArgs = {
  data: UserGroupUpdateManyMutationInput;
  where?: InputMaybe<UserGroupWhereInput>;
};


export type MutationUpdateManyUserRoleArgs = {
  data: UserRoleUpdateManyMutationInput;
  where?: InputMaybe<UserRoleWhereInput>;
};


export type MutationUpdateManyZoneArgs = {
  data: ZoneUpdateManyMutationInput;
  where?: InputMaybe<ZoneWhereInput>;
};


export type MutationUpdateOneAlertArgs = {
  data: AlertUpdateInput;
  where: AlertWhereUniqueInput;
};


export type MutationUpdateOneCompanyArgs = {
  data: CompanyUpdateInput;
  where: CompanyWhereUniqueInput;
};


export type MutationUpdateOneDeviceArgs = {
  data: DeviceUpdateInput;
  where: DeviceWhereUniqueInput;
};


export type MutationUpdateOneDeviceTypeArgs = {
  data: DeviceTypeUpdateInput;
  where: DeviceTypeWhereUniqueInput;
};


export type MutationUpdateOneEventArgs = {
  data: EventUpdateInput;
  where: EventWhereUniqueInput;
};


export type MutationUpdateOneFormationArgs = {
  data: FormationUpdateInput;
  where: FormationWhereUniqueInput;
};


export type MutationUpdateOnePriorityArgs = {
  data: PriorityUpdateInput;
  where: PriorityWhereUniqueInput;
};


export type MutationUpdateOneRegionArgs = {
  data: RegionUpdateInput;
  where: RegionWhereUniqueInput;
};


export type MutationUpdateOneSmartPoleArgs = {
  data: SmartPoleUpdateInput;
  where: SmartPoleWhereUniqueInput;
};


export type MutationUpdateOneSolutionArgs = {
  data: SolutionUpdateInput;
  where: SolutionWhereUniqueInput;
};


export type MutationUpdateOneUserArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};


export type MutationUpdateOneUserGroupArgs = {
  data: UserGroupUpdateInput;
  where: UserGroupWhereUniqueInput;
};


export type MutationUpdateOneUserRoleArgs = {
  data: UserRoleUpdateInput;
  where: UserRoleWhereUniqueInput;
};


export type MutationUpdateOneZoneArgs = {
  data: ZoneUpdateInput;
  where: ZoneWhereUniqueInput;
};


export type MutationUpsertOneAlertArgs = {
  create: AlertCreateInput;
  update: AlertUpdateInput;
  where: AlertWhereUniqueInput;
};


export type MutationUpsertOneCompanyArgs = {
  create: CompanyCreateInput;
  update: CompanyUpdateInput;
  where: CompanyWhereUniqueInput;
};


export type MutationUpsertOneDeviceArgs = {
  create: DeviceCreateInput;
  update: DeviceUpdateInput;
  where: DeviceWhereUniqueInput;
};


export type MutationUpsertOneDeviceTypeArgs = {
  create: DeviceTypeCreateInput;
  update: DeviceTypeUpdateInput;
  where: DeviceTypeWhereUniqueInput;
};


export type MutationUpsertOneEventArgs = {
  create: EventCreateInput;
  update: EventUpdateInput;
  where: EventWhereUniqueInput;
};


export type MutationUpsertOneFormationArgs = {
  create: FormationCreateInput;
  update: FormationUpdateInput;
  where: FormationWhereUniqueInput;
};


export type MutationUpsertOnePriorityArgs = {
  create: PriorityCreateInput;
  update: PriorityUpdateInput;
  where: PriorityWhereUniqueInput;
};


export type MutationUpsertOneRegionArgs = {
  create: RegionCreateInput;
  update: RegionUpdateInput;
  where: RegionWhereUniqueInput;
};


export type MutationUpsertOneSmartPoleArgs = {
  create: SmartPoleCreateInput;
  update: SmartPoleUpdateInput;
  where: SmartPoleWhereUniqueInput;
};


export type MutationUpsertOneSolutionArgs = {
  create: SolutionCreateInput;
  update: SolutionUpdateInput;
  where: SolutionWhereUniqueInput;
};


export type MutationUpsertOneUserArgs = {
  create: UserCreateInput;
  update: UserUpdateInput;
  where: UserWhereUniqueInput;
};


export type MutationUpsertOneUserGroupArgs = {
  create: UserGroupCreateInput;
  update: UserGroupUpdateInput;
  where: UserGroupWhereUniqueInput;
};


export type MutationUpsertOneUserRoleArgs = {
  create: UserRoleCreateInput;
  update: UserRoleUpdateInput;
  where: UserRoleWhereUniqueInput;
};


export type MutationUpsertOneZoneArgs = {
  create: ZoneCreateInput;
  update: ZoneUpdateInput;
  where: ZoneWhereUniqueInput;
};

export type NestedDateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type NestedDateTimeNullableWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedDateTimeNullableFilter>;
  _min?: InputMaybe<NestedDateTimeNullableFilter>;
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeNullableWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type NestedFloatFilter = {
  equals?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<Scalars['Float']>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<NestedFloatFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']>>;
};

export type NestedFloatNullableFilter = {
  equals?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<Scalars['Float']>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<NestedFloatNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']>>;
};

export type NestedFloatNullableWithAggregatesFilter = {
  _avg?: InputMaybe<NestedFloatNullableFilter>;
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedFloatNullableFilter>;
  _min?: InputMaybe<NestedFloatNullableFilter>;
  _sum?: InputMaybe<NestedFloatNullableFilter>;
  equals?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<Scalars['Float']>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<NestedFloatNullableWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']>>;
};

export type NestedIntFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type NestedIntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type NestedIntNullableWithAggregatesFilter = {
  _avg?: InputMaybe<NestedFloatNullableFilter>;
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedIntNullableFilter>;
  _min?: InputMaybe<NestedIntNullableFilter>;
  _sum?: InputMaybe<NestedIntNullableFilter>;
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntNullableWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type NestedIntWithAggregatesFilter = {
  _avg?: InputMaybe<NestedFloatFilter>;
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedIntFilter>;
  _min?: InputMaybe<NestedIntFilter>;
  _sum?: InputMaybe<NestedIntFilter>;
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type NestedStringNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type NestedStringNullableWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedStringNullableFilter>;
  _min?: InputMaybe<NestedStringNullableFilter>;
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringNullableWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type NullableDateTimeFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['DateTime']>;
};

export type NullableFloatFieldUpdateOperationsInput = {
  decrement?: InputMaybe<Scalars['Float']>;
  divide?: InputMaybe<Scalars['Float']>;
  increment?: InputMaybe<Scalars['Float']>;
  multiply?: InputMaybe<Scalars['Float']>;
  set?: InputMaybe<Scalars['Float']>;
};

export type NullableStringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['String']>;
};

export type Priority = {
  __typename?: 'Priority';
  _count?: Maybe<PriorityCount>;
  alerts: Array<Alert>;
  events: Array<Event>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
};


export type PriorityAlertsArgs = {
  cursor?: InputMaybe<AlertWhereUniqueInput>;
  distinct?: InputMaybe<Array<AlertScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AlertOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AlertWhereInput>;
};


export type PriorityEventsArgs = {
  cursor?: InputMaybe<EventWhereUniqueInput>;
  distinct?: InputMaybe<Array<EventScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<EventOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<EventWhereInput>;
};

export type PriorityAvgAggregate = {
  __typename?: 'PriorityAvgAggregate';
  id?: Maybe<Scalars['Float']>;
};

export type PriorityAvgOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type PriorityCount = {
  __typename?: 'PriorityCount';
  alerts: Scalars['Int'];
  events: Scalars['Int'];
};

export type PriorityCountAggregate = {
  __typename?: 'PriorityCountAggregate';
  _all: Scalars['Int'];
  id: Scalars['Int'];
  name: Scalars['Int'];
};

export type PriorityCountOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type PriorityCreateInput = {
  alerts?: InputMaybe<AlertCreateNestedManyWithoutPriorityInput>;
  events?: InputMaybe<EventCreateNestedManyWithoutPriorityInput>;
  name?: InputMaybe<Scalars['String']>;
};

export type PriorityCreateManyInput = {
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

export type PriorityCreateNestedOneWithoutAlertsInput = {
  connect?: InputMaybe<PriorityWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PriorityCreateOrConnectWithoutAlertsInput>;
  create?: InputMaybe<PriorityCreateWithoutAlertsInput>;
};

export type PriorityCreateNestedOneWithoutEventsInput = {
  connect?: InputMaybe<PriorityWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PriorityCreateOrConnectWithoutEventsInput>;
  create?: InputMaybe<PriorityCreateWithoutEventsInput>;
};

export type PriorityCreateOrConnectWithoutAlertsInput = {
  create: PriorityCreateWithoutAlertsInput;
  where: PriorityWhereUniqueInput;
};

export type PriorityCreateOrConnectWithoutEventsInput = {
  create: PriorityCreateWithoutEventsInput;
  where: PriorityWhereUniqueInput;
};

export type PriorityCreateWithoutAlertsInput = {
  events?: InputMaybe<EventCreateNestedManyWithoutPriorityInput>;
  name?: InputMaybe<Scalars['String']>;
};

export type PriorityCreateWithoutEventsInput = {
  alerts?: InputMaybe<AlertCreateNestedManyWithoutPriorityInput>;
  name?: InputMaybe<Scalars['String']>;
};

export type PriorityGroupBy = {
  __typename?: 'PriorityGroupBy';
  _avg?: Maybe<PriorityAvgAggregate>;
  _count?: Maybe<PriorityCountAggregate>;
  _max?: Maybe<PriorityMaxAggregate>;
  _min?: Maybe<PriorityMinAggregate>;
  _sum?: Maybe<PrioritySumAggregate>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
};

export type PriorityMaxAggregate = {
  __typename?: 'PriorityMaxAggregate';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type PriorityMaxOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type PriorityMinAggregate = {
  __typename?: 'PriorityMinAggregate';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type PriorityMinOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type PriorityOrderByWithAggregationInput = {
  _avg?: InputMaybe<PriorityAvgOrderByAggregateInput>;
  _count?: InputMaybe<PriorityCountOrderByAggregateInput>;
  _max?: InputMaybe<PriorityMaxOrderByAggregateInput>;
  _min?: InputMaybe<PriorityMinOrderByAggregateInput>;
  _sum?: InputMaybe<PrioritySumOrderByAggregateInput>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type PriorityOrderByWithRelationInput = {
  alerts?: InputMaybe<AlertOrderByRelationAggregateInput>;
  events?: InputMaybe<EventOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type PriorityRelationFilter = {
  is?: InputMaybe<PriorityWhereInput>;
  isNot?: InputMaybe<PriorityWhereInput>;
};

export enum PriorityScalarFieldEnum {
  Id = 'id',
  Name = 'name'
}

export type PriorityScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<PriorityScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<PriorityScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<PriorityScalarWhereWithAggregatesInput>>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  name?: InputMaybe<StringNullableWithAggregatesFilter>;
};

export type PrioritySumAggregate = {
  __typename?: 'PrioritySumAggregate';
  id?: Maybe<Scalars['Int']>;
};

export type PrioritySumOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type PriorityUpdateInput = {
  alerts?: InputMaybe<AlertUpdateManyWithoutPriorityNestedInput>;
  events?: InputMaybe<EventUpdateManyWithoutPriorityNestedInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type PriorityUpdateManyMutationInput = {
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type PriorityUpdateOneWithoutAlertsNestedInput = {
  connect?: InputMaybe<PriorityWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PriorityCreateOrConnectWithoutAlertsInput>;
  create?: InputMaybe<PriorityCreateWithoutAlertsInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<PriorityUpdateWithoutAlertsInput>;
  upsert?: InputMaybe<PriorityUpsertWithoutAlertsInput>;
};

export type PriorityUpdateOneWithoutEventsNestedInput = {
  connect?: InputMaybe<PriorityWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PriorityCreateOrConnectWithoutEventsInput>;
  create?: InputMaybe<PriorityCreateWithoutEventsInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<PriorityUpdateWithoutEventsInput>;
  upsert?: InputMaybe<PriorityUpsertWithoutEventsInput>;
};

export type PriorityUpdateWithoutAlertsInput = {
  events?: InputMaybe<EventUpdateManyWithoutPriorityNestedInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type PriorityUpdateWithoutEventsInput = {
  alerts?: InputMaybe<AlertUpdateManyWithoutPriorityNestedInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type PriorityUpsertWithoutAlertsInput = {
  create: PriorityCreateWithoutAlertsInput;
  update: PriorityUpdateWithoutAlertsInput;
};

export type PriorityUpsertWithoutEventsInput = {
  create: PriorityCreateWithoutEventsInput;
  update: PriorityUpdateWithoutEventsInput;
};

export type PriorityWhereInput = {
  AND?: InputMaybe<Array<PriorityWhereInput>>;
  NOT?: InputMaybe<Array<PriorityWhereInput>>;
  OR?: InputMaybe<Array<PriorityWhereInput>>;
  alerts?: InputMaybe<AlertListRelationFilter>;
  events?: InputMaybe<EventListRelationFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringNullableFilter>;
};

export type PriorityWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  aggregateAlert: AggregateAlert;
  aggregateCompany: AggregateCompany;
  aggregateDevice: AggregateDevice;
  aggregateDeviceType: AggregateDeviceType;
  aggregateEvent: AggregateEvent;
  aggregateFormation: AggregateFormation;
  aggregatePriority: AggregatePriority;
  aggregateRegion: AggregateRegion;
  aggregateSmartPole: AggregateSmartPole;
  aggregateSolution: AggregateSolution;
  aggregateUser: AggregateUser;
  aggregateUserGroup: AggregateUserGroup;
  aggregateUserRole: AggregateUserRole;
  aggregateZone: AggregateZone;
  alert?: Maybe<Alert>;
  alerts: Array<Alert>;
  companies: Array<Company>;
  company?: Maybe<Company>;
  device?: Maybe<Device>;
  deviceType?: Maybe<DeviceType>;
  deviceTypes: Array<DeviceType>;
  devices: Array<Device>;
  event?: Maybe<Event>;
  events: Array<Event>;
  findFirstAlert?: Maybe<Alert>;
  findFirstCompany?: Maybe<Company>;
  findFirstDevice?: Maybe<Device>;
  findFirstDeviceType?: Maybe<DeviceType>;
  findFirstEvent?: Maybe<Event>;
  findFirstFormation?: Maybe<Formation>;
  findFirstPriority?: Maybe<Priority>;
  findFirstRegion?: Maybe<Region>;
  findFirstSmartPole?: Maybe<SmartPole>;
  findFirstSolution?: Maybe<Solution>;
  findFirstUser?: Maybe<User>;
  findFirstUserGroup?: Maybe<UserGroup>;
  findFirstUserRole?: Maybe<UserRole>;
  findFirstZone?: Maybe<Zone>;
  formation?: Maybe<Formation>;
  formations: Array<Formation>;
  groupByAlert: Array<AlertGroupBy>;
  groupByCompany: Array<CompanyGroupBy>;
  groupByDevice: Array<DeviceGroupBy>;
  groupByDeviceType: Array<DeviceTypeGroupBy>;
  groupByEvent: Array<EventGroupBy>;
  groupByFormation: Array<FormationGroupBy>;
  groupByPriority: Array<PriorityGroupBy>;
  groupByRegion: Array<RegionGroupBy>;
  groupBySmartPole: Array<SmartPoleGroupBy>;
  groupBySolution: Array<SolutionGroupBy>;
  groupByUser: Array<UserGroupBy>;
  groupByUserGroup: Array<UserGroupGroupBy>;
  groupByUserRole: Array<UserRoleGroupBy>;
  groupByZone: Array<ZoneGroupBy>;
  priorities: Array<Priority>;
  priority?: Maybe<Priority>;
  region?: Maybe<Region>;
  regions: Array<Region>;
  smartPole?: Maybe<SmartPole>;
  smartPoles: Array<SmartPole>;
  solution?: Maybe<Solution>;
  solutions: Array<Solution>;
  user?: Maybe<User>;
  userGroup?: Maybe<UserGroup>;
  userGroups: Array<UserGroup>;
  userRole?: Maybe<UserRole>;
  userRoles: Array<UserRole>;
  users: Array<User>;
  zone?: Maybe<Zone>;
  zones: Array<Zone>;
};


export type QueryAggregateAlertArgs = {
  cursor?: InputMaybe<AlertWhereUniqueInput>;
  orderBy?: InputMaybe<Array<AlertOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AlertWhereInput>;
};


export type QueryAggregateCompanyArgs = {
  cursor?: InputMaybe<CompanyWhereUniqueInput>;
  orderBy?: InputMaybe<Array<CompanyOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CompanyWhereInput>;
};


export type QueryAggregateDeviceArgs = {
  cursor?: InputMaybe<DeviceWhereUniqueInput>;
  orderBy?: InputMaybe<Array<DeviceOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DeviceWhereInput>;
};


export type QueryAggregateDeviceTypeArgs = {
  cursor?: InputMaybe<DeviceTypeWhereUniqueInput>;
  orderBy?: InputMaybe<Array<DeviceTypeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DeviceTypeWhereInput>;
};


export type QueryAggregateEventArgs = {
  cursor?: InputMaybe<EventWhereUniqueInput>;
  orderBy?: InputMaybe<Array<EventOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<EventWhereInput>;
};


export type QueryAggregateFormationArgs = {
  cursor?: InputMaybe<FormationWhereUniqueInput>;
  orderBy?: InputMaybe<Array<FormationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<FormationWhereInput>;
};


export type QueryAggregatePriorityArgs = {
  cursor?: InputMaybe<PriorityWhereUniqueInput>;
  orderBy?: InputMaybe<Array<PriorityOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PriorityWhereInput>;
};


export type QueryAggregateRegionArgs = {
  cursor?: InputMaybe<RegionWhereUniqueInput>;
  orderBy?: InputMaybe<Array<RegionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RegionWhereInput>;
};


export type QueryAggregateSmartPoleArgs = {
  cursor?: InputMaybe<SmartPoleWhereUniqueInput>;
  orderBy?: InputMaybe<Array<SmartPoleOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SmartPoleWhereInput>;
};


export type QueryAggregateSolutionArgs = {
  cursor?: InputMaybe<SolutionWhereUniqueInput>;
  orderBy?: InputMaybe<Array<SolutionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SolutionWhereInput>;
};


export type QueryAggregateUserArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};


export type QueryAggregateUserGroupArgs = {
  cursor?: InputMaybe<UserGroupWhereUniqueInput>;
  orderBy?: InputMaybe<Array<UserGroupOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserGroupWhereInput>;
};


export type QueryAggregateUserRoleArgs = {
  cursor?: InputMaybe<UserRoleWhereUniqueInput>;
  orderBy?: InputMaybe<Array<UserRoleOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserRoleWhereInput>;
};


export type QueryAggregateZoneArgs = {
  cursor?: InputMaybe<ZoneWhereUniqueInput>;
  orderBy?: InputMaybe<Array<ZoneOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ZoneWhereInput>;
};


export type QueryAlertArgs = {
  where: AlertWhereUniqueInput;
};


export type QueryAlertsArgs = {
  cursor?: InputMaybe<AlertWhereUniqueInput>;
  distinct?: InputMaybe<Array<AlertScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AlertOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AlertWhereInput>;
};


export type QueryCompaniesArgs = {
  cursor?: InputMaybe<CompanyWhereUniqueInput>;
  distinct?: InputMaybe<Array<CompanyScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<CompanyOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CompanyWhereInput>;
};


export type QueryCompanyArgs = {
  where: CompanyWhereUniqueInput;
};


export type QueryDeviceArgs = {
  where: DeviceWhereUniqueInput;
};


export type QueryDeviceTypeArgs = {
  where: DeviceTypeWhereUniqueInput;
};


export type QueryDeviceTypesArgs = {
  cursor?: InputMaybe<DeviceTypeWhereUniqueInput>;
  distinct?: InputMaybe<Array<DeviceTypeScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<DeviceTypeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DeviceTypeWhereInput>;
};


export type QueryDevicesArgs = {
  cursor?: InputMaybe<DeviceWhereUniqueInput>;
  distinct?: InputMaybe<Array<DeviceScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<DeviceOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DeviceWhereInput>;
};


export type QueryEventArgs = {
  where: EventWhereUniqueInput;
};


export type QueryEventsArgs = {
  cursor?: InputMaybe<EventWhereUniqueInput>;
  distinct?: InputMaybe<Array<EventScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<EventOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<EventWhereInput>;
};


export type QueryFindFirstAlertArgs = {
  cursor?: InputMaybe<AlertWhereUniqueInput>;
  distinct?: InputMaybe<Array<AlertScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AlertOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AlertWhereInput>;
};


export type QueryFindFirstCompanyArgs = {
  cursor?: InputMaybe<CompanyWhereUniqueInput>;
  distinct?: InputMaybe<Array<CompanyScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<CompanyOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CompanyWhereInput>;
};


export type QueryFindFirstDeviceArgs = {
  cursor?: InputMaybe<DeviceWhereUniqueInput>;
  distinct?: InputMaybe<Array<DeviceScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<DeviceOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DeviceWhereInput>;
};


export type QueryFindFirstDeviceTypeArgs = {
  cursor?: InputMaybe<DeviceTypeWhereUniqueInput>;
  distinct?: InputMaybe<Array<DeviceTypeScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<DeviceTypeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DeviceTypeWhereInput>;
};


export type QueryFindFirstEventArgs = {
  cursor?: InputMaybe<EventWhereUniqueInput>;
  distinct?: InputMaybe<Array<EventScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<EventOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<EventWhereInput>;
};


export type QueryFindFirstFormationArgs = {
  cursor?: InputMaybe<FormationWhereUniqueInput>;
  distinct?: InputMaybe<Array<FormationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<FormationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<FormationWhereInput>;
};


export type QueryFindFirstPriorityArgs = {
  cursor?: InputMaybe<PriorityWhereUniqueInput>;
  distinct?: InputMaybe<Array<PriorityScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<PriorityOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PriorityWhereInput>;
};


export type QueryFindFirstRegionArgs = {
  cursor?: InputMaybe<RegionWhereUniqueInput>;
  distinct?: InputMaybe<Array<RegionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<RegionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RegionWhereInput>;
};


export type QueryFindFirstSmartPoleArgs = {
  cursor?: InputMaybe<SmartPoleWhereUniqueInput>;
  distinct?: InputMaybe<Array<SmartPoleScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SmartPoleOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SmartPoleWhereInput>;
};


export type QueryFindFirstSolutionArgs = {
  cursor?: InputMaybe<SolutionWhereUniqueInput>;
  distinct?: InputMaybe<Array<SolutionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SolutionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SolutionWhereInput>;
};


export type QueryFindFirstUserArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};


export type QueryFindFirstUserGroupArgs = {
  cursor?: InputMaybe<UserGroupWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserGroupScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserGroupOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserGroupWhereInput>;
};


export type QueryFindFirstUserRoleArgs = {
  cursor?: InputMaybe<UserRoleWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserRoleScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserRoleOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserRoleWhereInput>;
};


export type QueryFindFirstZoneArgs = {
  cursor?: InputMaybe<ZoneWhereUniqueInput>;
  distinct?: InputMaybe<Array<ZoneScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ZoneOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ZoneWhereInput>;
};


export type QueryFormationArgs = {
  where: FormationWhereUniqueInput;
};


export type QueryFormationsArgs = {
  cursor?: InputMaybe<FormationWhereUniqueInput>;
  distinct?: InputMaybe<Array<FormationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<FormationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<FormationWhereInput>;
};


export type QueryGroupByAlertArgs = {
  by: Array<AlertScalarFieldEnum>;
  having?: InputMaybe<AlertScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<AlertOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AlertWhereInput>;
};


export type QueryGroupByCompanyArgs = {
  by: Array<CompanyScalarFieldEnum>;
  having?: InputMaybe<CompanyScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<CompanyOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CompanyWhereInput>;
};


export type QueryGroupByDeviceArgs = {
  by: Array<DeviceScalarFieldEnum>;
  having?: InputMaybe<DeviceScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<DeviceOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DeviceWhereInput>;
};


export type QueryGroupByDeviceTypeArgs = {
  by: Array<DeviceTypeScalarFieldEnum>;
  having?: InputMaybe<DeviceTypeScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<DeviceTypeOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DeviceTypeWhereInput>;
};


export type QueryGroupByEventArgs = {
  by: Array<EventScalarFieldEnum>;
  having?: InputMaybe<EventScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<EventOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<EventWhereInput>;
};


export type QueryGroupByFormationArgs = {
  by: Array<FormationScalarFieldEnum>;
  having?: InputMaybe<FormationScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<FormationOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<FormationWhereInput>;
};


export type QueryGroupByPriorityArgs = {
  by: Array<PriorityScalarFieldEnum>;
  having?: InputMaybe<PriorityScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<PriorityOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PriorityWhereInput>;
};


export type QueryGroupByRegionArgs = {
  by: Array<RegionScalarFieldEnum>;
  having?: InputMaybe<RegionScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<RegionOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RegionWhereInput>;
};


export type QueryGroupBySmartPoleArgs = {
  by: Array<SmartPoleScalarFieldEnum>;
  having?: InputMaybe<SmartPoleScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<SmartPoleOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SmartPoleWhereInput>;
};


export type QueryGroupBySolutionArgs = {
  by: Array<SolutionScalarFieldEnum>;
  having?: InputMaybe<SolutionScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<SolutionOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SolutionWhereInput>;
};


export type QueryGroupByUserArgs = {
  by: Array<UserScalarFieldEnum>;
  having?: InputMaybe<UserScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<UserOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};


export type QueryGroupByUserGroupArgs = {
  by: Array<UserGroupScalarFieldEnum>;
  having?: InputMaybe<UserGroupScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<UserGroupOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserGroupWhereInput>;
};


export type QueryGroupByUserRoleArgs = {
  by: Array<UserRoleScalarFieldEnum>;
  having?: InputMaybe<UserRoleScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<UserRoleOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserRoleWhereInput>;
};


export type QueryGroupByZoneArgs = {
  by: Array<ZoneScalarFieldEnum>;
  having?: InputMaybe<ZoneScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<ZoneOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ZoneWhereInput>;
};


export type QueryPrioritiesArgs = {
  cursor?: InputMaybe<PriorityWhereUniqueInput>;
  distinct?: InputMaybe<Array<PriorityScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<PriorityOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PriorityWhereInput>;
};


export type QueryPriorityArgs = {
  where: PriorityWhereUniqueInput;
};


export type QueryRegionArgs = {
  where: RegionWhereUniqueInput;
};


export type QueryRegionsArgs = {
  cursor?: InputMaybe<RegionWhereUniqueInput>;
  distinct?: InputMaybe<Array<RegionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<RegionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RegionWhereInput>;
};


export type QuerySmartPoleArgs = {
  where: SmartPoleWhereUniqueInput;
};


export type QuerySmartPolesArgs = {
  cursor?: InputMaybe<SmartPoleWhereUniqueInput>;
  distinct?: InputMaybe<Array<SmartPoleScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SmartPoleOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SmartPoleWhereInput>;
};


export type QuerySolutionArgs = {
  where: SolutionWhereUniqueInput;
};


export type QuerySolutionsArgs = {
  cursor?: InputMaybe<SolutionWhereUniqueInput>;
  distinct?: InputMaybe<Array<SolutionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SolutionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SolutionWhereInput>;
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};


export type QueryUserGroupArgs = {
  where: UserGroupWhereUniqueInput;
};


export type QueryUserGroupsArgs = {
  cursor?: InputMaybe<UserGroupWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserGroupScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserGroupOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserGroupWhereInput>;
};


export type QueryUserRoleArgs = {
  where: UserRoleWhereUniqueInput;
};


export type QueryUserRolesArgs = {
  cursor?: InputMaybe<UserRoleWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserRoleScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserRoleOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserRoleWhereInput>;
};


export type QueryUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};


export type QueryZoneArgs = {
  where: ZoneWhereUniqueInput;
};


export type QueryZonesArgs = {
  cursor?: InputMaybe<ZoneWhereUniqueInput>;
  distinct?: InputMaybe<Array<ZoneScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ZoneOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ZoneWhereInput>;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export type Region = {
  __typename?: 'Region';
  _count?: Maybe<RegionCount>;
  company?: Maybe<Company>;
  companyId?: Maybe<Scalars['Int']>;
  formations: Array<Formation>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
};


export type RegionFormationsArgs = {
  cursor?: InputMaybe<FormationWhereUniqueInput>;
  distinct?: InputMaybe<Array<FormationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<FormationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<FormationWhereInput>;
};

export type RegionAvgAggregate = {
  __typename?: 'RegionAvgAggregate';
  companyId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

export type RegionAvgOrderByAggregateInput = {
  companyId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
};

export type RegionCount = {
  __typename?: 'RegionCount';
  formations: Scalars['Int'];
};

export type RegionCountAggregate = {
  __typename?: 'RegionCountAggregate';
  _all: Scalars['Int'];
  companyId: Scalars['Int'];
  id: Scalars['Int'];
  name: Scalars['Int'];
};

export type RegionCountOrderByAggregateInput = {
  companyId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type RegionCreateInput = {
  company?: InputMaybe<CompanyCreateNestedOneWithoutRegionsInput>;
  formations?: InputMaybe<FormationCreateNestedManyWithoutRegionInput>;
  name?: InputMaybe<Scalars['String']>;
};

export type RegionCreateManyCompanyInput = {
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

export type RegionCreateManyCompanyInputEnvelope = {
  data: Array<RegionCreateManyCompanyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type RegionCreateManyInput = {
  companyId?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

export type RegionCreateNestedManyWithoutCompanyInput = {
  connect?: InputMaybe<Array<RegionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<RegionCreateOrConnectWithoutCompanyInput>>;
  create?: InputMaybe<Array<RegionCreateWithoutCompanyInput>>;
  createMany?: InputMaybe<RegionCreateManyCompanyInputEnvelope>;
};

export type RegionCreateNestedOneWithoutFormationsInput = {
  connect?: InputMaybe<RegionWhereUniqueInput>;
  connectOrCreate?: InputMaybe<RegionCreateOrConnectWithoutFormationsInput>;
  create?: InputMaybe<RegionCreateWithoutFormationsInput>;
};

export type RegionCreateOrConnectWithoutCompanyInput = {
  create: RegionCreateWithoutCompanyInput;
  where: RegionWhereUniqueInput;
};

export type RegionCreateOrConnectWithoutFormationsInput = {
  create: RegionCreateWithoutFormationsInput;
  where: RegionWhereUniqueInput;
};

export type RegionCreateWithoutCompanyInput = {
  formations?: InputMaybe<FormationCreateNestedManyWithoutRegionInput>;
  name?: InputMaybe<Scalars['String']>;
};

export type RegionCreateWithoutFormationsInput = {
  company?: InputMaybe<CompanyCreateNestedOneWithoutRegionsInput>;
  name?: InputMaybe<Scalars['String']>;
};

export type RegionGroupBy = {
  __typename?: 'RegionGroupBy';
  _avg?: Maybe<RegionAvgAggregate>;
  _count?: Maybe<RegionCountAggregate>;
  _max?: Maybe<RegionMaxAggregate>;
  _min?: Maybe<RegionMinAggregate>;
  _sum?: Maybe<RegionSumAggregate>;
  companyId?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
};

export type RegionListRelationFilter = {
  every?: InputMaybe<RegionWhereInput>;
  none?: InputMaybe<RegionWhereInput>;
  some?: InputMaybe<RegionWhereInput>;
};

export type RegionMaxAggregate = {
  __typename?: 'RegionMaxAggregate';
  companyId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type RegionMaxOrderByAggregateInput = {
  companyId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type RegionMinAggregate = {
  __typename?: 'RegionMinAggregate';
  companyId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type RegionMinOrderByAggregateInput = {
  companyId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type RegionOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type RegionOrderByWithAggregationInput = {
  _avg?: InputMaybe<RegionAvgOrderByAggregateInput>;
  _count?: InputMaybe<RegionCountOrderByAggregateInput>;
  _max?: InputMaybe<RegionMaxOrderByAggregateInput>;
  _min?: InputMaybe<RegionMinOrderByAggregateInput>;
  _sum?: InputMaybe<RegionSumOrderByAggregateInput>;
  companyId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type RegionOrderByWithRelationInput = {
  company?: InputMaybe<CompanyOrderByWithRelationInput>;
  companyId?: InputMaybe<SortOrder>;
  formations?: InputMaybe<FormationOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type RegionRelationFilter = {
  is?: InputMaybe<RegionWhereInput>;
  isNot?: InputMaybe<RegionWhereInput>;
};

export enum RegionScalarFieldEnum {
  CompanyId = 'companyId',
  Id = 'id',
  Name = 'name'
}

export type RegionScalarWhereInput = {
  AND?: InputMaybe<Array<RegionScalarWhereInput>>;
  NOT?: InputMaybe<Array<RegionScalarWhereInput>>;
  OR?: InputMaybe<Array<RegionScalarWhereInput>>;
  companyId?: InputMaybe<IntNullableFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringNullableFilter>;
};

export type RegionScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<RegionScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<RegionScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<RegionScalarWhereWithAggregatesInput>>;
  companyId?: InputMaybe<IntNullableWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  name?: InputMaybe<StringNullableWithAggregatesFilter>;
};

export type RegionSumAggregate = {
  __typename?: 'RegionSumAggregate';
  companyId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
};

export type RegionSumOrderByAggregateInput = {
  companyId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
};

export type RegionUpdateInput = {
  company?: InputMaybe<CompanyUpdateOneWithoutRegionsNestedInput>;
  formations?: InputMaybe<FormationUpdateManyWithoutRegionNestedInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type RegionUpdateManyMutationInput = {
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type RegionUpdateManyWithWhereWithoutCompanyInput = {
  data: RegionUpdateManyMutationInput;
  where: RegionScalarWhereInput;
};

export type RegionUpdateManyWithoutCompanyNestedInput = {
  connect?: InputMaybe<Array<RegionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<RegionCreateOrConnectWithoutCompanyInput>>;
  create?: InputMaybe<Array<RegionCreateWithoutCompanyInput>>;
  createMany?: InputMaybe<RegionCreateManyCompanyInputEnvelope>;
  delete?: InputMaybe<Array<RegionWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<RegionScalarWhereInput>>;
  disconnect?: InputMaybe<Array<RegionWhereUniqueInput>>;
  set?: InputMaybe<Array<RegionWhereUniqueInput>>;
  update?: InputMaybe<Array<RegionUpdateWithWhereUniqueWithoutCompanyInput>>;
  updateMany?: InputMaybe<Array<RegionUpdateManyWithWhereWithoutCompanyInput>>;
  upsert?: InputMaybe<Array<RegionUpsertWithWhereUniqueWithoutCompanyInput>>;
};

export type RegionUpdateOneWithoutFormationsNestedInput = {
  connect?: InputMaybe<RegionWhereUniqueInput>;
  connectOrCreate?: InputMaybe<RegionCreateOrConnectWithoutFormationsInput>;
  create?: InputMaybe<RegionCreateWithoutFormationsInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<RegionUpdateWithoutFormationsInput>;
  upsert?: InputMaybe<RegionUpsertWithoutFormationsInput>;
};

export type RegionUpdateWithWhereUniqueWithoutCompanyInput = {
  data: RegionUpdateWithoutCompanyInput;
  where: RegionWhereUniqueInput;
};

export type RegionUpdateWithoutCompanyInput = {
  formations?: InputMaybe<FormationUpdateManyWithoutRegionNestedInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type RegionUpdateWithoutFormationsInput = {
  company?: InputMaybe<CompanyUpdateOneWithoutRegionsNestedInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type RegionUpsertWithWhereUniqueWithoutCompanyInput = {
  create: RegionCreateWithoutCompanyInput;
  update: RegionUpdateWithoutCompanyInput;
  where: RegionWhereUniqueInput;
};

export type RegionUpsertWithoutFormationsInput = {
  create: RegionCreateWithoutFormationsInput;
  update: RegionUpdateWithoutFormationsInput;
};

export type RegionWhereInput = {
  AND?: InputMaybe<Array<RegionWhereInput>>;
  NOT?: InputMaybe<Array<RegionWhereInput>>;
  OR?: InputMaybe<Array<RegionWhereInput>>;
  company?: InputMaybe<CompanyRelationFilter>;
  companyId?: InputMaybe<IntNullableFilter>;
  formations?: InputMaybe<FormationListRelationFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringNullableFilter>;
};

export type RegionWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export type SmartPole = {
  __typename?: 'SmartPole';
  _count?: Maybe<SmartPoleCount>;
  connectDeviceId?: Maybe<Scalars['String']>;
  connectLocationId?: Maybe<Scalars['Float']>;
  devices: Array<Device>;
  id: Scalars['Int'];
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  serial?: Maybe<Scalars['String']>;
  zone?: Maybe<Zone>;
  zoneId?: Maybe<Scalars['Int']>;
};


export type SmartPoleDevicesArgs = {
  cursor?: InputMaybe<DeviceWhereUniqueInput>;
  distinct?: InputMaybe<Array<DeviceScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<DeviceOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DeviceWhereInput>;
};

export type SmartPoleAvgAggregate = {
  __typename?: 'SmartPoleAvgAggregate';
  connectLocationId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  zoneId?: Maybe<Scalars['Float']>;
};

export type SmartPoleAvgOrderByAggregateInput = {
  connectLocationId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  latitude?: InputMaybe<SortOrder>;
  longitude?: InputMaybe<SortOrder>;
  zoneId?: InputMaybe<SortOrder>;
};

export type SmartPoleCount = {
  __typename?: 'SmartPoleCount';
  devices: Scalars['Int'];
};

export type SmartPoleCountAggregate = {
  __typename?: 'SmartPoleCountAggregate';
  _all: Scalars['Int'];
  connectDeviceId: Scalars['Int'];
  connectLocationId: Scalars['Int'];
  id: Scalars['Int'];
  latitude: Scalars['Int'];
  longitude: Scalars['Int'];
  name: Scalars['Int'];
  serial: Scalars['Int'];
  zoneId: Scalars['Int'];
};

export type SmartPoleCountOrderByAggregateInput = {
  connectDeviceId?: InputMaybe<SortOrder>;
  connectLocationId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  latitude?: InputMaybe<SortOrder>;
  longitude?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  serial?: InputMaybe<SortOrder>;
  zoneId?: InputMaybe<SortOrder>;
};

export type SmartPoleCreateInput = {
  connectDeviceId?: InputMaybe<Scalars['String']>;
  connectLocationId?: InputMaybe<Scalars['Float']>;
  devices?: InputMaybe<DeviceCreateNestedManyWithoutSmartPoleInput>;
  latitude?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  serial?: InputMaybe<Scalars['String']>;
  zone?: InputMaybe<ZoneCreateNestedOneWithoutSmartPolesInput>;
};

export type SmartPoleCreateManyInput = {
  connectDeviceId?: InputMaybe<Scalars['String']>;
  connectLocationId?: InputMaybe<Scalars['Float']>;
  id?: InputMaybe<Scalars['Int']>;
  latitude?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  serial?: InputMaybe<Scalars['String']>;
  zoneId?: InputMaybe<Scalars['Int']>;
};

export type SmartPoleCreateManyZoneInput = {
  connectDeviceId?: InputMaybe<Scalars['String']>;
  connectLocationId?: InputMaybe<Scalars['Float']>;
  id?: InputMaybe<Scalars['Int']>;
  latitude?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  serial?: InputMaybe<Scalars['String']>;
};

export type SmartPoleCreateManyZoneInputEnvelope = {
  data: Array<SmartPoleCreateManyZoneInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type SmartPoleCreateNestedManyWithoutZoneInput = {
  connect?: InputMaybe<Array<SmartPoleWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<SmartPoleCreateOrConnectWithoutZoneInput>>;
  create?: InputMaybe<Array<SmartPoleCreateWithoutZoneInput>>;
  createMany?: InputMaybe<SmartPoleCreateManyZoneInputEnvelope>;
};

export type SmartPoleCreateNestedOneWithoutDevicesInput = {
  connect?: InputMaybe<SmartPoleWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SmartPoleCreateOrConnectWithoutDevicesInput>;
  create?: InputMaybe<SmartPoleCreateWithoutDevicesInput>;
};

export type SmartPoleCreateOrConnectWithoutDevicesInput = {
  create: SmartPoleCreateWithoutDevicesInput;
  where: SmartPoleWhereUniqueInput;
};

export type SmartPoleCreateOrConnectWithoutZoneInput = {
  create: SmartPoleCreateWithoutZoneInput;
  where: SmartPoleWhereUniqueInput;
};

export type SmartPoleCreateWithoutDevicesInput = {
  connectDeviceId?: InputMaybe<Scalars['String']>;
  connectLocationId?: InputMaybe<Scalars['Float']>;
  latitude?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  serial?: InputMaybe<Scalars['String']>;
  zone?: InputMaybe<ZoneCreateNestedOneWithoutSmartPolesInput>;
};

export type SmartPoleCreateWithoutZoneInput = {
  connectDeviceId?: InputMaybe<Scalars['String']>;
  connectLocationId?: InputMaybe<Scalars['Float']>;
  devices?: InputMaybe<DeviceCreateNestedManyWithoutSmartPoleInput>;
  latitude?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  serial?: InputMaybe<Scalars['String']>;
};

export type SmartPoleGroupBy = {
  __typename?: 'SmartPoleGroupBy';
  _avg?: Maybe<SmartPoleAvgAggregate>;
  _count?: Maybe<SmartPoleCountAggregate>;
  _max?: Maybe<SmartPoleMaxAggregate>;
  _min?: Maybe<SmartPoleMinAggregate>;
  _sum?: Maybe<SmartPoleSumAggregate>;
  connectDeviceId?: Maybe<Scalars['String']>;
  connectLocationId?: Maybe<Scalars['Float']>;
  id: Scalars['Int'];
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  serial?: Maybe<Scalars['String']>;
  zoneId?: Maybe<Scalars['Int']>;
};

export type SmartPoleListRelationFilter = {
  every?: InputMaybe<SmartPoleWhereInput>;
  none?: InputMaybe<SmartPoleWhereInput>;
  some?: InputMaybe<SmartPoleWhereInput>;
};

export type SmartPoleMaxAggregate = {
  __typename?: 'SmartPoleMaxAggregate';
  connectDeviceId?: Maybe<Scalars['String']>;
  connectLocationId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Int']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  serial?: Maybe<Scalars['String']>;
  zoneId?: Maybe<Scalars['Int']>;
};

export type SmartPoleMaxOrderByAggregateInput = {
  connectDeviceId?: InputMaybe<SortOrder>;
  connectLocationId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  latitude?: InputMaybe<SortOrder>;
  longitude?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  serial?: InputMaybe<SortOrder>;
  zoneId?: InputMaybe<SortOrder>;
};

export type SmartPoleMinAggregate = {
  __typename?: 'SmartPoleMinAggregate';
  connectDeviceId?: Maybe<Scalars['String']>;
  connectLocationId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Int']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  serial?: Maybe<Scalars['String']>;
  zoneId?: Maybe<Scalars['Int']>;
};

export type SmartPoleMinOrderByAggregateInput = {
  connectDeviceId?: InputMaybe<SortOrder>;
  connectLocationId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  latitude?: InputMaybe<SortOrder>;
  longitude?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  serial?: InputMaybe<SortOrder>;
  zoneId?: InputMaybe<SortOrder>;
};

export type SmartPoleOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type SmartPoleOrderByWithAggregationInput = {
  _avg?: InputMaybe<SmartPoleAvgOrderByAggregateInput>;
  _count?: InputMaybe<SmartPoleCountOrderByAggregateInput>;
  _max?: InputMaybe<SmartPoleMaxOrderByAggregateInput>;
  _min?: InputMaybe<SmartPoleMinOrderByAggregateInput>;
  _sum?: InputMaybe<SmartPoleSumOrderByAggregateInput>;
  connectDeviceId?: InputMaybe<SortOrder>;
  connectLocationId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  latitude?: InputMaybe<SortOrder>;
  longitude?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  serial?: InputMaybe<SortOrder>;
  zoneId?: InputMaybe<SortOrder>;
};

export type SmartPoleOrderByWithRelationInput = {
  connectDeviceId?: InputMaybe<SortOrder>;
  connectLocationId?: InputMaybe<SortOrder>;
  devices?: InputMaybe<DeviceOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  latitude?: InputMaybe<SortOrder>;
  longitude?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  serial?: InputMaybe<SortOrder>;
  zone?: InputMaybe<ZoneOrderByWithRelationInput>;
  zoneId?: InputMaybe<SortOrder>;
};

export type SmartPoleRelationFilter = {
  is?: InputMaybe<SmartPoleWhereInput>;
  isNot?: InputMaybe<SmartPoleWhereInput>;
};

export enum SmartPoleScalarFieldEnum {
  ConnectDeviceId = 'connectDeviceId',
  ConnectLocationId = 'connectLocationId',
  Id = 'id',
  Latitude = 'latitude',
  Longitude = 'longitude',
  Name = 'name',
  Serial = 'serial',
  ZoneId = 'zoneId'
}

export type SmartPoleScalarWhereInput = {
  AND?: InputMaybe<Array<SmartPoleScalarWhereInput>>;
  NOT?: InputMaybe<Array<SmartPoleScalarWhereInput>>;
  OR?: InputMaybe<Array<SmartPoleScalarWhereInput>>;
  connectDeviceId?: InputMaybe<StringNullableFilter>;
  connectLocationId?: InputMaybe<FloatNullableFilter>;
  id?: InputMaybe<IntFilter>;
  latitude?: InputMaybe<FloatNullableFilter>;
  longitude?: InputMaybe<FloatNullableFilter>;
  name?: InputMaybe<StringNullableFilter>;
  serial?: InputMaybe<StringNullableFilter>;
  zoneId?: InputMaybe<IntNullableFilter>;
};

export type SmartPoleScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<SmartPoleScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<SmartPoleScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<SmartPoleScalarWhereWithAggregatesInput>>;
  connectDeviceId?: InputMaybe<StringNullableWithAggregatesFilter>;
  connectLocationId?: InputMaybe<FloatNullableWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  latitude?: InputMaybe<FloatNullableWithAggregatesFilter>;
  longitude?: InputMaybe<FloatNullableWithAggregatesFilter>;
  name?: InputMaybe<StringNullableWithAggregatesFilter>;
  serial?: InputMaybe<StringNullableWithAggregatesFilter>;
  zoneId?: InputMaybe<IntNullableWithAggregatesFilter>;
};

export type SmartPoleSumAggregate = {
  __typename?: 'SmartPoleSumAggregate';
  connectLocationId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Int']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  zoneId?: Maybe<Scalars['Int']>;
};

export type SmartPoleSumOrderByAggregateInput = {
  connectLocationId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  latitude?: InputMaybe<SortOrder>;
  longitude?: InputMaybe<SortOrder>;
  zoneId?: InputMaybe<SortOrder>;
};

export type SmartPoleUpdateInput = {
  connectDeviceId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  connectLocationId?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  devices?: InputMaybe<DeviceUpdateManyWithoutSmartPoleNestedInput>;
  latitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  longitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  serial?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  zone?: InputMaybe<ZoneUpdateOneWithoutSmartPolesNestedInput>;
};

export type SmartPoleUpdateManyMutationInput = {
  connectDeviceId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  connectLocationId?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  latitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  longitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  serial?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type SmartPoleUpdateManyWithWhereWithoutZoneInput = {
  data: SmartPoleUpdateManyMutationInput;
  where: SmartPoleScalarWhereInput;
};

export type SmartPoleUpdateManyWithoutZoneNestedInput = {
  connect?: InputMaybe<Array<SmartPoleWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<SmartPoleCreateOrConnectWithoutZoneInput>>;
  create?: InputMaybe<Array<SmartPoleCreateWithoutZoneInput>>;
  createMany?: InputMaybe<SmartPoleCreateManyZoneInputEnvelope>;
  delete?: InputMaybe<Array<SmartPoleWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<SmartPoleScalarWhereInput>>;
  disconnect?: InputMaybe<Array<SmartPoleWhereUniqueInput>>;
  set?: InputMaybe<Array<SmartPoleWhereUniqueInput>>;
  update?: InputMaybe<Array<SmartPoleUpdateWithWhereUniqueWithoutZoneInput>>;
  updateMany?: InputMaybe<Array<SmartPoleUpdateManyWithWhereWithoutZoneInput>>;
  upsert?: InputMaybe<Array<SmartPoleUpsertWithWhereUniqueWithoutZoneInput>>;
};

export type SmartPoleUpdateOneWithoutDevicesNestedInput = {
  connect?: InputMaybe<SmartPoleWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SmartPoleCreateOrConnectWithoutDevicesInput>;
  create?: InputMaybe<SmartPoleCreateWithoutDevicesInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<SmartPoleUpdateWithoutDevicesInput>;
  upsert?: InputMaybe<SmartPoleUpsertWithoutDevicesInput>;
};

export type SmartPoleUpdateWithWhereUniqueWithoutZoneInput = {
  data: SmartPoleUpdateWithoutZoneInput;
  where: SmartPoleWhereUniqueInput;
};

export type SmartPoleUpdateWithoutDevicesInput = {
  connectDeviceId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  connectLocationId?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  latitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  longitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  serial?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  zone?: InputMaybe<ZoneUpdateOneWithoutSmartPolesNestedInput>;
};

export type SmartPoleUpdateWithoutZoneInput = {
  connectDeviceId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  connectLocationId?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  devices?: InputMaybe<DeviceUpdateManyWithoutSmartPoleNestedInput>;
  latitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  longitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  serial?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type SmartPoleUpsertWithWhereUniqueWithoutZoneInput = {
  create: SmartPoleCreateWithoutZoneInput;
  update: SmartPoleUpdateWithoutZoneInput;
  where: SmartPoleWhereUniqueInput;
};

export type SmartPoleUpsertWithoutDevicesInput = {
  create: SmartPoleCreateWithoutDevicesInput;
  update: SmartPoleUpdateWithoutDevicesInput;
};

export type SmartPoleWhereInput = {
  AND?: InputMaybe<Array<SmartPoleWhereInput>>;
  NOT?: InputMaybe<Array<SmartPoleWhereInput>>;
  OR?: InputMaybe<Array<SmartPoleWhereInput>>;
  connectDeviceId?: InputMaybe<StringNullableFilter>;
  connectLocationId?: InputMaybe<FloatNullableFilter>;
  devices?: InputMaybe<DeviceListRelationFilter>;
  id?: InputMaybe<IntFilter>;
  latitude?: InputMaybe<FloatNullableFilter>;
  longitude?: InputMaybe<FloatNullableFilter>;
  name?: InputMaybe<StringNullableFilter>;
  serial?: InputMaybe<StringNullableFilter>;
  zone?: InputMaybe<ZoneRelationFilter>;
  zoneId?: InputMaybe<IntNullableFilter>;
};

export type SmartPoleWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export type Solution = {
  __typename?: 'Solution';
  _count?: Maybe<SolutionCount>;
  formations: Array<Formation>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
};


export type SolutionFormationsArgs = {
  cursor?: InputMaybe<FormationWhereUniqueInput>;
  distinct?: InputMaybe<Array<FormationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<FormationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<FormationWhereInput>;
};

export type SolutionAvgAggregate = {
  __typename?: 'SolutionAvgAggregate';
  id?: Maybe<Scalars['Float']>;
};

export type SolutionAvgOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type SolutionCount = {
  __typename?: 'SolutionCount';
  formations: Scalars['Int'];
};

export type SolutionCountAggregate = {
  __typename?: 'SolutionCountAggregate';
  _all: Scalars['Int'];
  id: Scalars['Int'];
  name: Scalars['Int'];
};

export type SolutionCountOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type SolutionCreateInput = {
  formations?: InputMaybe<FormationCreateNestedManyWithoutSolutionsInput>;
  name?: InputMaybe<Scalars['String']>;
};

export type SolutionCreateManyInput = {
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

export type SolutionCreateNestedManyWithoutFormationsInput = {
  connect?: InputMaybe<Array<SolutionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<SolutionCreateOrConnectWithoutFormationsInput>>;
  create?: InputMaybe<Array<SolutionCreateWithoutFormationsInput>>;
};

export type SolutionCreateOrConnectWithoutFormationsInput = {
  create: SolutionCreateWithoutFormationsInput;
  where: SolutionWhereUniqueInput;
};

export type SolutionCreateWithoutFormationsInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type SolutionGroupBy = {
  __typename?: 'SolutionGroupBy';
  _avg?: Maybe<SolutionAvgAggregate>;
  _count?: Maybe<SolutionCountAggregate>;
  _max?: Maybe<SolutionMaxAggregate>;
  _min?: Maybe<SolutionMinAggregate>;
  _sum?: Maybe<SolutionSumAggregate>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
};

export type SolutionListRelationFilter = {
  every?: InputMaybe<SolutionWhereInput>;
  none?: InputMaybe<SolutionWhereInput>;
  some?: InputMaybe<SolutionWhereInput>;
};

export type SolutionMaxAggregate = {
  __typename?: 'SolutionMaxAggregate';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type SolutionMaxOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type SolutionMinAggregate = {
  __typename?: 'SolutionMinAggregate';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type SolutionMinOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type SolutionOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type SolutionOrderByWithAggregationInput = {
  _avg?: InputMaybe<SolutionAvgOrderByAggregateInput>;
  _count?: InputMaybe<SolutionCountOrderByAggregateInput>;
  _max?: InputMaybe<SolutionMaxOrderByAggregateInput>;
  _min?: InputMaybe<SolutionMinOrderByAggregateInput>;
  _sum?: InputMaybe<SolutionSumOrderByAggregateInput>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type SolutionOrderByWithRelationInput = {
  formations?: InputMaybe<FormationOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export enum SolutionScalarFieldEnum {
  Id = 'id',
  Name = 'name'
}

export type SolutionScalarWhereInput = {
  AND?: InputMaybe<Array<SolutionScalarWhereInput>>;
  NOT?: InputMaybe<Array<SolutionScalarWhereInput>>;
  OR?: InputMaybe<Array<SolutionScalarWhereInput>>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringNullableFilter>;
};

export type SolutionScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<SolutionScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<SolutionScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<SolutionScalarWhereWithAggregatesInput>>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  name?: InputMaybe<StringNullableWithAggregatesFilter>;
};

export type SolutionSumAggregate = {
  __typename?: 'SolutionSumAggregate';
  id?: Maybe<Scalars['Int']>;
};

export type SolutionSumOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type SolutionUpdateInput = {
  formations?: InputMaybe<FormationUpdateManyWithoutSolutionsNestedInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type SolutionUpdateManyMutationInput = {
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type SolutionUpdateManyWithWhereWithoutFormationsInput = {
  data: SolutionUpdateManyMutationInput;
  where: SolutionScalarWhereInput;
};

export type SolutionUpdateManyWithoutFormationsNestedInput = {
  connect?: InputMaybe<Array<SolutionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<SolutionCreateOrConnectWithoutFormationsInput>>;
  create?: InputMaybe<Array<SolutionCreateWithoutFormationsInput>>;
  delete?: InputMaybe<Array<SolutionWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<SolutionScalarWhereInput>>;
  disconnect?: InputMaybe<Array<SolutionWhereUniqueInput>>;
  set?: InputMaybe<Array<SolutionWhereUniqueInput>>;
  update?: InputMaybe<Array<SolutionUpdateWithWhereUniqueWithoutFormationsInput>>;
  updateMany?: InputMaybe<Array<SolutionUpdateManyWithWhereWithoutFormationsInput>>;
  upsert?: InputMaybe<Array<SolutionUpsertWithWhereUniqueWithoutFormationsInput>>;
};

export type SolutionUpdateWithWhereUniqueWithoutFormationsInput = {
  data: SolutionUpdateWithoutFormationsInput;
  where: SolutionWhereUniqueInput;
};

export type SolutionUpdateWithoutFormationsInput = {
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type SolutionUpsertWithWhereUniqueWithoutFormationsInput = {
  create: SolutionCreateWithoutFormationsInput;
  update: SolutionUpdateWithoutFormationsInput;
  where: SolutionWhereUniqueInput;
};

export type SolutionWhereInput = {
  AND?: InputMaybe<Array<SolutionWhereInput>>;
  NOT?: InputMaybe<Array<SolutionWhereInput>>;
  OR?: InputMaybe<Array<SolutionWhereInput>>;
  formations?: InputMaybe<FormationListRelationFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringNullableFilter>;
};

export type SolutionWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type StringNullableWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedStringNullableFilter>;
  _min?: InputMaybe<NestedStringNullableFilter>;
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringNullableWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _count?: Maybe<UserCount>;
  avatar?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  groups: Array<UserGroup>;
  id: Scalars['Int'];
  jobTitle?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  role?: Maybe<UserRole>;
  roleId?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['String']>;
};


export type UserGroupsArgs = {
  cursor?: InputMaybe<UserGroupWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserGroupScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserGroupOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserGroupWhereInput>;
};

export type UserAvgAggregate = {
  __typename?: 'UserAvgAggregate';
  id?: Maybe<Scalars['Float']>;
  roleId?: Maybe<Scalars['Float']>;
};

export type UserAvgOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  roleId?: InputMaybe<SortOrder>;
};

export type UserCount = {
  __typename?: 'UserCount';
  groups: Scalars['Int'];
};

export type UserCountAggregate = {
  __typename?: 'UserCountAggregate';
  _all: Scalars['Int'];
  avatar: Scalars['Int'];
  email: Scalars['Int'];
  firstName: Scalars['Int'];
  id: Scalars['Int'];
  jobTitle: Scalars['Int'];
  lastName: Scalars['Int'];
  phone: Scalars['Int'];
  roleId: Scalars['Int'];
  username: Scalars['Int'];
};

export type UserCountOrderByAggregateInput = {
  avatar?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  firstName?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  jobTitle?: InputMaybe<SortOrder>;
  lastName?: InputMaybe<SortOrder>;
  phone?: InputMaybe<SortOrder>;
  roleId?: InputMaybe<SortOrder>;
  username?: InputMaybe<SortOrder>;
};

export type UserCreateInput = {
  avatar?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  groups?: InputMaybe<UserGroupCreateNestedManyWithoutUsersInput>;
  jobTitle?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<UserRoleCreateNestedOneWithoutUsersInput>;
  username?: InputMaybe<Scalars['String']>;
};

export type UserCreateManyInput = {
  avatar?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  jobTitle?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  roleId?: InputMaybe<Scalars['Int']>;
  username?: InputMaybe<Scalars['String']>;
};

export type UserCreateManyRoleInput = {
  avatar?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  jobTitle?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type UserCreateManyRoleInputEnvelope = {
  data: Array<UserCreateManyRoleInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type UserCreateNestedManyWithoutGroupsInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserCreateOrConnectWithoutGroupsInput>>;
  create?: InputMaybe<Array<UserCreateWithoutGroupsInput>>;
};

export type UserCreateNestedManyWithoutRoleInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserCreateOrConnectWithoutRoleInput>>;
  create?: InputMaybe<Array<UserCreateWithoutRoleInput>>;
  createMany?: InputMaybe<UserCreateManyRoleInputEnvelope>;
};

export type UserCreateOrConnectWithoutGroupsInput = {
  create: UserCreateWithoutGroupsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutRoleInput = {
  create: UserCreateWithoutRoleInput;
  where: UserWhereUniqueInput;
};

export type UserCreateWithoutGroupsInput = {
  avatar?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  jobTitle?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<UserRoleCreateNestedOneWithoutUsersInput>;
  username?: InputMaybe<Scalars['String']>;
};

export type UserCreateWithoutRoleInput = {
  avatar?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  groups?: InputMaybe<UserGroupCreateNestedManyWithoutUsersInput>;
  jobTitle?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type UserGroup = {
  __typename?: 'UserGroup';
  _count?: Maybe<UserGroupCount>;
  color?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  users: Array<User>;
};


export type UserGroupUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};

export type UserGroupAvgAggregate = {
  __typename?: 'UserGroupAvgAggregate';
  id?: Maybe<Scalars['Float']>;
};

export type UserGroupAvgOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type UserGroupBy = {
  __typename?: 'UserGroupBy';
  _avg?: Maybe<UserAvgAggregate>;
  _count?: Maybe<UserCountAggregate>;
  _max?: Maybe<UserMaxAggregate>;
  _min?: Maybe<UserMinAggregate>;
  _sum?: Maybe<UserSumAggregate>;
  avatar?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  jobTitle?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  roleId?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['String']>;
};

export type UserGroupCount = {
  __typename?: 'UserGroupCount';
  users: Scalars['Int'];
};

export type UserGroupCountAggregate = {
  __typename?: 'UserGroupCountAggregate';
  _all: Scalars['Int'];
  color: Scalars['Int'];
  description: Scalars['Int'];
  id: Scalars['Int'];
  name: Scalars['Int'];
};

export type UserGroupCountOrderByAggregateInput = {
  color?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type UserGroupCreateInput = {
  color?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<UserCreateNestedManyWithoutGroupsInput>;
};

export type UserGroupCreateManyInput = {
  color?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UserGroupCreateNestedManyWithoutUsersInput = {
  connect?: InputMaybe<Array<UserGroupWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserGroupCreateOrConnectWithoutUsersInput>>;
  create?: InputMaybe<Array<UserGroupCreateWithoutUsersInput>>;
};

export type UserGroupCreateOrConnectWithoutUsersInput = {
  create: UserGroupCreateWithoutUsersInput;
  where: UserGroupWhereUniqueInput;
};

export type UserGroupCreateWithoutUsersInput = {
  color?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UserGroupGroupBy = {
  __typename?: 'UserGroupGroupBy';
  _avg?: Maybe<UserGroupAvgAggregate>;
  _count?: Maybe<UserGroupCountAggregate>;
  _max?: Maybe<UserGroupMaxAggregate>;
  _min?: Maybe<UserGroupMinAggregate>;
  _sum?: Maybe<UserGroupSumAggregate>;
  color?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
};

export type UserGroupListRelationFilter = {
  every?: InputMaybe<UserGroupWhereInput>;
  none?: InputMaybe<UserGroupWhereInput>;
  some?: InputMaybe<UserGroupWhereInput>;
};

export type UserGroupMaxAggregate = {
  __typename?: 'UserGroupMaxAggregate';
  color?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type UserGroupMaxOrderByAggregateInput = {
  color?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type UserGroupMinAggregate = {
  __typename?: 'UserGroupMinAggregate';
  color?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type UserGroupMinOrderByAggregateInput = {
  color?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type UserGroupOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type UserGroupOrderByWithAggregationInput = {
  _avg?: InputMaybe<UserGroupAvgOrderByAggregateInput>;
  _count?: InputMaybe<UserGroupCountOrderByAggregateInput>;
  _max?: InputMaybe<UserGroupMaxOrderByAggregateInput>;
  _min?: InputMaybe<UserGroupMinOrderByAggregateInput>;
  _sum?: InputMaybe<UserGroupSumOrderByAggregateInput>;
  color?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type UserGroupOrderByWithRelationInput = {
  color?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  users?: InputMaybe<UserOrderByRelationAggregateInput>;
};

export enum UserGroupScalarFieldEnum {
  Color = 'color',
  Description = 'description',
  Id = 'id',
  Name = 'name'
}

export type UserGroupScalarWhereInput = {
  AND?: InputMaybe<Array<UserGroupScalarWhereInput>>;
  NOT?: InputMaybe<Array<UserGroupScalarWhereInput>>;
  OR?: InputMaybe<Array<UserGroupScalarWhereInput>>;
  color?: InputMaybe<StringNullableFilter>;
  description?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringNullableFilter>;
};

export type UserGroupScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<UserGroupScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<UserGroupScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<UserGroupScalarWhereWithAggregatesInput>>;
  color?: InputMaybe<StringNullableWithAggregatesFilter>;
  description?: InputMaybe<StringNullableWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  name?: InputMaybe<StringNullableWithAggregatesFilter>;
};

export type UserGroupSumAggregate = {
  __typename?: 'UserGroupSumAggregate';
  id?: Maybe<Scalars['Int']>;
};

export type UserGroupSumOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type UserGroupUpdateInput = {
  color?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  users?: InputMaybe<UserUpdateManyWithoutGroupsNestedInput>;
};

export type UserGroupUpdateManyMutationInput = {
  color?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type UserGroupUpdateManyWithWhereWithoutUsersInput = {
  data: UserGroupUpdateManyMutationInput;
  where: UserGroupScalarWhereInput;
};

export type UserGroupUpdateManyWithoutUsersNestedInput = {
  connect?: InputMaybe<Array<UserGroupWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserGroupCreateOrConnectWithoutUsersInput>>;
  create?: InputMaybe<Array<UserGroupCreateWithoutUsersInput>>;
  delete?: InputMaybe<Array<UserGroupWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<UserGroupScalarWhereInput>>;
  disconnect?: InputMaybe<Array<UserGroupWhereUniqueInput>>;
  set?: InputMaybe<Array<UserGroupWhereUniqueInput>>;
  update?: InputMaybe<Array<UserGroupUpdateWithWhereUniqueWithoutUsersInput>>;
  updateMany?: InputMaybe<Array<UserGroupUpdateManyWithWhereWithoutUsersInput>>;
  upsert?: InputMaybe<Array<UserGroupUpsertWithWhereUniqueWithoutUsersInput>>;
};

export type UserGroupUpdateWithWhereUniqueWithoutUsersInput = {
  data: UserGroupUpdateWithoutUsersInput;
  where: UserGroupWhereUniqueInput;
};

export type UserGroupUpdateWithoutUsersInput = {
  color?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type UserGroupUpsertWithWhereUniqueWithoutUsersInput = {
  create: UserGroupCreateWithoutUsersInput;
  update: UserGroupUpdateWithoutUsersInput;
  where: UserGroupWhereUniqueInput;
};

export type UserGroupWhereInput = {
  AND?: InputMaybe<Array<UserGroupWhereInput>>;
  NOT?: InputMaybe<Array<UserGroupWhereInput>>;
  OR?: InputMaybe<Array<UserGroupWhereInput>>;
  color?: InputMaybe<StringNullableFilter>;
  description?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringNullableFilter>;
  users?: InputMaybe<UserListRelationFilter>;
};

export type UserGroupWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export type UserListRelationFilter = {
  every?: InputMaybe<UserWhereInput>;
  none?: InputMaybe<UserWhereInput>;
  some?: InputMaybe<UserWhereInput>;
};

export type UserMaxAggregate = {
  __typename?: 'UserMaxAggregate';
  avatar?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  jobTitle?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  roleId?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['String']>;
};

export type UserMaxOrderByAggregateInput = {
  avatar?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  firstName?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  jobTitle?: InputMaybe<SortOrder>;
  lastName?: InputMaybe<SortOrder>;
  phone?: InputMaybe<SortOrder>;
  roleId?: InputMaybe<SortOrder>;
  username?: InputMaybe<SortOrder>;
};

export type UserMinAggregate = {
  __typename?: 'UserMinAggregate';
  avatar?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  jobTitle?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  roleId?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['String']>;
};

export type UserMinOrderByAggregateInput = {
  avatar?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  firstName?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  jobTitle?: InputMaybe<SortOrder>;
  lastName?: InputMaybe<SortOrder>;
  phone?: InputMaybe<SortOrder>;
  roleId?: InputMaybe<SortOrder>;
  username?: InputMaybe<SortOrder>;
};

export type UserOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type UserOrderByWithAggregationInput = {
  _avg?: InputMaybe<UserAvgOrderByAggregateInput>;
  _count?: InputMaybe<UserCountOrderByAggregateInput>;
  _max?: InputMaybe<UserMaxOrderByAggregateInput>;
  _min?: InputMaybe<UserMinOrderByAggregateInput>;
  _sum?: InputMaybe<UserSumOrderByAggregateInput>;
  avatar?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  firstName?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  jobTitle?: InputMaybe<SortOrder>;
  lastName?: InputMaybe<SortOrder>;
  phone?: InputMaybe<SortOrder>;
  roleId?: InputMaybe<SortOrder>;
  username?: InputMaybe<SortOrder>;
};

export type UserOrderByWithRelationInput = {
  avatar?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  firstName?: InputMaybe<SortOrder>;
  groups?: InputMaybe<UserGroupOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  jobTitle?: InputMaybe<SortOrder>;
  lastName?: InputMaybe<SortOrder>;
  phone?: InputMaybe<SortOrder>;
  role?: InputMaybe<UserRoleOrderByWithRelationInput>;
  roleId?: InputMaybe<SortOrder>;
  username?: InputMaybe<SortOrder>;
};

export type UserRole = {
  __typename?: 'UserRole';
  _count?: Maybe<UserRoleCount>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  users: Array<User>;
};


export type UserRoleUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};

export type UserRoleAvgAggregate = {
  __typename?: 'UserRoleAvgAggregate';
  id?: Maybe<Scalars['Float']>;
};

export type UserRoleAvgOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type UserRoleCount = {
  __typename?: 'UserRoleCount';
  users: Scalars['Int'];
};

export type UserRoleCountAggregate = {
  __typename?: 'UserRoleCountAggregate';
  _all: Scalars['Int'];
  id: Scalars['Int'];
  name: Scalars['Int'];
};

export type UserRoleCountOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type UserRoleCreateInput = {
  name?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<UserCreateNestedManyWithoutRoleInput>;
};

export type UserRoleCreateManyInput = {
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UserRoleCreateNestedOneWithoutUsersInput = {
  connect?: InputMaybe<UserRoleWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserRoleCreateOrConnectWithoutUsersInput>;
  create?: InputMaybe<UserRoleCreateWithoutUsersInput>;
};

export type UserRoleCreateOrConnectWithoutUsersInput = {
  create: UserRoleCreateWithoutUsersInput;
  where: UserRoleWhereUniqueInput;
};

export type UserRoleCreateWithoutUsersInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type UserRoleGroupBy = {
  __typename?: 'UserRoleGroupBy';
  _avg?: Maybe<UserRoleAvgAggregate>;
  _count?: Maybe<UserRoleCountAggregate>;
  _max?: Maybe<UserRoleMaxAggregate>;
  _min?: Maybe<UserRoleMinAggregate>;
  _sum?: Maybe<UserRoleSumAggregate>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
};

export type UserRoleMaxAggregate = {
  __typename?: 'UserRoleMaxAggregate';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type UserRoleMaxOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type UserRoleMinAggregate = {
  __typename?: 'UserRoleMinAggregate';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type UserRoleMinOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type UserRoleOrderByWithAggregationInput = {
  _avg?: InputMaybe<UserRoleAvgOrderByAggregateInput>;
  _count?: InputMaybe<UserRoleCountOrderByAggregateInput>;
  _max?: InputMaybe<UserRoleMaxOrderByAggregateInput>;
  _min?: InputMaybe<UserRoleMinOrderByAggregateInput>;
  _sum?: InputMaybe<UserRoleSumOrderByAggregateInput>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type UserRoleOrderByWithRelationInput = {
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  users?: InputMaybe<UserOrderByRelationAggregateInput>;
};

export type UserRoleRelationFilter = {
  is?: InputMaybe<UserRoleWhereInput>;
  isNot?: InputMaybe<UserRoleWhereInput>;
};

export enum UserRoleScalarFieldEnum {
  Id = 'id',
  Name = 'name'
}

export type UserRoleScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<UserRoleScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<UserRoleScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<UserRoleScalarWhereWithAggregatesInput>>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  name?: InputMaybe<StringNullableWithAggregatesFilter>;
};

export type UserRoleSumAggregate = {
  __typename?: 'UserRoleSumAggregate';
  id?: Maybe<Scalars['Int']>;
};

export type UserRoleSumOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type UserRoleUpdateInput = {
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  users?: InputMaybe<UserUpdateManyWithoutRoleNestedInput>;
};

export type UserRoleUpdateManyMutationInput = {
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type UserRoleUpdateOneWithoutUsersNestedInput = {
  connect?: InputMaybe<UserRoleWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserRoleCreateOrConnectWithoutUsersInput>;
  create?: InputMaybe<UserRoleCreateWithoutUsersInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<UserRoleUpdateWithoutUsersInput>;
  upsert?: InputMaybe<UserRoleUpsertWithoutUsersInput>;
};

export type UserRoleUpdateWithoutUsersInput = {
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type UserRoleUpsertWithoutUsersInput = {
  create: UserRoleCreateWithoutUsersInput;
  update: UserRoleUpdateWithoutUsersInput;
};

export type UserRoleWhereInput = {
  AND?: InputMaybe<Array<UserRoleWhereInput>>;
  NOT?: InputMaybe<Array<UserRoleWhereInput>>;
  OR?: InputMaybe<Array<UserRoleWhereInput>>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringNullableFilter>;
  users?: InputMaybe<UserListRelationFilter>;
};

export type UserRoleWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export enum UserScalarFieldEnum {
  Avatar = 'avatar',
  Email = 'email',
  FirstName = 'firstName',
  Id = 'id',
  JobTitle = 'jobTitle',
  LastName = 'lastName',
  Phone = 'phone',
  RoleId = 'roleId',
  Username = 'username'
}

export type UserScalarWhereInput = {
  AND?: InputMaybe<Array<UserScalarWhereInput>>;
  NOT?: InputMaybe<Array<UserScalarWhereInput>>;
  OR?: InputMaybe<Array<UserScalarWhereInput>>;
  avatar?: InputMaybe<StringNullableFilter>;
  email?: InputMaybe<StringNullableFilter>;
  firstName?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<IntFilter>;
  jobTitle?: InputMaybe<StringNullableFilter>;
  lastName?: InputMaybe<StringNullableFilter>;
  phone?: InputMaybe<StringNullableFilter>;
  roleId?: InputMaybe<IntNullableFilter>;
  username?: InputMaybe<StringNullableFilter>;
};

export type UserScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<UserScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<UserScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<UserScalarWhereWithAggregatesInput>>;
  avatar?: InputMaybe<StringNullableWithAggregatesFilter>;
  email?: InputMaybe<StringNullableWithAggregatesFilter>;
  firstName?: InputMaybe<StringNullableWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  jobTitle?: InputMaybe<StringNullableWithAggregatesFilter>;
  lastName?: InputMaybe<StringNullableWithAggregatesFilter>;
  phone?: InputMaybe<StringNullableWithAggregatesFilter>;
  roleId?: InputMaybe<IntNullableWithAggregatesFilter>;
  username?: InputMaybe<StringNullableWithAggregatesFilter>;
};

export type UserSumAggregate = {
  __typename?: 'UserSumAggregate';
  id?: Maybe<Scalars['Int']>;
  roleId?: Maybe<Scalars['Int']>;
};

export type UserSumOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  roleId?: InputMaybe<SortOrder>;
};

export type UserUpdateInput = {
  avatar?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  email?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  firstName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  groups?: InputMaybe<UserGroupUpdateManyWithoutUsersNestedInput>;
  jobTitle?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  lastName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  phone?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  role?: InputMaybe<UserRoleUpdateOneWithoutUsersNestedInput>;
  username?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type UserUpdateManyMutationInput = {
  avatar?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  email?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  firstName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  jobTitle?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  lastName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  phone?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  username?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type UserUpdateManyWithWhereWithoutGroupsInput = {
  data: UserUpdateManyMutationInput;
  where: UserScalarWhereInput;
};

export type UserUpdateManyWithWhereWithoutRoleInput = {
  data: UserUpdateManyMutationInput;
  where: UserScalarWhereInput;
};

export type UserUpdateManyWithoutGroupsNestedInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserCreateOrConnectWithoutGroupsInput>>;
  create?: InputMaybe<Array<UserCreateWithoutGroupsInput>>;
  delete?: InputMaybe<Array<UserWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<UserScalarWhereInput>>;
  disconnect?: InputMaybe<Array<UserWhereUniqueInput>>;
  set?: InputMaybe<Array<UserWhereUniqueInput>>;
  update?: InputMaybe<Array<UserUpdateWithWhereUniqueWithoutGroupsInput>>;
  updateMany?: InputMaybe<Array<UserUpdateManyWithWhereWithoutGroupsInput>>;
  upsert?: InputMaybe<Array<UserUpsertWithWhereUniqueWithoutGroupsInput>>;
};

export type UserUpdateManyWithoutRoleNestedInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserCreateOrConnectWithoutRoleInput>>;
  create?: InputMaybe<Array<UserCreateWithoutRoleInput>>;
  createMany?: InputMaybe<UserCreateManyRoleInputEnvelope>;
  delete?: InputMaybe<Array<UserWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<UserScalarWhereInput>>;
  disconnect?: InputMaybe<Array<UserWhereUniqueInput>>;
  set?: InputMaybe<Array<UserWhereUniqueInput>>;
  update?: InputMaybe<Array<UserUpdateWithWhereUniqueWithoutRoleInput>>;
  updateMany?: InputMaybe<Array<UserUpdateManyWithWhereWithoutRoleInput>>;
  upsert?: InputMaybe<Array<UserUpsertWithWhereUniqueWithoutRoleInput>>;
};

export type UserUpdateWithWhereUniqueWithoutGroupsInput = {
  data: UserUpdateWithoutGroupsInput;
  where: UserWhereUniqueInput;
};

export type UserUpdateWithWhereUniqueWithoutRoleInput = {
  data: UserUpdateWithoutRoleInput;
  where: UserWhereUniqueInput;
};

export type UserUpdateWithoutGroupsInput = {
  avatar?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  email?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  firstName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  jobTitle?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  lastName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  phone?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  role?: InputMaybe<UserRoleUpdateOneWithoutUsersNestedInput>;
  username?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutRoleInput = {
  avatar?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  email?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  firstName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  groups?: InputMaybe<UserGroupUpdateManyWithoutUsersNestedInput>;
  jobTitle?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  lastName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  phone?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  username?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type UserUpsertWithWhereUniqueWithoutGroupsInput = {
  create: UserCreateWithoutGroupsInput;
  update: UserUpdateWithoutGroupsInput;
  where: UserWhereUniqueInput;
};

export type UserUpsertWithWhereUniqueWithoutRoleInput = {
  create: UserCreateWithoutRoleInput;
  update: UserUpdateWithoutRoleInput;
  where: UserWhereUniqueInput;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  avatar?: InputMaybe<StringNullableFilter>;
  email?: InputMaybe<StringNullableFilter>;
  firstName?: InputMaybe<StringNullableFilter>;
  groups?: InputMaybe<UserGroupListRelationFilter>;
  id?: InputMaybe<IntFilter>;
  jobTitle?: InputMaybe<StringNullableFilter>;
  lastName?: InputMaybe<StringNullableFilter>;
  phone?: InputMaybe<StringNullableFilter>;
  role?: InputMaybe<UserRoleRelationFilter>;
  roleId?: InputMaybe<IntNullableFilter>;
  username?: InputMaybe<StringNullableFilter>;
};

export type UserWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export type Zone = {
  __typename?: 'Zone';
  _count?: Maybe<ZoneCount>;
  formation?: Maybe<Formation>;
  formationId?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  smartPoles: Array<SmartPole>;
};


export type ZoneSmartPolesArgs = {
  cursor?: InputMaybe<SmartPoleWhereUniqueInput>;
  distinct?: InputMaybe<Array<SmartPoleScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SmartPoleOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SmartPoleWhereInput>;
};

export type ZoneAvgAggregate = {
  __typename?: 'ZoneAvgAggregate';
  formationId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

export type ZoneAvgOrderByAggregateInput = {
  formationId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
};

export type ZoneCount = {
  __typename?: 'ZoneCount';
  smartPoles: Scalars['Int'];
};

export type ZoneCountAggregate = {
  __typename?: 'ZoneCountAggregate';
  _all: Scalars['Int'];
  formationId: Scalars['Int'];
  id: Scalars['Int'];
  name: Scalars['Int'];
};

export type ZoneCountOrderByAggregateInput = {
  formationId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type ZoneCreateInput = {
  formation?: InputMaybe<FormationCreateNestedOneWithoutZonesInput>;
  name?: InputMaybe<Scalars['String']>;
  smartPoles?: InputMaybe<SmartPoleCreateNestedManyWithoutZoneInput>;
};

export type ZoneCreateManyFormationInput = {
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

export type ZoneCreateManyFormationInputEnvelope = {
  data: Array<ZoneCreateManyFormationInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ZoneCreateManyInput = {
  formationId?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

export type ZoneCreateNestedManyWithoutFormationInput = {
  connect?: InputMaybe<Array<ZoneWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ZoneCreateOrConnectWithoutFormationInput>>;
  create?: InputMaybe<Array<ZoneCreateWithoutFormationInput>>;
  createMany?: InputMaybe<ZoneCreateManyFormationInputEnvelope>;
};

export type ZoneCreateNestedOneWithoutSmartPolesInput = {
  connect?: InputMaybe<ZoneWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ZoneCreateOrConnectWithoutSmartPolesInput>;
  create?: InputMaybe<ZoneCreateWithoutSmartPolesInput>;
};

export type ZoneCreateOrConnectWithoutFormationInput = {
  create: ZoneCreateWithoutFormationInput;
  where: ZoneWhereUniqueInput;
};

export type ZoneCreateOrConnectWithoutSmartPolesInput = {
  create: ZoneCreateWithoutSmartPolesInput;
  where: ZoneWhereUniqueInput;
};

export type ZoneCreateWithoutFormationInput = {
  name?: InputMaybe<Scalars['String']>;
  smartPoles?: InputMaybe<SmartPoleCreateNestedManyWithoutZoneInput>;
};

export type ZoneCreateWithoutSmartPolesInput = {
  formation?: InputMaybe<FormationCreateNestedOneWithoutZonesInput>;
  name?: InputMaybe<Scalars['String']>;
};

export type ZoneGroupBy = {
  __typename?: 'ZoneGroupBy';
  _avg?: Maybe<ZoneAvgAggregate>;
  _count?: Maybe<ZoneCountAggregate>;
  _max?: Maybe<ZoneMaxAggregate>;
  _min?: Maybe<ZoneMinAggregate>;
  _sum?: Maybe<ZoneSumAggregate>;
  formationId?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
};

export type ZoneListRelationFilter = {
  every?: InputMaybe<ZoneWhereInput>;
  none?: InputMaybe<ZoneWhereInput>;
  some?: InputMaybe<ZoneWhereInput>;
};

export type ZoneMaxAggregate = {
  __typename?: 'ZoneMaxAggregate';
  formationId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type ZoneMaxOrderByAggregateInput = {
  formationId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type ZoneMinAggregate = {
  __typename?: 'ZoneMinAggregate';
  formationId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type ZoneMinOrderByAggregateInput = {
  formationId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type ZoneOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type ZoneOrderByWithAggregationInput = {
  _avg?: InputMaybe<ZoneAvgOrderByAggregateInput>;
  _count?: InputMaybe<ZoneCountOrderByAggregateInput>;
  _max?: InputMaybe<ZoneMaxOrderByAggregateInput>;
  _min?: InputMaybe<ZoneMinOrderByAggregateInput>;
  _sum?: InputMaybe<ZoneSumOrderByAggregateInput>;
  formationId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type ZoneOrderByWithRelationInput = {
  formation?: InputMaybe<FormationOrderByWithRelationInput>;
  formationId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  smartPoles?: InputMaybe<SmartPoleOrderByRelationAggregateInput>;
};

export type ZoneRelationFilter = {
  is?: InputMaybe<ZoneWhereInput>;
  isNot?: InputMaybe<ZoneWhereInput>;
};

export enum ZoneScalarFieldEnum {
  FormationId = 'formationId',
  Id = 'id',
  Name = 'name'
}

export type ZoneScalarWhereInput = {
  AND?: InputMaybe<Array<ZoneScalarWhereInput>>;
  NOT?: InputMaybe<Array<ZoneScalarWhereInput>>;
  OR?: InputMaybe<Array<ZoneScalarWhereInput>>;
  formationId?: InputMaybe<IntNullableFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringNullableFilter>;
};

export type ZoneScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<ZoneScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<ZoneScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<ZoneScalarWhereWithAggregatesInput>>;
  formationId?: InputMaybe<IntNullableWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  name?: InputMaybe<StringNullableWithAggregatesFilter>;
};

export type ZoneSumAggregate = {
  __typename?: 'ZoneSumAggregate';
  formationId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
};

export type ZoneSumOrderByAggregateInput = {
  formationId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
};

export type ZoneUpdateInput = {
  formation?: InputMaybe<FormationUpdateOneWithoutZonesNestedInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  smartPoles?: InputMaybe<SmartPoleUpdateManyWithoutZoneNestedInput>;
};

export type ZoneUpdateManyMutationInput = {
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type ZoneUpdateManyWithWhereWithoutFormationInput = {
  data: ZoneUpdateManyMutationInput;
  where: ZoneScalarWhereInput;
};

export type ZoneUpdateManyWithoutFormationNestedInput = {
  connect?: InputMaybe<Array<ZoneWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ZoneCreateOrConnectWithoutFormationInput>>;
  create?: InputMaybe<Array<ZoneCreateWithoutFormationInput>>;
  createMany?: InputMaybe<ZoneCreateManyFormationInputEnvelope>;
  delete?: InputMaybe<Array<ZoneWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ZoneScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ZoneWhereUniqueInput>>;
  set?: InputMaybe<Array<ZoneWhereUniqueInput>>;
  update?: InputMaybe<Array<ZoneUpdateWithWhereUniqueWithoutFormationInput>>;
  updateMany?: InputMaybe<Array<ZoneUpdateManyWithWhereWithoutFormationInput>>;
  upsert?: InputMaybe<Array<ZoneUpsertWithWhereUniqueWithoutFormationInput>>;
};

export type ZoneUpdateOneWithoutSmartPolesNestedInput = {
  connect?: InputMaybe<ZoneWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ZoneCreateOrConnectWithoutSmartPolesInput>;
  create?: InputMaybe<ZoneCreateWithoutSmartPolesInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<ZoneUpdateWithoutSmartPolesInput>;
  upsert?: InputMaybe<ZoneUpsertWithoutSmartPolesInput>;
};

export type ZoneUpdateWithWhereUniqueWithoutFormationInput = {
  data: ZoneUpdateWithoutFormationInput;
  where: ZoneWhereUniqueInput;
};

export type ZoneUpdateWithoutFormationInput = {
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  smartPoles?: InputMaybe<SmartPoleUpdateManyWithoutZoneNestedInput>;
};

export type ZoneUpdateWithoutSmartPolesInput = {
  formation?: InputMaybe<FormationUpdateOneWithoutZonesNestedInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type ZoneUpsertWithWhereUniqueWithoutFormationInput = {
  create: ZoneCreateWithoutFormationInput;
  update: ZoneUpdateWithoutFormationInput;
  where: ZoneWhereUniqueInput;
};

export type ZoneUpsertWithoutSmartPolesInput = {
  create: ZoneCreateWithoutSmartPolesInput;
  update: ZoneUpdateWithoutSmartPolesInput;
};

export type ZoneWhereInput = {
  AND?: InputMaybe<Array<ZoneWhereInput>>;
  NOT?: InputMaybe<Array<ZoneWhereInput>>;
  OR?: InputMaybe<Array<ZoneWhereInput>>;
  formation?: InputMaybe<FormationRelationFilter>;
  formationId?: InputMaybe<IntNullableFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringNullableFilter>;
  smartPoles?: InputMaybe<SmartPoleListRelationFilter>;
};

export type ZoneWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export type AlertsQueryVariables = Exact<{
  where?: InputMaybe<AlertWhereInput>;
}>;


export type AlertsQuery = { __typename?: 'Query', alerts: Array<{ __typename?: 'Alert', id: number, message?: string | null, device?: { __typename?: 'Device', id: number, name?: string | null, serial?: string | null, smartPole?: { __typename?: 'SmartPole', zone?: { __typename?: 'Zone', id: number, name?: string | null } | null } | null, type?: { __typename?: 'DeviceType', id: number, name?: string | null } | null } | null, priority?: { __typename?: 'Priority', id: number, name?: string | null } | null }> };

export type AggregateAlertQueryVariables = Exact<{
  where?: InputMaybe<AlertWhereInput>;
}>;


export type AggregateAlertQuery = { __typename?: 'Query', aggregateAlert: { __typename?: 'AggregateAlert', _count?: { __typename?: 'AlertCountAggregate', id: number } | null } };

export type CompaniesQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<CompanyOrderByWithRelationInput> | CompanyOrderByWithRelationInput>;
}>;


export type CompaniesQuery = { __typename?: 'Query', companies: Array<{ __typename?: 'Company', id: number, name?: string | null, logo?: string | null, icon?: string | null }> };

export type DeviceTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type DeviceTypesQuery = { __typename?: 'Query', deviceTypes: Array<{ __typename?: 'DeviceType', id: number, name?: string | null }> };

export type AggregateDeviceQueryVariables = Exact<{
  where?: InputMaybe<DeviceWhereInput>;
}>;


export type AggregateDeviceQuery = { __typename?: 'Query', aggregateDevice: { __typename?: 'AggregateDevice', _count?: { __typename?: 'DeviceCountAggregate', id: number } | null } };

export type DeviceQueryVariables = Exact<{
  where: DeviceWhereUniqueInput;
}>;


export type DeviceQuery = { __typename?: 'Query', device?: { __typename?: 'Device', id: number, name?: string | null, serial?: string | null, connectParamIndex?: string | null, type?: { __typename?: 'DeviceType', id: number, name?: string | null } | null, alerts: Array<{ __typename?: 'Alert', id: number, message?: string | null, priority?: { __typename?: 'Priority', id: number, name?: string | null } | null }>, smartPole?: { __typename?: 'SmartPole', connectLocationId?: number | null, connectDeviceId?: string | null } | null } | null };

export type EventsQueryVariables = Exact<{
  where?: InputMaybe<EventWhereInput>;
  orderBy?: InputMaybe<Array<EventOrderByWithRelationInput> | EventOrderByWithRelationInput>;
}>;


export type EventsQuery = { __typename?: 'Query', events: Array<{ __typename?: 'Event', id: number, moment?: any | null, message?: string | null, device?: { __typename?: 'Device', id: number, name?: string | null, serial?: string | null, smartPole?: { __typename?: 'SmartPole', id: number, name?: string | null, zone?: { __typename?: 'Zone', id: number, name?: string | null } | null } | null } | null, priority?: { __typename?: 'Priority', id: number, name?: string | null } | null }> };

export type FormationQueryVariables = Exact<{
  where: FormationWhereUniqueInput;
}>;


export type FormationQuery = { __typename?: 'Query', formation?: { __typename?: 'Formation', id: number, name?: string | null } | null };

export type RegionsQueryVariables = Exact<{
  where?: InputMaybe<RegionWhereInput>;
}>;


export type RegionsQuery = { __typename?: 'Query', regions: Array<{ __typename?: 'Region', id: number, name?: string | null, formations: Array<{ __typename?: 'Formation', id: number, name?: string | null, address?: string | null, solutions: Array<{ __typename?: 'Solution', id: number, name?: string | null }> }> }> };

export type SmartPolesQueryVariables = Exact<{
  where?: InputMaybe<SmartPoleWhereInput>;
  orderBy?: InputMaybe<Array<SmartPoleOrderByWithRelationInput> | SmartPoleOrderByWithRelationInput>;
}>;


export type SmartPolesQuery = { __typename?: 'Query', smartPoles: Array<{ __typename?: 'SmartPole', id: number, name?: string | null, serial?: string | null, latitude?: number | null, longitude?: number | null, zone?: { __typename?: 'Zone', id: number, name?: string | null, formation?: { __typename?: 'Formation', id: number, name?: string | null } | null } | null, devices: Array<{ __typename?: 'Device', alerts: Array<{ __typename?: 'Alert', id: number }> }> }> };

export type SmartPoleQueryVariables = Exact<{
  where: SmartPoleWhereUniqueInput;
}>;


export type SmartPoleQuery = { __typename?: 'Query', smartPole?: { __typename?: 'SmartPole', id: number, name?: string | null, serial?: string | null, latitude?: number | null, longitude?: number | null, connectLocationId?: number | null, connectDeviceId?: string | null, zone?: { __typename?: 'Zone', id: number, name?: string | null, formation?: { __typename?: 'Formation', id: number, name?: string | null, address?: string | null } | null } | null, devices: Array<{ __typename?: 'Device', id: number, name?: string | null, serial?: string | null, uuid?: string | null, connectParamIndex?: string | null, type?: { __typename?: 'DeviceType', id: number, name?: string | null } | null, alerts: Array<{ __typename?: 'Alert', id: number, message?: string | null, priority?: { __typename?: 'Priority', id: number, name?: string | null } | null }>, events: Array<{ __typename?: 'Event', id: number, moment?: any | null, message?: string | null, priority?: { __typename?: 'Priority', id: number, name?: string | null } | null }>, smartPole?: { __typename?: 'SmartPole', connectLocationId?: number | null, connectDeviceId?: string | null } | null }> } | null };

export type UserGroupsQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<UserGroupOrderByWithRelationInput> | UserGroupOrderByWithRelationInput>;
}>;


export type UserGroupsQuery = { __typename?: 'Query', userGroups: Array<{ __typename?: 'UserGroup', id: number, name?: string | null, description?: string | null, color?: string | null, users: Array<{ __typename?: 'User', id: number, lastName?: string | null, firstName?: string | null, email?: string | null, username?: string | null, avatar?: string | null, phone?: string | null, jobTitle?: string | null, role?: { __typename?: 'UserRole', id: number, name?: string | null } | null, groups: Array<{ __typename?: 'UserGroup', id: number, name?: string | null }> }> }> };

export type UserGroupQueryVariables = Exact<{
  where: UserGroupWhereUniqueInput;
}>;


export type UserGroupQuery = { __typename?: 'Query', userGroup?: { __typename?: 'UserGroup', id: number, name?: string | null, description?: string | null, color?: string | null, users: Array<{ __typename?: 'User', id: number, lastName?: string | null, firstName?: string | null, avatar?: string | null }> } | null };

export type CreateOneUserGroupMutationVariables = Exact<{
  data: UserGroupCreateInput;
}>;


export type CreateOneUserGroupMutation = { __typename?: 'Mutation', createOneUserGroup: { __typename?: 'UserGroup', id: number } };

export type UpdateOneUserGroupMutationVariables = Exact<{
  data: UserGroupUpdateInput;
  where: UserGroupWhereUniqueInput;
}>;


export type UpdateOneUserGroupMutation = { __typename?: 'Mutation', updateOneUserGroup?: { __typename?: 'UserGroup', id: number } | null };

export type DeleteOneUserGroupMutationVariables = Exact<{
  where: UserGroupWhereUniqueInput;
}>;


export type DeleteOneUserGroupMutation = { __typename?: 'Mutation', deleteOneUserGroup?: { __typename?: 'UserGroup', id: number } | null };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: number, lastName?: string | null, firstName?: string | null, email?: string | null, username?: string | null, avatar?: string | null, phone?: string | null, jobTitle?: string | null, role?: { __typename?: 'UserRole', id: number, name?: string | null } | null, groups: Array<{ __typename?: 'UserGroup', id: number, name?: string | null }> }> };

export type ZonesQueryVariables = Exact<{
  where?: InputMaybe<ZoneWhereInput>;
}>;


export type ZonesQuery = { __typename?: 'Query', zones: Array<{ __typename?: 'Zone', id: number, name?: string | null }> };

export type ZoneQueryVariables = Exact<{
  where: ZoneWhereUniqueInput;
}>;


export type ZoneQuery = { __typename?: 'Query', zone?: { __typename?: 'Zone', id: number, name?: string | null } | null };


export const AlertsDocument = `
    query Alerts($where: AlertWhereInput) {
  alerts(where: $where) {
    id
    message
    device {
      id
      name
      serial
      smartPole {
        zone {
          id
          name
        }
      }
      type {
        id
        name
      }
    }
    priority {
      id
      name
    }
  }
}
    `;
export const useAlertsQuery = <
      TData = AlertsQuery,
      TError = unknown
    >(
      variables?: AlertsQueryVariables,
      options?: UseQueryOptions<AlertsQuery, TError, TData>
    ) =>
    useQuery<AlertsQuery, TError, TData>(
      variables === undefined ? ['Alerts'] : ['Alerts', variables],
      fetcher<AlertsQuery, AlertsQueryVariables>(AlertsDocument, variables),
      options
    );
export const AggregateAlertDocument = `
    query AggregateAlert($where: AlertWhereInput) {
  aggregateAlert(where: $where) {
    _count {
      id
    }
  }
}
    `;
export const useAggregateAlertQuery = <
      TData = AggregateAlertQuery,
      TError = unknown
    >(
      variables?: AggregateAlertQueryVariables,
      options?: UseQueryOptions<AggregateAlertQuery, TError, TData>
    ) =>
    useQuery<AggregateAlertQuery, TError, TData>(
      variables === undefined ? ['AggregateAlert'] : ['AggregateAlert', variables],
      fetcher<AggregateAlertQuery, AggregateAlertQueryVariables>(AggregateAlertDocument, variables),
      options
    );
export const CompaniesDocument = `
    query Companies($orderBy: [CompanyOrderByWithRelationInput!]) {
  companies(orderBy: $orderBy) {
    id
    name
    logo
    icon
  }
}
    `;
export const useCompaniesQuery = <
      TData = CompaniesQuery,
      TError = unknown
    >(
      variables?: CompaniesQueryVariables,
      options?: UseQueryOptions<CompaniesQuery, TError, TData>
    ) =>
    useQuery<CompaniesQuery, TError, TData>(
      variables === undefined ? ['Companies'] : ['Companies', variables],
      fetcher<CompaniesQuery, CompaniesQueryVariables>(CompaniesDocument, variables),
      options
    );
export const DeviceTypesDocument = `
    query DeviceTypes {
  deviceTypes {
    id
    name
  }
}
    `;
export const useDeviceTypesQuery = <
      TData = DeviceTypesQuery,
      TError = unknown
    >(
      variables?: DeviceTypesQueryVariables,
      options?: UseQueryOptions<DeviceTypesQuery, TError, TData>
    ) =>
    useQuery<DeviceTypesQuery, TError, TData>(
      variables === undefined ? ['DeviceTypes'] : ['DeviceTypes', variables],
      fetcher<DeviceTypesQuery, DeviceTypesQueryVariables>(DeviceTypesDocument, variables),
      options
    );
export const AggregateDeviceDocument = `
    query AggregateDevice($where: DeviceWhereInput) {
  aggregateDevice(where: $where) {
    _count {
      id
    }
  }
}
    `;
export const useAggregateDeviceQuery = <
      TData = AggregateDeviceQuery,
      TError = unknown
    >(
      variables?: AggregateDeviceQueryVariables,
      options?: UseQueryOptions<AggregateDeviceQuery, TError, TData>
    ) =>
    useQuery<AggregateDeviceQuery, TError, TData>(
      variables === undefined ? ['AggregateDevice'] : ['AggregateDevice', variables],
      fetcher<AggregateDeviceQuery, AggregateDeviceQueryVariables>(AggregateDeviceDocument, variables),
      options
    );
export const DeviceDocument = `
    query Device($where: DeviceWhereUniqueInput!) {
  device(where: $where) {
    id
    name
    serial
    type {
      id
      name
    }
    alerts {
      id
      message
      priority {
        id
        name
      }
    }
    connectParamIndex
    smartPole {
      connectLocationId
      connectDeviceId
    }
  }
}
    `;
export const useDeviceQuery = <
      TData = DeviceQuery,
      TError = unknown
    >(
      variables: DeviceQueryVariables,
      options?: UseQueryOptions<DeviceQuery, TError, TData>
    ) =>
    useQuery<DeviceQuery, TError, TData>(
      ['Device', variables],
      fetcher<DeviceQuery, DeviceQueryVariables>(DeviceDocument, variables),
      options
    );
export const EventsDocument = `
    query Events($where: EventWhereInput, $orderBy: [EventOrderByWithRelationInput!]) {
  events(where: $where, orderBy: $orderBy) {
    id
    moment
    message
    device {
      id
      name
      serial
      smartPole {
        id
        name
        zone {
          id
          name
        }
      }
    }
    priority {
      id
      name
    }
  }
}
    `;
export const useEventsQuery = <
      TData = EventsQuery,
      TError = unknown
    >(
      variables?: EventsQueryVariables,
      options?: UseQueryOptions<EventsQuery, TError, TData>
    ) =>
    useQuery<EventsQuery, TError, TData>(
      variables === undefined ? ['Events'] : ['Events', variables],
      fetcher<EventsQuery, EventsQueryVariables>(EventsDocument, variables),
      options
    );
export const FormationDocument = `
    query Formation($where: FormationWhereUniqueInput!) {
  formation(where: $where) {
    id
    name
  }
}
    `;
export const useFormationQuery = <
      TData = FormationQuery,
      TError = unknown
    >(
      variables: FormationQueryVariables,
      options?: UseQueryOptions<FormationQuery, TError, TData>
    ) =>
    useQuery<FormationQuery, TError, TData>(
      ['Formation', variables],
      fetcher<FormationQuery, FormationQueryVariables>(FormationDocument, variables),
      options
    );
export const RegionsDocument = `
    query Regions($where: RegionWhereInput) {
  regions(where: $where) {
    id
    name
    formations {
      id
      name
      address
      solutions {
        id
        name
      }
    }
  }
}
    `;
export const useRegionsQuery = <
      TData = RegionsQuery,
      TError = unknown
    >(
      variables?: RegionsQueryVariables,
      options?: UseQueryOptions<RegionsQuery, TError, TData>
    ) =>
    useQuery<RegionsQuery, TError, TData>(
      variables === undefined ? ['Regions'] : ['Regions', variables],
      fetcher<RegionsQuery, RegionsQueryVariables>(RegionsDocument, variables),
      options
    );
export const SmartPolesDocument = `
    query SmartPoles($where: SmartPoleWhereInput, $orderBy: [SmartPoleOrderByWithRelationInput!]) {
  smartPoles(where: $where, orderBy: $orderBy) {
    id
    name
    serial
    latitude
    longitude
    zone {
      id
      name
      formation {
        id
        name
      }
    }
    devices {
      alerts {
        id
      }
    }
  }
}
    `;
export const useSmartPolesQuery = <
      TData = SmartPolesQuery,
      TError = unknown
    >(
      variables?: SmartPolesQueryVariables,
      options?: UseQueryOptions<SmartPolesQuery, TError, TData>
    ) =>
    useQuery<SmartPolesQuery, TError, TData>(
      variables === undefined ? ['SmartPoles'] : ['SmartPoles', variables],
      fetcher<SmartPolesQuery, SmartPolesQueryVariables>(SmartPolesDocument, variables),
      options
    );
export const SmartPoleDocument = `
    query SmartPole($where: SmartPoleWhereUniqueInput!) {
  smartPole(where: $where) {
    id
    name
    serial
    latitude
    longitude
    zone {
      id
      name
      formation {
        id
        name
        address
      }
    }
    devices {
      id
      name
      serial
      uuid
      type {
        id
        name
      }
      alerts {
        id
        message
        priority {
          id
          name
        }
      }
      events {
        id
        moment
        message
        priority {
          id
          name
        }
      }
      connectParamIndex
      smartPole {
        connectLocationId
        connectDeviceId
      }
    }
    connectLocationId
    connectDeviceId
  }
}
    `;
export const useSmartPoleQuery = <
      TData = SmartPoleQuery,
      TError = unknown
    >(
      variables: SmartPoleQueryVariables,
      options?: UseQueryOptions<SmartPoleQuery, TError, TData>
    ) =>
    useQuery<SmartPoleQuery, TError, TData>(
      ['SmartPole', variables],
      fetcher<SmartPoleQuery, SmartPoleQueryVariables>(SmartPoleDocument, variables),
      options
    );
export const UserGroupsDocument = `
    query UserGroups($orderBy: [UserGroupOrderByWithRelationInput!]) {
  userGroups(orderBy: $orderBy) {
    id
    name
    description
    color
    users {
      id
      lastName
      firstName
      email
      username
      avatar
      role {
        id
        name
      }
      groups {
        id
        name
      }
      phone
      jobTitle
    }
  }
}
    `;
export const useUserGroupsQuery = <
      TData = UserGroupsQuery,
      TError = unknown
    >(
      variables?: UserGroupsQueryVariables,
      options?: UseQueryOptions<UserGroupsQuery, TError, TData>
    ) =>
    useQuery<UserGroupsQuery, TError, TData>(
      variables === undefined ? ['UserGroups'] : ['UserGroups', variables],
      fetcher<UserGroupsQuery, UserGroupsQueryVariables>(UserGroupsDocument, variables),
      options
    );
export const UserGroupDocument = `
    query UserGroup($where: UserGroupWhereUniqueInput!) {
  userGroup(where: $where) {
    id
    name
    users {
      id
      lastName
      firstName
      avatar
    }
    description
    color
  }
}
    `;
export const useUserGroupQuery = <
      TData = UserGroupQuery,
      TError = unknown
    >(
      variables: UserGroupQueryVariables,
      options?: UseQueryOptions<UserGroupQuery, TError, TData>
    ) =>
    useQuery<UserGroupQuery, TError, TData>(
      ['UserGroup', variables],
      fetcher<UserGroupQuery, UserGroupQueryVariables>(UserGroupDocument, variables),
      options
    );
export const CreateOneUserGroupDocument = `
    mutation CreateOneUserGroup($data: UserGroupCreateInput!) {
  createOneUserGroup(data: $data) {
    id
  }
}
    `;
export const useCreateOneUserGroupMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateOneUserGroupMutation, TError, CreateOneUserGroupMutationVariables, TContext>) =>
    useMutation<CreateOneUserGroupMutation, TError, CreateOneUserGroupMutationVariables, TContext>(
      ['CreateOneUserGroup'],
      (variables?: CreateOneUserGroupMutationVariables) => fetcher<CreateOneUserGroupMutation, CreateOneUserGroupMutationVariables>(CreateOneUserGroupDocument, variables)(),
      options
    );
export const UpdateOneUserGroupDocument = `
    mutation UpdateOneUserGroup($data: UserGroupUpdateInput!, $where: UserGroupWhereUniqueInput!) {
  updateOneUserGroup(data: $data, where: $where) {
    id
  }
}
    `;
export const useUpdateOneUserGroupMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateOneUserGroupMutation, TError, UpdateOneUserGroupMutationVariables, TContext>) =>
    useMutation<UpdateOneUserGroupMutation, TError, UpdateOneUserGroupMutationVariables, TContext>(
      ['UpdateOneUserGroup'],
      (variables?: UpdateOneUserGroupMutationVariables) => fetcher<UpdateOneUserGroupMutation, UpdateOneUserGroupMutationVariables>(UpdateOneUserGroupDocument, variables)(),
      options
    );
export const DeleteOneUserGroupDocument = `
    mutation DeleteOneUserGroup($where: UserGroupWhereUniqueInput!) {
  deleteOneUserGroup(where: $where) {
    id
  }
}
    `;
export const useDeleteOneUserGroupMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteOneUserGroupMutation, TError, DeleteOneUserGroupMutationVariables, TContext>) =>
    useMutation<DeleteOneUserGroupMutation, TError, DeleteOneUserGroupMutationVariables, TContext>(
      ['DeleteOneUserGroup'],
      (variables?: DeleteOneUserGroupMutationVariables) => fetcher<DeleteOneUserGroupMutation, DeleteOneUserGroupMutationVariables>(DeleteOneUserGroupDocument, variables)(),
      options
    );
export const UsersDocument = `
    query Users {
  users {
    id
    lastName
    firstName
    email
    username
    avatar
    role {
      id
      name
    }
    groups {
      id
      name
    }
    phone
    jobTitle
  }
}
    `;
export const useUsersQuery = <
      TData = UsersQuery,
      TError = unknown
    >(
      variables?: UsersQueryVariables,
      options?: UseQueryOptions<UsersQuery, TError, TData>
    ) =>
    useQuery<UsersQuery, TError, TData>(
      variables === undefined ? ['Users'] : ['Users', variables],
      fetcher<UsersQuery, UsersQueryVariables>(UsersDocument, variables),
      options
    );
export const ZonesDocument = `
    query Zones($where: ZoneWhereInput) {
  zones(where: $where) {
    id
    name
  }
}
    `;
export const useZonesQuery = <
      TData = ZonesQuery,
      TError = unknown
    >(
      variables?: ZonesQueryVariables,
      options?: UseQueryOptions<ZonesQuery, TError, TData>
    ) =>
    useQuery<ZonesQuery, TError, TData>(
      variables === undefined ? ['Zones'] : ['Zones', variables],
      fetcher<ZonesQuery, ZonesQueryVariables>(ZonesDocument, variables),
      options
    );
export const ZoneDocument = `
    query Zone($where: ZoneWhereUniqueInput!) {
  zone(where: $where) {
    id
    name
  }
}
    `;
export const useZoneQuery = <
      TData = ZoneQuery,
      TError = unknown
    >(
      variables: ZoneQueryVariables,
      options?: UseQueryOptions<ZoneQuery, TError, TData>
    ) =>
    useQuery<ZoneQuery, TError, TData>(
      ['Zone', variables],
      fetcher<ZoneQuery, ZoneQueryVariables>(ZoneDocument, variables),
      options
    );