import React from 'react';

import { action, computed, makeObservable, observable } from 'mobx';
import { Asset, Location, Notification } from '@core/api/types';
import { LocationsController, useLocations } from './controllers/locations';

// components

import { SelectOption } from '@core/ui/components/Select';
import { Solutions } from '@core/ui/types';
import { useParams } from 'react-router';

export class UIStateStorage {
  @observable
  activeSolution?: Solutions;

  @action
  setActiveSolution(solution: Solutions) {
    this.activeSolution = solution;
    localStorage.setItem('activeSolution', solution);
  }

  @observable
  currentFormation?: number;

  @action
  setCurrentFormation(id: number) {
    this.currentFormation = id;
    localStorage.setItem('currentFormation', id.toString());
  }

  @observable
  emsCurrentLocation?: number;

  @action
  setEmsCurrentLocation(id: number) {
    this.emsCurrentLocation = id;
    localStorage.setItem('emsCurrentLocation', id.toString());
  }

  activeBuilding?: SelectOption<Location>;
  activeSpace?: SelectOption<Location>;
  activeDeviceType?: SelectOption<number | undefined>;

  setActiveBuilding(option: SelectOption<Location>) {
    this.activeBuilding = option;
  }
  setActiveSpace(option: SelectOption<Location>) {
    this.activeSpace = option;
  }
  setActiveDeviceType(option: SelectOption<number | undefined>) {
    this.activeDeviceType = option;
  }

  @action
  clear() {
    this.currentFormation = undefined;
  }

  restoreUiFromUrl(locations: LocationsController) {
    // activeSolution from url
    const solution = window.location.pathname.split('/')[1];
    const pages = ['solutions', 'login', 'reset', 'error'];
    if (!pages.includes(solution)) {
      this.setActiveSolution(solution as Solutions);
    }
  }

  @observable
  redirect: boolean = false;

  asset?: Asset;
  notification?: Notification;
  to: string = '';

  @action
  process(method: (to: string) => void) {
    if (this.redirect) {
      this.redirect = false;
      method(this.to);
    }
  }

  @action
  gotoLogin() {
    this.to = '/login';
    this.redirect = true;
  }

  @action
  gotoWorkspace() {
    this.to = `/${this.activeSolution}/`;
    this.redirect = true;
  }

  @action
  gotoDashboard() {
    this.to = `/${this.activeSolution}/dashboard/${this.currentFormation}`;
    this.redirect = true;
  }

  @action
  gotoAnalytics() {
    this.to = `/${this.activeSolution}/analytics/${this.currentFormation}`;
    this.redirect = true;
  }

  @action
  gotoLocations() {
    this.to = `/${this.activeSolution}/locations/${this.currentFormation}`;
    this.redirect = true;
  }

  @action
  goto(route: string) {
    this.to = route;
    this.redirect = true;
  }

  @action
  gotoTheSamePage() {
    const [root, solution, page, currentFormation, ...rest] = window.location.pathname.split('/');
    this.to = `/${solution}/${page}/${this.currentFormation}/${rest.join('/')}`;
    this.redirect = true;
  }

  @action
  gotoAsset(asset: Asset) {
    this.to = `/${ui.activeSolution}/assets/details`;
    this.asset = asset;
    this.redirect = true;
  }

  @action
  gotoNotification(notification: Notification) {
    this.to = `/${ui.activeSolution}/events/details`;
    this.notification = notification;
    this.redirect = true;
  }

  @observable
  acting: boolean = false;

  @action
  setActing(acting: boolean) {
    this.acting = acting;
  }

  constructor() {
    const current = localStorage.getItem('currentFormation');
    const emsCurrent = localStorage.getItem('emsCurrentLocation');

    if (current) {
      this.currentFormation = parseInt(current);
    }

    if (emsCurrent) {
      this.emsCurrentLocation = parseInt(emsCurrent);
    }
    makeObservable(this);
  }
}

export const ui = new UIStateStorage();

export const useUI = () => {
  // restore ui state from URL for utilus (v2)
  const { current } = useParams();

  React.useEffect(() => {
    if (current && current !== ui.currentFormation?.toString()) {
      ui.setCurrentFormation(parseInt(current));
      // FIXME: change to formation
      ui.setEmsCurrentLocation(parseInt(current));
    }
  }, [current]);

  return ui;
};
