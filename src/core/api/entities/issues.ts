import { api } from '..';
import { Issue, IssuesInput, ResultOutput } from '../types';

// export async function apiGetIssue(filter: IssueInput): Promise<Issue[]> {
//   const query = new URLSearchParams(filter);
//   return api
//     .get<void, IssueOutput>(`issue?${query}`)
//     .then(api.checkResulCode)
//     .then((response) => (response.issues ? response.issues : []));
// }

const clean: Partial<Issue> = {
  locationId: undefined,
  assignee: undefined,
  reporter: undefined,
  creationDateMs: undefined,
  creationDate: undefined,
  updateDate: undefined,
  updateDateMs: undefined,
};

export async function apiCreateIssue(formData: Partial<Issue>): Promise<{ issueId: number }> {
  const data = { issue: { ...formData, ...clean } };
  return api
    .post<{ issue: Partial<Issue> }, ResultOutput & { issueId: number }>(
      `issue?locationId=${formData.locationId}`,
      data,
    )
    .then(api.checkResulCode);
}

export async function apiGetIssues(filter: IssuesInput): Promise<Issue[]> {
  const query = new URLSearchParams(filter);
  return api
    .get<void, ResultOutput & { issues: Issue[] }>(`issue?${query}`)
    .then(api.checkResulCode)
    .then((response) => (response.issues ? response.issues : []));
}

export async function apiGetIssue(filter: IssuesInput): Promise<Issue | undefined> {
  const query = new URLSearchParams(filter);
  return api
    .get<void, ResultOutput & { issues: Issue[] }>(`issue?${query}`)
    .then(api.checkResulCode)
    .then((response) => (response.issues ? response.issues[0] : undefined));
}

export async function apiUpdateIssue(formData: Partial<Issue>): Promise<unknown> {
  const data = {
    issue: {
      ...formData,
      ...clean,
      issueId: undefined,
      alerts: undefined,
      /*dueDate: undefined,*/ dueDateMs: undefined,
    },
  };
  return api
    .put<{ issue: Partial<Issue> }, ResultOutput>(
      `issue?locationId=${formData.locationId}&issueId=${formData.issueId}`,
      data,
    )
    .then(api.checkResulCode);
}

// export async function apiRemoveIssue(formData: Partial<Issue>): Promise<unknown> {
//   return api
//     .delete<void, ResultOutput>(`issue?locationId=${formData.locationId}&issueId=${formData.issueId}`)
//     .then(api.checkResulCode);
// }
