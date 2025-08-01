// utils

import { t } from '@core/utils/translate';

import { IssuePriority, IssueStatus, Location } from '@core/api/types';

import CheckDone01LineIcon from '@assets/icons/line/check-done-01.svg?component';
import ChevronDownLineIcon from '@assets/icons/line/chevron-down.svg?component';
import ChevronUpDoubleLineIcon from '@assets/icons/line/chevron-up-double.svg?component';
import ChevronUpLineIcon from '@assets/icons/line/chevron-up.svg?component';
import DotsVerticalLineIcon from '@assets/icons/line/dots-vertical.svg?component';
import EqualLineIcon from '@assets/icons/line/equal.svg?component';
import FilterLinesLineIcon from '@assets/icons/line/filter-lines.svg?component';
import ModuleIcon from '@assets/icons/line/check-done-01.svg?component';

export enum ModuleSections {
  Common = 'common',
  Unique = 'unique',
}

interface Routable {
  url: string;
  component: React.ReactNode;
}

type Module = Routable & {
  title: string;
  icon: React.ReactNode;
  iconSolid: React.ReactNode;
  section?: ModuleSections; // default: ModuleSections.Common
  children?: ModuleChildren[];
};

type ModuleItem = Routable & {
  title: string;
};

type ModuleGroup = {
  isGroup: true;
  title: string;
  icon: React.ReactNode;
  iconSolid: React.ReactNode;
  items: ModuleItem[];
  section?: ModuleSections;
};

type ModuleChildren = {
  url: string;
  component: React.ReactNode;
};

export type Modules = (Module | ModuleGroup)[];

export const getModulesRoutes = (modules: Modules) => {
  const routes: Routable[] = [];
  modules.forEach((mod) => {
    if ('isGroup' in mod) {
      mod.items.forEach((item) => {
        routes.push(item);
      });
    } else {
      if (mod.component) routes.push(mod);
      if ('children' in mod && mod.children) {
        if (mod.url) {
          mod.children.forEach((child) => {
            routes.push({
              url: `${mod.url}/${child.url}`,
              component: child.component,
            });
          });
        } else {
          mod.children.forEach((child) => {
            routes.push({
              url: child.url,
              component: child.component,
            });
          });
        }
      }
    }
  });
  return routes;
};

export const getModulesSection = (modules: Modules, section: ModuleSections) => {
  // console.log('modules: ', modules)
  return modules.filter((mod) => {
    if ('isGroup' in mod) {
      return mod.section === section || (!mod.section && section === ModuleSections.Common);
    } else {
      return (
        !!mod.url &&
        ('section' in mod
          ? mod.section === section || (!mod.section && section === ModuleSections.Common)
          : section === ModuleSections.Common)
      );
    }
  });
};

export type Command = {
  icon: React.ReactNode;
  iconSolid: React.ReactNode;
  id: string;
  skipNav?: boolean;
  subtitle: string;
  title: string;
  url: string;
  element: React.ReactNode;
};

export enum Solutions {
  pinpoint = 'ivedartls',
  utilus = 'utilus',
  ai = 'ai',
  connect = 'connect',
  ems = 'ems',
  levelnow = 'levelnow',
}

// TODO
// export type Solutions = {
//   url: string;
//   title: string;
//   mask: number;
//   modules: Modules;
//   commands: Commands;
//   ...
// }[];

export enum SolutionsMasks {
  pinpoint = 0b00000001,
  utilus = 0b00000010,
  ai = 0b00000100,
  connect = 0b00001000,
  ems = 0b00010000,
  levelnow = 0b00100000,
}

export const getAllSolutions = () => [
  Solutions.pinpoint,
  Solutions.utilus,
  Solutions.ai,
  Solutions.connect,
  Solutions.ems,
  Solutions.levelnow,
];

export const getAvailbableSolutions = (company: Location) => {
  const result: Solutions[] = [];
  if (company.branchSolutions & SolutionsMasks.pinpoint) result.push(Solutions.pinpoint);
  if (company.branchSolutions & SolutionsMasks.utilus) result.push(Solutions.utilus);
  if (company.branchSolutions & SolutionsMasks.ai) result.push(Solutions.ai);
  if (company.branchSolutions & SolutionsMasks.connect) result.push(Solutions.connect);
  if (company.branchSolutions & SolutionsMasks.ems) result.push(Solutions.ems);
  if (company.branchSolutions & SolutionsMasks.levelnow) result.push(Solutions.levelnow);
  return result;
};
/*
export const getAvailbableSolutions = (company: Location) => {
  company.branchSolutions = 18 | SolutionsMasks.pinpoint; 
  const result: Solutions[] = [];
  if (company.branchSolutions & SolutionsMasks.pinpoint) result.push(Solutions.pinpoint);
  if (company.branchSolutions & SolutionsMasks.utilus) result.push(Solutions.utilus);
  if (company.branchSolutions & SolutionsMasks.ai) result.push(Solutions.ai);
  if (company.branchSolutions & SolutionsMasks.connect) result.push(Solutions.connect);
  if (company.branchSolutions & SolutionsMasks.ems) result.push(Solutions.ems);
  return result;
};*/

export const getPriorityData = (priority: IssuePriority) => {
  switch (priority) {
    case IssuePriority.Critical:
      return {
        label: t('events.criticalEvent.label', 'Critical', 'Critical event.'),
        color: 'red',
        icon: <ChevronUpDoubleLineIcon />,
      };
    case IssuePriority.High:
      return {
        label: t('events.highEvent.label', 'High', 'High priority notification.'),
        color: 'orange',
        icon: <ChevronUpLineIcon />,
      };
    case IssuePriority.Medium:
      return {
        label: t('events.mediumEvent.label', 'Medium', 'Medium priority notification.'),
        color: 'amber',
        icon: <EqualLineIcon />,
      };
    case IssuePriority.Low:
      return {
        label: t('events.lowEvent.label', 'Low', 'Low priority notification.'),
        color: 'blue',
        icon: <ChevronDownLineIcon />,
      };
  }
};

export const getStatusData = (status: IssueStatus) => {
  switch (status) {
    case IssueStatus.Open:
      return {
        label: t('status.openStatus.label', 'Open', 'Open status.'),
        color: 'secondary',
      };
    case IssueStatus.InProgress:
      return {
        label: t('status.inProgressStatus.label', 'In Progress', 'In Progress status.'),
        color: 'violet',
      };
    case IssueStatus.Resolved:
      return {
        label: t('status.resolvedStatus.label', 'Resolved', 'Resolved status.'),
        color: 'teal',
      };
    case IssueStatus.Closed:
      return {
        label: t('status.closedStatus.label', 'Closed', 'Closed status.'),
        color: 'success',
      };
  }
};

export type Language = 'en' | 'zh-CN' | 'zh-TW' | 'vi';
