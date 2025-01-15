import React from 'react';

// utils

import { t } from '@core/utils/translate';

import { action, computed, makeObservable, observable } from 'mobx';
import moment from 'moment';

export class ButtonTextStateStorage {
  constructor() {
    makeObservable(this);
  }

  @observable $buttonText = t('date.last6hours.label', 'Last 6 hours', 'Choose a specific 6-hours time interval.');

  @computed
  get buttonText() {
    return this.$buttonText;
  }

  @action
  setButtonText(text: string) {
    this.$buttonText = text;
  }

  @observable $startDateText = `${t('date.now.label', 'Now', 'The current moment or present time.')} - ${t(
    'date.6hours.label',
    '6 hours',
    'A duration spanning 6 consecutive hours.',
  )}`;

  @computed
  get startDateText() {
    return this.$startDateText;
  }

  @action
  setStartDateText(text: string) {
    this.$startDateText = text;
  }

  @observable $endDateText = t('date.now.label', 'Now', 'The current moment or present time.');

  @computed
  get endDateText() {
    return this.$endDateText;
  }

  @action
  setEndDateText(text: string) {
    this.$endDateText = text;
  }
}

export const buttonText = new ButtonTextStateStorage();

export class SelectedValueStateStorage {
  constructor() {
    makeObservable(this);
  }

  @observable $startDateValue = moment().subtract(6, 'hour').valueOf();

  @computed
  get startDateValue() {
    return this.$startDateValue;
  }

  @action
  setStartDateValue(value: number) {
    this.$startDateValue = value;
  }

  @observable $endDateValue = moment().valueOf();

  @computed
  get endDateValue() {
    return this.$endDateValue;
  }

  @action
  setEndDateValue(value: number) {
    this.$endDateValue = value;
  }
}

export const selectedValue = new SelectedValueStateStorage();

export class SelectItemIndexStorage {
  constructor() {
    makeObservable(this);
  }

  @observable selectedItemIndex = 0;

  @action setSelectedItemIndex(index: number) {
    this.selectedItemIndex = index;
  }
}

export const selectedItemIndex = new SelectItemIndexStorage();
