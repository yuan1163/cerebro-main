import { getIssueIcon } from '@core/utils/levelnow/issue';
import { EventsIssue } from '@core/api/types';

type Issue = {
  issue: EventsIssue;
  issueType: 'warning' | 'info';
};

interface StatusCellProps {
  issues: Issue[];
}

export default function IssueCell({ issues }: StatusCellProps) {
  return (
    <div className='flex items-center h-full gap-5 w-fit'>
      {issues.map((item) => {
        const { issue, issueType } = item;
        return (
          <div key={issue} className='flex flex-col items-center justify-between grow w-fit'>
            {getIssueIcon(issue)}
            <div
              className={`text-md font-medium tracking-32 ${
                issueType === 'warning' ? 'text-error-500' : 'text-primary-500'
              }`}
            >
              {issue}
            </div>
          </div>
        );
      })}
    </div>
  );
}
