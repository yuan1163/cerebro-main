import { queryClient } from '@app/DataAccessAdapter';
import { apiCreateIssue, apiGetIssue, apiGetIssues, apiUpdateIssue } from '@core/api/entities/issues';
import { Issue, IssuesInput } from '@core/api/types';
import { pack } from '@core/utils/pack';
import { useMutation, useQuery } from '@tanstack/react-query';

const CONTROLLER = 'issues';

export const useIssue = (filter: IssuesInput) => {
  const useFilter = pack(filter);

  const { data, isLoading } = useQuery([CONTROLLER, filter.issueId], () => apiGetIssue(useFilter), {
    enabled: !!filter.issueId,
  });
  const mtAdd = useMutation(apiCreateIssue);
  const mtUpdate = useMutation(apiUpdateIssue);

  const add = async (formData: Partial<Issue>) => {
    const { issueId } = await mtAdd.mutateAsync(formData);
    queryClient.invalidateQueries([CONTROLLER]);
    queryClient.invalidateQueries(['alerts']);
  };

  const update = async (formData: Partial<Issue>) => {
    await mtUpdate.mutateAsync(formData);
    queryClient.invalidateQueries([CONTROLLER]);
  };

  return {
    data,
    isLoading,
    add,
    update,
  };
};

export const useIssues = (filter: IssuesInput) => {
  const useFilter = pack(filter);

  const { data, isLoading } = useQuery([CONTROLLER, ...Object.values(useFilter)], () => apiGetIssues(useFilter), {
    enabled: !!filter.locationId,
  });

  //const mtRemove = useMutation(apiRemoveIssue);

  return {
    getData: () => data,
    hasData: () => !!data,
    data,
    isLoading,
  };
};
