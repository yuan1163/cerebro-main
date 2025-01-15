import { queryClient } from '@app/DataAccessAdapter';
import { apiAddComment, apiGetComments, apiRemoveComment, apiUpdateComment } from '@core/api/entities/comments';
import { Comment, CommentInput, Issue } from '@core/api/types';
import { pack } from '@core/utils/pack';
import { useMutation, useQuery } from '@tanstack/react-query';

const CONTROLLER = 'comments';

export const useComments = (filter: CommentInput) => {
  const useFilter = pack(filter);

  const { data, isLoading } = useQuery([CONTROLLER, ...Object.values(useFilter)], () => apiGetComments(useFilter), {
    enabled: !!filter.issueId,
  });

  return {
    data,
    isLoading,
  };
};

export const useComment = (issue: Issue, comment?: Comment) => {
  const mtAdd = useMutation(apiAddComment);
  const mtUpdate = useMutation(apiUpdateComment);
  const mtRemove = useMutation(apiRemoveComment);

  const add = async (formData: Partial<Comment>) => {
    const { commentId } = await mtAdd.mutateAsync({ issue, formData });
    queryClient.invalidateQueries([CONTROLLER]);
  };

  const update = async (formData: Partial<Comment>) => {
    const data = { ...comment, ...formData };
    await mtUpdate.mutateAsync({ issue, formData: data });
    queryClient.invalidateQueries([CONTROLLER]);
  };

  const remove = async () => {
    await mtRemove.mutateAsync({ issue, formData: { ...comment } });
    queryClient.invalidateQueries([CONTROLLER]);
  };

  return {
    data: comment,
    isLoading: false,
    add,
    update,
    remove,
  };
};
