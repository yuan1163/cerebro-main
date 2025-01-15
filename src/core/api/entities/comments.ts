import { api } from '..';
import { Comment, CommentInput, Issue, ResultOutput } from '../types';

export async function apiGetComments(filter: CommentInput): Promise<Comment[]> {
  const query = new URLSearchParams(filter);
  return api
    .get<void, ResultOutput & { comments: Comment[] }>(`issueComment?${query}`)
    .then(api.checkResulCode)
    .then((response) => (response.comments ? response.comments : []));
}

export async function apiAddComment({ issue, formData }: { issue: Issue; formData: Partial<Comment> }) {
  return api
    .put<{ comment: Partial<Comment> }, ResultOutput & { commentId: number }>(
      `issueComment?locationId=${issue.locationId}&issueId=${issue.issueId}`,
      { comment: formData },
    )
    .then(api.checkResulCode);
}

export async function apiUpdateComment({ issue, formData }: { issue: Issue; formData: Partial<Comment> }) {
  return api
    .put<{ comment: Partial<Comment> }, ResultOutput & { commentId: number }>(
      `issueComment?locationId=${issue.locationId}&issueId=${issue.issueId}&commentId=${formData.commentId}`,
      { comment: formData },
    )
    .then(api.checkResulCode);
}

export async function apiRemoveComment({ issue, formData }: { issue: Issue; formData: Partial<Comment> }) {
  return api
    .delete<void, ResultOutput>(`issueComment?locationId=${issue.locationId}&commentId=${formData.commentId}`)
    .then(api.checkResulCode);
}
