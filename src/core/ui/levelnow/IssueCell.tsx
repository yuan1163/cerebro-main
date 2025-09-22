import { getIssueIcon } from '@core/utils/levelnow/issue';
import { EventsIssue } from '@core/api/types';
import { Scrollbar } from '../components/Scrollbar';

type Issue = {
  issue: EventsIssue;
  issueType: 'warning' | 'info';
};

interface StatusCellProps {
  issues: Issue[];
}

export default function IssueCell({ issues }: StatusCellProps) {
  return (
    <div className='flex items-center h-full max-w-[500px]'>
      {issues.map((item) => {
        const { issue, issueType } = item;
        return (
          <>
            <div key={issue} className='w-[100px]'>
              <div className='flex flex-col items-center justify-center'>
                {getIssueIcon(issue)}
                <div
                  className={`text-md font-medium tracking-32 ${
                    issueType === 'warning' ? 'text-error-500' : 'text-primary-500'
                  }`}
                >
                  {issue}
                </div>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}
